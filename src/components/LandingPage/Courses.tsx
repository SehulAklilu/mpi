import ContactUs from "./ContactUs";
import CoursesHero from "./CoursesHero";
import CoursesList from "./CoursesList";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import TennisLocations from "./TennisLocations";

function Courses() {
  return (
    <div>
      <CoursesHero />
      <CoursesList />
      <FAQSection />
      <TennisLocations />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Courses;
