import { useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import allRoutes from './routes/allRoutes';

function App() {
  const routes = useRoutes(allRoutes);

  return (
    <>
      <Navbar />
      {routes}
    </>
  );
}

export default App;