import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Eye, Plus, Search } from "lucide-react";
import {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import Loader from "../loader/Loader";
import { useAllUsersQuery } from "@/redux/features/auth/authApi";

// Sample order data
const initialOrders = [
  {
    id: 1,
    client: "Acme Corporation",
    type: "Domain",
    item: "acmecorp.com",
    date: "2023-05-10",
    expiry: "2024-05-10",
    amount: 12.99,
    status: "Active",
    paymentMethod: "bKash",
    transactionId: "TXN123456789",
  },
  {
    id: 2,
    client: "Globex Inc",
    type: "Hosting",
    item: "Premium Hosting",
    date: "2023-05-08",
    expiry: "2024-05-08",
    amount: 89.99,
    status: "Active",
    paymentMethod: "Nagad",
    transactionId: "TXN987654321",
  },
  {
    id: 3,
    client: "Stark Industries",
    type: "Domain",
    item: "starkindustries.com",
    date: "2023-05-05",
    expiry: "2024-05-05",
    amount: 14.99,
    status: "Pending",
    paymentMethod: "bKash",
    transactionId: "TXN456789123",
  },
  {
    id: 4,
    client: "Wayne Enterprises",
    type: "Bundle",
    item: "wayneenterprises.com + Premium Hosting",
    date: "2023-05-01",
    expiry: "2024-05-01",
    amount: 99.99,
    status: "Active",
    paymentMethod: "Nagad",
    transactionId: "TXN789123456",
  },
  {
    id: 5,
    client: "Dunder Mifflin",
    type: "Domain",
    item: "dundermifflin.com",
    date: "2023-04-25",
    expiry: "2024-04-25",
    amount: 12.99,
    status: "Pending",
    paymentMethod: "bKash",
    transactionId: "TXN321654987",
  },
];
type order = {
  _id: string;
  status: string;
  item: string;
  itemName: string;
  domain: string;
  expiryDate: string;
  price: number;
  user: any;
  orderDate: string;
};
const OrdersTable = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [isAddDomainDialogOpen, setIsAddDomainDialogOpen] = useState(false);
  const [isAddHostingDialogOpen, setIsAddHostingDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<order>(null);
  const [editFormData, setEditFormData] = useState<order>(null);
  const [newOrder, setNewOrder] = useState<any>(null);
  const { data, isLoading } = useGetAllOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const { data: clients = [], isLoading: isLoadingClient } = useAllUsersQuery(
    undefined,
    {
      skip: !isAddDomainDialogOpen,
    }
  );
  const [createOrder, { isLoading: iscreateOrderLoading }] =
    useCreateOrderMutation();
  // Filter orders based on search query and field
  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    if (searchField === "all") {
      return (
        order.client.toLowerCase().includes(query) ||
        order.type.toLowerCase().includes(query) ||
        order.item.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.transactionId.toLowerCase().includes(query)
      );
    } else if (searchField === "client") {
      return order.client.toLowerCase().includes(query);
    } else if (searchField === "type") {
      return order.type.toLowerCase().includes(query);
    } else if (searchField === "item") {
      return order.item.toLowerCase().includes(query);
    } else if (searchField === "status") {
      return order.status.toLowerCase().includes(query);
    } else if (searchField === "transactionId") {
      return order.transactionId.toLowerCase().includes(query);
    }
    return true;
  });

  const handleViewOrder = (id: number) => {
    const order = data.orders.find((o) => o._id === id);
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (id: number) => {
    const order = data.orders.find((o) => o._id === id);
    setCurrentOrder(order);
    setEditFormData({ ...order });
    setIsEditDialogOpen(true);
  };

  const handleEditInputChange = (name: string, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlenewOrderInputChange = (name: string, value: string) => {
    setNewOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    const { user, ...filteredOrder } = editFormData;
    const response = await updateOrder({
      orderId: editFormData._id,
      editFormData: filteredOrder,
    });
    console.log(response);
    toast.success("Order updated successfully");
    setIsEditDialogOpen(false);
    setEditFormData(null);
  };

  const handleAddOrder = async (type: string) => {
    const res = await createOrder(newOrder);
    console.log(res);
    if (res?.data?.order) {
      toast.success(`New ${type} order added successfully`);
      setIsAddDomainDialogOpen(false);
      setNewOrder(null);
    } else {
      toast.error("Something went wrong ");
    }
    // if (type === "domain") {
    //   setIsAddDomainDialogOpen(false);
    // } else if (type === "hosting") {
    //   setIsAddHostingDialogOpen(false);
    // }
  };

  const formatDateForInput = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  if (isLoading) return <Loader />;
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
            Add Order
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
              placeholder={`Search orders by ${
                searchField === "all" ? "any field" : searchField
              }...`}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.orders?.length > 0 ? (
                data?.orders?.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order?.user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order?.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order?.domain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {formatDateForInput(order?.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${order?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : order?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOrder(order._id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditOrder(order._id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500"
                  >
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
                <h3 className="font-semibold text-lg">
                  {currentOrder?.domain}
                </h3>
                <p className="text-sm text-gray-500">{currentOrder?.item}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client</p>
                  <p>{currentOrder?.user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentOrder?.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : currentOrder?.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {currentOrder?.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p>{formatDateForInput(currentOrder?.orderDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p>{formatDateForInput(currentOrder?.expiryDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p>${currentOrder?.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p>{currentOrder?.paymentMethod || "N/A"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p>{currentOrder?.transactionId || "N/A"}</p>
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
                    value={editFormData?.user?.name}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={editFormData?.item}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Item</Label>
                <Input
                  id="item"
                  value={editFormData.domain}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={formatDateForInput(editFormData.orderDate) || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formatDateForInput(editFormData.expiryDate) || ""}
                    onChange={(e) =>
                      handleEditInputChange("expiryDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editFormData?.status}
                  onValueChange={(value) =>
                    handleEditInputChange("status", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input
                  id="paymentMethod"
                  value={editFormData?.paymentMethod}
                  onChange={(e) =>
                    handleEditInputChange("paymentMethod", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input
                  id="transactionId"
                  value={editFormData?.transactionId}
                  onChange={(e) =>
                    handleEditInputChange("transactionId", e.target.value)
                  }
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

      {/* Add Domain Dialog */}
      <Dialog
        open={isAddDomainDialogOpen}
        onOpenChange={setIsAddDomainDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientSelect">Client</Label>
              <Select
                onValueChange={(value) =>
                  handlenewOrderInputChange("userId", value)
                }
              >
                <SelectTrigger id="clientSelect">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem disabled value="">
                      Loading...
                    </SelectItem>
                  ) : (
                    clients.map((client) => (
                      <SelectItem key={client._id} value={client._id}>
                        {client.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="item">Order Type</Label>
              <Select
                value={newOrder?.item}
                onValueChange={(value) =>
                  handlenewOrderInputChange("item", value)
                }
              >
                <SelectTrigger id="item">
                  <SelectValue placeholder="Select Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="domain">Domain</SelectItem>
                  <SelectItem value="hosting">Hosting</SelectItem>
                  <SelectItem value="bundel">Bundle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                placeholder="e.g., example.com"
                value={newOrder?.domain}
                onChange={(e) =>
                  handlenewOrderInputChange("domain", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderDate">Registration Date</Label>
                <Input
                  id="orderDate"
                  type="date"
                  // value={formatDateForInput(newOrder?.orderDate) || ""}
                  onChange={(e) =>
                    handlenewOrderInputChange("orderDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  // value={formatDateForInput(newOrder?.expiryDate) || ""}
                  onChange={(e) =>
                    handlenewOrderInputChange("expiryDate", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Amount</Label>
              <Input
                id="price"
                type="number"
                placeholder="12.99"
                value={newOrder?.price}
                onChange={(e) =>
                  handlenewOrderInputChange("price", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Input
                id="paymentMethod"
                placeholder="type payment method"
                value={newOrder?.paymentMethod}
                onChange={(e) =>
                  handlenewOrderInputChange("paymentMethod", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transactionId">Transaction ID</Label>
              <Input
                id="transactionId"
                placeholder="e.g., TXN123456789"
                value={newOrder?.transactionId}
                onChange={(e) =>
                  handlenewOrderInputChange("transactionId", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDomainDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => handleAddOrder("domain")}>Add Domain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersTable;
