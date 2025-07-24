import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { verifyToken } from '../lib/auth'; // تم تحديث المسار
import { AUTH_COOKIE_NAME, PROTECTED_PATHS } from '../lib/constants'; // تم تحديث المسار
import { parse } from 'cookie'; // لإضافة قراءة الكوكيز في الواجهة الأمامية

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const cookies = parse(document.cookie || '');
      const token = cookies[AUTH_COOKIE_NAME];

      if (token) {
        const decoded = verifyToken(token); // Client-side check
        if (decoded) {
          setUser(decoded);
        } else {
          // Token invalid, clear it
          document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; path=/;`;
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();

    // Re-check auth on route change
    const handleRouteChange = () => checkAuth();
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const handleLogout = () => {
    // Clear cookie on client side
    document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; path=/;`;

    // Optionally, call a logout API endpoint if you have server-side session management
    // (Not strictly necessary for JWT unless you're blacklisting tokens)

    setUser(null);
    router.push('/login');
  };

  return (
    <nav style={{ backgroundColor: '#333', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.2em' }}>
        EduPlatform
      </Link>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>Welcome, {user.email} ({user.role})</span>
            {user.role && PROTECTED_PATHS[user.role] && (
              <Link href={PROTECTED_PATHS[user.role]} style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} style={{ background: 'none', border: '1px solid white', color: 'white', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
              Login
            </Link>
            <Link href="/register" style={{ color: 'white', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
