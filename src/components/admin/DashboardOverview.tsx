
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Globe, Server, AlertCircle, UserPlus, Plus } from 'lucide-react';

const statCards = [
  {
    title: 'Total Clients',
    value: 12,
    change: '+2 this month',
    icon: <Users className="h-8 w-8 text-kahf-blue" />,
    action: {
      text: 'Add Client',
      icon: <UserPlus className="h-4 w-4 mr-1" />,
      link: '/admin/clients/new'
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
      link: '/admin/orders/domains/new'
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
      link: '/admin/orders/hostings/new'
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
      link: '/admin/orders'
    }
  },
];

const recentActivity = [
  {
    client: 'Acme Corporation',
    type: 'Domain',
    domain: 'acmecorp.com',
    date: '2023-05-10',
    status: 'Active',
  },
  {
    client: 'Globex Inc',
    type: 'Hosting',
    domain: 'Premium Hosting',
    date: '2023-05-08',
    status: 'Active',
  },
  {
    client: 'Stark Industries',
    type: 'Domain',
    domain: 'starkindustries.com',
    date: '2023-05-05',
    status: 'Expiring',
  },
  {
    client: 'Wayne Enterprises',
    type: 'Bundle',
    domain: 'wayneenterprises.com',
    date: '2023-05-01',
    status: 'Active',
  },
];

const DashboardOverview = () => {
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
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <a href={card.action.link} className="flex items-center justify-center">
                  {card.action.icon}
                  {card.action.text}
                </a>
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
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
