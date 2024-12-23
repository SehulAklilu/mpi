import { FC } from "react";
import MaterialIcon from "../Icon/MaterialIcon";
import user from "../../assets/googleIcon.png";

interface VideoHolderProps {
  thumbnail: string;
  videoTitle: string;
  videoSize: string;
  onClick: () => void;
}
const VideoHolder: FC<VideoHolderProps> = ({
  thumbnail,
  videoTitle,
  videoSize,
  onClick,
}) => {
  return (
    <div className="flex flex-row justify-between items-center pr-7">
      <div className="flex flex-row gap-2">
        <div className="">
          <img className="w-[4.5rem] h-[4.5rem]" src={thumbnail ?? ""} alt="" />
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
