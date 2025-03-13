import React from "react";
import profile_img from "../../assets/avater.jpg";
import { Player } from "@/types/match.type";

interface ProfileCardInterface {
  player?: Player;
  name?: string;
  isObject: boolean;
  showBorder?: boolean;
}

function ProfileCard({
  player,
  name,
  isObject,
  showBorder = true,
}: ProfileCardInterface) {
  return (
    <div
      className={`w-36 h-32 md:w-64 md:h-44 flex flex-col border justify-center  items-center gap-y-1  rounded-lg shadow ${
        showBorder ? "shadow-[#F38C28] border-[#ffb871] " : ""
      } `}
    >
      {isObject ? (
        <>
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            src={player?.avatar}
            alt=""
          />
          <p className="text-center">
            {player?.firstName} {player?.lastName}
          </p>
          <p className="text-xs text-gray-400">USTDA: 18</p>
        </>
      ) : (
        <>
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            src={profile_img}
            alt=""
          />
          <p className="text-center">{name}</p>
          <p className="text-xs text-gray-400">USTDA: 18</p>
        </>
      )}
    </div>
  );
}

export default ProfileCard;
