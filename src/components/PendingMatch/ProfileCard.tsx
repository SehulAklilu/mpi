import React from "react";
import profile_img from "../../assets/user.jpeg";

interface ProfileCardInterface {
  profile_url?: string;
  name: string;
  ranking: number;
}

function ProfileCard({ profile_url, name, ranking }: ProfileCardInterface) {
  return (
    <div className="w-52 h-36 flex flex-col border border-[#ffb871] items-center gap-y-1 justify-center rounded-lg shadow shadow-[#F38C28]">
      <img className="w-16 h-16 rounded-full" src={profile_img} alt=""/>
      <p>{name}</p>
      <p className="text-xs text-gray-400">USTDA: {ranking}</p>
    </div>
  );
}

export default ProfileCard;
