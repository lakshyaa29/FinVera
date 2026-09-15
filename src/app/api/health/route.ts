import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '../../../lib/auth';
import { saveHealthAnswers } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const body = await req.json();
    const { scores = {}, overallScore = 0 } = body;

    await saveHealthAnswers(session.userId, scores, overallScore);

    return NextResponse.json({
      success: true,
      message: 'Health assessment saved successfully.',
    });
  } catch (error) {
    console.error('Health update error:', error);
    return NextResponse.json({ error: 'Failed to save health answers.' }, { status: 500 });
  }
}
