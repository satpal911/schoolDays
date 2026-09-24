import DirectorRegister from '../pages/DirectorRegister';
import DirectorDashboard from '../pages/DirectorDashboard';

const directorRoutes = [
  {
    path: 'dashboard',
    element: <DirectorDashboard />,
  },
  {
    path: 'addSchool',
    element: <DirectorRegister />,
  },
];

export default directorRoutes;