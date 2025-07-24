import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, USER_ROLES } from './constants';
import { serialize, parse } from 'cookie'; // تم إضافة parse و serialize

// In-memory user store for demonstration purposes
// In a real app, this would be a database
const users = [
  { id: 'student1', email: 'student@example.com', password: 'password', role: USER_ROLES.STUDENT },
  { id: 'instructor1', email: 'instructor@example.com', password: 'password', role: USER_ROLES.INSTRUCTOR },
  { id: 'admin1', email: 'admin@example.com', password: 'password', role: USER_ROLES.ADMIN },
  { id: 'superadmin1', email: 'superadmin@example.com', password: 'password', role: USER_ROLES.SUPER_ADMIN },
];

export const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

export const registerUser = ({ email, password, role }) => {
  if (findUserByEmail(email)) {
    return null; // User already exists
  }
  const newUser = { id: Date.now().toString(), email, password, role };
  users.push(newUser); // This adds to the in-memory array
  console.log('New user registered:', newUser); // For debugging
  return newUser;
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
};

// Helper functions for cookie management on the server-side
export const setAuthCookie = (res, token) => {
  const cookie = serialize(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60, // 1 hour
    path: '/',
    sameSite: 'Lax',
  });
  res.setHeader('Set-Cookie', cookie);
};

export const removeAuthCookie = (res) => {
  const cookie = serialize(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Expire cookie immediately
    path: '/',
    sameSite: 'Lax',
  });
  res.setHeader('Set-Cookie', cookie);
};

// Helper function to get token from request headers (for middleware)
export const getAuthTokenFromRequest = (req) => {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  return cookies[AUTH_COOKIE_NAME] || null;
};
