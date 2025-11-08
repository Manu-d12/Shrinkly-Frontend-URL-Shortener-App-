import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignupForm from './components/SignupForm';
import { Toaster } from 'react-hot-toast';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Toaster position='bottom-center'></Toaster>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/register" element={<SignupForm/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App
