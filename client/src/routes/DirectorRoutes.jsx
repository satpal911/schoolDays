import DirectorLogin from '../pages/DirectorLogin';
import DirectorRegister from '../pages/DirectorRegister';

const directorRoutes = [
	{
		path: '/director/login',
		element: <DirectorLogin />
	},
	{
		path: '/director/register',
		element: <DirectorRegister />
	}
];

export default directorRoutes;