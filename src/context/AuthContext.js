// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, githubProvider, facebookProvider } from '../firebase'; // Make sure to import the providers
import { onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (provider, email, password) => {
    setLoading(true);
    try {
      if (email && password) {
        // Sign in with email and password
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in with Email and Password');
      } else {
        // Sign in with provider
        let selectedProvider;
        if (provider === 'google') {
          selectedProvider = googleProvider;
        } else if (provider === 'github') {
          selectedProvider = githubProvider;
        } else if (provider === 'facebook') {
          selectedProvider = facebookProvider;
        }
  
        if (selectedProvider) {
          await signInWithPopup(auth, selectedProvider);
          console.log(`Logged in with ${provider} provider`);
        } else {
          console.error('No provider or email/password provided');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      //toast.success("Successfully logged out");
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const signup = async (email, password, name, phone, address) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up with Email and Password');

      // Send user details to backend
      const response = await fetch('https://my-course-backend-green.vercel.app/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          phone,
          address,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Failed to register user in backend:', data.error);
      }
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      setLoading(false);
    }
  };


  const authInfo = {
    signup,
    user, 
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
