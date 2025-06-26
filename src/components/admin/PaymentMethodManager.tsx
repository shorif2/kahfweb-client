import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  useAddPaymentMethodMutation,
  useGetPaymentMethodQuery,
} from "@/redux/features/payment/paymentMethod";

interface PaymentMethod {
  name: string;
  accountNumber: string;
  instructions: string;
  payAmount: string;
  currency: string;
  isActive: boolean;
  logo?: string; // Optional logo URL
  qrCode?: string; // Optional QR code URL
}

const PaymentMethodManager = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]); // payment method
  const [isEditing, setIsEditing] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod>({
    name: "",
    accountNumber: "",
    instructions: "",
    payAmount: "",
    currency: "BDT",
    isActive: false,
  });
  const [addPaymentMethod] = useAddPaymentMethodMutation();
  const { data, isLoading } = useGetPaymentMethodQuery();
  console.log(data);
  // File input references
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const qrCodeInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentMethod({
      ...currentMethod,
      [name]: value,
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "logo" | "qrCode"
  ) => {
    console.log(event.target.name);
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dev_shorif");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkks318dw/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (res.ok) {
        setCurrentMethod((prev) => ({
          ...prev,
          [fieldName]: data.secure_url as string,
        }));
      } else {
        toast({
          title: "Error",
          description: "Image upload fail.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const resetForm = () => {
    setCurrentMethod({
      id: "",
      name: "",
      accountNumber: "",
      instructions: "",
      payAmount: "",
      currency: "BDT",
      isActive: true,
      logo: undefined,
      qrCode: undefined,
    });
    setIsEditing(false);

    // Reset file inputs
    if (logoInputRef.current) logoInputRef.current.value = "";
    if (qrCodeInputRef.current) qrCodeInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentMethod.name || !currentMethod.accountNumber) {
      toast({
        title: "Error",
        description: "Payment method name and account number are required.",
        variant: "destructive",
      });
      return;
    }

    if (isEditing) {
      // Update existing payment method
      const updatedMethods = paymentMethods.map((method) =>
        method?.id === currentMethod?.id ? currentMethod : method
      );
      setPaymentMethods(updatedMethods);
      toast({
        title: "Payment Method Updated",
        description: `${currentMethod.name} has been updated successfully.`,
      });
    } else {
      // Add new payment method
      const newMethod = {
        ...currentMethod,
        id: Date.now().toString(), // Simple ID generation
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      toast({
        title: "Payment Method Added",
        description: `${newMethod.name} has been added successfully.`,
      });
    }

    resetForm();
  };

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await addPaymentMethod(currentMethod);

      if (res.data.success) {
        toast({
          title: "Payment Method Added",
          description: `${currentMethod.name} as a payment method has been added successfully.`,
        });
        console.log(res);
      } else if (res.error) {
        console.log(res);
        toast({
          title: "Error",
          description: res.error?.data?.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
      // resetForm();
      // toast({
      //   title: "Payment Method Added",
      //   description: `${currentMethod.name} has been added successfully.`,
      // });
    } catch (error) {
      console.log("error from here", error);
    }
  };

  const editPaymentMethod = (method: PaymentMethod) => {
    setCurrentMethod(method);
    setIsEditing(true);
  };

  const deletePaymentMethod = (id: string) => {
    const methodToDelete = paymentMethods.find((m) => m.id === id);
    if (methodToDelete) {
      const updatedMethods = paymentMethods.filter(
        (method) => method.id !== id
      );
      setPaymentMethods(updatedMethods);
      toast({
        title: "Payment Method Deleted",
        description: `${methodToDelete.name} has been removed.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Payment Method" : "Add New Payment Method"}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleAddPaymentMethod}>
          <CardContent>
            <div className="grid gap-4">
              {/* Logo upload section */}
              <div className="grid gap-2">
                <Label>Logo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {currentMethod.logo ? (
                      <AvatarImage
                        src={currentMethod.logo}
                        alt={currentMethod.name}
                      />
                    ) : (
                      <AvatarFallback className="text-xs">Logo</AvatarFallback>
                    )}
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={logoInputRef}
                    onChange={(e) => handleFileUpload(e, "logo")}
                  />
                </div>
              </div>

              {/* QR Code upload section */}
              <div className="grid gap-2">
                <Label>QR Code</Label>
                <div className="flex items-center gap-4">
                  <div className="border border-gray-200 rounded-md h-24 w-24 flex items-center justify-center overflow-hidden">
                    {currentMethod.qrCode ? (
                      <img
                        src={currentMethod.qrCode}
                        alt="QR Code"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No QR Code</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => qrCodeInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload QR Code
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={qrCodeInputRef}
                    onChange={(e) => handleFileUpload(e, "qrCode")}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Method Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentMethod.name}
                  onChange={handleInputChange}
                  placeholder="e.g., bKash, Nagad, Bank Transfer"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={currentMethod.accountNumber}
                  onChange={handleInputChange}
                  placeholder="e.g., 01XXXXXXXXX or Bank Account Number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    name="currency"
                    value={currentMethod.currency}
                    onChange={handleInputChange}
                    placeholder="e.g., BDT, USD"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="payAmount">Pay Amount</Label>
                  <Input
                    id="payAmount"
                    name="payAmount"
                    value={currentMethod.payAmount}
                    onChange={handleInputChange}
                    placeholder="e.g., 8,500 BDT"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="instructions">Payment Instructions</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={currentMethod.instructions}
                  onChange={handleInputChange}
                  placeholder="Instructions for customers on how to pay using this method"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Payment Method" : "Add Payment Method"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data?.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No payment methods added yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Pay Amount</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((method) => (
                  <TableRow key={method._id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        {method.logo ? (
                          <AvatarImage src={method.logo} alt={method.name} />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {method.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.accountNumber}</TableCell>
                    <TableCell>{method.currency}</TableCell>
                    <TableCell>{method.payAmount}</TableCell>
                    <TableCell>
                      {method.qrCode && (
                        <div className="h-8 w-8 relative">
                          <img
                            src={method.qrCode}
                            alt="QR"
                            className="h-full w-full object-cover rounded-sm"
                          />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => editPaymentMethod(method)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deletePaymentMethod(method.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethodManager;
