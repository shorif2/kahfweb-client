import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DashboardOverview = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user && user.role === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardOverview;
