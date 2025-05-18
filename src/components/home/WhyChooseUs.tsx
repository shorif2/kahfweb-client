
import React from 'react';
import { Shield, RefreshCw, Clock, Server, Lock, HeadphonesMic } from 'lucide-react';

const features = [
  {
    title: 'Money Back Guarantee',
    description: 'Try our services risk-free with our 30-day money back guarantee. No questions asked.',
    icon: <RefreshCw className="h-10 w-10 text-kahf-blue" />,
  },
  {
    title: 'Free Data Migration',
    description: 'We handle your website migration completely free of charge with zero downtime.',
    icon: <Server className="h-10 w-10 text-kahf-blue" />,
  },
  {
    title: 'Website Security',
    description: 'Advanced security features including malware scanning and protection against unwanted website suspension.',
    icon: <Shield className="h-10 w-10 text-kahf-blue" />,
  },
  {
    title: '99.9% Uptime Guarantee',
    description: 'Our robust infrastructure ensures your website is always online and accessible.',
    icon: <Clock className="h-10 w-10 text-kahf-blue" />,
  },
  {
    title: 'Free SSL Certificate',
    description: 'Every hosting plan includes a free SSL certificate to secure your website and boost SEO.',
    icon: <Lock className="h-10 w-10 text-kahf-blue" />,
  },
  {
    title: 'Live Support',
    description: 'Get help when you need it with our 24/7 expert customer support team.',
    icon: <HeadphonesMic className="h-10 w-10 text-kahf-blue" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KahfWeb?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide industry-leading hosting solutions with exceptional service and security features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-100 rounded-lg bg-white hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
