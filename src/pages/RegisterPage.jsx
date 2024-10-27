import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have this set up for context management
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState(''); // New field for name
  const [phone, setPhone] = useState(''); // New field for phone
  const [address, setAddress] = useState(''); // New field for address
  const [error, setError] = useState('');
  const { signup, login } = useAuth(); // useAuth hook for context
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      await signup(email, password, name, phone, address); // Pass the additional fields to signup
      navigate('/login'); // Redirect to Products page after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // await loginWithGoogle();
      // navigate('/login');
      handleSocialLogin("google");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const userCredential = await login(provider, null, null);
      console.log("user credential from register = ", userCredential);
      const { uid, email, displayName } = userCredential.user;

      // Optional: Show a form to collect missing information
      if (!name || !phone || !address) {
        setName(displayName || ''); // Pre-fill name if available
        setEmail(email);
        // Continue here only when name, phone, and address are filled out
      }

      // Send user details to backend after social login
      await registerUserInBackend(uid, email, name, phone, address);
      navigate('/login');
    } catch (error) {
      console.error("Error during social login:", error);
      setError(error.message);
    }
  };

  const registerUserInBackend = async (userId, email, name, phone, address) => {
    const response = await fetch('https://my-course-backend-green.vercel.app/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email, name, phone, address }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to register user on the backend');
    }
  };

  const handleGithubLogin = async () => {
    try {
      //await loginWithGithub();
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-500">Or sign up with</p>
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
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
