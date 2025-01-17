import React from "react";
import profile_img from "../../assets/user.jpeg";

interface ProfileCardInterface {
  profile_url?: string;
  name: string;
  ranking: number;
  onClick?: () => void;
}

function ProfileCard({
  profile_url,
  name,
  ranking,
  onClick,
}: ProfileCardInterface) {
  return (
    <div className="flex flex-col border border-[#ffb871] items-center gap-y-2 p-4 rounded-lg shadow shadow-[#F38C28]">
      <img
        className="w-16 h-16 rounded-full object-cover"
        src={profile_img}
        alt={`${name}'s profile`}
      />
      <p className="text-lg font-medium">{name}</p>
      <p className="text-sm text-gray-400">USTDA: {ranking}</p>
      {onClick && (
        <button
          onClick={onClick}
          className="bg-orange-500 text-white text-xs md:text-sm py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
        >
          Track Progress
        </button>
      )}
    </div>
  );
}

export default ProfileCard;
