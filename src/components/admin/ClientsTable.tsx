import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, MoreHorizontal, Plus, User, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";
import Loader from "../loader/Loader";

// Sample client data
const initialClients = [
  {
    id: 1,
    name: "Globex Inc",
    email: "info@globexinc.com",
    mobile: "+1 (555) 234-5678",
    domains: 1,
    hostings: 1,
    address: "123 Corporate Park, Business City, BC 10001",
    notes: "Premium client with special pricing arrangements.",
  },
  {
    id: 2,
    name: "Acme Corporation",
    email: "info@acmecorp.com",
    mobile: "+1 (555) 987-6543",
    domains: 2,
    hostings: 1,
    address: "789 Industrial Blvd, Metro City, MC 20002",
    notes: "Long-standing client since 2018.",
  },
  {
    id: 3,
    name: "Stark Industries",
    email: "tony@starkindustries.com",
    mobile: "+1 (555) 123-4567",
    domains: 3,
    hostings: 2,
    address: "555 Tech Avenue, Innovation City, IC 30003",
    notes: "Priority support client.",
  },
  {
    id: 4,
    name: "Wayne Enterprises",
    email: "bruce@wayneenterprises.com",
    mobile: "+1 (555) 456-7890",
    domains: 1,
    hostings: 1,
    address: "1 Corporate Plaza, Gotham City, GC 40004",
    notes: "Interested in expanding to additional services.",
  },
  {
    id: 5,
    name: "Dunder Mifflin",
    email: "michael@dundermifflin.com",
    mobile: "+1 (555) 888-9999",
    domains: 1,
    hostings: 0,
    address: "1725 Slough Avenue, Scranton, PA 50005",
    notes: "Paper company looking to expand their web presence.",
  },
];

const ClientsTable = () => {
  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<number | null>(null);
  const [currentClient, setCurrentClient] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const { data, isLoading } = useAllUsersQuery();
  // Filter clients based on search query
  const filteredClients = clients.filter((client) => {
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
      setClients(clients.filter((client) => client.id !== clientToDelete));
      toast.success("Client deleted successfully");
    }
    setIsDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  const handleViewClient = (clientId: number) => {
    const client = data.find((c) => c._id === clientId);
    setCurrentClient(client);
    setIsViewDialogOpen(true);
  };

  const handleEditClient = (clientId: number) => {
    const client = clients.find((c) => c.id === clientId);
    setCurrentClient(client);
    setEditFormData({ ...client });
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setClients(
      clients.map((client) =>
        client.id === editFormData.id ? editFormData : client
      )
    );
    toast.success("Client updated successfully");
    setIsEditDialogOpen(false);
    setEditFormData(null);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold mb-2">Clients</h1>
          <p className="text-gray-600">
            Manage your clients and their services
          </p>
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
            {data.length > 0 ? (
              data?.map((client) => (
                <TableRow key={client._id}>
                  <TableCell className="font-medium">{client?.name}</TableCell>
                  <TableCell>{client?.email}</TableCell>
                  <TableCell>+88{client?.phone}</TableCell>
                  <TableCell>{client?.domain}</TableCell>
                  <TableCell>{client?.hosting}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewClient(client._id)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditClient(client._id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClient(client._id)}
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

      {/* View Client Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          {currentClient && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{currentClient.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{currentClient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{currentClient.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p>{currentClient?.address || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Domains</p>
                  <p>{currentClient.domain}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hostings</p>
                  <p>{currentClient.hosting}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Notes</p>
                <p>{currentClient?.notes || "N/A"}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          {editFormData && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  value={editFormData.mobile}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={editFormData.address}
                  onChange={handleEditInputChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={editFormData.notes}
                  onChange={handleEditInputChange}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this client? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsTable;
