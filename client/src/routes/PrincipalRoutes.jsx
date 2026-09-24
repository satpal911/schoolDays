import PrincipalRegister from '../pages/PrincipalRegister';

const principalRoutes = [
  {
    path: 'dashboard',
    element: <div className="p-6 text-white">Principal Dashboard</div>,
  },
  {
    path: 'register',
    element: <PrincipalRegister />,
  },
];

export default principalRoutes;
