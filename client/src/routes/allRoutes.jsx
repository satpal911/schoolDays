import { Navigate } from 'react-router-dom';
import adminRoutes from './AdminRoutes';
import directorRoutes from './DirectorRoutes';
import principalRoutes from './PrincipalRoutes';
import teacherRoutes from './TeacherRoutes';
import studentRoutes from './StudentRoutes';

const allRoutes = [
  {
    path: '/',
    element: <Navigate to="/director/login" replace />
  },

  ...adminRoutes,
  ...directorRoutes,
  ...principalRoutes,
  ...teacherRoutes,
  ...studentRoutes,

  {
    path: '*',
    element: <Navigate to="/director/login" replace />
  }
];

export default allRoutes;