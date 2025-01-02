import road from "../../assets/svg/road.svg";
import { FaStar, FaUserAlt, FaClock } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import tennis from "../../assets/tennis.jpg";
import { getUserCourses, UserCoursesResponse } from "@/api/course.api";
import { useQuery } from "react-query";

interface CardProps {
  image: string; // URL of the image
  courseName: string;
  title: string;
  rating: number; // e.g., 5.0
  people: number; // e.g., 4000
  duration: string; // e.g., "2Hrs 25 Min"
}

function NewLearn() {
  const steps = ["01", "02", "03", "04"];

  const {
    data: allCourses,
    isLoading,
    isError,
  } = useQuery<UserCoursesResponse, Error>({
    queryKey: ["courses"],
    queryFn: getUserCourses,
  });

  const CardContainer: React.FC<CardProps> = ({
    image,
    courseName,
    title,
    rating,
    people,
    duration,
  }) => {
    return (
      <Card className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-1 hover:cursor-pointer">
        <CardContent className="flex justify-center">
          <img
            src={image}
            alt={courseName}
            className="w-64 h-40 rounded-sm object-cover shadow-md"
          />
        </CardContent>
        <CardFooter>
          <div className="pl-1">
            <p className="">{courseName}</p>
            <p className="text-gray-600">{title}</p>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FaStar className="text-[#ff9328]" />
              <p className="font-medium">{rating.toFixed(1)}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaUserAlt className="text-[#ff9328]" />
              <p className="font-medium">{people}</p>
            </div>
            <div className="flex items-center gap-1">
              <FaClock className="text-[#ff9328]" />
              <p className="font-medium">{duration}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-72">
        {allCourses?.courses.map((course, index) => (
          <div key={index} className="relative w-64">
            {/* card container */}
            <div
              className={`absolute  ${
                index % 2 !== 0 ? "top-4 -left-40" : "top-4 -right-72"
              }`}
            >
              <CardContainer
                image={course.courseId.videos[1]?.thumbnail}
                courseName={"Course  0" + (index + 1)}
                title="title"
                rating={5.0}
                people={4000}
                duration="2Hrs 25 Min"
              />
            </div>

            {/* Road SVG */}
            <img
              className={`w-64 ${
                index % 2 !== 0 ? "rotate-180 ml-[8.7rem]" : ""
              }`}
              src={road}
              alt="Road"
            />

            {/* Step indicator */}
            {index === 0 ? (
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-10" : "-right-24"
                } top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full text-2xl border-2 border-[#ff9328] bg-gradient-to-b from-[#F8B16A] to-[#F28A26] flex items-center justify-center font-bold text-white shadow-xl shadow-[#F28A26]`}
              >
                {index + 1}
              </div>
            ) : (
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-10" : "-right-24"
                } top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-full text-2xl border-2 border-gray-500 bg-gray-400 flex items-center justify-center font-bold text-white shadow-lg shadow-gray-200/50`}
              >
                {index + 1}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewLearn;
