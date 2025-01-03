import road from "../../assets/svg/road.svg";
import tennis from "../../assets/tennis.jpg";
import {
  FaStar,
  FaUserAlt,
  FaClock,
  FaMicrophone,
  FaPlayCircle,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getUserCourses, UserCoursesResponse } from "@/api/course.api";
import { useQuery } from "react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailCard from "@/components/Learn/DetailCard";
import { IoBriefcase } from "react-icons/io5";
import ReadMore from "@/components/common/ReadMore";
import InstructorCard from "@/components/Learn/InstructorCard";
import ReactPlayer from "react-player";

interface CardProps {
  image: string; // URL of the image
  courseName: string;
  title: string;
  rating: number; // e.g., 5.0
  people: number; // e.g., 4000
  duration: string; // e.g., "2Hrs 25 Min"
}

function NewLearn() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      <Card
        onClick={() => setOpen(true)}
        className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-1 hover:cursor-pointer "
      >
        <CardContent className="flex justify-center">
          <img
            src={image}
            alt={courseName}
            className="w-52 sm:w-96 sm:h-44 rounded-sm object-cover shadow-md"
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

  const details = [
    { icon: <FaUserAlt />, label: "Introduction" },
    { icon: <FaMicrophone />, label: "English" },
    { icon: <FaPlayCircle />, label: "4 Lessons (1Hr 30Min)" },
    { icon: <IoBriefcase />, label: "2 Additional resources" },
  ];

  return (
    <div className="flex flex-col items-center justify-center lg:pr-24 py-4">
      <div className="w-72">
        {allCourses?.courses.map((course, index) => (
          <div key={index} className="relative w-64">
            {/* card container */}
            <div
              className={`absolute  ${
                index % 2 !== 0
                  ? "top-0 -left-20 sm:-left-72"
                  : "top-0 -right-44 sm:-right-[27rem]"
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] max-h-[95%] overflow-y-scroll overflow-x-hidden custom-scrollbar-two rounded-lg bg-white">
          <CardHeader>
            <img
              src="https://cdn.create.vista.com/api/media/small/206135578/stock-video-close-tennis-equipment-court-sport-recreation-concept-yellow-racket-tennis?videoStaticPreview=true&token="
              alt="sdl"
              className="w-full h-52 object-cover  rounded-md"
            />
            {/* <ReactPlayer
              url="https://www.youtube.com/watch?v=Hr2f8dmiwpU"
              controls={true}
              width="100%"
              height="100%"
              light="https://example.com/thumbnail.jpg"
            /> */}
          </CardHeader>
          <CardContent className="text-[#1c1d47]">
            <h1 className="text-2xl font-semibold">
              Introductionto Professional Tennis
            </h1>

            {/* instructor */}
            <InstructorCard
              name="Damian"
              role="Instructor"
              image={tennis}
              rating={5}
              students={40000}
              duration="2 Hrs 15Min"
            />

            {/* containt */}
            <div>
              <h1 className="text-lg font-semibold">Introduction</h1>
              <ReadMore
                text=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                saepe assumenda odio voluptates dolore accusamus, delectus illum
                eligendi dolor voluptatum quis suscipit rerum dolores,
                cupiditate cum repellat architecto? Perferendis, dignissimos."
                previewLength={100}
              />
            </div>
            {/* detail */}
            <DetailCard title="Details" details={details} />

            {/* about the teacher */}
            <div>
              <h1 className="text-lg font-semibold">About the Teacher</h1>
              <ReadMore
                text=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
                saepe assumenda odio voluptates dolore accusamus, delectus illum
                eligendi dolor voluptatum quis suscipit rerum dolores,
                cupiditate cum repellat architecto? Perferendis, dignissimos."
                previewLength={100}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button
              onClick={() => navigate("course/662e17510ac8163154d7bae2")}
              className=" px-10 py-2 mt-6 shadow rounded-3xl bg-primary text-white !w-full "
            >
              Explore
            </Button>
          </CardFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewLearn;
