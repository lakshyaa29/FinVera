import { NextRequest, NextResponse } from 'next/server';
import { createOAuthOrMobileUser } from '@/lib/db';
import { signSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await createOAuthOrMobileUser({
      name: 'Guest Explorer',
      authProvider: 'guest',
      ageGroup: '18-24',
    });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        ageGroup: user.ageGroup,
        isGuest: true,
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
    console.error('Guest login error:', err);
    return NextResponse.json(
      { error: 'Failed to create guest session. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await createOAuthOrMobileUser({
      name: 'Guest Explorer',
      authProvider: 'guest',
      ageGroup: '18-24',
    });

    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const redirectUrl = new URL('/dashboard', req.url);
    const response = NextResponse.redirect(redirectUrl);

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
    console.error('Guest GET error:', err);
    return NextResponse.redirect(new URL('/login?error=guest_failed', req.url));
  }
}
