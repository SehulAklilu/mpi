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
    <div
      className="h-[90vh] my-20  relative container mx-auto rounded-3xl bg-cover bg-center"
      style={{ backgroundImage: `url(${image5})` }}
    >
      <div className="absolute flex items-center justify-center w-[90%] h-[90%] rounded-3xl bg-black text-white bg-opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-y-10">
          <div className="w-16 h-16 rounded-full bg-white  border flex items-center justify-center">
            <CgCloseR className="text-black" size={34} />
          </div>
          <h1 className="text-3xl font-bold">Elevate Your Tennis Game</h1>
          <p className="w-[70%] text-center">
            Unlock your full potential at MPI! Our Tennis Training Center
            features courses tailored for every age and skill level, fostering
            improvement while ensuring enjoyment on the court.
          </p>
          <div className="flex ">
            {numberInfos?.map((info) => (
              <div className="flex flex-col gap-y-4 border-r border-r-white px-10">
                <h1 className="text-4xl font-semibold">{info.value}</h1>
                <p className="text-sm">{info.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberInof;
