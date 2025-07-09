import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define pricing package types
interface PricingFeature {
  text: string;
}

interface PricingPackage {
  title: string;
  price: number;
  period: string;
  isPopular: boolean;
  features: PricingFeature[];
  buttonText: string;
}

const defaultPackages: Record<string, PricingPackage> = {
  domain: {
    title: "Domain",
    price: 60,
    period: "year",
    isPopular: false,
    features: [
      { text: "Domain Registration" },
      { text: "Domain Transfer" },
      { text: "Domain Protection" },
    ],
    buttonText: "Buy Domain",
  },
  bundle: {
    title: "Bundle Package",
    price: 99,
    period: "year",
    isPopular: true,
    features: [
      { text: "Domain Registration/Transfer" },
      { text: "USA Premium Hosting" },
      { text: "Domain & Hosting Protection" },
    ],
    buttonText: "Get Bundle",
  },
  hosting: {
    title: "Hosting",
    price: 60,
    period: "year",
    isPopular: false,
    features: [
      { text: "Premium Hosting" },
      { text: "USA Premium Hosting" },
      { text: "Hosting Protection" },
    ],
    buttonText: "Buy Hosting",
  },
};

const PricingManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"domain" | "bundle" | "hosting">(
    "domain"
  );
  const [packages, setPackages] = useState<Record<string, PricingPackage>>(
    JSON.parse(
      localStorage.getItem("kahfweb_pricing_packages") ||
        JSON.stringify(defaultPackages)
    )
  );

  // Handle form input changes
  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setPackages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      },
    }));
  };

  // Handle feature change
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...packages[activeTab].features];
    newFeatures[index] = { text: value };

    setPackages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        features: newFeatures,
      },
    }));
  };

  // Add new feature
  const addFeature = () => {
    setPackages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        features: [...prev[activeTab].features, { text: "" }],
      },
    }));
  };

  // Remove feature
  const removeFeature = (index: number) => {
    const newFeatures = [...packages[activeTab].features];
    newFeatures.splice(index, 1);

    setPackages((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        features: newFeatures,
      },
    }));
  };

  // Save changes
  const saveChanges = () => {
    localStorage.setItem("kahfweb_pricing_packages", JSON.stringify(packages));
    toast({
      title: "Pricing Updated",
      description: "Your pricing packages have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pricing Management</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Pricing Packages</CardTitle>
          <CardDescription>
            Update pricing, features, and other details for your service
            packages.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "domain" | "bundle" | "hosting")
            }
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="domain">Domain</TabsTrigger>
              <TabsTrigger value="bundle">Bundle</TabsTrigger>
              <TabsTrigger value="hosting">Hosting</TabsTrigger>
            </TabsList>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Package Title</Label>
                  <Input
                    id="title"
                    value={packages[activeTab].title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={packages[activeTab].price}
                    onChange={(e) =>
                      handleInputChange("price", Number(e.target.value))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={packages[activeTab].period}
                    onChange={(e) =>
                      handleInputChange("period", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={packages[activeTab].buttonText}
                    onChange={(e) =>
                      handleInputChange("buttonText", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={packages[activeTab].isPopular}
                    onChange={(e) =>
                      handleInputChange("isPopular", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <Label htmlFor="isPopular">Mark as Popular</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button onClick={addFeature} size="sm" variant="outline">
                    Add Feature
                  </Button>
                </div>

                {packages[activeTab].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature.text}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      placeholder="Feature description"
                      className="flex-1"
                    />
                    <Button
                      onClick={() => removeFeature(index)}
                      size="sm"
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={saveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingManager;
