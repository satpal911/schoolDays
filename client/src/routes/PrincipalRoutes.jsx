import PrincipalLogin from '../pages/PrincipalLogin';
import PrincipalRegister from '../pages/PrincipalRegister';

const principalRoutes = [
	{
		path: '/principal/login',
		element: <PrincipalLogin />
	},
	{
		path: '/principal/register',
		element: <PrincipalRegister />
	}
];

export default principalRoutes;
