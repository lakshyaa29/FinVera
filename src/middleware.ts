import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET ||
    process.env.JWT_SECRET ||
    'finvera-production-secret-key-salt-987123456'
);

const COOKIE_NAMES = ['finvera_session', 'moneywise_session'];

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/learn',
  '/practice',
  '/health',
  '/achievements',
  '/profile',
  '/calculators',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let token: string | undefined;
  for (const name of COOKIE_NAMES) {
    const val = request.cookies.get(name)?.value;
    if (val) {
      token = val;
      break;
    }
  }

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      isValid = true;
    } catch {
      isValid = false;
    }
  }

  // If user is accessing /login while already authenticated, redirect to /dashboard
  if (pathname === '/login') {
    if (isValid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Check if current route is protected
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !isValid) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/learn/:path*',
    '/practice/:path*',
    '/health/:path*',
    '/achievements/:path*',
    '/profile/:path*',
    '/calculators/:path*',
    '/login',
  ],
};
