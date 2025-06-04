import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

import "@fontsource/lexend";
import "@fontsource/poppins";
import "@fontsource/montserrat";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-lexend">
      <Navbar />
      {/* will either be <Home/> or <Settings/> */}
      <div className="flex-grow mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
