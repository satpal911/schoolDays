import AdminRegister from '../pages/AdminRegister';

const adminRoutes = [
  {
    path: 'dashboard',
    element: <div className="p-6 text-white">Admin Dashboard</div>,
  },
  {
    path: 'register',
    element: <AdminRegister />,
  },
];

export default adminRoutes;
