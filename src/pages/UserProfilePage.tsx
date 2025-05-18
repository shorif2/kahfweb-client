
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfileSettings from '@/components/user/ProfileSettings';
import { Metadata } from '@/components/Metadata';

const UserProfilePage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect admins to admin profile page
  if (isAdmin) {
    return <Navigate to="/admin/profile" replace />;
  }

  return (
    <>
      <Metadata 
        title="Profile Settings - KahfWeb"
        description="Manage your KahfWeb account settings and preferences."
      />
      <div className="container mx-auto px-4 py-8">
        <ProfileSettings />
      </div>
    </>
  );
};

export default UserProfilePage;
