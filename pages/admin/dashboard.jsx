import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard'; // تم تحديث المسار
import Navbar from '../../components/Navbar'; // تم تحديث المسار
import { USER_ROLES } from '../../lib/constants'; // تم تحديث المسار

export default function AdminDashboard() {
  return (
    <AuthGuard requiredRole={USER_ROLES.ADMIN}>
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '50px auto' }}>
        <h1>Welcome to Admin Dashboard!</h1>
        <p>This is where administrators can manage users, courses, and platform settings.</p>
        <p>You are logged in as an **Admin**.</p>
        {/* Add admin-specific content here */}
      </div>
    </AuthGuard>
  );
}
