import { findUserByEmail, generateToken } from '../../../lib/auth';
import { serialize } from 'cookie'; // For setting httpOnly cookie

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  // Set httpOnly cookie
  res.setHeader('Set-Cookie', serialize('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  }));

  res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role }, token });
}
