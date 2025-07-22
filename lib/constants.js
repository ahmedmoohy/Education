export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};

export const PROTECTED_ROUTES = {
  student: ['/student', '/student/dashboard'],
  instructor: ['/instructor', '/instructor/dashboard'],
  admin: ['/admin', '/admin/dashboard'],
  super_admin: ['/super-admin', '/super-admin/dashboard'],
};
