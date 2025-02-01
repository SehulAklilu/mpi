import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import image9 from "../../assets/landingpage/image9.png";

const locations = [
  "Highlands Ranch, CO",
  "Castle Rock, CO",
  "Arvada, CO",
  "Englewood, CO",
  "Littleton, CO",
  "Lakewood, CO",
  "Parker, CO",
  "Commerce City, CO",
];

const TennisLocations = () => {
  return (
    <div className="relative w-full container my-4 sm:my-10 lg:my-20 mx-auto p-2 sm:p-0">
      <div
        className="relative bg-cover bg-center rounded-2xl overflow-hidden min-h-[550px] flex items-center justify-center"
        style={{ backgroundImage: `url(${image9})` }}
      >
        <div className="absolute bg-black bg-opacity-50 w-[90%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"></div>
        <div className="z-10 text-center text-white px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Elevate Your Tennis Journey with MPI
          </h2>
          <p className="text-sm md:text-base max-w-2xl mx-auto mb-6">
            Enhance your tennis experience with our comprehensive training
            programs, tailored to all skill levels. Our facility empowers
            players to refine their game through structured courses that not
            only sharpen skills but also foster strategic insights that set you
            apart on the court.
          </p>

          {/* Locations Section */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center bg-black bg-opacity-40 rounded-full pr-4 pl-1 py-1 text-white"
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-2">
                  <FaMapMarkerAlt size={24} className="text-orange-500" />
                </div>
                <span className="text-sm font-semibold">{location}</span>
              </div>
            ))}
          </div>

          <div className="hidden border border-white w-full h-[6rem] overflow-hidden z-50">
            <div className="flex overflow-x-auto space-x-4 w-max">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-black bg-opacity-40 rounded-lg w-24 h-24 p-2 text-white"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                    <FaMapMarkerAlt size={20} className="text-orange-500" />
                  </div>
                  <span className="text-xs font-semibold text-center">
                    {location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisLocations;
