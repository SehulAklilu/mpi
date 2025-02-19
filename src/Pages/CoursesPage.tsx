import ContactUs from "../components/LandingPage/ContactUs";
import CoursesHero from "../components/LandingPage/CoursesHero";
import CoursesHeroNew from "../components/LandingPage/CoursesHeroNew";
import CoursesList from "../components/LandingPage/CoursesList";
import CoursesListNew from "../components/LandingPage/CoursesListNew";
import FAQSection from "../components/LandingPage/FAQSection";
import Footer from "../components/LandingPage/Footer";
import JoinUs from "../components/LandingPage/JoinUs";
import TennisCourseSection from "../components/LandingPage/TennisCourseSection";
import TennisLocations from "../components/LandingPage/TennisLocations";

function CoursesPage() {
  return (
    <div>
      <CoursesHeroNew />
      <TennisCourseSection />
      <CoursesListNew />
      <JoinUs />
      {/* <CoursesList />
      <FAQSection />
      <TennisLocations />
      <ContactUs /> */}
      <Footer />
    </div>
  );
}

export default CoursesPage;
