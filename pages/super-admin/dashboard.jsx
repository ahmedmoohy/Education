import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard';
import { USER_ROLES } from '../../lib/constants';
import { useState, useEffect } from 'react';
import { getAuthToken, verifyToken } from '../../lib/auth';

export default function SuperAdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decodedUser = verifyToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }
    }
  }, []);

  return (
    <AuthGuard allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
      <div className="container mx-auto p-8">
        <Head>
          <title>Super Admin Dashboard - EduPlatform</title>
        </Head>

        <div className="bg-white rounded-xl shadow-apple-medium p-8">
          <h1 className="text-4xl font-bold text-text mb-6">
            Welcome, {user ? user.email : 'Super Admin'}!
          </h1>
          <p className="text-lightText text-lg mb-8">
            This is your Super Admin dashboard. You have full control over the platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-accent text-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">System Health</h3>
              <p className="mb-4">Monitor server performance and application logs.</p>
              <button className="bg-white text-accent px-4 py-2 text-sm rounded-lg hover:bg-opacity-90 transition-colors">
                View System Logs
              </button>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">Database Management</h3>
              <p className="text-lightText mb-4">Perform database backups and migrations.</p>
              <button className="btn-primary px-4 py-2 text-sm">Manage Database</button>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">Global Content Control</h3>
              <p className="text-lightText mb-4">Manage platform-wide content policies.</p>
              <button className="btn-primary px-4 py-2 text-sm">Content Rules</button>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">User & Role Management</h3>
              <p className="text-lightText mb-4">Full control over all user accounts and roles.</p>
              <button className="btn-primary px-4 py-2 text-sm">Advanced User Mgmt</button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
