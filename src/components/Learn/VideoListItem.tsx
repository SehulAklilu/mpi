import { FC } from "react";
import { FaPlayCircle, FaLock } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { FaCheckDouble } from "react-icons/fa6";
import { HiQuestionMarkCircle } from "react-icons/hi";

interface VideoListItemProps {
  label: string;
  duration: number;
  identifier?: string;
  onPlay: () => void;
  active?: boolean;
  status?: string;
  type?: string;
}

const VideoListItem: FC<VideoListItemProps> = ({
  label,
  duration,
  identifier,
  onPlay,
  active,
  status,
  type,
}) => {
  return (
    <div
      onClick={onPlay}
      className={`white flex justify-between items-center cursor-pointer rounded-xl my-2 p-2 hover:bg-[#ff9328] ${
        active ? "bg-[#ff9328]" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="h-14 w-14 rounded-full bg-[#EFF0FE] font-bold text-3xl text-[#152946] flex justify-center items-center">
          {identifier ? identifier : <GoGoal />}
        </div>
        <div>
          <p className="font-semibold text-[#1c1d47]">{label}</p>
          <p className="text-xs">{duration} Min</p>
        </div>
      </div>
      {status === "locked" ? (
        <FaLock size={24} />
      ) : status === "completed" ? (
        <FaCheckDouble
          className="text-green-700"
          size={24}
          style={{ cursor: "pointer" }}
        />
      ) : type !== "quiz" ? (
        <FaPlayCircle
          className="text-[#ff9328]"
          size={24}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <HiQuestionMarkCircle
          className="text-[#ff9328]"
          size={24}
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default VideoListItem;
