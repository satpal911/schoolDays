export const directorLinks = [
  { label: 'Profile', to: '/director/profile' },
  { label: 'Add School', to: '/director/addSchool' },
  { label: 'Settings', to: '/director/settings' },
  { label: 'About', to: '/director/about' },
  { label: 'Logout', to: '/logout', isAction: true }
];

export const teacherLinks = [
  { label: 'My Classes', to: '/teacher/classes' },
  { label: 'Attendance', to: '/teacher/attendance' },
  { label: 'Grades', to: '/teacher/grades' },
  { label: 'Logout', to: '/logout', isAction: true }
];

export const studentLinks = [
  { label: 'My Schedule', to: '/student/schedule' },
  { label: 'Report Card', to: '/student/report-card' },
  { label: 'Assignments', to: '/student/assignments' },
  { label: 'Logout', to: '/logout', isAction: true }
];

export const adminLinks = [
  { label: 'Control Panel', to: '/admin/panel' },
  { label: 'Manage Users', to: '/admin/users' },
  { label: 'System Logs', to: '/admin/logs' },
  { label: 'Logout', to: '/logout', isAction: true }
];

export const guestLinks = [
  { label: 'Home', to: '/' },
  { label: 'Browse Schools', to: '/schools' },
  { label: 'Contact Support', to: '/contact' },
  { label: 'Login', to: '/login', isAction: true }
];
