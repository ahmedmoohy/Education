import Head from 'next/head';
import AuthGuard from '../../components/AuthGuard';
import { USER_ROLES } from '../../lib/constants';
import { useState, useEffect } from 'react';
import { getAuthToken, verifyToken } from '../../lib/auth';

export default function StudentDashboard() {
  const [materials, setMaterials] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndMaterials = async () => {
      const token = getAuthToken();
      if (!token) return;

      const decodedUser = verifyToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      }

      try {
        const res = await fetch('/api/student/materials', {
          headers: {
            'Authorization': `Bearer ${token}` // Send token for API protection
          }
        });
        const data = await res.json();
        if (res.ok) {
          setMaterials(data.materials);
        } else {
          console.error('Failed to fetch materials:', data.message);
        }
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    fetchUserAndMaterials();
  }, []);

  return (
    <AuthGuard allowedRoles={[USER_ROLES.STUDENT]}>
      <div className="container mx-auto p-8">
        <Head>
          <title>Student Dashboard - EduPlatform</title>
        </Head>

        <div className="bg-white rounded-xl shadow-apple-medium p-8">
          <h1 className="text-4xl font-bold text-text mb-6">
            Welcome, {user ? user.email : 'Student'}!
          </h1>
          <p className="text-lightText text-lg mb-8">
            This is your student dashboard. Here you can view your enrolled courses and download materials.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-text mb-4">Your Course Materials</h2>
            {materials.length === 0 ? (
              <p className="text-lightText">No materials available yet. Check back later!</p>
            ) : (
              <ul className="space-y-4">
                {materials.map((material) => (
                  <li key={material.id} className="flex items-center justify-between bg-background p-4 rounded-lg shadow-sm">
                    <span className="text-text font-medium">{material.title}</span>
                    <a
                      href={material.url}
                      download
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
