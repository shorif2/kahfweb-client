
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserControlPanel from "./pages/UserControlPanel";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminClientsPage from "./pages/AdminClientsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminControlPanel from "./pages/AdminControlPanel";
import AdminProfilePage from "./pages/AdminProfilePage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RefundPage from "./pages/RefundPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MainLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/refund" element={<RefundPage />} />
              
              {/* User routes */}
              <Route path="/dashboard" element={<UserDashboardPage />} />
              <Route path="/control-panel" element={<UserControlPanel />} />
              <Route path="/profile" element={<UserProfilePage />} />
              
              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/clients" element={<AdminClientsPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/control-panel" element={<AdminControlPanel />} />
              <Route path="/admin/profile" element={<AdminProfilePage />} />
              
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
