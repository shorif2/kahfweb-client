import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetPricingPackagesQuery } from "@/redux/features/pricing/pricingApi";

const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const { data: pricingData } = useGetPricingPackagesQuery();

  const handlePurchase = (type: string) => {
    const packageData = pricingData?.data?.find(
      (pkg) => pkg.packageType === type
    );

    if (packageData) {
      const selectedProduct = {
        name: packageData.title,
        item: packageData.packageType,
        price: packageData.price,
        description: packageData.features.map((f) => f.text).join(", "),
      };
      navigate("/checkout", { state: { selectedProduct } });
    }
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
      <p className="text-gray-600 mb-6">
        Manage your domains and hosting services
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => handlePurchase("domain")}
        >
          Purchase New Domain
        </Button>
        <Button
          variant="outline"
          className="bg-white"
          onClick={() => handlePurchase("hosting")}
        >
          Purchase New Hosting
        </Button>
        <Button
          className="bg-kahf-blue hover:bg-kahf-indigo"
          onClick={() => handlePurchase("bundle")}
        >
          Purchase Bundle
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
