import StudentRegister from '../pages/StudentRegister';

const studentRoutes = [
  {
    path: 'dashboard',
    element: <div className="p-6 text-white">Student Dashboard</div>,
  },
  {
    path: 'register',
    element: <StudentRegister />,
  },
];

export default studentRoutes;
