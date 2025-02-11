import { getUserCourses, UserCoursesResponse } from "@/api/course.api";
import { useQuery } from "react-query";
import { Card, CardContent } from "../ui/card";
import { Clock, Star, Users } from "lucide-react";

function UserCourses() {
  const {
    data: allCourses,
    isLoading,
    isError,
  } = useQuery<UserCoursesResponse, Error>({
    queryKey: ["courses"],
    queryFn: getUserCourses,
  });
  if (isLoading || isError) {
    return "Loading";
  }
  return (
    <div className="p-4 flex flex-wrap justify-center gap-10">
      {allCourses?.courses.map((course) => (
        <Card className="w-full max-w-xs rounded-xl shadow-lg bg-white">
          <img
            src={course.courseId.videos[1]?.thumbnail}
            alt="Course Cover"
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <CardContent className="p-4 space-y-1">
            <p className="text-gray-500 text-sm">Inst. Damian</p>
            <h3 className="font-semibold ">
              Introduction to Professional Tennis
            </h3>
            <div className="flex items-center gap-x-4  text-gray-700 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>5.0</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>40k</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>1 Hr 30 Min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserCourses;
