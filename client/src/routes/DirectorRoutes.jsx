import DirectorLogin from '../pages/DirectorLogin';
import DirectorRegister from '../pages/DirectorRegister';

const directorRoutes = [
	{
		path: 'dashboard',
		element: <DirectorLogin />
	},
	{
		path: 'addSchool',
		element: <DirectorRegister />
	}
];

export default directorRoutes;