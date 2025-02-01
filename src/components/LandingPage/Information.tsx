import { FiArrowUpRight } from "react-icons/fi";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import image3 from "../../assets/landingpage/image3.png";
import image4 from "../../assets/landingpage/image4.png";
import image7 from "../../assets/landingpage/image5.png";
import stars from "../../assets/landingpage/stars.svg";
import { useState } from "react";
import { motion } from "framer-motion";
import "./footer.css";
function Information() {
  const infos = [
    "Tennis Games",
    "Training Courses",
    "Player Management",
    "Performance Tracking",
    "Coaching Tools",
  ];

  const sections = [
    {
      id: 1,
      title: "Elevate Your Tennis Skills with MPI's Programs",
      description:
        "Enhance your game with specialized training, expert coaching, and a welcoming community dedicated to improving every player's technique",
      image: image3,
    },
    {
      id: 2,
      title: "Master the Court with Our Advanced Training",
      description:
        "Take your game to the next level with expert coaching, focused drills, and a supportive environment to refine your skills at any level.",
      image: image7,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sections.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="container my-5 md:my-20 mx-auto min-h-[90vh] p-2">
      <div className="flex gap-2 justify-around overflow-x-auto scrollbar-hidden px-2 md:px-0">
        {infos.map((info) => (
          <button
            className="px-4 md:px-8 py-2 border border-black flex-none rounded-full"
            key={info}
          >
            {info}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  my-8">
        <div
          key={sections[currentIndex].id}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-3xl bg-primary text-white p-4"
        >
          <motion.div
            key={sections[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={sections[currentIndex].image}
              className="h-[30vh] sm:h-[50vh] md:h-[75vh] w-full rounded-3xl object-cover"
            />
          </motion.div>
          <div>
            <motion.div
              key={sections[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2 sm:space-y-4 md:space-y-8 py-4 px-4"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl">
                {sections[currentIndex].title}
              </h1>
              <p className="">{sections[currentIndex].description}</p>
              <button className="mt-3 flex items-center py-1 gap-2 hover bg-white rounded-full pl-4 pr-1 transition-colors duration-300 hover:bg-primary border border-primary hover:border-white group">
                <span className="text-black transition-colors duration-300 group-hover:text-white">
                  Request a Consultation
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary transition-colors duration-300 group-hover:bg-white">
                  <FiArrowUpRight
                    size={24}
                    className="text-white transition-colors duration-300 group-hover:text-primary"
                  />
                </div>
              </button>
            </motion.div>
            <div className="flex items-center mt-4 justify-between px-4">
              <div>
                <span className="font-semibold text-lg">
                  {currentIndex + 1} /{" "}
                </span>
                <span className="font-semibold text-sm text-[#fcbd7e]">
                  {sections.length}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <div
                  className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-white shadow-md"
                  onClick={handlePrev}
                >
                  <LuChevronLeft size={32} className="text-primary" />
                </div>
                <div
                  className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-primary border shadow-lg shadow-[#F1861B] border-[#cd7c2b]"
                  onClick={handleNext}
                >
                  <LuChevronRight size={32} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-auto hidden sm:block">
          <h1 className="text-3xl md:text-4xl mb-4 w-[75%] font-bold">
            Transform Your Tennis Exh1erience with{" "}
            <span className="text-primary">MPI</span>
          </h1>
          <div className="flex items-center my-2 w-[75%] justify-center">
            <img src={stars} className="text-xl" />
          </div>
          <div className="flex gap-4">
            <div className="relative flex-none h-40">
              <div className="absolute w-10 h-10 rounded-full bg-black text-white -left-5 top-1/2 -translate-y-1/2 flex items-center justify-center ">
                +
              </div>
              <img src={image4} className="h-40" />
            </div>
            <div className="text-sm w-1/2 ">
              Cultivating not just players, but champions. Our commitment to
              excellence ensures you develop the skills necessary for tennis
              success. Join MPI and unlock your potential through tailored
              courses and support.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Information;
