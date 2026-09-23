import StudentLogin from '../pages/StudentLogin';
import StudentRegister from '../pages/StudentRegister';

const studentRoutes = [
	{
		path: '/student/login',
		element: <StudentLogin />
	},
	{
		path: '/student/register',
		element: <StudentRegister />
	}
];

export default studentRoutes;
