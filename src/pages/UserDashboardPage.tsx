import { Navigate } from "react-router-dom";
import DashboardHeader from "@/components/user/DashboardHeader";
import ServiceList from "@/components/user/ServiceList";
import { useAuth } from "@/contexts/AuthContext";
import { Metadata } from "@/components/Metadata";

const UserDashboardPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect admin to admin dashboard
  if (isAuthenticated && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Metadata
        title="Dashboard - KahfWeb"
        description="Manage your domains and hosting services on the KahfWeb dashboard."
      />
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <ServiceList />
      </div>
    </>
  );
};

export default UserDashboardPage;
