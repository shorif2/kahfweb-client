import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./layouts/MainLayout";

// Pages
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserControlPanel from "./pages/UserControlPanel";
import UserProfilePage from "./pages/UserProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminClientsPage from "./pages/AdminClientsPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminControlPanel from "./pages/AdminControlPanel";
import AdminProfilePage from "./pages/AdminProfilePage";
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
import UserLayout from "./layouts/UserLayout";
import Profile from "./pagex/Profile";
import ControlPanel from "./pagex/ControlPanel";
import DashboardOverview from "./pagex/DashboardOverview";
import AdminRoute from "./protectedRoute/AdminRoute";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { useEffect } from "react";
import { useGetUserQuery } from "./redux/features/auth/authApi";
import { setUser } from "./redux/features/auth/authSlice";
import PrivateRoute from "./protectedRoute/Privateroute";
import Loader from "./components/loader/Loader";
import CheckDomain from "./pagex/checkDomain";

const Apx = () => {
  const { data, isSuccess, isLoading } = useGetUserQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data?.user));
    }
  }, [data?.user, dispatch, isSuccess]);
  if (isLoading) return <Loader />;
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
            {/* auth routes */}

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="control-panel" element={<ControlPanel />} />
              <Route path="profile" element={<Profile />} />
              {/* admin only */}
              <Route
                path="clients"
                element={
                  <AdminRoute>
                    <ClientsTable />
                  </AdminRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <AdminRoute>
                    <OrdersTable />
                  </AdminRoute>
                }
              />
              <Route
                path="blog"
                element={
                  <AdminRoute>
                    <AdminBlogPage />
                  </AdminRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <AdminRoute>
                    <AdminSettingsPage />
                  </AdminRoute>
                }
              />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default Apx;
