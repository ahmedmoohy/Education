import { NextResponse } from 'next/server';
import { verifyToken, getAuthTokenFromRequest } from './lib/auth'; // تم تحديث المسار
import { PROTECTED_PATHS, USER_ROLES } from './lib/constants'; // تم تحديث المسار

export const config = {
  matcher: ['/student/:path*', '/instructor/:path*', '/admin/:path*', '/superadmin/:path*', '/api/auth/:path*'],
};

export async function middleware(req) {
  const token = getAuthTokenFromRequest(req);
  const { pathname } = req.nextUrl;

  // Allow unauthenticated access to login and register pages and API auth routes
  if (pathname === '/login' || pathname === '/register' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // If there's no token, redirect to login for any protected path
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const decodedToken = verifyToken(token);

  // If token is invalid, redirect to login
  if (!decodedToken) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.headers.set('Set-Cookie', 'auth_token=; Max-Age=0; Path=/; HttpOnly'); // Clear invalid cookie
    return response;
  }

  const userRole = decodedToken.role;

  // Check if the user's role has access to the requested path
  const hasAccess = Object.values(PROTECTED_PATHS).some(prefix => pathname.startsWith(prefix) && pathname.startsWith(PROTECTED_PATHS[userRole]));

  if (!hasAccess) {
    // Redirect to the appropriate dashboard based on role if unauthorized
    // This is a basic redirection. You might want a dedicated unauthorized page.
    const redirectPath = PROTECTED_PATHS[userRole] || '/'; // Default to homepage if role not found
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  return NextResponse.next();
}
