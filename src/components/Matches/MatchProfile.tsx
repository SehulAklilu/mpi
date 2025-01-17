import React from "react";
import profile_img from "../../assets/user.jpeg";
import { FaBaseball } from "react-icons/fa6";

interface ProfileCardInterface {
  profile_url?: string;
  name: string;
  ranking: number;
  vs?: boolean;
  server?: boolean;
  onClick?: () => void;
}

function MatchProfile({
  profile_url,
  name,
  ranking,
  server = false,
  onClick,
  vs = false,
}: ProfileCardInterface) {
  const sty = vs
    ? "shadow shadow-[#F38C28] bg-primary text-white border-[#ffb871]"
    : "shadow shadow-[#F38C28] border-[#ffb871]";
  return (
    <div
      className={
        "w-52 relative px-6 py-6 flex flex-col border  items-center gap-y-1 justify-center rounded-lg  " +
        sty
      }
    >
      {server && (
        <FaBaseball
          className={` ${!vs ? "text-primary" : "text-white"} absolute right-5 top-5  `}
          size={25}
        />
      )}
      <img className="w-16 h-16 rounded-full" src={profile_img} alt="" />
      <p>{name}</p>
      <p className={`text-xs ${vs ? "text-gray-200" : "text-gray-600"} `}>
        USTDA: {ranking}
      </p>
      {onClick && (
        <button
          onClick={onClick}
          className="bg-orange-500 text-white text-xs md:text-sm py-2 px-3 rounded-md hover:bg-orange-600 transition-colors"
        >
          Progress
        </button>
      )}
    </div>
  );
}

export default MatchProfile;
