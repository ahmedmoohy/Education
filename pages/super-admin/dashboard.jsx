import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard'; // تم تحديث المسار
import Navbar from '../../components/Navbar'; // تم تحديث المسار
import { USER_ROLES } from '../../lib/constants'; // تم تحديث المسار

export default function SuperAdminDashboard() {
  return (
    <AuthGuard requiredRole={USER_ROLES.SUPER_ADMIN}>
      <Head>
        <title>Super Admin Dashboard</title>
      </Head>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '50px auto' }}>
        <h1>Welcome to Super Admin Dashboard!</h1>
        <p>This is where super administrators have full control over the platform.</p>
        <p>You are logged in as a **Super Admin**.</p>
        {/* Add super admin-specific content here */}
      </div>
    </AuthGuard>
  );
}
