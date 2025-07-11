import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import AdminBlogPage from "./pages/AdminBlogPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RefundPage from "./pages/RefundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ClientsTable from "./components/admin/ClientsTable";
import OrdersTable from "./components/admin/OrdersTable";
import Profile from "./pagex/Profile";
import ControlPanel from "./pagex/ControlPanel";
import DashboardOverview from "./pagex/DashboardOverview";
import CheckDomain from "./pagex/CheckDomain";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/get-started" element={<GetStartedPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/domain-search" element={<CheckDomain />} />
          </Route>

          {/* Auth routes */}
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="control-panel" element={<ControlPanel />} />
              <Route path="profile" element={<Profile />} />
              {/* Admin only routes */}
              <Route path="clients" element={<ClientsTable />} />
              <Route path="orders" element={<OrdersTable />} />
              <Route path="blog" element={<AdminBlogPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Route>

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
