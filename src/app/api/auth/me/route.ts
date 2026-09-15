import { NextResponse } from 'next/server';
import { getServerSession } from '../../../../lib/auth';
import { getUserFullData } from '../../../../lib/db';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.userId) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const userData = await getUserFullData(session.userId);
    if (!userData) {
      return NextResponse.json({ authenticated: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: userData.user.id,
        name: userData.user.name,
        email: userData.user.email,
        ageGroup: userData.user.ageGroup,
        phone: userData.user.phone,
        authProvider: userData.user.authProvider,
        avatar: userData.user.avatar,
      },
      profile: userData.profile,
      progress: userData.progress,
      portfolio: userData.portfolio,
      healthScores: userData.healthScores,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
