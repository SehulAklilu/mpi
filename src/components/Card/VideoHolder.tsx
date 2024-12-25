import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import thumbnail from "../../assets/images/video_tumnail.png";

interface VideoHolderProps {
  thumbnail: string;
  videoTitle: string;
  videoSize: string;
  onClick: () => void;
}
const VideoHolder: FC<VideoHolderProps> = ({
  // thumbnail,
  videoTitle,
  videoSize,
  onClick,
}) => {
  return (
    <div className="flex hover:bg-gray-100  flex-row justify-between items-center pr-7">
      <div className="flex flex-row gap-2">
        <div className="relative">
          <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-black/20" />
          <MaterialIcon
            className="text-white absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl"
            icon="play_circle"
          />

          <img
            className="w-[5rem] h-[4.5rem] rounded-lg"
            src={thumbnail ?? ""}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-semibold">{videoTitle}</p>
          <p className="">{videoSize}</p>
        </div>
      </div>
      <div className="">
        <MaterialIcon
          onClick={onClick}
          className="text-Grey text-3xl hover:text-primary cursor-pointer"
          icon="download_for_offline"
        />
      </div>
    </div>
  );
};

export default VideoHolder;
