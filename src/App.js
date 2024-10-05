// src/App.js
import { BrowserRouter as Router, Route, Routes, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed
import router from './router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  );
}

export default App;
