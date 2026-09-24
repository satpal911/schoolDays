import PrincipalDashboard from '../pages/PrincipalDashboard';
import TeacherRegister from '../pages/TeacherRegister';
import AllTeachers from './AllTeachers';

const principalRoutes = [
  {
    path: 'dashboard',
    element: <PrincipalDashboard />,
  },
  {
    path: 'add-teacher',
    element: <TeacherRegister/>
  },
  {
    path: 'all-teachers',
    element: <AllTeachers/>
  },
  {
    path: 'about',
    element: <AllTeachers/>
  },
  {
    path: 'settings',
    element: <AllTeachers/>
  },
];

export default principalRoutes;
