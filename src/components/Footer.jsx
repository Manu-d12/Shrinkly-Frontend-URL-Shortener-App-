import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Shrinkly</h2>
          <p className="text-sm mt-1 text-white/80">
            Making your links shorter, smarter, and more powerful.
          </p>
        </div>

        <div className="text-sm text-center md:text-right">
          © {new Date().getFullYear()} <span className="font-semibold">Shrinkly</span>. All rights reserved.
        </div>

        <div className="flex space-x-4 text-lg">
          <a href="#" className="hover:text-blue-200 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-blue-200 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-blue-200 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-200 transition"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
