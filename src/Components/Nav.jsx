import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="h-[64px] flex justify-between items-center px-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-md w-full">
      <div className="text-xl font-bold text-white">MyApp</div>
      <ul className="flex gap-6 items-center">
        <li>
          <Link
            to="/"
            className="text-white transition-colors duration-300 hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-1 rounded-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg">
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-1 rounded-md transition-all duration-300 hover:bg-gray-700 hover:shadow-lg">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
