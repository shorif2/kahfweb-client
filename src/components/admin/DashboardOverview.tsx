
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Globe, Server, AlertCircle, UserPlus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const statCards = [
  {
    title: 'Total Clients',
    value: 12,
    change: '+2 this month',
    icon: <Users className="h-8 w-8 text-kahf-blue" />,
    action: {
      text: 'Add Client',
      icon: <UserPlus className="h-4 w-4 mr-1" />,
      type: 'client'
    }
  },
  {
    title: 'Active Domains',
    value: 24,
    change: '+3 this month',
    icon: <Globe className="h-8 w-8 text-kahf-indigo" />,
    action: {
      text: 'Add Domain',
      icon: <Plus className="h-4 w-4 mr-1" />,
      type: 'domain'
    }
  },
  {
    title: 'Active Hostings',
    value: 18,
    change: '+1 this month',
    icon: <Server className="h-8 w-8 text-kahf-green" />,
    action: {
      text: 'Add Hosting',
      icon: <Plus className="h-4 w-4 mr-1" />,
      type: 'hosting'
    }
  },
  {
    title: 'Expiring Soon',
    value: 5,
    change: 'Within 30 days',
    icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
    action: {
      text: 'View All',
      icon: null,
      type: 'view-expiring'
    }
  },
];

const recentActivity = [
  {
    id: 1,
    client: 'Acme Corporation',
    type: 'Domain',
    domain: 'acmecorp.com',
    date: '2023-05-10',
    status: 'Active',
  },
  {
    id: 2,
    client: 'Globex Inc',
    type: 'Hosting',
    domain: 'Premium Hosting',
    date: '2023-05-08',
    status: 'Active',
  },
  {
    id: 3,
    client: 'Stark Industries',
    type: 'Domain',
    domain: 'starkindustries.com',
    date: '2023-05-05',
    status: 'Expiring',
  },
  {
    id: 4,
    client: 'Wayne Enterprises',
    type: 'Bundle',
    domain: 'wayneenterprises.com',
    date: '2023-05-01',
    status: 'Active',
  },
];

// Mock data for expiring items
const expiringItems = [
  {
    id: 1,
    client: 'Stark Industries',
    email: 'tony@stark.com',
    phone: '+1 234 567 890',
    service: 'Domain: starkindustries.com',
    expireDate: '2023-06-10',
  },
  {
    id: 2,
    client: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    phone: '+1 987 654 321',
    service: 'Hosting: Premium Plan',
    expireDate: '2023-06-12',
  },
  {
    id: 3,
    client: 'Oscorp Industries',
    email: 'norman@oscorp.com',
    phone: '+1 555 123 4567',
    service: 'Domain: oscorp.com',
    expireDate: '2023-06-15',
  },
  {
    id: 4,
    client: 'LexCorp',
    email: 'lex@lexcorp.com',
    phone: '+1 555 987 6543',
    service: 'Bundle: lexcorp.com',
    expireDate: '2023-06-20',
  },
  {
    id: 5,
    client: 'Daily Planet',
    email: 'clark@dailyplanet.com',
    phone: '+1 555 111 2222',
    service: 'Hosting: Basic Plan',
    expireDate: '2023-06-25',
  }
];

const DashboardOverview = () => {
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [viewItemId, setViewItemId] = useState<number | null>(null);

  const handleActionClick = (type: string) => {
    setDialogType(type);
  };

  const handleViewClick = (id: number) => {
    setViewItemId(id);
    setDialogType('view-activity');
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setViewItemId(null);
  };

  const handleAddItem = (type: string) => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`);
    handleCloseDialog();
  };

  const getActivityDetail = () => {
    return recentActivity.find(activity => activity.id === viewItemId);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your domain and hosting management system.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statCards.map((card, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium text-gray-600">{card.title}</CardTitle>
                <div className="bg-blue-50 p-2 rounded-md">{card.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-baseline">
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-gray-500">{card.change}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-4"
                onClick={() => handleActionClick(card.action.type)}
              >
                {card.action.icon}
                {card.action.text}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentActivity.map((activity, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{activity.client}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{activity.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{activity.domain}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : activity.status === 'Expiring'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewClick(activity.id)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog open={dialogType === 'client'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input id="name" placeholder="e.g. Acme Corporation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="client@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Client's address" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleAddItem('client')}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Domain Dialog */}
      <Dialog open={dialogType === 'domain'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Domain</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="domainName">Domain Name</Label>
              <Input id="domainName" placeholder="example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select>
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="globex">Globex Inc</SelectItem>
                  <SelectItem value="stark">Stark Industries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationDate">Registration Date</Label>
              <Input id="registrationDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input id="expiryDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional notes about this domain" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleAddItem('domain')}>Add Domain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Hosting Dialog */}
      <Dialog open={dialogType === 'hosting'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hosting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hostingPlan">Hosting Plan</Label>
              <Select>
                <SelectTrigger id="hostingPlan">
                  <SelectValue placeholder="Select hosting plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Hosting</SelectItem>
                  <SelectItem value="premium">Premium Hosting</SelectItem>
                  <SelectItem value="business">Business Hosting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostingClient">Client</Label>
              <Select>
                <SelectTrigger id="hostingClient">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="globex">Globex Inc</SelectItem>
                  <SelectItem value="stark">Stark Industries</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Associated Domain</Label>
              <Select>
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acmecorp.com">acmecorp.com</SelectItem>
                  <SelectItem value="globex.com">globex.com</SelectItem>
                  <SelectItem value="stark.com">stark.com</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleAddItem('hosting')}>Add Hosting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Activity Dialog */}
      <Dialog open={dialogType === 'view-activity'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {viewItemId && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Client</p>
                    <p className="font-medium">{getActivityDetail()?.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{getActivityDetail()?.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Domain/Service</p>
                    <p className="font-medium">{getActivityDetail()?.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{getActivityDetail()?.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getActivityDetail()?.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : getActivityDetail()?.status === 'Expiring'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {getActivityDetail()?.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Additional Information</p>
                  <p>This is a detailed view of the {getActivityDetail()?.type.toLowerCase()} activity for {getActivityDetail()?.client}.</p>
                  <p className="mt-2">You can add more details or actions related to this activity here.</p>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Expiring Services Dialog */}
      <Dialog open={dialogType === 'view-expiring'} onOpenChange={() => handleCloseDialog()}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Services Expiring Soon</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {expiringItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.client}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.service}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {item.expireDate}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardOverview;
