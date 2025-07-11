import AdminSidebar from "@/components/admin/Sidebar";
import Loader from "@/components/loader/Loader";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider className="bg-red-100">
      {/* min-h-[calc(100vh-64px)]  */}
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <AdminSidebar />
        </Sidebar>
        {/* Mobile sidebar - shown only on mobile */}
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 hidden"
          id="mobile-sidebar-overlay"
        >
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <button
                  onClick={() => {
                    const overlay = document.getElementById(
                      "mobile-sidebar-overlay"
                    );
                    if (overlay) overlay.classList.add("hidden");
                  }}
                >
                  ×
                </button>
              </div>
            </div>
            <AdminSidebar />
          </div>
        </div>
        {/* main content area */}
        <SidebarInset className="flex-1">
          <header className="">
            <div className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 ">
              <SidebarTrigger className="-ml-1 hidden lg:flex" />
              <button
                className="lg:hidden"
                onClick={() => {
                  const overlay = document.getElementById(
                    "mobile-sidebar-overlay"
                  );
                  if (overlay) overlay.classList.remove("hidden");
                }}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex-1" />
              <div className="text-sm text-gray-600 ">Dashboard</div>
            </div>
          </header>
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
