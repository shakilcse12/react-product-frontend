import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      localStorage.removeItem('lastLocation');
      navigate(ROUTES.HOME); // Redirect to home after logout
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg ml-2">
       {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
