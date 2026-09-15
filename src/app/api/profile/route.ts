import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '../../../lib/auth';
import { updateUserProfile } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const updates = await req.json();
    const updatedProfile = await updateUserProfile(session.userId, updates);

    return NextResponse.json({
      success: true,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
