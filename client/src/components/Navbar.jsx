import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isAuthenticated, logout }) => {
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  const linkClasses = (path) =>
    `relative px-3 py-2 rounded-md text-sm font-medium text-slate-700 transition-colors duration-300 hover:text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:transform after:scale-x-0 after:transition-transform after:duration-300 after:origin-center hover:after:scale-x-100 ${
      location.pathname === path ? "text-blue-600 after:scale-x-100" : ""
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-slate-800 tracking-wider"
            >
              Fee<span className="text-blue-600">Portal</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link to="/" className={linkClasses("/")}>
                All Students
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className={linkClasses("/profile")}>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={linkClasses("/login")}>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
