import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard';
import { USER_ROLES } from '../../lib/constants';
import { useState, useEffect } from 'react';
import { getAuthToken, verifyToken } from '../../lib/auth';

export default function AdminDashboard() {
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
    <AuthGuard allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN]}>
      <div className="container mx-auto p-8">
        <Head>
          <title>Admin Dashboard - EduPlatform</title>
        </Head>

        <div className="bg-white rounded-xl shadow-apple-medium p-8">
          <h1 className="text-4xl font-bold text-text mb-6">
            Welcome, {user ? user.email : 'Admin'}!
          </h1>
          <p className="text-lightText text-lg mb-8">
            This is your Admin dashboard. Manage users, site content, and platform settings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">Manage Users</h3>
              <p className="text-lightText mb-4">Add, edit, or remove user accounts and roles.</p>
              <button className="btn-primary px-4 py-2 text-sm">Go to User Management</button>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">Manage Courses</h3>
              <p className="text-lightText mb-4">Oversee all courses, categories, and content.</p>
              <button className="btn-primary px-4 py-2 text-sm">Go to Course Management</button>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-text mb-2">Site Settings</h3>
              <p className="text-lightText mb-4">Configure global platform settings.</p>
              <button className="btn-primary px-4 py-2 text-sm">Go to Settings</button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
