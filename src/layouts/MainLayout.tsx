
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLocation } from 'react-router-dom';

// Import fonts
import '@fontsource/lexend';
import '@fontsource/poppins';
import '@fontsource/montserrat';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Determine if we're in an admin or user dashboard to hide footer
  const isAdminPage = path.includes('/admin');
  const isUserDashboard = path === '/dashboard' || 
                         path === '/control-panel' ||
                         path === '/profile';
  
  return (
    <div className="flex flex-col min-h-screen font-lexend">
      <Navbar />
      <div className="flex-grow mt-16">
        {children}
      </div>
      {!isAdminPage && !isUserDashboard && <Footer />}
    </div>
  );
};

export default MainLayout;
