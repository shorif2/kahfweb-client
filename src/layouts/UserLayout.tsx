import AdminSidebar from "@/components/admin/Sidebar";
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
