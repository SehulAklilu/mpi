import React from "react";
import { LiaStarSolid } from "react-icons/lia";

// Generate 13 reviews with different text lengths

interface ReviewsDataInterface {
  name: string;
  role: string;
  review: string;
  image: string;
}
const reviewsData: ReviewsDataInterface[] = [
  {
    name: "David Lee",
    role: "Frontend Developer",
    review:
      "Everything was intuitive and clean. This is exactly what good design should be about. Kudos! The way elements are structured makes it incredibly easy to understand and use, even at first glance. It’s clear that a lot of effort went into making the interface seamless, and it really pays off. A fantastic job all around!",
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "KC Brown",
    role: "Product Designer",
    review:
      "Absolutely stunning experience! The interface is smooth and the design is flawless.",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Anna Smith",
    role: "UX Designer",
    review:
      "A wonderful experience! Everything just works as expected. Love it!",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Omar Quail",
    role: "UI Designer",
    review:
      "This was an incredible product! The ease of use and aesthetic appeal are top-notch. Highly recommended for anyone who values good design and seamless functionality.",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Joshua Perri",
    role: "UI Designer",
    review:
      "Fantastic work! The attention to detail is evident, and I appreciate how intuitive everything feels.",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Mohammed Filali",
    role: "Graphic Designer",
    review:
      "Simple and elegant. The colors, typography, and spacing are spot on.",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Sophia Lee",
    role: "Illustrator",
    review:
      "Absolutely loved it! From the first glance, I knew this was high-quality. The attention to detail is evident in every interaction. Whether it’s the precise alignment of elements, the thoughtful use of negative space, or the smooth transitions, everything works together to create an experience that feels both artistic and functional. It’s rare to see such a well-balanced design!",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Alash Olu",
    role: "Interaction Designer",
    review:
      "The smooth animations and well-structured design make for an excellent experience. I was blown away by how seamless it all felt. It's rare to find such a well-balanced product that looks great and works even better.",
    image: "https://i.pravatar.cc/100?img=6",
  },
  {
    name: "Ana Sánchez",
    role: "UX/UI Designer",
    review:
      "Loved how easy it was to navigate. The user flow is well thought out, and everything just makes sense! Every interaction feels intuitive, and the layout ensures users can find what they need without any confusion. The attention to detail is evident, making the experience smooth and enjoyable.",
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    name: "Emily Carter",
    role: "Visual Designer",
    review:
      "This is easily one of the best designs I’ve seen. Great work! The hierarchy is spot on, and it’s easy to digest the content at a glance. The way typography, spacing, and colors work together creates an experience that is both visually appealing and highly functional. It’s a perfect blend of aesthetics and usability, making every interaction feel polished and refined.",
    image: "https://i.pravatar.cc/100?img=9",
  },
  {
    name: "Henry Adams",
    role: "Creative Director",
    review:
      "Minimalistic, effective, and beautiful. The blend of usability and aesthetics is perfect. Every design choice feels deliberate, ensuring a sleek and modern experience without unnecessary clutter. The way each component fits seamlessly into the overall flow makes it a pleasure to use. This is exactly how great design should feel—effortless yet powerful.",
    image: "https://i.pravatar.cc/100?img=10",
  },

  {
    name: "Brian Miller",
    role: "UX Researcher",
    review:
      "A seamless experience. I had no trouble finding what I needed, and everything felt natural.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Isabella Rose",
    role: "Product Manager",
    review:
      "Fantastic experience! The responsiveness and performance were both stellar. I look forward to using this again in future projects!",
    image: "https://i.pravatar.cc/100?img=13",
  },
];

// Review card component
const ReviewsCard = ({ name, role, review, image }: ReviewsDataInterface) => {
  return (
    <div className="rounded-lg max-w-xs h-fit flex flex-col gap-6 p-6 bg-[#F9FAFB] shadow-md">
      {/* Stars */}
      <div className="flex gap-2 items-center">
        {[...Array(5)].map((_, index) => (
          <LiaStarSolid key={index} className="text-yellow-800" size={22} />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700">{review}</p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4">
        <img
          className="w-14 h-14 rounded-full flex-shrink-0 object-cover"
          alt={`${name}`}
          src={image}
        />
        <div className="text-[#101828]">
          <h2 className="font-semibold">{name}</h2>
          <p className="text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="container mx-auto my-4 md:my-10">
      <h1 className="text-3xl text-center font-bold  sm:mb-4 lg:mb-10">
        Hear from some of our amazing students.
      </h1>
      <div className="mx-auto gap-6 sm:columns-2 md:columns-3 xl:columns-4 flex flex-col sm:block items-center">
        {reviewsData.map((review, index) => (
          <div key={index} className="mb-6">
            <ReviewsCard {...review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
