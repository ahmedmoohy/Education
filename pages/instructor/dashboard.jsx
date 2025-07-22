import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard';
import { USER_ROLES } from '../../lib/constants';
import { useState, useEffect } from 'react';
import { getAuthToken, verifyToken } from '../../lib/auth';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndCourses = async () => {
      const token = getAuthToken();
      if (!token) return;

      const decodedUser = verifyToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }

      try {
        const res = await fetch('/api/instructor/courses', {
          headers: {
            'Authorization': `Bearer ${token}` // Send token for API protection
          }
        });
        const data = await res.json();
        if (res.ok) {
          setCourses(data.courses);
        } else {
          console.error('Failed to fetch courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchUserAndCourses();
  }, []);

  return (
    <AuthGuard allowedRoles={[USER_ROLES.INSTRUCTOR]}>
      <div className="container mx-auto p-8">
        <Head>
          <title>Instructor Dashboard - EduPlatform</title>
        </Head>

        <div className="bg-white rounded-xl shadow-apple-medium p-8">
          <h1 className="text-4xl font-bold text-text mb-6">
            Welcome, {user ? user.email : 'Instructor'}!
          </h1>
          <p className="text-lightText text-lg mb-8">
            This is your instructor dashboard. Manage your courses, upload notes, and interact with students.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-text mb-4">Your Courses</h2>
            {courses.length === 0 ? (
              <p className="text-lightText">You haven't added any courses yet.</p>
            ) : (
              <ul className="space-y-4">
                {courses.map((course) => (
                  <li key={course.id} className="flex items-center justify-between bg-background p-4 rounded-lg shadow-sm">
                    <span className="text-text font-medium">{course.title}</span>
                    <button className="btn-primary px-4 py-2 text-sm">
                      Manage Course
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button className="btn-secondary mt-6">Add New Course</button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
