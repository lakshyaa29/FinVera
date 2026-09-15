import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '../../../lib/auth';
import { updateUserProgress } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const updates = await req.json();
    const nextProgress = await updateUserProgress(session.userId, updates);

    return NextResponse.json({
      success: true,
      progress: nextProgress,
    });
  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json({ error: 'Failed to update progress.' }, { status: 500 });
  }
}
