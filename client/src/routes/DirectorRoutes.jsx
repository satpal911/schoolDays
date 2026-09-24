import DirectorRegister from '../pages/DirectorRegister';

const directorRoutes = [
  {
    path: 'dashboard',
    element: <div className="p-6 text-white">Director Dashboard</div>,
  },
  {
    path: 'addSchool',
    element: <DirectorRegister />,
  },
];

export default directorRoutes;