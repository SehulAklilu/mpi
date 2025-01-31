import React from "react";
import image8 from "../../assets/landingpage/image8.png";

const bannerData = {
  title: "Elevate Your Tennis Game with MPI Training Programs",
  subtitle: "Unlock Your Potential in a Dynamic Training Environment",
  description:
    "Transform your tennis skills with expert training tailored to all levels. Dive into a vibrant community where you refine techniques, enhance strategic understanding, and connect with fellow tennis enthusiasts. Our advanced facilities boast cutting-edge training tools, empowering coaches to manage player performance efficiently. Experience personalized coaching that accelerates growth and helps you achieve your tennis aspirations. Don't miss out—contact our dedicated team today to discover the ideal course for your journey!",
  image: image8, // Replace with actual path
};

const TrainingBanner = () => {
  return (
    <div className="bg-white rounded-2xl min-h-[80vh] shadow-lg p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-6 container mx-auto overflow-hidden my-20">
      <div className="flex-1 space-y-6 p-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Elevate Your Tennis Game with{" "}
          <span className="text-orange-500">MPI Training Programs</span>
        </h1>
        <h2 className="text-lg md:text-3xl font-semibold text-gray-800 mt-2">
          {bannerData.subtitle}
        </h2>
        <p className="text-gray-600 mt-4 max-w-lg">{bannerData.description}</p>
      </div>
      <div className="flex-1">
        <img
          src={bannerData.image}
          alt="Tennis Training"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default TrainingBanner;
