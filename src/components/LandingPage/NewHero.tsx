import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import bgImage from "../../assets/landingpage/wilson-tennis-ball-1-1536x1024.webp";
import { IoPlayCircle } from "react-icons/io5";

function NewHero() {
  return (
    <div
      className="relative h-[40rem] md:h-[43.5rem] bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <LandingPageNavBar />

      {/* Diagonal black line */}
      <div className="absolute hidden md:block w-0 h-0 border-l-[100vw]  border-b-[43.5rem] top-0 border-l-transparent  border-b-black opacity-30"></div>

      {/* Content Section */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] text-center">
        <h1 className="text-3xl md:text-7xl text-white font-semibold tracking-wide leading-tight">
          Elevate Your <span className="text-primary">Tennis</span> Game with
          MPI!
        </h1>

        <div className="mt-6 flex  flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-6 py-2 text-lg rounded-full text-white bg-primary w-fit md:w-auto">
            Register Now
          </button>
          <button className="flex items-center gap-2 text-white text-base md:text-xl py-3 px-6 rounded-lg group w-fit md:w-auto">
            <IoPlayCircle className="text-4xl text-white group-hover:text-primary" />
            Watch Intro
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewHero;
