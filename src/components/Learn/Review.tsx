import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";

type ReviewProps = {
  rating: number;
  totalReviews: number;
  starDistribution: { stars: number; value: number }[];
};

export const Review: React.FC<ReviewProps> = ({
  rating,
  totalReviews,
  starDistribution,
}) => {
  return (
    <div>
      <h1 className="text-lg font-semibold">Reviews</h1>
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {rating} <span className="text-sm">/ 5</span>
          </h1>
          <p className="text-sm">Based on {totalReviews} reviews</p>
          <div className="flex gap-1">
            {[...Array(Math.floor(rating))].map((_, index) => (
              <FaStar key={index} className="text-[#F4624D]" />
            ))}
            {rating % 1 !== 0 && <FaStarHalf className="text-[#F4624D]" />}
          </div>
        </div>
        <div className="w-[40%]">
          {starDistribution.map((star, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-none">{star.stars} Stars</div>
              <Progress value={star.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
