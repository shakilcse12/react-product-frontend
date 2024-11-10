import {  createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider, githubProvider, facebookProvider } from '../firebase'; // Ensure these are correctly imported
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext();
const BACKEND_URL = 'https://my-course-backend-green.vercel.app'; // Backend URL

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null); // Add message state


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true); // Set loading to true while checking auth status
      if (currentUser) {
        console.log("User is signed in:", currentUser);
        try {
          getUserinfoBackend(currentUser?.email);
        } catch (error) {
          console.error('Error fetching role from backend:', error);
          //toast.error('Error fetching user details');
        }
      } else {
        console.log("No user detected");
      }
      setLoading(false); // Reset loading state
    });

    return () => unsubscribe();
  }, []);

  const getUserinfoBackend = async (emails) => {
    const response = await fetch(`${BACKEND_URL}/user/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emails }),
    });

    const data = await response.json();
    if (response.ok) {
      updateUserDetails(data);
    } else {
      console.error(data.error);
      //toast.error('Failed to fetch user details');
    }
  }

  const login = async (provider, email, password) => {
    setLoading(true);
    try {
      if (email && password) {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         setUser(userCredential.user);
          setMessage("Login successful!"); // Set success message
          localStorage.setItem("isLoginSuccess", true);
          console.log("message = ", message);
         //handleSignInResponse(resp?.user);
         //return resp?.user;
        //  if(resp?.user) getUserinfoBackend(email);
        // console.log('Logged in with Email and Password from login ', user);
      } else {
        let selectedProvider;
        if (provider === 'google') {
          selectedProvider = googleProvider;
        } else if (provider === 'github') {
          selectedProvider = githubProvider;
        } else if (provider === 'facebook') {
          selectedProvider = facebookProvider;
        }

        if (selectedProvider) {
          const result = await signInWithPopup(auth, selectedProvider);
          const user = result.user;
          console.log("Google login user:", user); // Log the entire user object
          setUser(result.user); // Ensure the user state is updated
          setMessage(`Logged in with ${provider} provider!`);
          console.log(`Logged in with ${provider} provider`);
        } else {
          console.error('No provider or email/password provided');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
      setMessage("Login failed. Please try again.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInResponse = (response) => {
    const { uid, email, emailVerified, providerData, stsTokenManager } = response;

    // Construct user object
    const user = {
        uid,
        email,
        emailVerified,
        providerId: providerData[0]?.providerId,
        accessToken: stsTokenManager.accessToken,
        refreshToken: stsTokenManager.refreshToken,
        photoURL: providerData[0]?.photoURL || null,
    };

    // Assuming setUser is a function from your context
    setUser(user);
};

  const updateUserDetails = (details) => {
    setUser(prev => ({
      ...prev,
      userId: details._id,
      userName: details.name,
      role: details.role,
      profilePicture: details.profilePicture || '',
      address: details.address || '',
      userEmail: details.email || ''
    }));

    console.log("User details updated in context:", details);
  };

  const setRole = (roles) => {
    if (user && roles) {
      setUser(prev => ({
        ...prev,
        role: prev.role ?? roles,
      }));
      console.log("User role updated:", roles);
    }
  }

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      console.log('User logged out');
      setUser(null);
      toast.success("Successfully logged out");
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name, phone, address) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up with Email and Password');

      const response = await fetch(`${BACKEND_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, phone, address }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error('Failed to register user in backend:', data.error);
        toast.error('Registration failed');
      }
    } catch (error) {
      console.error('Signup failed', error);
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    signup,
    user,
    setRole,
    login,
    updateUserDetails,
    logout,
    loading,
    message, // Provide message in context
    setMessage, // Allow message reset
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
