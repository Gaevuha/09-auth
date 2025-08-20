import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile', '/notes', '/notes/action'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value; // дивимося accessToken
  const pathname = req.nextUrl.pathname;

  if (!token && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  if (token && publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/notes/action/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
