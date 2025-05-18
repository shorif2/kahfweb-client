
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    review: "KahfWeb has transformed our online presence. The site speed is incredible, and their support team helped us migrate our complex website with zero issues.",
    name: "Sarah Johnson",
    role: "Marketing Director, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    review: "After trying several hosting providers, KahfWeb stands out for their exceptional customer service and reliability. Haven't had a single minute of downtime in over a year.",
    name: "David Chen",
    role: "Owner, Global Ecommerce",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    review: "The domain security features provided by KahfWeb saved us from a potential hijacking attempt. Their team noticed suspicious activity and secured our account immediately.",
    name: "Emily Rodriguez",
    role: "IT Director, Education First",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80",
  },
  {
    review: "Moving our business website to KahfWeb was the best decision we made. The free migration service was smooth, and the performance improvement was immediately noticeable.",
    name: "Michael Thompson",
    role: "CEO, Creative Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about KahfWeb's services.
          </p>
        </div>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-4 overflow-hidden rounded-full border-2 border-kahf-blue">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.review}"</p>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
