
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Eye, Plus, Search } from 'lucide-react';

// Sample order data
const initialOrders = [
  {
    id: 1,
    client: 'Acme Corporation',
    type: 'Domain',
    item: 'acmecorp.com',
    date: '2023-05-10',
    expiry: '2024-05-10',
    amount: 12.99,
    status: 'Active',
    paymentMethod: 'bKash',
    transactionId: 'TXN123456789',
  },
  {
    id: 2,
    client: 'Globex Inc',
    type: 'Hosting',
    item: 'Premium Hosting',
    date: '2023-05-08',
    expiry: '2024-05-08',
    amount: 89.99,
    status: 'Active',
    paymentMethod: 'Nagad',
    transactionId: 'TXN987654321',
  },
  {
    id: 3,
    client: 'Stark Industries',
    type: 'Domain',
    item: 'starkindustries.com',
    date: '2023-05-05',
    expiry: '2024-05-05',
    amount: 14.99,
    status: 'Pending',
    paymentMethod: 'bKash',
    transactionId: 'TXN456789123',
  },
  {
    id: 4,
    client: 'Wayne Enterprises',
    type: 'Bundle',
    item: 'wayneenterprises.com + Premium Hosting',
    date: '2023-05-01',
    expiry: '2024-05-01',
    amount: 99.99,
    status: 'Active',
    paymentMethod: 'Nagad',
    transactionId: 'TXN789123456',
  },
  {
    id: 5,
    client: 'Dunder Mifflin',
    type: 'Domain',
    item: 'dundermifflin.com',
    date: '2023-04-25',
    expiry: '2024-04-25',
    amount: 12.99,
    status: 'Pending',
    paymentMethod: 'bKash',
    transactionId: 'TXN321654987',
  },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [isAddDomainDialogOpen, setIsAddDomainDialogOpen] = useState(false);
  const [isAddHostingDialogOpen, setIsAddHostingDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null);

  // Filter orders based on search query and field
  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    if (searchField === 'all') {
      return (
        order.client.toLowerCase().includes(query) ||
        order.type.toLowerCase().includes(query) ||
        order.item.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.transactionId.toLowerCase().includes(query)
      );
    } else if (searchField === 'client') {
      return order.client.toLowerCase().includes(query);
    } else if (searchField === 'type') {
      return order.type.toLowerCase().includes(query);
    } else if (searchField === 'item') {
      return order.item.toLowerCase().includes(query);
    } else if (searchField === 'status') {
      return order.status.toLowerCase().includes(query);
    } else if (searchField === 'transactionId') {
      return order.transactionId.toLowerCase().includes(query);
    }
    return true;
  });

  const handleViewOrder = (id: number) => {
    const order = orders.find(o => o.id === id);
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (id: number) => {
    const order = orders.find(o => o.id === id);
    setCurrentOrder(order);
    setEditFormData({...order});
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (name: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = () => {
    setOrders(orders.map(order => 
      order.id === editFormData.id ? editFormData : order
    ));
    toast.success('Order updated successfully');
    setIsEditDialogOpen(false);
    setEditFormData(null);
  };

  const handleAddOrder = (type: string) => {
    toast.success(`New ${type} order added successfully`);
    if (type === 'domain') {
      setIsAddDomainDialogOpen(false);
    } else if (type === 'hosting') {
      setIsAddHostingDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-gray-600">Manage domain and hosting orders</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsAddDomainDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Domain
          </Button>
          <Button onClick={() => setIsAddHostingDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hosting
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Select value={searchField} onValueChange={setSearchField}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Search Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="item">Item</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="transactionId">Transaction ID</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-[3] min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-8"
              type="search"
              placeholder={`Search orders by ${searchField === 'all' ? 'any field' : searchField}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-md bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.item}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditOrder(order.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No orders found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{currentOrder.item}</h3>
                <p className="text-sm text-gray-500">{currentOrder.type}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p>{currentOrder.client}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentOrder.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : currentOrder.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p>{currentOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p>{currentOrder.expiry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p>${currentOrder.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p>{currentOrder.paymentMethod}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p>{currentOrder.transactionId}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          {editFormData && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Input 
                    id="client"
                    value={editFormData.client}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input 
                    id="type"
                    value={editFormData.type}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Item</Label>
                <Input 
                  id="item"
                  value={editFormData.item}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Order Date</Label>
                  <Input 
                    id="date"
                    type="date"
                    value={editFormData.date}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry"
                    type="date"
                    value={editFormData.expiry}
                    onChange={(e) => handleEditInputChange('expiry', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={editFormData.status} 
                  onValueChange={(value) => handleEditInputChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input 
                  id="transactionId"
                  value={editFormData.transactionId}
                  onChange={(e) => handleEditInputChange('transactionId', e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Domain Dialog */}
      <Dialog open={isAddDomainDialogOpen} onOpenChange={setIsAddDomainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Domain</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientSelect">Client</Label>
              <Select>
                <SelectTrigger id="clientSelect">
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
              <Label htmlFor="domainName">Domain Name</Label>
              <Input id="domainName" placeholder="e.g., example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registerDate">Registration Date</Label>
                <Input id="registerDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input id="expiryDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="12.99" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bKash">bKash</SelectItem>
                  <SelectItem value="Nagad">Nagad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transId">Transaction ID</Label>
              <Input id="transId" placeholder="e.g., TXN123456789" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDomainDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleAddOrder('domain')}>Add Domain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Hosting Dialog */}
      <Dialog open={isAddHostingDialogOpen} onOpenChange={setIsAddHostingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Hosting</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
              <Label htmlFor="associatedDomain">Associated Domain</Label>
              <Select>
                <SelectTrigger id="associatedDomain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acmecorp.com">acmecorp.com</SelectItem>
                  <SelectItem value="globex.com">globex.com</SelectItem>
                  <SelectItem value="stark.com">stark.com</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hostingStartDate">Start Date</Label>
                <Input id="hostingStartDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hostingEndDate">End Date</Label>
                <Input id="hostingEndDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostingAmount">Amount</Label>
              <Input id="hostingAmount" type="number" placeholder="89.99" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostingPaymentMethod">Payment Method</Label>
              <Select>
                <SelectTrigger id="hostingPaymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bKash">bKash</SelectItem>
                  <SelectItem value="Nagad">Nagad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostingTransId">Transaction ID</Label>
              <Input id="hostingTransId" placeholder="e.g., TXN123456789" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddHostingDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => handleAddOrder('hosting')}>Add Hosting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
