import React from "react";
import profile_img from "../../assets/user.jpeg";
import { Player } from "@/types/match.type";

interface ProfileCardInterface {
  player?: Player;
  name?: string;
  isObject: boolean;
}

function ProfileCard({ player, name, isObject }: ProfileCardInterface) {
  return (
    <div className="w-64 h-44 flex flex-col border border-[#ffb871] items-center gap-y-1 justify-center rounded-lg shadow shadow-[#F38C28]">
      {isObject ? (
        <>
          <img className="w-16 h-16 rounded-full" src={player?.avatar} alt="" />
          <p>
            {player?.firstName} {player?.lastName}
          </p>
          <p className="text-xs text-gray-400">USTDA: 18</p>
          {/* {onClick && (
          <button
            onClick={onClick}
            className="bg-orange-500 text-white text-xs md:text-sm py-2 px-3 rounded-md hover:bg-orange-600 transition-colors"
          >
            Track Progress
          </button>
        )} */}
        </>
      ) : (
        <div className="flex items-center justify-center font-bold text-xl">
          {name}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
