import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CommonLayout = () => {
  const [lastLocation, setLastLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setLastLocation(location.pathname); // Update last location when location changes
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
