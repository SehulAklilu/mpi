import React from "react";
import image5 from "../../assets/landingpage/image5.png";
import { CgCloseR } from "react-icons/cg";

function NumberInof() {
  const numberInfos = [
    { value: 500, title: "Players Tranned" },
    { value: 1500, title: "Successful Sessions" },
    { value: 300, title: "Personalized Programs" },
    { value: 15, title: "Traning Awards Won" },
  ];
  return (
    <div className="p-2 md:p-0">
      <div
        className="h-[90vh] my-4 sm:my-10 md:my-20 relative container mx-auto rounded-3xl bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${image5})` }}
      >
        <div className="absolute flex flex-col items-center justify-center w-[95%] md:w-[90%] h-[90%] rounded-3xl bg-black text-white bg-opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 sm:p-8">
          <div className="flex flex-col items-center gap-y-2 sm:gap-y-6 md:gap-y-10 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border flex items-center justify-center">
              <CgCloseR className="text-black" size={28} />
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Elevate Your Tennis Game
            </h1>
            <p className="w-full sm:w-[80%] md:w-[70%] text-sm md:text-base lg:text-lg">
              Unlock your full potential at MPI! Our Tennis Training Center
              features courses tailored for every age and skill level, fostering
              improvement while ensuring enjoyment on the court.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-6 md:gap-10">
              {numberInfos?.map((info, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-y-2 md:gap-y-4 px-6 md:px-10 border-r-0 md:border-r border-white  last:border-r-0"
                >
                  <h1 className="text-3xl md:text-4xl font-semibold">
                    {info.value}
                  </h1>
                  <p className="text-xs md:text-sm">{info.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberInof;
