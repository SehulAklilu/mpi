import AboutUs from "@/components/LandingPage/AboutUs";
import TrainingSection from "@/components/LandingPage/Cards";
import ContactUs from "@/components/LandingPage/ContactUs";
import Courses from "@/Pages/CoursesPage";
import FAQSection from "@/components/LandingPage/FAQSection";
import Footer from "@/components/LandingPage/Footer";
import Hero from "@/components/LandingPage/Hero";
import Information from "@/components/LandingPage/Information";
import MakeChampions from "@/components/LandingPage/MakeChampions";
import NewHero from "@/components/LandingPage/NewHero";
import NumberInof from "@/components/LandingPage/NumberInof";
import OurCourses from "@/components/LandingPage/OurCourses";
import PlayTennis from "@/components/LandingPage/PlayTennis";
import Purchases from "@/components/LandingPage/Purchases";
import TennisLocations from "@/components/LandingPage/TennisLocations";
import TrainingBanner from "@/components/LandingPage/TrainingBanner";
// import Information from "@/components/LandingPage/Information";

function LandingPage() {
  return (
    <div className="bg-white">
      {/* <Hero /> */}
      <NewHero />
      <PlayTennis />
      <MakeChampions />
      {/* <AboutUs /> */}
      {/* <Information /> */}
      <OurCourses />
      <NumberInof />
      <TrainingSection />
      <Purchases />
      <TrainingBanner />
      <FAQSection />
      <TennisLocations />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default LandingPage;
