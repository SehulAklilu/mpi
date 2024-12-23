import sampleThumbnail from "../../assets/user_1.jpg";
import MaterialIcon from "../Icon/MaterialIcon";

const IncourseCard = () => {
  return (
    <div className="  cursor-pointer rounded-md   ">
      <div className="flex flex-row gap-5">
        <div
          className="rounded-lg"
          style={{
            position: "relative",
            backgroundImage: `url(${sampleThumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "17%",
            height: "100px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <MaterialIcon
            className="text-white absolute z-30 top-1/4 left-1/3 text-4xl"
            icon="play_circle"
          />
        </div>
        <div className="flex flex-col justify-center gap-1 ">
          <p className="text-lg font-normal">Lesson Title</p>
          <p className="text-sm font-extralight max-w-[65%]">
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
