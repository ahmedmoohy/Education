import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setAuthCookie } from '../lib/auth';
import { USER_ROLES } from '../lib/constants'; // Import roles for redirection

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setAuthCookie(data.token);
        // Redirect based on role
        if (data.user && data.user.role) {
          router.push(`/${data.user.role}/dashboard`);
        } else {
          router.push('/'); // Fallback to home if role not found
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center p-4">
      <Head>
        <title>Login - EduPlatform</title>
      </Head>

      <div className="bg-white rounded-xl shadow-apple-medium p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-text mb-8">Login to EduPlatform</h2>
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
          <button type="submit" className="btn-primary w-full">
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-lightText">
          Don't have an account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
