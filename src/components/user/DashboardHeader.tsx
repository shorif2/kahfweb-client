
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName}</h1>
      <p className="text-gray-600 mb-6">Manage your domains and hosting services</p>
      
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="bg-white">
          Purchase New Domain
        </Button>
        <Button variant="outline" className="bg-white">
          Purchase New Hosting
        </Button>
        <Button className="bg-kahf-blue hover:bg-kahf-indigo">
          Purchase Bundle
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
