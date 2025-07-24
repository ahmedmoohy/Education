
import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard'; // تم تحديث المسار
import Navbar from '../../components/Navbar'; // تم تحديث المسار
import { USER_ROLES } from '../../lib/constants'; // تم تحديث المسار

export default function StudentDashboard() {
  return (
    <AuthGuard requiredRole={USER_ROLES.STUDENT}>
      <Head>
        <title>Student Dashboard</title>
      </Head>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '50px auto' }}>
        <h1>Welcome to Student Dashboard!</h1>
        <p>This is where students can view their courses, assignments, and grades.</p>
        <p>You are logged in as a **Student**.</p>
        {/* Add student-specific content here */}
      </div>
    </AuthGuard>
  );
}
