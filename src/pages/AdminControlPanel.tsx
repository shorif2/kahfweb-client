import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ControlPanel from "@/components/general/ControlPanel";
import { Metadata } from "@/components/Metadata";

const AdminControlPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect non-admins to user control panel
  if (isAuthenticated && !isAdmin) {
    return <Navigate to="/control-panel" replace />;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Metadata
        title="Admin Control Panel - KahfWeb"
        description="Access the admin hosting control panel on KahfWeb."
      />
      <div className="h-[calc(100vh-64px)]">
        <ControlPanel />
      </div>
    </>
  );
};

export default AdminControlPanel;
