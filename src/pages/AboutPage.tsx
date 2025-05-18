
import React from 'react';
import { Metadata } from '@/components/Metadata';

const AboutPage = () => {
  return (
    <>
      <Metadata 
        title="About Us - KahfWeb"
        description="Learn more about KahfWeb and our mission to provide premium hosting services."
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About KahfWeb</h1>
          
          <div className="mb-12">
            <img src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" alt="KahfWeb Team" className="w-full h-80 object-cover rounded-lg shadow-md mb-8" />
            
            <h2 className="text-2xl font-semibold mb-4 text-kahf-blue">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Founded in 2018, KahfWeb started with a simple mission: to make premium web hosting accessible to everyone. 
              Our founders recognized the need for reliable, secure, and user-friendly hosting services that didn't 
              compromise on performance or customer support.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              What began as a small team of passionate web enthusiasts has grown into a trusted provider serving 
              thousands of clients across the globe. We've maintained our commitment to personalized service while 
              expanding our technological capabilities to meet the evolving needs of the digital world.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-kahf-blue">Our Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At KahfWeb, our mission is to empower businesses and individuals with the tools they need to establish 
              a strong online presence. We believe that everyone deserves access to reliable web hosting services, 
              regardless of their technical expertise or budget constraints.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We're dedicated to providing solutions that combine cutting-edge technology with exceptional customer 
              support, ensuring that our clients can focus on growing their online presence while we handle the 
              technical details.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-kahf-blue">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Reliability</h3>
                <p className="text-gray-600">We understand that downtime costs money and damages reputation. That's why we offer a 99.9% uptime guarantee.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-gray-600">Your data security is our top priority. We implement advanced security measures to keep your websites safe.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
                <p className="text-gray-600">We believe in building lasting relationships with our clients through transparent communication and exceptional support.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-kahf-blue">Our Team</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The strength of KahfWeb lies in our diverse team of experienced professionals who are passionate about web technology. 
              From our expert developers to our dedicated support team, everyone at KahfWeb is committed to delivering excellence.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We foster a culture of innovation and continuous learning, ensuring that we stay at the forefront of industry 
              developments and can offer our clients the most effective solutions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
