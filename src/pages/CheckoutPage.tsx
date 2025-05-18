
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Metadata } from '@/components/Metadata';
import { useAuth } from '@/contexts/AuthContext';
import { Copy } from 'lucide-react';

interface ProductType {
  name: string;
  price: number;
  description: string;
  image?: string;
}

const CheckoutPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [domainName, setDomainName] = useState('');
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    password: '',
    phone: '',
    address: ''
  });

  // Get product from location state or use default
  const selectedProduct: ProductType = location.state?.selectedProduct || {
    name: "Premium Hosting (1 Year)",
    price: 89.99,
    description: "High performance web hosting with unlimited bandwidth",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  };

  const bKashNumber = "0123456789";
  const nagadNumber = "0123456789";
  const bKashRef = useRef<HTMLInputElement>(null);
  const nagadRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyNumber = (type: string) => {
    if (type === 'bKash') {
      navigator.clipboard.writeText(bKashNumber);
      toast.success('bKash number copied to clipboard');
    } else {
      navigator.clipboard.writeText(nagadNumber);
      toast.success('Nagad number copied to clipboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      toast.error('Please select a payment method');
      return;
    }
    
    if (!transactionId.trim()) {
      toast.error('Please enter your transaction ID');
      return;
    }
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if ((selectedProduct.name.includes('Domain') || selectedProduct.name.includes('Bundle')) && !domainName.trim()) {
      toast.error('Please enter a domain name');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      toast.success('Order placed successfully! Redirecting to dashboard...');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
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
                    disabled={isAuthenticated}
                    className={isAuthenticated ? "bg-gray-50" : ""}
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
                    disabled={isAuthenticated}
                    className={isAuthenticated ? "bg-gray-50" : ""}
                  />
                </div>
                
                {!isAuthenticated && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required={!isAuthenticated}
                    />
                    <p className="text-xs text-gray-500">Password will be used to create your account</p>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XX XXX XXXX"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    required
                    rows={3}
                  />
                </div>

                {/* Domain Name field - shown for domain or bundle purchases */}
                {(selectedProduct.name.includes('Domain') || selectedProduct.name.includes('Bundle')) && (
                  <div className="space-y-2">
                    <Label htmlFor="domainName">Domain Name</Label>
                    <Input
                      id="domainName"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder="example.com"
                      required
                    />
                    <p className="text-xs text-gray-500">Enter the domain name you wish to register</p>
                  </div>
                )}
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
                  <p className="text-sm text-gray-500">{selectedProduct.description}</p>
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
                {/* bKash Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPayment === 'bKash' ? 'border-kahf-blue bg-blue-50' : 'hover:border-gray-400'}`}
                  onClick={() => setSelectedPayment('bKash')}
                >
                  <div className="flex items-center mb-4">
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                      {selectedPayment === 'bKash' && <div className="h-3 w-3 rounded-full bg-kahf-blue" />}
                    </div>
                    <span className="font-medium">Pay with bKash</span>
                  </div>
                  
                  {selectedPayment === 'bKash' && (
                    <div className="pl-8 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input 
                          value={bKashNumber}
                          readOnly
                          className="bg-gray-50"
                          ref={bKashRef}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleCopyNumber('bKash')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-white p-2 rounded shadow w-32 h-32 flex items-center justify-center">
                          <div className="text-center text-gray-500 text-sm">QR Code Placeholder</div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="bKashTxn">Transaction ID</Label>
                        <Input 
                          id="bKashTxn" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="Enter bKash transaction ID" 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Nagad Payment */}
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedPayment === 'Nagad' ? 'border-kahf-blue bg-blue-50' : 'hover:border-gray-400'}`}
                  onClick={() => setSelectedPayment('Nagad')}
                >
                  <div className="flex items-center mb-4">
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                      {selectedPayment === 'Nagad' && <div className="h-3 w-3 rounded-full bg-kahf-blue" />}
                    </div>
                    <span className="font-medium">Pay with Nagad</span>
                  </div>
                  
                  {selectedPayment === 'Nagad' && (
                    <div className="pl-8 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input 
                          value={nagadNumber}
                          readOnly
                          className="bg-gray-50"
                          ref={nagadRef}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleCopyNumber('Nagad')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <div className="bg-white p-2 rounded shadow w-32 h-32 flex items-center justify-center">
                          <div className="text-center text-gray-500 text-sm">QR Code Placeholder</div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="nagadTxn">Transaction ID</Label>
                        <Input 
                          id="nagadTxn" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="Enter Nagad transaction ID" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Terms and Complete Order */}
            <div>
              <div className="flex items-start space-x-3 mb-6">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} 
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
                    <a href="/privacy" className="text-kahf-blue hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full"
                disabled={isSubmitting || !agreedToTerms || !selectedPayment || !transactionId || ((selectedProduct.name.includes('Domain') || selectedProduct.name.includes('Bundle')) && !domainName.trim())}
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
