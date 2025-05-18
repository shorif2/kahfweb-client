
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePurchase = (type: string) => {
    const products = {
      'domain': { name: 'Domain Registration', price: 14.99, description: 'Register a new domain name' },
      'hosting': { name: 'Premium Hosting (1 Year)', price: 89.99, description: 'High performance web hosting with unlimited bandwidth' },
      'bundle': { name: 'Hosting + Domain Bundle', price: 99.99, description: 'Domain registration with premium hosting package' }
    };
    
    const selectedProduct = products[type as keyof typeof products];
    navigate('/checkout', { state: { selectedProduct } });
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName}</h1>
      <p className="text-gray-600 mb-6">Manage your domains and hosting services</p>
      
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          className="bg-white"
          onClick={() => handlePurchase('domain')}
        >
          Purchase New Domain
        </Button>
        <Button 
          variant="outline" 
          className="bg-white"
          onClick={() => handlePurchase('hosting')}
        >
          Purchase New Hosting
        </Button>
        <Button 
          className="bg-kahf-blue hover:bg-kahf-indigo"
          onClick={() => handlePurchase('bundle')}
        >
          Purchase Bundle
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
