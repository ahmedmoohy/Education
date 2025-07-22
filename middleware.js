import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth'; // Adjust path if necessary
import { USER_ROLES, PROTECTED_ROUTES } from './lib/constants'; // Adjust path if necessary

export async function middleware(request) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  // Paths that don't require authentication
  if (pathname === '/login' || pathname === '/register' || pathname === '/') {
    // If authenticated user tries to access login/register, redirect to their dashboard
    if (token) {
      const decoded = verifyToken(token);
      if (decoded && decoded.role) {
        return NextResponse.redirect(new URL(`/${decoded.role}/dashboard`, request.url));
      }
    }
    return NextResponse.next();
  }

  // Protected API routes
  if (pathname.startsWith('/api/')) {
    const isAuthApi = pathname.startsWith('/api/auth');
    if (!token && !isAuthApi) {
      return new NextResponse(JSON.stringify({ message: 'Authentication required' }), { status: 401 });
    }

    if (token) {
      const decoded = verifyToken(token);
      if (!decoded) {
        return new NextResponse(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
      }

      // Role-based API protection (example for specific paths)
      if (pathname.startsWith('/api/student') && decoded.role !== USER_ROLES.STUDENT && decoded.role !== USER_ROLES.ADMIN && decoded.role !== USER_ROLES.SUPER_ADMIN) {
        return new NextResponse(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
      }
      if (pathname.startsWith('/api/instructor') && decoded.role !== USER_ROLES.INSTRUCTOR && decoded.role !== USER_ROLES.ADMIN && decoded.role !== USER_ROLES.SUPER_ADMIN) {
        return new NextResponse(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
      }
      // Attach user info to request headers (for API routes)
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.id);
      requestHeaders.set('x-user-role', decoded.role);
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    return NextResponse.next(); // For /api/auth routes
  }

  // Protected UI routes
  if (!token) {
    // Redirect to login if no token for protected pages
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    // Invalid token, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check role-based access for UI paths
  const userRole = decoded.role;
  let hasAccess = false;

  for (const role in PROTECTED_ROUTES) {
    if (userRole === role) {
      if (PROTECTED_ROUTES[role].some(route => pathname.startsWith(route))) {
        hasAccess = true;
        break;
      }
    } else if (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.SUPER_ADMIN) {
      // Admins and Super Admins can access all dashboards
      if (Object.values(PROTECTED_ROUTES).flat().some(route => pathname.startsWith(route))) {
        hasAccess = true;
        break;
      }
    }
  }

  if (!hasAccess) {
    // If user tries to access a dashboard they don't have permission for
    // Redirect to their own dashboard or a general forbidden page
    return NextResponse.redirect(new URL(`/${userRole}/dashboard`, request.url));
  }

  return NextResponse.next();
}

// Config for which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/student/:path*',
    '/instructor/:path*',
    '/admin/:path*',
    '/super-admin/:path*',
    '/api/:path*',
  ],
};
