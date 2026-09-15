import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, findUserByOAuthId, createOAuthOrMobileUser } from '@/lib/db';
import { signSessionToken, COOKIE_NAME } from '@/lib/auth';

/**
 * Safely decodes a JWT without verification (used for extracting Google ID Token claims in dev/hybrid environments)
 */
function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString('utf-8')
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { credential, email: bodyEmail, name: bodyName, googleId: bodyGoogleId, avatar: bodyAvatar } = body;

    let email = bodyEmail;
    let name = bodyName;
    let googleId = bodyGoogleId;
    let avatar = bodyAvatar;

    // If a Google ID Token credential was supplied by Google Identity Services
    if (credential) {
      const claims = decodeJwtPayload(credential);
      if (claims) {
        email = claims.email || email;
        name = claims.name || claims.given_name || name;
        googleId = claims.sub || googleId;
        avatar = claims.picture || avatar;
      }
    }

    if (!email && !googleId) {
      return NextResponse.json(
        { error: 'Email or Google Account ID is required' },
        { status: 400 }
      );
    }

    // 1. Try finding user by google OAuth ID
    let user = googleId ? await findUserByOAuthId('google', googleId) : null;

    // 2. Try finding user by email
    if (!user && email) {
      user = await findUserByEmail(email);
    }

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await createOAuthOrMobileUser({
        name: name || 'Google Learner',
        email,
        oauthId: googleId,
        authProvider: 'google',
        avatar,
        ageGroup: '18-24',
      });
    }

    // Sign session token
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      isNewUser,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        ageGroup: user.ageGroup,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error('Google OAuth error:', err);
    return NextResponse.json(
      { error: 'Google sign-in failed. Please try again.' },
      { status: 500 }
    );
  }
}
