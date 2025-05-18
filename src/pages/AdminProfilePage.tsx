
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSettings from '@/components/user/ProfileSettings';
import { Metadata } from '@/components/Metadata';

const AdminProfilePage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect non-admins to user profile
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Metadata 
        title="Admin Profile Settings - KahfWeb"
        description="Manage your KahfWeb admin account settings and preferences."
      />
      <div className="container mx-auto px-4 py-8">
        <ProfileSettings />
      </div>
    </>
  );
};

export default AdminProfilePage;
