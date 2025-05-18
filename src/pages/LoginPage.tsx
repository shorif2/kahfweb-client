
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from '@/components/Metadata';

const LoginPage = () => {
  return (
    <>
      <Metadata 
        title="Login - KahfWeb"
        description="Login to your KahfWeb account to manage your domains and hosting services."
      />
      <div className="min-h-[calc(100vh-64px-153px)] bg-gray-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
