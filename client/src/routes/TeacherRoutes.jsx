import TeacherRegister from '../pages/TeacherRegister';
import TeacherDashboard from '../pages/TeacherDashboard';

const teacherRoutes = [
  {
    path: 'dashboard',
    element: <TeacherDashboard />,
  },
  {
    path: 'register',
    element: <TeacherRegister />,
  },
];

export default teacherRoutes;
