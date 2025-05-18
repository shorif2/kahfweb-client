
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/Sidebar';
import ClientsTable from '@/components/admin/ClientsTable';
import { Metadata } from '@/components/Metadata';

const AdminClientsPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect non-admins to user dashboard
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Metadata 
        title="Manage Clients - KahfWeb Admin"
        description="Manage clients and their services on the KahfWeb admin panel."
      />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <ClientsTable />
        </div>
      </div>
    </>
  );
};

export default AdminClientsPage;
