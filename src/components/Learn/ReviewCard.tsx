import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

// Props interface
interface ReviewCardProps {
  profileImage: string;
  name: string;
  time: string;
  reviewText: string;
  rating: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  profileImage,
  name,
  time,
  reviewText,
  rating,
}) => {
  return (
    <div className="flex items-start border-b border-gray-200 py-4">
      {/* Profile Image */}
      <img
        src={profileImage}
        alt={`${name}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="ml-4 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-800">
            {name} <span className="text-gray-500">• {time}</span>
          </p>
          <div className="flex items-center text-gray-600">
            <FaStar />
            <span className="text-sm">{rating}</span>
          </div>
        </div>
        {/* Review Text */}
        <p className="text-sm text-gray-600 mt-1">{reviewText}</p>
        {/* Actions */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <button className="flex items-center mr-4 gap-1">
            <FaHeart color="red" />
            Like
          </button>
          <button className="flex items-center gap-1">
            <FiSend />
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
