import AboutUs from "@/components/LandingPage/AboutUs";
import TrainingSection from "@/components/LandingPage/Cards";
import ContactUs from "@/components/LandingPage/ContactUs";
import Courses from "@/components/LandingPage/Courses";
import FAQSection from "@/components/LandingPage/FAQSection";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Information from "@/components/LandingPage/Information";
import NumberInof from "@/components/LandingPage/NumberInof";
import OurCourses from "@/components/LandingPage/OurCourses";
import TennisLocations from "@/components/LandingPage/TennisLocations";
import TrainingBanner from "@/components/LandingPage/TrainingBanner";
// import Information from "@/components/LandingPage/Information";

function LandingPage() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Information />
      <OurCourses />
      <NumberInof />
      <TrainingSection />
      <TrainingBanner />
      <FAQSection />
      <TennisLocations />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default LandingPage;
