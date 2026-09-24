import StudentRegister from '../pages/StudentRegister';
import StudentDashboard from '../pages/StudentDashboard';

const studentRoutes = [
  {
    path: 'dashboard',
    element: <StudentDashboard />,
  },
  {
    path: 'register',
    element: <StudentRegister />,
  },
];

export default studentRoutes;
