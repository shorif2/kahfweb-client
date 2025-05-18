
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const serviceCards = [
  {
    title: "Domain Registration",
    description: "Register your business domain name with our premium domain service. Includes free DNS management.",
    price: "$14.99",
    period: "/year",
    features: ["Free DNS Management", "Domain Forwarding", "Email Forwarding", "Domain Lock"],
    type: "domain"
  },
  {
    title: "Premium Hosting",
    description: "High-performance business hosting with 99.9% uptime guarantee. Includes SSL certificate & daily backups.",
    price: "$89.99",
    period: "/year",
    features: ["Unlimited Storage", "Unlimited Bandwidth", "Free SSL Certificate", "Free Daily Backups"],
    type: "hosting"
  },
  {
    title: "Domain + Hosting Bundle",
    description: "Get everything you need to establish your online presence with our complete hosting bundle.",
    price: "$99.99",
    period: "/year",
    features: ["Domain Registration", "Premium Hosting", "Free SSL Certificate", "24/7 Support"],
    type: "bundle"
  }
];

const ServiceCards = () => {
  const navigate = useNavigate();
  
  const handlePurchase = (type: string) => {
    const products = {
      'domain': { 
        name: 'Domain Registration', 
        price: 14.99, 
        description: 'Register your business domain name with our premium domain service' 
      },
      'hosting': { 
        name: 'Premium Hosting (1 Year)', 
        price: 89.99, 
        description: 'High performance web hosting with unlimited bandwidth' 
      },
      'bundle': { 
        name: 'Hosting + Domain Bundle', 
        price: 99.99, 
        description: 'Domain registration with premium hosting package' 
      }
    };
    
    const selectedProduct = products[type as keyof typeof products];
    navigate('/checkout', { state: { selectedProduct } });
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of premium hosting and domain registration services designed to help your business thrive online.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{card.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-kahf-blue">{card.price}</span>
                  <span className="text-gray-600">{card.period}</span>
                </div>
                <ul className="mb-6 space-y-2">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 pb-6">
                <Button 
                  className="w-full bg-kahf-blue hover:bg-kahf-indigo"
                  onClick={() => handlePurchase(card.type)}
                >
                  {card.type === 'domain' ? 'Buy Domain' : card.type === 'hosting' ? 'Get Hosting' : 'Get Bundle'}
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
