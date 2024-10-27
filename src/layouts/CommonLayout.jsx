import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const CommonLayout = () => {
  const [lastLocation, setLastLocation] = useState(null);
  const location = useLocation();

  // Create a ref to hold the setLastLocation function
  const setLastLocationRef = useRef(setLastLocation);

  useEffect(() => {
    // Update the ref to the latest setLastLocation function
    setLastLocationRef.current = setLastLocation;
    
    // Update lastLocation when the location changes
    setLastLocation(location.pathname);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      
      <NavBar lastLocations={lastLocation} />

      
      <main className="flex-grow">
        <Outlet />
      </main>

      
      <Footer />
    </div>
  );
};

export default CommonLayout;
