import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard'; // تم تحديث المسار
import Navbar from '../../components/Navbar'; // تم تحديث المسار
import { USER_ROLES } from '../../lib/constants'; // تم تحديث المسار

export default function InstructorDashboard() {
  return (
    <AuthGuard requiredRole={USER_ROLES.INSTRUCTOR}>
      <Head>
        <title>Instructor Dashboard</title>
      </Head>
      <Navbar />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '50px auto' }}>
        <h1>Welcome to Instructor Dashboard!</h1>
        <p>This is where instructors can manage their courses, students, and materials.</p>
        <p>You are logged in as an **Instructor**.</p>
        {/* Add instructor-specific content here */}
      </div>
    </AuthGuard>
  );
}
