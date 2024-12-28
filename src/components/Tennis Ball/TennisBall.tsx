import React from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import "./TennisBall.css";

interface TennisBallProps {
  isActive: boolean;
  isCompleted: boolean;
  onclick: () => void;
  title: string;
  position: string;
}

const TennisBall: React.FC<TennisBallProps> = ({
  isActive,
  isCompleted,
  onclick,
  title,
  position,
}) => {
  return (
    <div
      onClick={() => onclick()}
      className={` w-40 flex flex-col gap-4 items-center justify-center ${
        position === "left"
          ? "mr-auto"
          : position === "right"
          ? "ml-auto"
          : "mx-auto"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <MaterialIcon
          className={`text-[550%] ${
            isCompleted
              ? "text-green-500 motion-safe:animate-slowBounce cursor-pointer rotate-2"
              : isActive
              ? "text-primary motion-safe:animate-slowBounce cursor-pointer rotate-2"
              : "text-[#c4c4c4]"
          }  `}
          icon="sports_baseball"
        />
        {isActive && (
          <div
            className="w-5 h-3 bg-gray-800 rounded-[120%] opacity-30 
            animate-pulse scale-100 hover:scale-150 
            transition-transform duration-300 ease-in-out"
          />
        )}
      </div>
      {isActive && (
        <div>
          <p className="font-bold text-primary text-center text-sm">{title}</p>
        </div>
      )}
      {/* Curved line div to animate line between balls */}
      {isActive && (
        <div
          className={`curved-line ${
            position === "left" ? "left-line" : "right-line"
          }`}
        />
      )}
    </div>
  );
};

export default TennisBall;
