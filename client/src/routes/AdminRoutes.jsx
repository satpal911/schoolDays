import AdminRegister from '../pages/AdminRegister';
import AdminDashboard from '../pages/AdminDashboard';

const adminRoutes = [
  {
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    path: 'register',
    element: <AdminRegister />,
  },
];

export default adminRoutes;
