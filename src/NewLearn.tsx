import { useQuery } from "react-query";
import tennisBall from "./assets/tennis-ball.svg";
import { ContentLayout } from "./components/Sidebar/contenet-layout";
import { MdLockOutline } from "react-icons/md";
import { ModuleResponse } from "./types/course.types";
import { getUserCoursesNew } from "./api/course.api";
import { useNavigate } from "react-router-dom";

const TennisCourtLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full min-h-screen bg-[#ECF1E9]">
      {/* Tennis Court Container */}
      <div className="absolute inset-0 w-full h-full border-4 border-white pointer-events-none">
        {/* Singles Sidelines */}
        <div className="absolute top-0 bottom-0 left-[17%] border-l-2 border-white"></div>
        <div className="absolute top-0 bottom-0 right-[17%] border-l-2 border-white"></div>

        {/* Service Boxes (Top and Bottom) */}
        <div className="absolute top-[25%] w-[65%] left-1/2 right-1/2 -translate-x-1/2 border-t-2 border-white"></div>
        <div className="absolute bottom-[25%] w-[65%] left-1/2 right-1/2 -translate-x-1/2 border-t-2 border-white"></div>

        {/* Net */}
        <div className="absolute top-1/2 left-0 right-0 border-t-4 border-white -translate-y-1/2"></div>

        {/* Center Service Line */}
        <div className="absolute top-[25%] bottom-[25%] left-1/2 border-l-2 border-white -translate-x-1/2"></div>

        {/* Center Marks (small tick on baselines) */}
        <div className="absolute top-0 left-1/2 w-[2px] h-3 bg-white -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-[2px] h-3 bg-white -translate-x-1/2"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default function ModuleRoadmap() {
  const navigate = useNavigate();
  const {
    data: modules,
    isLoading,
    isError,
  } = useQuery<ModuleResponse, Error>({
    queryKey: ["courses"],
    queryFn: getUserCoursesNew,
  });

  const totalWeeks = modules?.[0]?.weeks?.length ?? 0;

  const completedWeeks =
    modules?.[0]?.weeks?.filter((w) => w.progress.status === "completed")
      .length ?? 0;

  const completedPercentage = totalWeeks
    ? (completedWeeks / totalWeeks) * 100
    : 0;

  return (
    <ContentLayout>
      <TennisCourtLayout>
        <div className="px-4 w-full pt-6 pb-10 min-h-screen">
          <div className="flex justify-between mx-1 sm:mx-4 md:mx-10  lg:mx-20 mb-6">
            <div className="bg-white px-4 py-2 rounded-xl shadow text-center w-1/2 md:w-1/3 mr-2">
              <p className="text-xs text-gray-500">Overall Progress</p>
              <p className="text-xl font-bold text-orange-500">
                {completedPercentage?.toFixed(2)}%
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-xl shadow text-center  w-1/2 md:w-1/3 ml-2">
              <p className="text-xs text-gray-500">Completed</p>
              <p className="text-xl font-bold text-purple-600">
                {completedWeeks}/{totalWeeks}
              </p>
            </div>
          </div>

          <div className="relative z-20 items-center w-[100%] sm:w-[90%] md:w-[80] lg:w-[70%] mt-4 mx-auto flex-col gap-12">
            {modules &&
              modules[0]?.weeks?.map((week, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={week._id}
                    className={`flex w-full ${
                      isLeft ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className="flex flex-col items-center text-center space-y-8 w-40 cursor-pointer"
                      onClick={() => {
                        if (week && week.progress.status !== "locked") {
                          navigate(`/course/${modules[0]?._id}/${week?._id}`);
                        }
                      }}
                    >
                      <div
                        className="relative w-20 h-20 bg-center bg-no-repeat bg-contain"
                        style={{ backgroundImage: `url(${tennisBall})` }}
                      >
                        {week.progress.status === "locked" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <MdLockOutline
                              size={34}
                              className="text-primary font-bold"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-xs md:text-base font-semibold text-gray-800">
                        {/* Week {week.weekNumber}:<br /> */}
                        <span className="text-xs md:text-base">
                          {week.title}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </TennisCourtLayout>
    </ContentLayout>
  );
}
