import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Recordings from './pages/Recordings/Recordings';
import Register from './pages/Register/Register';
import Results from './pages/Results/Results';
import Pitch from './pages/Pitch';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/pitch' element={<Pitch />} />
        <Route path='/recordings' element={<Recordings />} />
        <Route path='/recordings/:recording_id' element={<Results />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
