import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserCourseProgress } from "@/types/course.types";
import { FaClock, FaStar, FaUserAlt } from "react-icons/fa";
interface CardProps {
  course: UserCourseProgress;
  onclick: () => void;
}
export const CardContainer: React.FC<CardProps> = ({ course, onclick }) => {
  const durationInSeconds = course.courseId.videos.reduce(
    (acc, video) => acc + video.duration,
    0
  );

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
          src={course.courseId.videos[1].thumbnail}
          alt="course"
          className="w-40 h-24 md:w-96 md:h-44 rounded-xl object-cover shadow-md"
        />
      </CardContent>
      <CardFooter>
        <div className="px-4 hidden md:block">
          {/* <p className="">{course.}</p> */}
          <p className="text-[#1c1d47] font-bold py-1">
            {course.courseId.title?.length > 35
              ? course.courseId.title.slice(0, 35) + "..."
              : course.courseId.title}
          </p>
        </div>
        <div className="flex justify-between px-4 items-center text-[#1c1d47] font-bold">
          <div className="flex items-center gap-1">
            <FaStar className="text-[#ff9328]" />
            <p className="font-medium">5</p>
          </div>
          <div className="flex items-center gap-1">
            <FaUserAlt className="text-[#ff9328]" />
            <p className="font-medium">4000</p>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="text-[#ff9328]" />
            <p className="font-medium">{formattedDuration}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
