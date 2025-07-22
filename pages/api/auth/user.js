import { verifyToken } from '../../../lib/auth';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Middleware will already have verified the token and added user info to headers
  const userId = req.headers['x-user-id'];
  const userRole = req.headers['x-user-role'];

  if (!userId || !userRole) {
    // This should ideally not happen if middleware is set up correctly
    return res.status(401).json({ message: 'User information not found in request headers.' });
  }

  res.status(200).json({ user: { id: userId, role: userRole } });
}
