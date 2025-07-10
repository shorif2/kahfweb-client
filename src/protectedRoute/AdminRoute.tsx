import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user && user.role === "admin") {
    return children;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

export default AdminRoute;
