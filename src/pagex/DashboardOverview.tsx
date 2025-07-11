import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { RootState } from "@/redux/store";
const DashboardOverview = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user?.role === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardOverview;
