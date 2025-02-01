import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import CustomButton from "./CustomButton";

function Courses() {
  return (
    <div className="w-full h-screen bg-[#EFEFED] relative">
      <LandingPageNavBar />
      <div className="container min-h-[] my-auto md:min-h-auto">
        {/* header title */}
        <div className="flex items-center justify-center  w-full">
          <h1 className="text-2xl sm:4xl text-center font-bold ">
            Get Started With Our{" "}
            <span className="text-primary block">Tennis Courses </span> at MPI!
          </h1>
        </div>
        <div className="grid grid-cols-1 mt-2">
          <div className="space-y-4 px-10">
            <h1 className="text-xl sm:2xl font-semibold text-center">
              Aid you progress with our Industry-Standard Course
            </h1>
            <p className=" text-center ">
              At Mindsight Performance Institute, we don’t just train you on the
              field. We also give you all the necessary educational information
              in the form of fast paced courses. With our courses, you will
              witness a huge growth in your knowledge and expertise in Tennis.
            </p>
            <CustomButton title="Sign Up & Enroll Now" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
