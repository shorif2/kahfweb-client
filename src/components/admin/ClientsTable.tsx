
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
import { Input } from '@/components/ui/input';
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
import { Edit, MoreHorizontal, Plus, User, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

// Sample client data
const initialClients = [
  { 
    id: 1, 
    name: 'Globex Inc', 
    email: 'info@globexinc.com',
    mobile: '+1 (555) 234-5678',
    domains: 1,
    hostings: 1
  },
  { 
    id: 2, 
    name: 'Acme Corporation', 
    email: 'info@acmecorp.com', 
    mobile: '+1 (555) 987-6543',
    domains: 2,
    hostings: 1
  },
  { 
    id: 3, 
    name: 'Stark Industries', 
    email: 'tony@starkindustries.com',
    mobile: '+1 (555) 123-4567',
    domains: 3,
    hostings: 2
  },
  { 
    id: 4, 
    name: 'Wayne Enterprises', 
    email: 'bruce@wayneenterprises.com',
    mobile: '+1 (555) 456-7890',
    domains: 1,
    hostings: 1
  },
  { 
    id: 5, 
    name: 'Dunder Mifflin', 
    email: 'michael@dundermifflin.com',
    mobile: '+1 (555) 888-9999',
    domains: 1,
    hostings: 0
  },
];

const ClientsTable = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  // Filter clients based on search query
  const filteredClients = clients.filter(client => {
    const query = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.mobile.includes(query)
    );
  });

  const handleDeleteClient = (clientId: number) => {
    setClientToDelete(clientId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== clientToDelete));
      toast.success('Client deleted successfully');
    }
    setIsDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  const handleViewClient = (clientId: number) => {
    toast('View client details (not implemented in demo)', {
      description: `ID: ${clientId}`
    });
  };

  const handleEditClient = (clientId: number) => {
    toast('Edit client (not implemented in demo)', {
      description: `ID: ${clientId}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clients</h1>
          <p className="text-gray-600">Manage your clients and their services</p>
        </div>
        <Button asChild>
          <a href="/admin/clients/new" className="inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </a>
        </Button>
      </div>

      <div className="flex gap-2 max-w-sm">
        <Input
          type="search"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Domains</TableHead>
              <TableHead>Hostings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.mobile}</TableCell>
                  <TableCell>{client.domains}</TableCell>
                  <TableCell>{client.hostings}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewClient(client.id)}>
                          <User className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClient(client.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClient(client.id)}
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
                <TableCell colSpan={6} className="text-center py-6">
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be undone.
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

export default ClientsTable;
