import React from "react";
import profile_img from "../../assets/avater.jpg";
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
        </>
      ) : (
        <>
          <img className="w-16 h-16 rounded-full" src={profile_img} alt="" />
          <p>{name}</p>
          <p className="text-xs text-gray-400">USTDA: 18</p>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
