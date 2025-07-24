import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { verifyToken } from '../lib/auth'; // تم تحديث المسار
import { PROTECTED_PATHS, AUTH_COOKIE_NAME } from '../lib/constants'; // تم تحديث المسار
import { parse } from 'cookie'; // لإضافة قراءة الكوكيز في الواجهة الأمامية

const AuthGuard = ({ children, requiredRole }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // On the client side, cookies are read from document.cookie
      const cookies = parse(document.cookie || '');
      const token = cookies[AUTH_COOKIE_NAME];

      if (!token) {
        router.replace('/login');
        return;
      }

      const decodedToken = verifyToken(token); // This is still client-side validation, for UI

      if (!decodedToken) {
        // Token is invalid or expired
        document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; path=/;`; // Clear invalid cookie
        router.replace('/login');
        return;
      }

      // Check if the user's role matches the required role for the page
      if (requiredRole && decodedToken.role !== requiredRole) {
        // Redirect to their respective dashboard if they don't have access to this specific page
        const redirectPath = PROTECTED_PATHS[decodedToken.role] || '/';
        router.replace(redirectPath);
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, requiredRole]);

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner
  }

  return <>{children}</>;
};

export default AuthGuard;
