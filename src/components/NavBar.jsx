import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust this path
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../assets/logo.png';
import { ROUTES } from '../routes';
import LogoutButton from './LogoutButton';
import { useLocation } from 'react-router-dom';

const NavBar = ({lastLocations}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth(); // Using user to check login status
  console.log(user);

  const isDashboardPage = lastLocations === ROUTES.ADMIN_DASHBOARD || lastLocations === ROUTES.USER_DASHBOARD;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <NavLink to={ROUTES.HOME}> 
              <img src={logo} alt="Logo" className="w-10 h-10" />
            </NavLink>
            <NavLink to={ROUTES.HOME} className="ml-2 text-2xl font-bold">
              LearnWith<span className="text-blue-500">Tahmid</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink 
              to={ROUTES.HOME} 
              className={({ isActive }) => 
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
              }>
              Home
            </NavLink>
            <NavLink 
              to={ROUTES.PRODUCT} 
              className={({ isActive }) => 
                isActive && user ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
              }>
              Products
            </NavLink>
            
            {/* Conditionally render Dashboard link or Login/Register */}
            {user ? (
              <div>
              <NavLink 
                to={user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD} // Redirect to Dashboard when logged in
                className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Dashboard
              </NavLink>
              {!isDashboardPage && <LogoutButton />}
             </div>

            ) : (
              <div className="flex space-x-4">
                <NavLink
                  to={ROUTES.LOGIN}
                  className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to={ROUTES.REGISTER}
                  className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenuAlt3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) => 
                isActive ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
              }
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.PRODUCT} 
              className={({ isActive }) => 
                isActive && user ? "text-blue-500 font-semibold" : "text-gray-700 hover:text-blue-500"
              }
              onClick={toggleMenu}
            >
              Products
            </NavLink>

            {/* Conditionally render Dashboard link or Login/Register */}
            {user ? (
              <div>
              <NavLink
                to={user.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD}
                className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={toggleMenu}
              >
                Dashboard
              </NavLink>
              {!isDashboardPage && <LogoutButton />}
            </div>
              
            ) : (
              <>
                <NavLink
                  to={ROUTES.LOGIN}
                  className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to={ROUTES.REGISTER}
                  className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={toggleMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
