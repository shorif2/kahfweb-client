
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    review: "KahfWeb has transformed our online presence. The site speed is incredible, and their support team helped us migrate our complex website with zero issues.",
    name: "Sarah Johnson",
    role: "Marketing Director, TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 5
  },
  {
    review: "After trying several hosting providers, KahfWeb stands out for their exceptional customer service and reliability. Haven't had a single minute of downtime in over a year.",
    name: "David Chen",
    role: "Owner, Global Ecommerce",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 5
  },
  {
    review: "The domain security features provided by KahfWeb saved us from a potential hijacking attempt. Their team noticed suspicious activity and secured our account immediately.",
    name: "Emily Rodriguez",
    role: "IT Director, Education First",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80",
    rating: 5
  },
  {
    review: "Moving our business website to KahfWeb was the best decision we made. The free migration service was smooth, and the performance improvement was immediately noticeable.",
    name: "Michael Thompson",
    role: "CEO, Creative Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 4.5
  },
];

const Testimonials = () => {
  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-kahf-blue text-kahf-blue h-4 w-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-kahf-blue h-4 w-4" />);
    }
    
    return stars;
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-kahf-blue to-kahf-indigo bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 text-lg">
            Don't just take our word for it. Here's what our customers have to say about KahfWeb's services.
          </p>
        </div>

        <div className="relative px-12">
          <Carousel
            opts={{
              loop: true,
              align: "center",
            }}
            className="max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-4/5 lg:basis-3/4">
                  <div className="p-8 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="md:w-1/3">
                        <div className="w-24 h-24 md:w-32 md:h-32 mx-auto overflow-hidden rounded-full border-4 border-kahf-blue/20">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 text-center md:text-left">
                        <Quote className="text-kahf-blue/20 h-10 w-10 mb-2 mx-auto md:mx-0" />
                        <p className="text-gray-700 mb-6 italic text-lg">{testimonial.review}</p>
                        
                        <div className="flex items-center justify-center md:justify-start mb-2">
                          {renderRating(testimonial.rating)}
                        </div>
                        
                        <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                        <p className="text-kahf-blue">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6 bg-white border-gray-200" />
            <CarouselNext className="-right-4 md:-right-6 bg-white border-gray-200" />
          </Carousel>
        </div>
        
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-flex gap-1.5 items-center bg-white px-5 py-2 rounded-full shadow-md border border-gray-100">
            <span className="font-medium text-gray-700">Trusted by</span>
            <span className="text-kahf-blue font-bold">500+</span>
            <span className="font-medium text-gray-700">businesses worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
