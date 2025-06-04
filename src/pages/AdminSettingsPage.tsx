import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminSidebar from "@/components/admin/Sidebar";
import { Metadata } from "@/components/Metadata";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentManager from "@/components/admin/ContentManager";
import PricingManager from "@/components/admin/PricingManager";
import PaymentMethodManager from "@/components/admin/PaymentMethodManager";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("content");
  return (
    <>
      <Metadata
        title="Admin Settings - KahfWeb"
        description="KahfWeb administration settings for managing website content and pricing."
      />
      {/* <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        
      </div> */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Website Settings</h1>
          <p className="text-gray-600">
            Manage website content, pricing packages, and payment methods.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Management</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-0">
            <ContentManager />
          </TabsContent>

          <TabsContent value="pricing" className="mt-0">
            <PricingManager />
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <PaymentMethodManager />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminSettingsPage;
