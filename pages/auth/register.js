import { registerUser, generateToken } from '../../../lib/auth';
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required' });
  }

  const newUser = registerUser({ email, password, role });

  if (!newUser) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }

  const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

  // Set httpOnly cookie
  res.setHeader('Set-Cookie', serialize('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  }));

  res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, email: newUser.email, role: newUser.role }, token });
}
