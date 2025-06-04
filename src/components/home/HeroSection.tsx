import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();
  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) {
      toast.error("Please enter a domain name");
      return;
    }
    navigate("/domain-search", { state: { domain } });
  };

  return (
    <div className="domain-search-gradient text-white py-20 px-4 md:py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Find Your Perfect Domain Name
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Secure your online identity with our premium domain registration and
          hosting services. Start building your dream website today!
        </p>
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleDomainSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <Input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter your domain name (e.g., yourbusiness.com)"
                className="h-12 text-black w-full px-4 py-2"
              />
            </div>
            <Button
              type="submit"
              className="h-12 bg-kahf-green hover:bg-green-600 transition-all"
            >
              Search Domain
            </Button>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              .com $60/year
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              .net $55/year
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              .org $50/year
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
              .io $90/year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
