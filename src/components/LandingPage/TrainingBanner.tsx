import React, { useState } from "react";
import image8 from "../../assets/landingpage/image8.png";

const bannerData = {
  title: "Elevate Your Tennis Game with MPI Training Programs",
  subtitle: "Unlock Your Potential in a Dynamic Training Environment",
  description:
    "Transform your tennis skills with expert training tailored to all levels. Dive into a vibrant community where you refine techniques, enhance strategic understanding, and connect with fellow tennis enthusiasts. Our advanced facilities boast cutting-edge training tools, empowering coaches to manage player performance efficiently. Experience personalized coaching that accelerates growth and helps you achieve your tennis aspirations. Don't miss out—contact our dedicated team today to discover the ideal course for your journey!",
  image: image8, // Replace with actual path
};

const TrainingBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className="p-2 md:p-0">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col lg:flex-row items-center gap-6 container mx-auto overflow-hidden sm:p-6 my-4 sm:my-10 md:my-20">
        <div className="flex-1 space-y-2 sm:space-y-6 p-1 sm:p-4 mt-2 sm:mt-0">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center sm:text-left">
            Elevate Your Tennis Game with{" "}
            <span className="text-orange-500">MPI Training Programs</span>
          </h1>
          <h2 className="text-lg md:text-3xl font-semibold text-gray-800 mt-2 text-center sm:text-left">
            {bannerData.subtitle}
          </h2>
          <p className="hidden sm:block">{bannerData.description}</p>
          <div className="block sm:hidden">
            <p className="text-center">
              {isExpanded || bannerData.description.length <= maxLength
                ? bannerData.description
                : `${bannerData.description.slice(0, maxLength)}...`}

              {bannerData.description.length > maxLength && (
                <button
                  onClick={toggleExpand}
                  className="text-primary sm:hidden mt-2 pl-2 underline"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        </div>
        <div className="flex-1">
          <img
            src={bannerData.image}
            alt="Tennis Training"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TrainingBanner;
