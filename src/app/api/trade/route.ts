import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '../../../lib/auth';
import { executeServerTrade } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const body = await req.json();
    const { assetId, symbol, name, action, units, price } = body;

    if (!assetId || !action || !units || !price) {
      return NextResponse.json({ error: 'Missing required trade parameters.' }, { status: 400 });
    }

    if (action !== 'BUY' && action !== 'SELL') {
      return NextResponse.json({ error: 'Action must be BUY or SELL.' }, { status: 400 });
    }

    if (typeof units !== 'number' || units <= 0 || !Number.isInteger(units)) {
      return NextResponse.json({ error: 'Units must be a positive whole integer.' }, { status: 400 });
    }

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Price must be a positive number.' }, { status: 400 });
    }

    const result = await executeServerTrade(session.userId, {
      assetId,
      symbol: symbol || assetId,
      name: name || symbol || assetId,
      action,
      units,
      price,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      portfolio: result.portfolio,
    });
  } catch (error) {
    console.error('Trade API error:', error);
    return NextResponse.json({ error: 'Failed to process simulated trade.' }, { status: 500 });
  }
}
