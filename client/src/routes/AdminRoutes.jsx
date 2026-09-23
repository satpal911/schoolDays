import AdminLogin from '../pages/AdminLogin';
import AdminRegister from '../pages/AdminRegister';

const adminRoutes = [
	{
		path: '/admin/login',
		element: <AdminLogin />
	},
	{
		path: '/admin/register',
		element: <AdminRegister />
	}
];

export default adminRoutes;
