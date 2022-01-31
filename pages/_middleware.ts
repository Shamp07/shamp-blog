import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'production'
    && req.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${req.nextUrl.hostname}${req.nextUrl.pathname}`,
      301,
    );
  }
  return NextResponse.next();
}
