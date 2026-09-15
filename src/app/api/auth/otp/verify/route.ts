import { NextRequest, NextResponse } from 'next/server';
import { findUserByPhone, verifyOtpCode, createOAuthOrMobileUser } from '@/lib/db';
import { signSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    if (!code || typeof code !== 'string' || code.trim().length !== 6) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit OTP' },
        { status: 400 }
      );
    }

    const isValid = await verifyOtpCode(phone, code);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP. Please enter the correct code or request a new one.' },
        { status: 400 }
      );
    }

    // Check if user exists with this phone number
    let user = await findUserByPhone(phone);
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await createOAuthOrMobileUser({
        name: 'Mobile Learner',
        phone,
        authProvider: 'mobile',
        ageGroup: '18-24',
      });
    }

    // Sign JWT session token
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
        phone: user.phone,
        ageGroup: user.ageGroup,
      },
    });

    // Set 7-day secure HTTP-only cookie
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
    console.error('Verify OTP error:', err);
    return NextResponse.json(
      { error: 'Verification failed. Please try again.' },
      { status: 500 }
    );
  }
}
