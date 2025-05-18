
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit, MoreHorizontal, Plus, Eye, Trash2, Globe, Server } from 'lucide-react';
import { toast } from 'sonner';

// Sample domain data
const domainOrders = [
  { 
    id: 1, 
    name: 'acmecorp.com', 
    client: 'Acme Corporation',
    purchaseDate: '2024-05-01',
    expiryDate: '2025-06-01',
    provider: 'Sarah Johnson',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'starkindustries.com', 
    client: 'Stark Industries',
    purchaseDate: '2023-10-15',
    expiryDate: '2024-10-15',
    provider: 'Tony Stark',
    status: 'Expiring Soon'
  },
  { 
    id: 3, 
    name: 'wayneenterprises.com', 
    client: 'Wayne Enterprises',
    purchaseDate: '2023-08-22',
    expiryDate: '2024-08-22',
    provider: 'Bruce Wayne',
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'globexinc.com', 
    client: 'Globex Inc',
    purchaseDate: '2022-12-10',
    expiryDate: '2023-12-10',
    provider: 'Hank Scorpio',
    status: 'Expired'
  },
];

// Sample hosting data
const hostingOrders = [
  { 
    id: 1, 
    name: 'Premium Web Hosting', 
    client: 'Acme Corporation',
    purchaseDate: '2024-05-01',
    expiryDate: '2025-06-01',
    provider: 'Sarah Johnson',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Business Hosting', 
    client: 'Stark Industries',
    purchaseDate: '2023-10-15',
    expiryDate: '2024-10-15',
    provider: 'Tony Stark',
    status: 'Expiring Soon'
  },
  { 
    id: 3, 
    name: 'Standard Hosting', 
    client: 'Wayne Enterprises',
    purchaseDate: '2023-08-22',
    expiryDate: '2024-08-22',
    provider: 'Bruce Wayne',
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Basic Hosting', 
    client: 'Globex Inc',
    purchaseDate: '2022-12-10',
    expiryDate: '2023-12-10',
    provider: 'Hank Scorpio',
    status: 'Expired'
  },
];

const OrdersTable = () => {
  const [domains, setDomains] = useState(domainOrders);
  const [hostings, setHostings] = useState(hostingOrders);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: number, type: 'domain' | 'hosting'} | null>(null);

  const handleDeleteItem = (id: number, type: 'domain' | 'hosting') => {
    setItemToDelete({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'domain') {
        setDomains(domains.filter(domain => domain.id !== itemToDelete.id));
        toast.success('Domain deleted successfully');
      } else {
        setHostings(hostings.filter(hosting => hosting.id !== itemToDelete.id));
        toast.success('Hosting deleted successfully');
      }
    }
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleViewItem = (id: number, type: 'domain' | 'hosting') => {
    toast(`View ${type} details (not implemented in demo)`, {
      description: `ID: ${id}`
    });
  };

  const handleEditItem = (id: number, type: 'domain' | 'hosting') => {
    toast(`Edit ${type} (not implemented in demo)`, {
      description: `ID: ${id}`
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expiring Soon':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
          <p className="text-gray-600">Manage domain registrations and hosting services</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <a href="/admin/orders/domains/new" className="inline-flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Domain
            </a>
          </Button>
          <Button asChild>
            <a href="/admin/orders/hostings/new" className="inline-flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Hosting
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="domains">
        <TabsList className="mb-4">
          <TabsTrigger value="domains" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Domains
          </TabsTrigger>
          <TabsTrigger value="hostings" className="flex items-center">
            <Server className="mr-2 h-4 w-4" />
            Hostings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="domains" className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.length > 0 ? (
                domains.map((domain) => (
                  <TableRow key={domain.id}>
                    <TableCell className="font-medium">{domain.name}</TableCell>
                    <TableCell>{domain.client}</TableCell>
                    <TableCell>{domain.purchaseDate}</TableCell>
                    <TableCell>{domain.expiryDate}</TableCell>
                    <TableCell>{domain.provider}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(domain.status)}`}>
                        {domain.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewItem(domain.id, 'domain')}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditItem(domain.id, 'domain')}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteItem(domain.id, 'domain')}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No domains found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="hostings" className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hosting Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostings.length > 0 ? (
                hostings.map((hosting) => (
                  <TableRow key={hosting.id}>
                    <TableCell className="font-medium">{hosting.name}</TableCell>
                    <TableCell>{hosting.client}</TableCell>
                    <TableCell>{hosting.purchaseDate}</TableCell>
                    <TableCell>{hosting.expiryDate}</TableCell>
                    <TableCell>{hosting.provider}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(hosting.status)}`}>
                        {hosting.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewItem(hosting.id, 'hosting')}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditItem(hosting.id, 'hosting')}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteItem(hosting.id, 'hosting')}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No hostings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
