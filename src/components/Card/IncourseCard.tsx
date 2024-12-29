import { Video } from "@/types/course.types";
import sampleThumbnail from "../../assets/user_1.jpg";
import MaterialIcon from "../Icon/MaterialIcon";

interface IncourseCardProps {
  onClick: () => void;
  video: Video;
}

const IncourseCard = ({ onClick, video }: IncourseCardProps) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-gray-100 duration-300 hover:shadow-md cursor-pointer rounded-md"
    >
      <div className="grid grid-cols-4 max-sm:flex-col gap-4">
        {/* Make sure the parent has a fixed height */}
        <div className="col-span-1 rounded-lg max-sm:w-full  max-sm:h-[200px] h-[100px] z-50 relative">
          <img
            className="h-full rounded-lg w-full object-cover" // Ensure the image takes full width and height of the container
            src={video.thumbnail}
            alt="thumbnail"
          />
          <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-black/20" />
          <MaterialIcon
            className="text-white absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
            icon="play_circle"
          />
        </div>
        <div className="col-span-3 flex flex-col justify-center gap-1">
          <p className="text-lg font-normal">{video.title}</p>
          <p className="text-sm font-extralight max-w-full line-clamp-3">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncourseCard;
