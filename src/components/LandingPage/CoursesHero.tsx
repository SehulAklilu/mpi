import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import CustomButton from "./CustomButton";
import image8 from "../../assets/landingpage/image8.png";

function CoursesHero() {
  return (
    <div className="bg-[#EFEFED] ">
      <div className="w-full container mx-auto relative">
        <LandingPageNavBar />
        <div className="my-auto px-4 sm:px-10 flex items-center ">
          <div className="w-full">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-2xl my-2 sm:text-4xl text-center font-bold">
                <span> Get Started With Our</span>
                <span className="text-primary block my-2 md:my-4">
                  Tennis Courses
                </span>
                <span>at MPI!</span>
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#152946]  items-center">
              <div className="space-y-8 sm:space-y-4 text-center w-full md:w-[80%]  md:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold">
                  Aid your progress with our Industry-Standard Course
                </h2>
                <p className="text-xs sm:text-base">
                  At Mindsight Performance Institute, we don’t just train you on
                  the field. We also give you all the necessary educational
                  information through fast-paced courses. With our courses, you
                  will witness a huge growth in your knowledge and expertise in
                  Tennis.
                </p>
                <div className="flex items-center justify-center md:justify-start">
                  <CustomButton title="Sign Up & Enroll Now" />
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={image8}
                  alt="Tennis Course"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesHero;
