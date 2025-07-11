import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetPricingPackagesQuery } from "@/redux/features/pricing/pricingApi";
import { Loader2 } from "lucide-react";

const ServiceCards = () => {
  const navigate = useNavigate();
  const { data: pricingData, isLoading, error } = useGetPricingPackagesQuery();
  console.log(pricingData);

  const handlePurchase = (packageType: string) => {
    const packageData = pricingData?.data?.find(
      (pkg) => pkg.packageType === packageType
    );

    if (packageData) {
      const selectedProduct = {
        name: packageData.title,
        price: packageData.price,
        description: packageData.features.map((f) => f.text).join(", "),
        item: packageType,
      };
      navigate("/checkout", { state: { selectedProduct } });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading services...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error || !pricingData?.data) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            Error loading services. Please try again.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of premium hosting and domain registration
            services designed to help your business thrive online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingData.data.map((card, index) => (
            <div
              key={card._id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col relative ${
                card.isPopular ? "border-kahf-blue" : ""
              }`}
            >
              {card.isPopular && (
                <div className="absolute top-0 right-0 bg-kahf-blue text-white px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {card.packageType === "domain" &&
                    "Register and manage your domain names with our premium domain services."}
                  {card.packageType === "bundle" &&
                    "Get everything you need with our complete hosting and domain bundle."}
                  {card.packageType === "hosting" &&
                    "High-performance business hosting with 99.9% uptime guarantee."}
                </p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-kahf-blue">
                    ${card.price}
                  </span>
                  <span className="text-gray-600">/{card.period}</span>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Starting From</p>
                </div>
                <ul className="mb-6 space-y-2">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button
                  className="w-full bg-kahf-blue hover:bg-kahf-indigo"
                  onClick={() => handlePurchase(card.packageType)}
                >
                  Buy {card.title}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
