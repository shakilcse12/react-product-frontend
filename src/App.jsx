// src/App.js
import {  RouterProvider, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import router from './router';
import { Toaster } from 'react-hot-toast';
import React from 'react';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
  );
}

export default App;
