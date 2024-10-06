import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have this set up for context management
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../routes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // useAuth hook for context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(null, email, password);
      toast.success("Login Successful");
      navigate(ROUTES.PRODUCT); // Redirect to Products page after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await login("google", null, null);
      toast.success("Login Successful");
      navigate(ROUTES.PRODUCT);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await login("github", null, null);
      toast.success("Login Successful");
      navigate(ROUTES.PRODUCT);
    } catch (error) {
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
              onClick={handleGoogleLogin}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold"
            >
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md font-semibold"
            >
              GitHub
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
