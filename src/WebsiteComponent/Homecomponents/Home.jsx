import React from "react";
import { FaTruck, FaFileAlt, FaUserMd } from "react-icons/fa";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Services from "./Services";
import TestSection from "./TestSection";
import HealthCategories from "./HealthCategories";
import WhatsAppBooking from "./WhatsAppBooking";
import BannerSlider from "./BannerSlider";
import CallNowBanner from "./CallNowBanner";
import VitalOrgans from "./VitalOrgans";
import MaxLabPackages from "./MaxLabPackages";
import LifestyleDiseases from "./lifestyleDiseases ";
import SupportCard  from "./SupportCard";
import DiabetesScreening  from "./DiabetesScreening";
import WomenCare from "./WomenCare";
import HealthCategories2 from "./HealthCategories2";
import HealthArticles from "./HealthArticles";
import CustomerReviews from "./CustomerReviews";
import ExpandingFootprints from "./ExpandingFootprints";
import Footer from "./Footer";
import Carousel from "../SliderPage/Carousel";
import MostBookedCheckups from "./MostBookedCheckups";
import BlogSection from "../Homecomponents/BlogSection";

function Home() {
  return (
   <>
    <TopBar/>
    <Navbar/>
    <div className="w-full  to-blue-500 rounded-xl overflow-hidden my-6">
      {/* <div className="grid md:grid-cols-2 items-center"> */}
        {/* Left Content */}
        {/* <div className="text-white p-8">
          <p className="text-lg mb-2">
            Choose a good lifestyle & experience the joy of optimum health & happiness
          </p>
          <h1 className="text-4xl font-bold">
            BUY 1 GET 1 <span className="text-teal-400">FREE</span>
          </h1>
          <h2 className="text-xl font-semibold mt-2">
            WellWise Full-Body Health Checks
          </h2> */}

          {/* Features */}
          {/* <div className="flex flex-col md:flex-row gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <FaTruck className="text-teal-400 text-xl" />
              <span>
                <strong>FREE HOME</strong> <br /> Sample Collection*
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaFileAlt className="text-teal-400 text-xl" />
              <span>
                <strong>FREE SMART REPORT</strong> <br /> For Simplified Analysis
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserMd className="text-teal-400 text-xl" />
              <span>
                <strong>FREE DOCTOR</strong> <br /> Tele Consultation
              </span>
            </div>
          </div>
        </div> */}

        {/* Right Image */}
        {/* <div className="flex justify-center items-end">
          <img
            src="/public/webimg/banner.jpg" // 👈 yaha apni family wali image ka path daalna
            alt="Family"
            className="w-full h-full object-contain"
          />
        </div> */}
        <Carousel/>
      </div>
    {/* </div> */}
    <Services/>
    <TestSection/>
    <MostBookedCheckups/>
    <HealthCategories/>
    <WhatsAppBooking/>
    <BannerSlider/>
    <CallNowBanner/>
    <VitalOrgans/>
    <MaxLabPackages/>
    <LifestyleDiseases/>
    <SupportCard/>
    <DiabetesScreening />
    <BlogSection/>
    <WomenCare/>
    <HealthCategories2/>
    <HealthArticles/>
    <CustomerReviews/>
    <ExpandingFootprints/>
    <Footer/>
    
   
   </>
  );
}

export default Home;
