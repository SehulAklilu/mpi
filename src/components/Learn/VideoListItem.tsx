import { FC } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { GoGoal } from "react-icons/go";

interface VideoListItemProps {
  label: string;
  duration: number;
  identifier?: string;
  onPlay: () => void;
  active?: boolean;
}

const VideoListItem: FC<VideoListItemProps> = ({
  label,
  duration,
  identifier,
  onPlay,
  active,
}) => {
  // console.log("333333333333", active);
  return (
    <div
      onClick={onPlay}
      className={`bg-white flex justify-between items-center cursor-pointer rounded-xl my-2 p-2 hover:bg-[#ff9328] ${
        active ? "bg-[#ff9328]" : ""
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
      <FaPlayCircle
        className="text-[#ff9328]"
        size={24}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default VideoListItem;
