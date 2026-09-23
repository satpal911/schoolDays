import TeacherLogin from '../pages/TeacherLogin';
import TeacherRegister from '../pages/TeacherRegister';

const teacherRoutes = [
	{
		path: '/teacher/login',
		element: <TeacherLogin />
	},
	{
		path: '/teacher/register',
		element: <TeacherRegister />
	}
];

export default teacherRoutes;
