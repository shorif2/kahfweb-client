import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/get-started" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
