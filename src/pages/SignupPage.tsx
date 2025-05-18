
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';
import { Metadata } from '@/components/Metadata';

const SignupPage = () => {
  return (
    <>
      <Metadata 
        title="Sign Up - KahfWeb"
        description="Create your KahfWeb account to start managing your domains and hosting services."
      />
      <div className="min-h-[calc(100vh-64px-153px)] bg-gray-50 flex items-center justify-center p-4">
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
