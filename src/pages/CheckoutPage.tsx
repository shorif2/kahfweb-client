import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Metadata } from "@/components/Metadata";
import { useAuth } from "@/contexts/AuthContext";
import { Copy } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useGetActiveMethodQuery } from "@/redux/features/payment/paymentMethod";

interface ProductType {
  name: string;
  price: number;
  item: string;
  description: string;
  image?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  instructions: string;
  payAmount: string;
  currency: string;
  isActive: boolean;
  logo?: string;
  qrCode?: string;
}

const CheckoutPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [domainName, setDomainName] = useState(location.state?.domain || "");
  const { data } = useGetActiveMethodQuery();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
  });

  // Refs for account number elements
  const accountNumberRefs = useRef<{ [key: string]: HTMLInputElement | null }>(
    {}
  );

  // Get product from location state or use default
  const selectedProduct: ProductType = location.state?.selectedProduct || {
    name: "Domain Registration",
    item: "domain",
    price: 60.0,
    description: "Register a new domain name",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCopyNumber = (accountNumber: string, methodName: string) => {
    navigator.clipboard.writeText(accountNumber);
    toast.success(`${methodName} number copied to clipboard`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login frist");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    if (!domainName.trim()) {
      toast.error("Please enter a domain name");
      return;
    }
    const orderInfo = {
      userId: user._id,
      itemName: selectedProduct.name,
      item: selectedProduct.item,
      price: selectedProduct.price,
      domain: domainName,
      transactionId,
    };
    const res = await createOrder(orderInfo);
    if (res?.data?.order) {
      toast.success("Order placed successfully! Redirecting to dashboard...");
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong or domin already orderd");
    }
  };

  return (
    <>
      <Metadata
        title="Checkout - KahfWeb"
        description="Complete your purchase for premium web hosting services."
      />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={Boolean(user)}
                    className={user ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={Boolean(user)}
                    className={user ? "bg-gray-50" : ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XX XXX XXXX"
                    disabled={Boolean(user)}
                    className={user ? "bg-gray-50" : ""}
                    required
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                </div> */}

                {/* Domain Name field - required for all purchases */}
                <div className="space-y-2">
                  <Label htmlFor="domainName">Domain Name</Label>
                  <Input
                    id="domainName"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="example.com"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {selectedProduct.name.includes("Domain") ||
                    selectedProduct.name.includes("Bundle")
                      ? "Enter the domain name you wish to register"
                      : "Enter the domain name to assign to your hosting"}
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary and Payment */}
          <div>
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="flex items-center border-b pb-4 mb-4">
                {selectedProduct.image && (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                )}
                <div>
                  <h3 className="font-medium">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${selectedProduct.price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2 border-b">
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <div className="flex justify-between py-4 font-semibold text-lg">
                <span>Total</span>
                <span>${selectedProduct.price.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="space-y-6">
                {data?.data?.length > 0 ? (
                  data?.data?.map((method) => (
                    <div
                      key={method._id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPayment === method.id
                          ? "border-kahf-blue bg-blue-50"
                          : "hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedPayment(method.id)}
                    >
                      <div className="flex items-center mb-4">
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                          {selectedPayment === method.id && (
                            <div className="h-3 w-3 rounded-full bg-kahf-blue" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          {method.logo ? (
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={method.logo}
                                alt={method.name}
                              />
                              <AvatarFallback>
                                {method.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ) : null}
                          <span className="font-medium">
                            Pay with {method.name}
                          </span>
                        </div>
                      </div>

                      {selectedPayment === method.id && (
                        <div className="pl-8 space-y-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1 space-y-4">
                              <div className="flex items-center space-x-2">
                                <Input
                                  value={method.accountNumber}
                                  readOnly
                                  className="bg-gray-50"
                                  ref={(el) =>
                                    (accountNumberRefs.current[method.id] = el)
                                  }
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    handleCopyNumber(
                                      method.accountNumber,
                                      method.name
                                    )
                                  }
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>

                              {method.payAmount && (
                                <div className="text-sm bg-blue-50 p-3 rounded-md border border-blue-100">
                                  <span className="font-medium">
                                    Pay amount:
                                  </span>{" "}
                                  {method.payAmount} {method.currency}
                                </div>
                              )}

                              {method.instructions && (
                                <div className="text-sm text-gray-600">
                                  <p className="font-medium mb-1">
                                    Instructions:
                                  </p>
                                  <p>{method.instructions}</p>
                                </div>
                              )}

                              <div>
                                <Label htmlFor={`txn-${method.id}`}>
                                  Transaction ID
                                </Label>
                                <Input
                                  id={`txn-${method.id}`}
                                  value={transactionId}
                                  onChange={(e) =>
                                    setTransactionId(e.target.value)
                                  }
                                  placeholder={`Enter ${method.name} transaction ID`}
                                />
                              </div>
                            </div>

                            {/* QR Code display */}
                            {method.qrCode && (
                              <div className="flex flex-col items-center justify-center">
                                <div className="bg-white p-2 border rounded-lg shadow-sm">
                                  <img
                                    src={method.qrCode}
                                    alt={`${method.name} QR Code`}
                                    className="w-32 h-32 object-contain"
                                  />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  Scan QR Code to pay
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-gray-500">
                    <p>No payment methods available. Please contact support.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Complete Order */}
            <div>
              <div className="flex items-start space-x-3 mb-6">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree with terms and conditions and all policy
                  </label>
                  <p className="text-xs text-gray-500">
                    By checking this box, you agree to our{" "}
                    <a href="/terms" className="text-kahf-blue hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-kahf-blue hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full"
                disabled={isLoading || !agreedToTerms || !domainName.trim()}
              >
                {isLoading ? "Processing..." : "Complete Order"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
