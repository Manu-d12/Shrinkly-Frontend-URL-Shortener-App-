import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { AppContext } from '../contextApi/ContextApi';


const Navbar = () => {
  const {token, setToken} = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(token != null);


  const handleAuthToggle = () => {
    if(isLoggedIn == false) {
        navigate('/login');
    } else {
      localStorage.removeItem("JWT_TOKEN");
      setToken(null);
    }
    setIsLoggedIn(!isLoggedIn)
  };

  return (
    <nav className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
          <Link to="/" > Shrinkly </Link> 
        </h1>

        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="hover:text-blue-200 transition-colors duration-200 font-medium"
          >
            Home
          </a>
          <a
            href="/about"
            className="hover:text-blue-200 transition-colors duration-200 font-medium"
          >
            About
          </a>
          <button
            onClick={handleAuthToggle}
            className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-full hover:bg-indigo-100 transition-all duration-300"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
