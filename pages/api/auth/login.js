import { findUserByEmail, generateToken, setAuthCookie } from '../../../lib/auth'; // تم تحديث المسار
import { USER_ROLES } from '../../../lib/constants'; // تم تحديث المسار

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, role } = req.body; // استقبل الدور أيضاً

  // Basic validation (add more robust validation in a real app)
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required.' });
  }

  const user = findUserByEmail(email);

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Ensure the user is trying to log in with their actual role
  if (user.role !== role) {
    return res.status(401).json({ message: 'Invalid role for this user.' });
  }

  const tokenPayload = { id: user.id, email: user.email, role: user.role };
  const token = generateToken(tokenPayload);

  setAuthCookie(res, token); // Set HTTP-only cookie

  return res.status(200).json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
}
