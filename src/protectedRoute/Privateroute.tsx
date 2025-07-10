import { useGetUserQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useGetUserQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (isLoading && !user) return <h1>Loading...</h1>;
  if (!user && isLoading)
    return <Navigate to="/" state={{ from: location }} replace />;
  return children;
};

export default PrivateRoute;
