import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, verifyToken } from '../lib/auth';
import { USER_ROLES } from '../lib/constants';

const AuthGuard = ({ children, allowedRoles }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login'); // No token, redirect to login
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      router.push('/login'); // Invalid token, redirect to login
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      if (allowedRoles.includes(decoded.role)) {
        setHasAccess(true);
      } else if (decoded.role === USER_ROLES.ADMIN || decoded.role === USER_ROLES.SUPER_ADMIN) {
        // Admins and Super Admins typically have access to all dashboards
        setHasAccess(true);
      } else {
        router.push(`/${decoded.role}/dashboard`); // Redirect to their own dashboard if unauthorized
      }
    } else {
      // If no specific roles are required, just check if authenticated
      setHasAccess(true);
    }
    setLoading(false);
  }, [router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
        <p className="text-lightText text-lg">Loading...</p>
      </div>
    );
  }

  return hasAccess ? children : null;
};

export default AuthGuard;
