import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import image9 from "../../assets/landingpage/image9.jpg";
import { motion, AnimatePresence } from "framer-motion";
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
  const [visibleLocations, setVisibleLocations] = useState(
    locations.slice(0, 3)
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 3) % locations.length;
        setVisibleLocations(locations.slice(newIndex, newIndex + 3));
        return newIndex;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full container my-4 sm:my-10 lg:my-20 mx-auto p-2 sm:p-0">
      <div
        className="relative bg-cover bg-center rounded-2xl overflow-hidden min-h-[550px] flex items-center justify-center"
        style={{ backgroundImage: `url(${image9})` }}
      >
        <div className="absolute bg-black bg-opacity-50 w-[96%] sm:w-[90%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"></div>
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
          <div className="w-full h-[6rem] flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4">
              {/* <AnimatePresence> */}
              {visibleLocations.map((location, i) => (
                <motion.div
                  key={location}
                  className="flex flex-col items-center bg-black bg-opacity-40 rounded-lg w-20 h-20 sm:w-24 sm:h-24 p-2 text-white shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  layout
                >
                  <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center mb-2">
                    <FaMapMarkerAlt size={20} className="text-orange-500" />
                  </div>
                  <span className="text-xs font-semibold text-center">
                    {location}
                  </span>
                </motion.div>
              ))}
              {/* </AnimatePresence> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisLocations;
