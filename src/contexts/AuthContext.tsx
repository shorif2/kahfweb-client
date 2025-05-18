import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the User type
export type User = {
  id: string;
  fullName: string;
  email: string;
  // Add other user properties as needed
};

// Define the AuthContext type
type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
};

// This is a mock implementation of AuthContext for demonstration purposes
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  login: () => Promise.resolve(),
  logout: () => {},
  signup: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem('isAdmin') === 'true'
  );
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  const login = async (email: string, password: string) => {
    // Mock login implementation
    // In a real application, you would make an API call to authenticate the user
    const mockUser = {
      id: '123',
      fullName: 'John Doe',
      email: email,
    };

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', email === 'admin@example.com' ? 'true' : 'false');
    localStorage.setItem('user', JSON.stringify(mockUser));

    setIsAuthenticated(true);
    setIsAdmin(email === 'admin@example.com');
    setUser(mockUser);
  };

  const signup = async (fullName: string, email: string, password: string) => {
    // Mock signup implementation
    // In a real application, you would make an API call to create a new user
    const mockUser = {
      id: '456',
      fullName: fullName,
      email: email,
    };

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('user', JSON.stringify(mockUser));

    setIsAuthenticated(true);
    setIsAdmin(false);
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    // Note: We'll handle redirection in the component
  };

  useEffect(() => {
    // You can add any initialization logic here
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
