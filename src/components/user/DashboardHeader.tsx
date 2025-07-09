import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const DashboardHeader = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handlePurchase = (type: string) => {
    const products = {
      domain: {
        name: "Domain Registration",
        item: "domain",
        price: 60.0,
        description: "Register a new domain name",
      },
      hosting: {
        name: "Premium Hosting (1 Year)",
        item: "hosting",
        price: 60.0,
        description: "High performance web hosting with unlimited bandwidth",
      },
      bundle: {
        name: "Hosting + Domain Bundle",
        item: "bundle",
        price: 99.0,
        description: "Domain registration with premium hosting package",
      },
    };

    const selectedProduct = products[type as keyof typeof products];
    navigate("/checkout", { state: { selectedProduct } });
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
