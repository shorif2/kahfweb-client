
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const seoContent = [
  {
    title: 'Best Private Web Hosting',
    content: 'KahfWeb provides industry-leading private web hosting services optimized for security, performance, and reliability. Our dedicated servers ensure your website data remains secure and your site loads quickly for visitors worldwide.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    title: 'Best Domain Security',
    content: 'Protect your online identity with our comprehensive domain security solutions. KahfWeb offers DNSSEC, domain privacy, and advanced domain monitoring to prevent unauthorized transfers and hijacking attempts.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    title: 'Best Hosting Security',
    content: 'Our hosting security includes advanced firewalls, malware scanning, and automated security updates. We ensure your website remains protected against the latest threats while maintaining optimal performance.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
  },
];

const SEOSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {seoContent.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center mb-20 last:mb-0`}
          >
            <div className="w-full md:w-1/2">
              <img 
                src={item.image} 
                alt={item.title}
                className="rounded-lg shadow-md w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
              <p className="text-gray-700 mb-6 text-lg">{item.content}</p>
              <Button variant="outline" className="group">
                Learn More 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SEOSection;
