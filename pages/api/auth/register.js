import { registerUser, generateToken, setAuthCookie } from '../../../lib/auth'; // تم تحديث المسار
import { USER_ROLES } from '../../../lib/constants'; // تم تحديث المسار

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, role } = req.body;

  // Basic validation (add more robust validation in a real app)
  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role are required.' });
  }

  // Ensure the role is one of the allowed roles
  const allowedRoles = Object.values(USER_ROLES);
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  const newUser = registerUser({ email, password, role });

  if (!newUser) {
    return res.status(409).json({ message: 'User with this email already exists.' });
  }

  const tokenPayload = { id: newUser.id, email: newUser.email, role: newUser.role };
  const token = generateToken(tokenPayload);

  setAuthCookie(res, token); // Set HTTP-only cookie

  return res.status(201).json({ message: 'Registration successful', user: { id: newUser.id, email: newUser.email, role: newUser.role } });
}
