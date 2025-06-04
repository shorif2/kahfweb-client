import AdminSidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/loader/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { Footer } from "react-day-picker";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { data, isLoading, isSuccess } = useGetUserQuery();
  const location = useLocation();
  if (isLoading) return <Loader />;
  if (!data?.user)
    return <Navigate to="/" state={{ from: location }} replace />;
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
