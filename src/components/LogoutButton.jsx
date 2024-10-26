import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg ml-2">
      Logout
    </button>
  );
};

export default LogoutButton;
