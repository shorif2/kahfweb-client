
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Home } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const location = useLocation();
  
  // Determine if we're in dashboard/admin area
  const isDashboard = location.pathname.includes('/dashboard') || 
                     location.pathname.includes('/admin') ||
                     location.pathname === '/control-panel' ||
                     location.pathname === '/profile';

  // Handle logout - redirect to get-started page
  const handleLogout = () => {
    logout();
    window.location.href = '/get-started';
  };

  return (
    <nav className="bg-white shadow-sm py-4 fixed top-0 left-0 right-0 z-50" style={{ paddingTop: '7px', paddingBottom: '7px' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://iili.io/3PxeQTl.png" 
              alt="KahfWeb Logo" 
              className="h-8 w-auto"
              style={{ maxWidth: '30%', height: 'auto' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {isDashboard ? (
              /* Dashboard/Admin Menu */
              <>
                <Link to="/" className="text-gray-700 hover:text-kahf-blue font-medium">
                  Home
                </Link>
                <Link to={isAdmin ? "/admin/control-panel" : "/control-panel"} className="text-gray-700 hover:text-kahf-blue font-medium">
                  Control Panel
                </Link>
              </>
            ) : (
              /* Public Pages Menu */
              <>
                <Link to="/" className="text-gray-700 hover:text-kahf-blue font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-kahf-blue font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-kahf-blue font-medium">
                  Contact
                </Link>
                <Link to="/blog" className="text-gray-700 hover:text-kahf-blue font-medium">
                  Blog
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      My Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link to={isAdmin ? "/admin/dashboard" : "/dashboard"} className="flex w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={isAdmin ? "/admin/profile" : "/profile"} className="flex w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <span className="flex items-center w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/get-started">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 space-y-2 border-t border-gray-100">
            {isDashboard ? (
              /* Dashboard/Admin Mobile Menu */
              <>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to={isAdmin ? "/admin/control-panel" : "/control-panel"}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Control Panel
                </Link>
              </>
            ) : (
              /* Public Pages Mobile Menu */
              <>
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to={isAdmin ? "/admin/profile" : "/profile"}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 px-4 py-2">
                <Link
                  to="/get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
