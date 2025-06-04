import { Navigate } from "react-router-dom";
import DashboardHeader from "@/components/user/DashboardHeader";
import ServiceList from "@/components/user/ServiceList";
import { useAuth } from "@/contexts/AuthContext";
import { Metadata } from "@/components/Metadata";

const UserDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <ServiceList />
    </div>
  );
};

export default UserDashboard;
