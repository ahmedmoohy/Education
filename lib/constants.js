export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const PROTECTED_PATHS = {
  [USER_ROLES.STUDENT]: '/student',
  [USER_ROLES.INSTRUCTOR]: '/instructor',
  [USER_ROLES.ADMIN]: '/admin',
  [USER_ROLES.SUPER_ADMIN]: '/superadmin',
};

export const AUTH_COOKIE_NAME = 'auth_token';
