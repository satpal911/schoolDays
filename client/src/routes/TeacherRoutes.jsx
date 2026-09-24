import TeacherRegister from '../pages/TeacherRegister';

const teacherRoutes = [
  {
    path: 'dashboard',
    element: <div className="p-6 text-white">Teacher Dashboard</div>,
  },
  {
    path: 'register',
    element: <TeacherRegister />,
  },
];

export default teacherRoutes;
