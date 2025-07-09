import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Server,
  AlertCircle,
  UserPlus,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  useGetRecentOrdersQuery,
  useGetSummaryQuery,
} from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/Loader";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

const AdminDashboard = () => {
  const [dialogType, setDialogType] = useState<string | null>(null);
  const [viewItemId, setViewItemId] = useState<number | null>(null);
  const [clientData, setClientData] = useState({});
  const { data, isLoading } = useGetRecentOrdersQuery();
  const [register] = useRegisterMutation();
  const { data: summary, isLoading: summaryLoading } = useGetSummaryQuery();
  const statCards = [
    {
      title: "Total Clients",
      value: summary?.totalUsers ?? 0,
      change: "+2 this month",
      icon: <Users className="h-8 w-8 text-kahf-blue" />,
      action: {
        text: "Add Client",
        icon: <UserPlus className="h-4 w-4 mr-1" />,
        type: "client",
      },
    },
    {
      title: "Active Domains",
      value: summary?.activeDomains ?? 0,
      change: "+3 this month",
      icon: <Globe className="h-8 w-8 text-kahf-indigo" />,
      action: {
        text: "Add Domain",
        icon: <Plus className="h-4 w-4 mr-1" />,
        type: "domain",
      },
    },
    {
      title: "Active Hostings",
      value: summary?.activeHostings ?? 0,
      change: "+1 this month",
      icon: <Server className="h-8 w-8 text-kahf-green" />,
      action: {
        text: "Add Hosting",
        icon: <Plus className="h-4 w-4 mr-1" />,
        type: "hosting",
      },
    },
    {
      title: "Expiring Soon",
      value: summary?.totalExpireSoon ?? 0,
      change: "Within 30 days",
      icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
      action: {
        text: "View All",
        icon: null,
        type: "view-expiring",
      },
    },
  ];
  const handleActionClick = (type: string) => {
    setDialogType(type);
  };

  const handleViewClick = (id: number) => {
    setViewItemId(id);
    setDialogType("view-activity");
  };

  const handleCloseDialog = () => {
    setDialogType(null);
    setViewItemId(null);
  };

  const handleAddItem = (type: string) => {
    toast.success(
      `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`
    );
    handleCloseDialog();
  };
  const handleEditInputChange = (name: string, value: string) => {
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddClient = async () => {
    console.log(clientData);
    const res = await register(clientData);

    if (res.error?.status === 500) {
      toast.error(`${res.error?.data?.message}`);
    } else if (res.data?.message) {
      toast.success(`User created successfully`);
      setClientData({});
      handleCloseDialog();
    }
    console.log(res);
  };

  const getActivityDetail = () => {
    return data?.orders.find((activity) => activity._id === viewItemId);
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Overview of your domain and hosting management system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {statCards.map((card) => (
          <Card key={card.title} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className="bg-blue-50 p-2 rounded-md">{card.icon}</div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-baseline">
                <p className="text-3xl font-bold">{card?.value}</p>
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
            {data?.orders.length ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.orders?.map((activity) => (
                    <tr key={activity._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activity?.user?.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {activity.item}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {activity.domain}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatDateForInput(activity?.createdAt) || "N/A"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activity.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : activity.status === "Expiring"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClick(activity._id)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="p-8 text-center">No recently order</h1>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Client Dialog */}
      <Dialog
        open={dialogType === "client"}
        onOpenChange={() => handleCloseDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                placeholder="e.g. Acme Corporation"
                value={clientData?.name}
                onChange={(e) => handleEditInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={clientData?.email}
                onChange={(e) => handleEditInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={clientData?.phone}
                onChange={(e) => handleEditInputChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Client's address"
                value={clientData?.address}
                onChange={(e) =>
                  handleEditInputChange("address", e.target.value)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleAddClient}>Add Client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Domain Dialog */}
      <Dialog
        open={dialogType === "domain"}
        onOpenChange={() => handleCloseDialog()}
      >
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
              <Textarea
                id="notes"
                placeholder="Additional notes about this domain"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={() => handleAddItem("domain")}>Add Domain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Hosting Dialog */}
      <Dialog
        open={dialogType === "hosting"}
        onOpenChange={() => handleCloseDialog()}
      >
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
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={() => handleAddItem("hosting")}>
              Add Hosting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Activity Dialog */}
      <Dialog
        open={dialogType === "view-activity"}
        onOpenChange={() => handleCloseDialog()}
      >
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
                    <p className="font-medium">
                      {getActivityDetail()?.user.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{getActivityDetail()?.item}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Domain/Service</p>
                    <p className="font-medium">{getActivityDetail()?.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {formatDateForInput(getActivityDetail()?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getActivityDetail()?.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : getActivityDetail()?.status === "Expiring"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {getActivityDetail()?.status}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Additional Information
                  </p>
                  <p>
                    This is a detailed view of the{" "}
                    {getActivityDetail()?.item?.toLowerCase()} activity for{" "}
                    {getActivityDetail()?.user?.name}.
                  </p>
                  <p className="mt-2">
                    You can add more details or actions related to this activity
                    here.
                  </p>
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
      <Dialog
        open={dialogType === "view-expiring"}
        onOpenChange={() => handleCloseDialog()}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Services Expiring Soon</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {summary?.expireSoon?.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.userId?.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.userId?.email}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item?.userId?.phone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {item.item}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {item?.expiryDate}
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

export default AdminDashboard;
