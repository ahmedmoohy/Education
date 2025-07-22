// pages/api/instructor/courses.js
import { USER_ROLES } from '../../../lib/constants';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userRole = req.headers['x-user-role'];

  if (!userRole || (userRole !== USER_ROLES.INSTRUCTOR && userRole !== USER_ROLES.ADMIN && userRole !== USER_ROLES.SUPER_ADMIN)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role to access instructor courses.' });
  }

  // Dummy data for courses
  const courses = [
    { id: 101, title: 'React Fundamentals', instructorId: req.headers['x-user-id'] },
    { id: 102, title: 'Node.js Backend', instructorId: req.headers['x-user-id'] },
  ];

  res.status(200).json({ courses });
}
