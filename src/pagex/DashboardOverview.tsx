import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { Navigate } from "react-router-dom";

const DashboardOverview = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user && user.role === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardOverview;
