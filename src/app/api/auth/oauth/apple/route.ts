import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, findUserByOAuthId, createOAuthOrMobileUser } from '@/lib/db';
import { signSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appleId, email, name } = body;

    const identifier = appleId || email;
    if (!identifier) {
      return NextResponse.json(
        { error: 'Apple ID identifier or email is required' },
        { status: 400 }
      );
    }

    // Check by Apple OAuth ID
    let user = appleId ? await findUserByOAuthId('apple', appleId) : null;

    // Check by email
    if (!user && email) {
      user = await findUserByEmail(email);
    }

    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = await createOAuthOrMobileUser({
        name: name || 'Apple Learner',
        email,
        oauthId: appleId,
        authProvider: 'apple',
        ageGroup: '18-24',
      });
    }

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
    console.error('Apple OAuth error:', err);
    return NextResponse.json(
      { error: 'Apple sign-in failed. Please try again.' },
      { status: 500 }
    );
  }
}
