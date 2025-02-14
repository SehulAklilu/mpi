// import bgImage from "../../assets/landingpage/University-Seminars-Lectures-Workshops-800x500.jpg";
import bgImage from "../../assets/landingpage/0_Y08ww0AqzNpFmL8O.webp";
import LandingPageNavBar from "./LandingPageNavBar";
import { FaArrowDown } from "react-icons/fa";

function CoursesHeroNew() {
  return (
    <div
      className="relative h-[34.5rem] bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <LandingPageNavBar />

      {/* Diagonal black line */}
      <div className="absolute hidden md:block w-0 h-0 border-l-[100vw]  border-b-[34.5rem] top-0 border-l-transparent  border-b-black opacity-30"></div>

      {/* Content Section */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] text-center">
        <h1 className="text-3xl md:text-7xl text-white font-semibold tracking-wide leading-tight">
          Explore Our Amazing Courses
        </h1>

        <div className="mt-6 flex  flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-12 h-12 text-lg rounded-full text-white bg-primary   flex items-center justify-center">
            <FaArrowDown className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursesHeroNew;
