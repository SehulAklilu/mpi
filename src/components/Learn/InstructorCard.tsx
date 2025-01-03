import React from "react";
import { FaStar, FaUserAlt, FaClock } from "react-icons/fa";

type InstructorCardProps = {
  name: string;
  role: string;
  image: string;
  rating: number;
  students: number;
  duration: string;
};

const InstructorCard: React.FC<InstructorCardProps> = ({
  name,
  role,
  image,
  rating,
  students,
  duration,
}) => {
  return (
    <div className="flex items-start flex-col gap-2">
      <div className="flex gap-4 items-center justify-center">
        <img src={image} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-lg">{name}</p>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-1">
          <FaStar className="text-[#ff9328]" />
          <p className="font-medium">{rating}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaUserAlt className="text-[#ff9328]" />
          <p className="font-medium">{students.toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaClock className="text-[#ff9328]" />
          <p className="font-medium">{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
