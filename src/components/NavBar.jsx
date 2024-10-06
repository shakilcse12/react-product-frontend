import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust this path
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import logo from '../assets/logos-food3.jpeg';
import { ROUTES } from '../routes';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Assuming you're using an AuthContext for authentication

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(user);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Site Name */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <NavLink to="/" className="ml-2 text-2xl font-bold">
              LearnWith<span className="text-blue-500">Tahmid</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className="text-gray-700 hover:text-blue-500">Home</NavLink>
            <NavLink to="/products" className="text-gray-700 hover:text-blue-500">Products</NavLink>
            
            {/* Conditionally render Login/Register or User Info */}
            {!user ? (
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
            ) : (
              <div className="flex items-center space-x-4">
                {/* User Profile Image and Name */}
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-700 font-medium">{user.displayName}</span>
                <button
                  onClick={logout}
                  className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
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
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            <NavLink
              to={ROUTES.PRODUCT}
              className="text-gray-700 hover:text-blue-500"
              onClick={toggleMenu}
            >
              Products
            </NavLink>

            {/* Conditionally render Login/Register or User Info */}
            {!user ? (
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
            ) : (
              <>
              {/* User Profile Image and Name */}
              <div className="flex items-center space-x-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <span className="text-gray-700 font-medium">{user.displayName}</span>
              </div>
              <button
                onClick={logout}
                className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
