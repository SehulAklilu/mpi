import { useState } from "react";
import { motion } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import image1 from "../../assets/landingpage/image1.png";
import image2 from "../../assets/landingpage/image2.png";
import image3 from "../../assets/landingpage/image3.png";
import CustomButton from "./CustomButton";

function AboutUs() {
  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: "Tailored Training",
      description:
        "Custom programs designed to enhance your performance on the court.",
      category: "Skill Development",
      image: image2,
    },
    {
      title: "Empowering Coaches",
      description:
        "Utilize cutting-edge tools to manage and track player performance.",
      category: "State-of-the-Art Facilities",
      image: image1,
    },
    {
      title: "Advanced Analytics",
      description:
        "Gain deep insights into player strengths and areas of improvement.",
      category: "Data-Driven Insights",
      image: image3,
    },
    {
      title: "Elite Training Camps",
      description: "Train with top-tier coaches in an immersive environment.",
      category: "Intensive Programs",
      image: image1,
    },
  ];

  const nextSlide = () => {
    if (index === slides.length - 2) {
      return;
    }
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    if (index === 0) {
      return;
    }
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <section className="container my-20 mx-auto  py-10 grid md:grid-cols-4 gap-10 items-center">
        <div className="col-span-2 w-[80%] space-y-8">
          <button className="px-4 py-2 border border-black rounded-full text-sm font-semibold mb-4">
            About Us
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock Your Potential with{" "}
            <span className="text-orange-500">
              MPI's Tennis Training Center.
            </span>
          </h1>
          <p className="text-gray-600 text-base lg:text-lg mb-6">
            Our training center offers immersive programs tailored for players
            of all ages, ensuring a pivotal blend of passion and performance to
            elevate your game.
          </p>
          <CustomButton title="Connect with Us" />
        </div>

        <div className="col-span-2 w-full flex flex-col items-center">
          <div className="relative w-full max-w-4xl mx-auto flex gap-4">
            {/* Taller Image - Next Image Preloaded */}
            <div className="w-1/2 h-[460px] rounded-xl overflow-hidden shadow-lg relative">
              <motion.img
                key={index}
                src={slides[index % slides.length].image}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-40 text-white border border-white px-4 py-2 rounded-full text-sm">
                {slides[index]?.category}
              </div>
              <div className="bg-black absolute bottom-4 mx-4 bg-opacity-40  text-white rounded-xl p-2">
                <h3 className="text-xl font-semibold">
                  {slides[index]?.title}
                </h3>
                <p className="text-sm">{slides[index]?.description}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-1/2">
              <motion.div
                key={index + 1}
                className="relative h-[380px] rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <img
                  src={slides[index + 1].image}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 bg-black bg-opacity-40 text-white border border-white px-4 py-2 rounded-full text-sm">
                  {slides[index + 1]?.category}
                </div>
                <div className="bg-black text-white absolute bottom-4 mx-4 bg-opacity-40 rounded-xl p-2">
                  <h3 className="text-xl font-semibold">
                    {slides[index + 1]?.title}
                  </h3>
                  <p className="text-sm">{slides[index + 1]?.description}</p>
                </div>
              </motion.div>

              {/* Navigation Buttons Positioned Below the Shorter Image */}
              <div className="flex gap-2 items-end justify-between mt-4">
                <div className="w-[70%] text-sm">
                  Harness the latest technology to foster player growth and
                  development.
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={prevSlide}
                    className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-white shadow-md"
                  >
                    <LuChevronLeft size={32} className="text-primary" />
                  </div>
                  <div
                    onClick={nextSlide}
                    className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-primary shadow-md"
                  >
                    <LuChevronRight size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
