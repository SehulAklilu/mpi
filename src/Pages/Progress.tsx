import img from "@/assets/progress/Frame 1171276020.svg";
import img1 from "@/assets/progress/muscle-svgrepo-com 1.svg";
import img2 from "@/assets/images/video_tumnail.png";
import img3 from "@/assets/progress/target-arrow-svgrepo-com 1.svg";
import img4 from "@/assets/progress/flame.svg";
import img5 from "@/assets/progress/tennis-ball-svgrepo-com 1.svg";
import Calendar from "@/components/Progress/MyCalendar/Calendar";
import { FaClock, FaStar } from "react-icons/fa6";
import { useQuery } from "react-query";
import { getUserCourses, UserCoursesResponse } from "@/api/course.api";
import { UserCourseProgress } from "@/types/course.types";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
const Progress = () => {
  const {
    data: allCourses,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<UserCoursesResponse, Error>({
    queryKey: ["courses"],
    queryFn: getUserCourses,
  });

  return (
    <ContentLayout>
      <div className="px-4 py-12">
        <div className="flex max-md:flex-col w-full">
          <div className="w-3/5 max-md:w-full bg-gradient-to-b from-[#F8B36D] to-[#F28822]  text-white rounded-xl py-4">
            <div className="flex justify-around gap-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <img className="max-md:w-[70px]" src={img} alt="" />
                <div className="mt-1 text-lg font-semibold">3 Courses</div>
                <div className="text-sm">Completed</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <img className="max-md:w-[70px]" src={img3} alt="" />
                <div className="mt-1 text-lg font-semibold">85%</div>
                <div className="text-sm">Accuracy</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <img className="max-md:w-[70px]" src={img} alt="" />
                <div className="mt-1 text-lg font-semibold">3 Courses</div>
                <div className="text-sm">Completed</div>
              </div>
            </div>
            <div className="w-full px-4  mt-5">
              <div className="w-full flex justify-around py-4 bg-white text-primary rounded-xl">
                <div className="flex flex-col items-center justify-center gap-1">
                  <img className="max-md:w-[70px]" src={img1} alt="" />
                  <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                    18
                  </div>
                  <div className="text-sm">USTA</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <img className="max-md:w-[70px]" src={img4} alt="" />
                  <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                    34 Days
                  </div>
                  <div className="text-sm">USTA</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <img className="max-md:w-[70px]" src={img5} alt="" />
                  <div className="text mt-1 text-3xl max-md:text-lg font-bold">
                    Top 18%
                  </div>
                  <div className="text-sm">USTA</div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-md:mt-6">
            <Calendar
              reminders={[]}
              dateFilter={new Date()}
              setDateFilter={() => {}}
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">Courses</div>
            <div className="underline text-primary">View All</div>
          </div>
          <div className="mt-3 flex overflow-auto">
            {isSuccess && (
              <>
                {allCourses.courses.map((course) => (
                  <Course key={course._id} course={course} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

const Course = ({ course }: { course: UserCourseProgress }) => {
  let num = 0;
  course.assessments.map((a) => {
    a.status == "passed" ? num++ : null;
  });
  const percentage = (num / course.assessments.length) * 100;
  return (
    <Link
      to={"/course/" + course._id}
      className="flex min-w-[300px] max-w-[300px] flex-col gap-1 p-2 rounded-2xl bg-white"
    >
      <img
        className="rounded-2xl h-[200px] object-cover"
        src={course.courseId.videos[1].thumbnail}
        alt=""
      />
      <div className="text-gray-500">Inst. Damian</div>
      <div>{course.courseId.title}</div>
      <div className="flex gap-3">
        <div className="flex gap-1 text-sm justify-center items-center">
          <FaStar className="text-primary" />
          <div>5.0</div>
        </div>
        <div className="flex gap-1 text-sm justify-center items-center">
          <FaUserAlt className="text-primary" />
          <div>400</div>
        </div>
        <div className="flex gap-1 text-sm justify-center items-center">
          <FaClock className="text-primary" />
          <div>5 Min</div>
        </div>
      </div>
      <div className="mt-auto">
        <div className="flex justify-between text-sm">
          <div>Progress</div>
          <div>{percentage}%</div>
        </div>
        <div className="h-3 w-full border rounded-xl">
          <div
            className={`w-[${
              percentage == 0 ? "1" : percentage
            }%] rounded-xl bg-primary h-full`}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default Progress;
