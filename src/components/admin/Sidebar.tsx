import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  MonitorCog,
  ContactRound,
  Undo2,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const isAdmin = user?.role === "admin" ? true : false;
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: "Clients",
      href: "/dashboard/clients",
      icon: <Users size={18} />,
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: <ShoppingCart size={18} />,
    },
    {
      name: "Blog",
      href: "/dashboard/blog",
      icon: <FileText size={18} />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={18} />,
    },
  ];
  const handleLogOut = () => {
    logout({});
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <aside className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh)] overflow-y-auto">
      <div className="p-4">
        <Link to="/" className="text-lg font-semibold text-gray-700">
          {isAdmin ? "Admin Panel" : "User Panel"}
        </Link>
      </div>
      <nav className="flex-1 px-2 pt-2 pb-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/dashboard"
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                isActive("/dashboard")
                  ? "bg-kahf-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">
                <HomeIcon size={18} />
              </span>
              Dashboard
            </Link>
          </li>
          {isAdmin &&
            menuItems?.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                    isActive(item.href)
                      ? "bg-kahf-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          <li>
            <Link
              to="/dashboard/profile"
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                isActive("/dashboard/profile")
                  ? "bg-kahf-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">
                <ContactRound size={18} />
              </span>
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/control-panel"
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md",
                isActive("/dashboard/control-panel")
                  ? "bg-kahf-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">
                <MonitorCog size={18} />
              </span>
              Control Panel
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="px-2 pt-2 pb-4">
        <ul className="flex w-full justify-between">
          <li>
            <Link
              to="/"
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">
                <Undo2 size={18} />
              </span>
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
              )}
            >
              <span className="mr-3">
                <LogOut size={18} />
              </span>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
