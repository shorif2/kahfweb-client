import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import {
  useGetPricingPackagesQuery,
  useUpdatePricingPackageMutation,
  useTogglePricingPackageStatusMutation,
  useCreatePricingPackageMutation,
  useDeletePricingPackageMutation,
  type PricingPackage,
  type PricingFeature,
} from "@/redux/features/pricing/pricingApi";

const PricingManager = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"domain" | "bundle" | "hosting">(
    "domain"
  );
  const [formData, setFormData] = useState<Partial<PricingPackage>>({});

  // API hooks
  const { data: pricingData, isLoading, error } = useGetPricingPackagesQuery();
  const [updatePricingPackage, { isLoading: isUpdating }] =
    useUpdatePricingPackageMutation();
  const [createPricingPackage, { isLoading: isCreating }] =
    useCreatePricingPackageMutation();
  const [deletePricingPackage, { isLoading: isDeleting }] =
    useDeletePricingPackageMutation();
  // Get current package data
  const currentPackage = pricingData?.data?.find(
    (pkg) => pkg.packageType === activeTab
  );

  // Update form data when package changes
  useEffect(() => {
    if (currentPackage) {
      setFormData(currentPackage);
    } else {
      // Set default values for new package
      setFormData({
        packageType: activeTab,
        title: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
        price: 60,
        period: "year",
        isPopular: false,
        features: [{ text: "" }],
        buttonText: `Buy ${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        }`,
      });
    }
  }, [currentPackage, activeTab]);

  // Handle form input changes
  const handleInputChange = (
    field: keyof PricingPackage,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle feature change
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = { text: value };
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  // Add new feature
  const addFeature = () => {
    const newFeatures = [...(formData.features || []), { text: "" }];
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  // Remove feature
  const removeFeature = (index: number) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  // Save changes
  const saveChanges = async () => {
    try {
      if (currentPackage?._id) {
        // Update existing package
        await updatePricingPackage({
          id: currentPackage._id,
          data: formData,
        }).unwrap();
      } else {
        // Create new package
        await createPricingPackage(formData as PricingPackage).unwrap();
      }

      toast({
        title: "Success",
        description: "Pricing package updated successfully.",
      });
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : "Failed to update pricing package.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Delete package
  const handleDeletePackage = async () => {
    if (!currentPackage?._id) return;

    try {
      await deletePricingPackage(currentPackage._id).unwrap();
      toast({
        title: "Success",
        description: "Pricing package deleted successfully.",
      });
    } catch (error) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message
          : "Failed to delete pricing package.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading pricing packages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading pricing packages. Please try again.
      </div>
    );
  }

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
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
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
                    value={formData.period || ""}
                    onChange={(e) =>
                      handleInputChange("period", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText || ""}
                    onChange={(e) =>
                      handleInputChange("buttonText", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPopular"
                    checked={formData.isPopular || false}
                    onCheckedChange={(checked) =>
                      handleInputChange("isPopular", checked)
                    }
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

                {formData.features?.map(
                  (feature: PricingFeature, index: number) => (
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
                  )
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button
            onClick={saveChanges}
            disabled={isUpdating || isCreating}
            className="w-full"
          >
            {isUpdating || isCreating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingManager;
