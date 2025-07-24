import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { USER_ROLES } from '../lib/constants';
import { setAuthCookie } from '../../lib/auth'; // لاحظ إضافة نقطة ونقطتين إضافيتين
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(USER_ROLES.STUDENT); // Default role
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthCookie(data.token);
        // Redirect to dashboard based on registered role
        router.push(`/${role}/dashboard`);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
      <Head>
        <title>Register - EduPlatform</title>
      </Head>

      <div className="bg-white rounded-xl shadow-apple-medium p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-text mb-8">Register for EduPlatform</h2>
        {error && <p className="text-accent text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lightText text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lightText text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-lightText text-sm font-medium mb-2">Register as</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value={USER_ROLES.STUDENT}>Student</option>
              <option value={USER_ROLES.INSTRUCTOR}>Instructor</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-lightText">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}
