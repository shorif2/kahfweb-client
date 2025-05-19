
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  accountNumber: string;
  instructions: string;
  payAmount: string;
  currency: string;
  isActive: boolean;
}

const PaymentMethodManager = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod>({
    id: '',
    name: '',
    accountNumber: '',
    instructions: '',
    payAmount: '',
    currency: 'BDT',
    isActive: true
  });

  // Load payment methods from localStorage on component mount
  useEffect(() => {
    const storedMethods = localStorage.getItem('kahfweb_payment_methods');
    if (storedMethods) {
      setPaymentMethods(JSON.parse(storedMethods));
    }
  }, []);

  // Save payment methods to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('kahfweb_payment_methods', JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentMethod({
      ...currentMethod,
      [name]: value
    });
  };

  const resetForm = () => {
    setCurrentMethod({
      id: '',
      name: '',
      accountNumber: '',
      instructions: '',
      payAmount: '',
      currency: 'BDT',
      isActive: true
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentMethod.name || !currentMethod.accountNumber) {
      toast({
        title: "Error",
        description: "Payment method name and account number are required.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Update existing payment method
      const updatedMethods = paymentMethods.map(method => 
        method.id === currentMethod.id ? currentMethod : method
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
        id: Date.now().toString() // Simple ID generation
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      toast({
        title: "Payment Method Added",
        description: `${newMethod.name} has been added successfully.`,
      });
    }
    
    resetForm();
  };

  const editPaymentMethod = (method: PaymentMethod) => {
    setCurrentMethod(method);
    setIsEditing(true);
  };

  const deletePaymentMethod = (id: string) => {
    const methodToDelete = paymentMethods.find(m => m.id === id);
    if (methodToDelete) {
      const updatedMethods = paymentMethods.filter(method => method.id !== id);
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
          <CardTitle>{isEditing ? 'Edit Payment Method' : 'Add New Payment Method'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
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
              {isEditing ? 'Update Payment Method' : 'Add Payment Method'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No payment methods added yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Pay Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">{method.name}</TableCell>
                    <TableCell>{method.accountNumber}</TableCell>
                    <TableCell>{method.currency}</TableCell>
                    <TableCell>{method.payAmount}</TableCell>
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
