import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import CustomButton from "./CustomButton";
import image18 from "../../assets/landingpage/image18.png";

function TestimonialsHero() {
  return (
    <div className="bg-[#EFEFED] ">
      <div className="w-full container mx-auto relative">
        <LandingPageNavBar />
        <div className="my-auto px-4 sm:px-10 flex items-center  mt-2 md:mt-4 xl:mt-8">
          <div className="w-full">
            <div className="flex items-center justify-center w-full">
              <h1 className="text-2xl my-2 sm:text-4xl text-center font-bold">
                Don’t Just Take Our Words!
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#152946]  items-center md:my-4">
              <div className="space-y-8 sm:space-y-4 text-center w-full md:w-[80%]  md:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold">
                  Thousands of Students so far have found our Platform very
                  helpful!
                </h2>
                <p className="text-xs sm:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  at nisl non arcu gravida euismod. Nullam felis dui,
                </p>
                <div className="flex items-center justify-center md:justify-start">
                  <CustomButton title="Sign Up & Enroll Now" />
                </div>
              </div>
              <div className="hidden md:block">
                <img
                  src={image18}
                  alt="Tennis Course"
                  className="w-full md:h-[43.75rem]  object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsHero;
