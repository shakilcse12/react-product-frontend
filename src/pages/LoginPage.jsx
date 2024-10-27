// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../routes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, setRole } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetailsAndNavigate = async (email) => {
    try {
      const response = await fetch('https://my-course-backend-green.vercel.app/user/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }), 
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        console.log("User details fetched from backend:", data);
        setRole(data.role);

        const lastVisitedPage = localStorage.getItem('lastLocation');
        localStorage.removeItem('lastLocation');
        navigate(lastVisitedPage || (data.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD));
      } else {
        toast.error(data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Unable to fetch user details");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(null, email, password);
      await fetchUserDetailsAndNavigate(email);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    setError('');

    try {
      const user = await login(provider, null, null);
      console.log("user = ", user);
      const socialEmail = user?.email;

      if (socialEmail) {
        await fetchUserDetailsAndNavigate(socialEmail);
      } else {
        setError("No email found for social login.");
      }
    } catch (error) {
      console.error(`Social login with ${provider} failed`, error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-500">Or sign in with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={() => handleSocialLogin("google")}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold"
            >
              Google
            </button>
            <button
              onClick={() => handleSocialLogin("github")}
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md font-semibold"
            >
              GitHub
            </button>
            <button
              onClick={() => handleSocialLogin("facebook")}
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md font-semibold"
            >
              Facebook
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
