import { NextRequest, NextResponse } from 'next/server';
import { storeOtp } from '@/lib/db';

// Rate-limiting map: phone -> lastSentTimestamp
const lastSentTimestamps: Record<string, number> = {};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: 'A valid mobile number is required' },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/\D/g, '');
    // Validate length (Indian phone is typically 10 digits or 12 digits with 91)
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    // Rate limiting: 30-second cooldown per phone number
    const now = Date.now();
    const lastSent = lastSentTimestamps[cleanPhone];
    if (lastSent && now - lastSent < 30 * 1000) {
      const waitSecs = Math.ceil((30 * 1000 - (now - lastSent)) / 1000);
      return NextResponse.json(
        { error: `Please wait ${waitSecs} seconds before requesting a new OTP` },
        { status: 429 }
      );
    }

    // Generate secure 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes validity

    // Persist OTP
    await storeOtp(cleanPhone, otp, expiresAt);
    lastSentTimestamps[cleanPhone] = now;

    console.log(`[FinVera OTP Sandbox] Generated OTP for ${phone}: ${otp}`);

    // If an external SMS provider API is configured, dispatch SMS here
    const smsApiKey = process.env.SMS_API_KEY;
    if (smsApiKey) {
      // Dispatch via external SMS gateway (Fast2SMS / Twilio)
      // await sendExternalSms({ phone, otp });
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to ${phone}`,
      // In development/sandbox mode, return devOtp for seamless testing
      devOtp: process.env.NODE_ENV !== 'production' || !smsApiKey ? otp : undefined,
    });
  } catch (err) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 500 });
  }
}
