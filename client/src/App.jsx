import Navbar from './components/Navbar';
import MasterRouter from "./routes/AllRoutes.jsx";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <MasterRouter />
    </>
  );
}

export default App;