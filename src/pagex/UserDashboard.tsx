import DashboardHeader from "@/components/user/DashboardHeader";
import ServiceList from "@/components/user/ServiceList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BlockedInfo from "@/components/user/BlockedInfo";

const UserDashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user?.status === "blocked") {
    return <BlockedInfo />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <ServiceList />
    </div>
  );
};

export default UserDashboard;
