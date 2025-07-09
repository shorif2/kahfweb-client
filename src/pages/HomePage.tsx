import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import ServiceCards from "@/components/home/ServiceCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import SEOSection from "@/components/home/SEOSection";
import Testimonials from "@/components/home/Testimonials";
import { Metadata } from "@/components/Metadata";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const HomePage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <Metadata
        title="KahfWeb - Premium Domain & Hosting Services"
        description="Secure your online identity with KahfWeb's premium domain registration and hosting services. Get started with free migrations and 24/7 support."
      />
      <main>
        <HeroSection />
        <FeatureCards />
        <ServiceCards />
        <WhyChooseUs />
        <SEOSection />
        <Testimonials />
      </main>
    </>
  );
};

export default HomePage;
