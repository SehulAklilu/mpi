import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Module, UserCourseProgress } from "@/types/course.types";
import { FaClock, FaStar, FaUserAlt } from "react-icons/fa";
interface CardProps {
  course: Module;
  onclick: () => void;
}
export const CardContainer: React.FC<CardProps> = ({ course, onclick }) => {
  // const durationInSeconds = course.courseId.videos.reduce(
  //   (acc, video) => acc + video.duration,
  //   0
  // );
  const durationInSeconds = 3234222;

  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const formattedDuration = `${hours > 0 ? `${hours}Hr ` : ""}${minutes}Min`;
  return (
    <Card
      onClick={() => onclick()}
      className="border w-40 md:w-fit rounded-lg shadow-xl hover:shadow-xl transition-shadow duration-300 p-1 hover:cursor-pointer"
    >
      <CardContent className="flex justify-center p-1">
        <img
          src={course.thumbnail}
          alt="course"
          className="w-40 h-24 md:w-96 md:h-44 rounded-xl object-cover shadow-md"
        />
      </CardContent>
      <CardFooter>
        <div className="px-4">
          {/* <p className="">{course.}</p> */}
          <p className=" hidden md:block text-[#1c1d47] font-bold py-1">
            {course.title?.length > 35
              ? course.title.slice(0, 35) + "..."
              : course.title}
          </p>
          <p className="  md:hidden text-[#1c1d47] text-xs ">
            {course.title?.length > 18
              ? course.title.slice(0, 18) + "..."
              : course.title}
          </p>
        </div>
        {/* <div className="flex justify-between px-4 text-xs md:text-base items-center text-[#1c1d47]">
          <div className="flex items-center gap-1">
            <FaStar className="text-[#ff9328]" />
            <p className=" md:font-medium ">5</p>
          </div>
          <div className="flex items-center gap-1">
            <FaUserAlt className="text-[#ff9328]" />
            <p className=" md:font-medium">4000</p>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-[#ff9328]" />
            <p className=" md:font-medium">{formattedDuration}</p>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
};
