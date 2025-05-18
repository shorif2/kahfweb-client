
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/Sidebar';
import OrdersTable from '@/components/admin/OrdersTable';
import { Metadata } from '@/components/Metadata';

const AdminOrdersPage = () => {
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
        title="Manage Orders - KahfWeb Admin"
        description="Manage domain and hosting orders on the KahfWeb admin panel."
      />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <OrdersTable />
        </div>
      </div>
    </>
  );
};

export default AdminOrdersPage;
