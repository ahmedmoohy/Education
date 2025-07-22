import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { removeAuthCookie, getAuthToken, verifyToken } from '../lib/auth';
import { USER_ROLES } from '../lib/constants';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        removeAuthCookie(); // Token expired or invalid
      }
    } else {
      setUser(null);
    }
  }, [router.asPath]); // Re-check on route change

  const handleLogout = () => {
    removeAuthCookie();
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-apple-light sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-text hover:text-primary transition-colors">
          EduPlatform
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              {user.role === USER_ROLES.STUDENT && (
                <Link href="/student/dashboard" className="text-lightText hover:text-text transition-colors">
                  Student Dashboard
                </Link>
              )}
              {user.role === USER_ROLES.INSTRUCTOR && (
                <Link href="/instructor/dashboard" className="text-lightText hover:text-text transition-colors">
                  Instructor Dashboard
                </Link>
              )}
              {user.role === USER_ROLES.ADMIN && (
                <Link href="/admin/dashboard" className="text-lightText hover:text-text transition-colors">
                  Admin Dashboard
                </Link>
              )}
              {user.role === USER_ROLES.SUPER_ADMIN && (
                <Link href="/super-admin/dashboard" className="text-lightText hover:text-text transition-colors">
                  Super Admin Dashboard
                </Link>
              )}
              <span className="text-lightText">Hello, {user.email} ({user.role})</span>
              <button onClick={handleLogout} className="btn-secondary px-4 py-2 text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lightText hover:text-text transition-colors">
                Login
              </Link>
              <Link href="/register" className="btn-primary px-4 py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
