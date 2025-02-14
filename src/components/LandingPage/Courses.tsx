import ContactUs from "./ContactUs";
import CoursesHero from "./CoursesHero";
import CoursesHeroNew from "./CoursesHeroNew";
import CoursesList from "./CoursesList";
import CoursesListNew from "./CoursesListNew";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import JoinUs from "./JoinUs";
import TennisCourseSection from "./TennisCourseSection";
import TennisLocations from "./TennisLocations";

function Courses() {
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

export default Courses;
