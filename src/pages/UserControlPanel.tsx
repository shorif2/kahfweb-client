
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ControlPanel from '@/components/general/ControlPanel';
import { Metadata } from '@/components/Metadata';

const UserControlPanel = () => {
  const { isAuthenticated } = useAuth();

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Metadata 
        title="Control Panel - KahfWeb"
        description="Access your hosting control panel on KahfWeb."
      />
      <div className="h-[calc(100vh-64px)]">
        <ControlPanel />
      </div>
    </>
  );
};

export default UserControlPanel;
