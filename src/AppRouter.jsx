import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignupForm from "./components/SignupForm";
import { Toaster } from "react-hot-toast";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ShortenUrlPage from "./components/ShortenUrlPage";
import  ErrorPage  from "./components/ErrorPage";
import PrivateRoute from "./PrivateRouter";


export function AppRouter() {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center"></Toaster>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/register" element={<PrivateRoute publicPage={true}><SignupForm /></PrivateRoute>}></Route>
        <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>}></Route>
        <Route path="/dashboard" element={<PrivateRoute publicPage={false}><Dashboard /></PrivateRoute>}></Route>
        <Route path="*" element={<ErrorPage/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export const subDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage />}></Route>
    </Routes>
  );
};
