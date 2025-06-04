import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default AdminRoute;
