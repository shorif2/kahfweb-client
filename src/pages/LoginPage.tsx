
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { Metadata } from '@/components/Metadata';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  
  return (
    <>
      <Metadata 
        title="Login - KahfWeb"
        description="Login or sign up to access your KahfWeb account and manage your domains and hosting services."
      />
      <div className="min-h-[calc(100vh-64px-153px)] bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            <Card>
              <TabsContent value="login" className="m-0">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup" className="m-0">
                <SignupForm />
              </TabsContent>
            </Card>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
