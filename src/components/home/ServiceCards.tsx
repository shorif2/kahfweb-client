
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const services = [
  {
    title: 'Domain',
    features: ['Domain Registration', 'Domain Transfer', 'Domain Protection'],
    price: '$60',
    period: '/year',
    buttonText: 'Buy Domain',
    buttonLink: '/domains',
    popular: false
  },
  {
    title: 'Bundle Package',
    features: [
      'Domain Registration/Transfer',
      'USA Premium Hosting',
      'Domain & Hosting Protection'
    ],
    price: '$99',
    period: '/year',
    buttonText: 'Get Bundle',
    buttonLink: '/bundle',
    popular: true
  },
  {
    title: 'Hosting',
    features: ['Premium Hosting', 'USA Premium Hosting', 'Hosting Protection'],
    price: '$60',
    period: '/year',
    buttonText: 'Get Hosting',
    buttonLink: '/hosting',
    popular: false
  },
];

const ServiceCards = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include free migrations, 24/7 support, and a 30-day money back guarantee.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`
              relative rounded-lg border overflow-hidden 
              ${service.popular 
                ? 'border-kahf-blue shadow-lg transform md:scale-105 z-10' 
                : 'border-gray-200'
              }
            `}>
              {service.popular && (
                <div className="absolute top-0 right-0 bg-kahf-blue text-white px-4 py-1 rounded-bl-lg font-semibold">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <p className="text-sm text-gray-500">Starting From</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{service.price}</span>
                    <span className="text-gray-600">{service.period}</span>
                  </div>
                </div>
                <Link to={service.buttonLink}>
                  <Button 
                    variant={service.popular ? "default" : "outline"} 
                    className={`w-full ${service.popular ? 'bg-kahf-blue hover:bg-kahf-indigo' : ''}`}
                  >
                    {service.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
