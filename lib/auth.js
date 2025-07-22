import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { USER_ROLES } from './constants';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_NAME = 'authToken';

// In-memory user store for demonstration purposes
// In a real app, this would be a database
const users = [
  { id: 'student1', email: 'student@example.com', password: 'password', role: USER_ROLES.STUDENT },
  { id: 'instructor1', email: 'instructor@example.com', password: 'password', role: USER_ROLES.INSTRUCTOR },
  { id: 'admin1', email: 'admin@example.com', password: 'password', role: USER_ROLES.ADMIN },
  { id: 'superadmin1', email: 'superadmin@example.com', password: 'password', role: USER_ROLES.SUPER_ADMIN },
];

export const findUserByEmail = (email) => users.find(u => u.email === email);

export const registerUser = ({ email, password, role }) => {
  if (findUserByEmail(email)) {
    return null; // User already exists
  }
  const newUser = { id: Date.now().toString(), email, password, role };
  users.push(newUser);
  return newUser;
};


export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const setAuthCookie = (token) => {
  Cookies.set(TOKEN_NAME, token, {
    expires: 1 / 24, // 1 hour
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};

export const removeAuthCookie = () => {
  Cookies.remove(TOKEN_NAME);
};

export const getAuthToken = () => {
  return Cookies.get(TOKEN_NAME);
};
