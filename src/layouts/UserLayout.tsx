import AdminSidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/layout/Navbar";
import React from "react";
import { Footer } from "react-day-picker";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <AdminSidebar />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
