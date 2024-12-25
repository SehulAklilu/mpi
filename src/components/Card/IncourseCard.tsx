import sampleThumbnail from "../../assets/user_1.jpg";
import MaterialIcon from "../Icon/MaterialIcon";

const IncourseCard = () => {
  return (
    <div className="hover:bg-gray-100 duration-300 hover:shadow-md cursor-pointer rounded-md">
      <div className="flex max-sm:flex-col gap-5">
        {/* Make sure the parent has a fixed height */}
        <div className="rounded-lg max-sm:w-full  max-sm:h-[200px] h-[100px]  w-[200px] z-50 relative">
          <img
            className="h-full rounded-lg w-full object-cover" // Ensure the image takes full width and height of the container
            src={sampleThumbnail}
            alt=""
          />
          <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-black/20" />
          <MaterialIcon
            className="text-white absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl"
            icon="play_circle"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 py-4">
          <p className="text-lg font-normal">Lesson Title</p>
          <p className="text-sm font-extralight max-w-full">
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncourseCard;
