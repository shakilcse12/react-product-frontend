// src/App.js
import {  RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
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
