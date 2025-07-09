import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/Sidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import { Metadata } from "@/components/Metadata";

const AdminDashboardPage = () => {
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
        title="Admin Dashboard - KahfWeb"
        description="KahfWeb administration dashboard for managing clients and services."
      />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <DashboardOverview />
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
