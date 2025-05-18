
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

// Sample data
const userServices = [
  {
    id: 1,
    type: 'domain',
    name: 'mycompany.com',
    registrationDate: '2023-10-15',
    expiryDate: '2025-10-15',
    autoRenewal: true,
    daysLeft: 150,
    percentageLeft: 41,
    status: 'active'
  },
  {
    id: 2,
    type: 'domain',
    name: 'myproject.org',
    registrationDate: '2023-05-20',
    expiryDate: '2024-05-20',
    autoRenewal: true,
    daysLeft: 15,
    percentageLeft: 4,
    status: 'expiring'
  },
  {
    id: 3,
    type: 'domain',
    name: 'oldsite.net',
    registrationDate: '2022-03-10',
    expiryDate: '2023-03-10',
    autoRenewal: false,
    daysLeft: 0,
    percentageLeft: 0,
    status: 'expired'
  },
  {
    id: 4,
    type: 'hosting',
    name: 'Premium Web Hosting',
    registrationDate: '2023-10-15',
    expiryDate: '2025-10-15',
    autoRenewal: true,
    daysLeft: 150,
    percentageLeft: 41,
    status: 'active'
  },
  {
    id: 5,
    type: 'hosting',
    name: 'Basic Web Hosting',
    registrationDate: '2023-05-20',
    expiryDate: '2024-05-20',
    autoRenewal: false,
    daysLeft: 15,
    percentageLeft: 4,
    status: 'expiring'
  },
];

const ServiceList = () => {
  const [services, setServices] = useState(userServices);

  const toggleAutoRenewal = (id: number) => {
    const updatedServices = services.map(service => {
      if (service.id === id) {
        const newStatus = !service.autoRenewal;
        toast.success(`Auto-renewal ${newStatus ? 'enabled' : 'disabled'} for ${service.name}`);
        return { ...service, autoRenewal: newStatus };
      }
      return service;
    });
    
    setServices(updatedServices);
  };

  const handleRenew = (id: number) => {
    const service = services.find(s => s.id === id);
    if (service) {
      toast.success(`Renewal process initiated for ${service.name}`);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge badge-active';
      case 'expiring':
        return 'badge badge-expiring';
      case 'expired':
        return 'badge badge-expired';
      default:
        return 'badge';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expiring':
        return 'Expiring Soon';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl font-semibold">
                  {service.name}
                  <span className={`ml-2 inline-block ${getStatusBadgeClass(service.status)}`}>
                    {getStatusText(service.status)}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-500 capitalize">{service.type}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {service.type === 'domain' ? 'Registration' : 'Purchase'} Date: <span className="font-medium text-gray-700">{service.registrationDate}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Expiry Date: <span className="font-medium text-gray-700">{service.expiryDate}</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Auto Renewal: <span className="font-medium text-gray-700">{service.autoRenewal ? 'Enabled' : 'Disabled'}</span>
                </p>
                {service.status !== 'expired' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Expires in {service.daysLeft} days</span>
                      <span>{service.percentageLeft}%</span>
                    </div>
                    <Progress value={service.percentageLeft} className="h-2" />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toggleAutoRenewal(service.id)}
              >
                {service.autoRenewal ? 'Disable Auto-Renew' : 'Enable Auto-Renew'}
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleRenew(service.id)}
                disabled={service.status === 'active' && service.autoRenewal}
              >
                Renew
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;
