import TennisBall from "../../components/Tennis Ball/TennisBall";
import VideoCard from "../../components/Card/VideoCard";
import Button from "../../components/Button/Button";
import AssignmentCard from "../../components/Card/AssignmentCard";
import { useState, useEffect } from "react";
import "./learn.css";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { UserCourseProgress } from "@/types/course.types";
import { getUserCourses, UserCoursesResponse } from "@/api/course.api";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const Learn = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<
    UserCourseProgress | undefined
  >(undefined);
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const positions = ["left", "center", "right", "center"];

  const {
    data: allCourses,
    isLoading,
    isError,
  } = useQuery<UserCoursesResponse, Error>({
    queryKey: ["courses"],
    queryFn: getUserCourses,
  });

  const SideBarCon = ({
    selectedCourse,
    modal,
  }: {
    selectedCourse: UserCourseProgress;
    modal: boolean;
  }) => {
    return (
      <>
        <div className="flex flex-col p-4  gap-1">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-semibold">
              {selectedCourse.courseId.title}
            </p>
            {modal ? (
              <Button
                type={"button"}
                buttonText={"Get Started"}
                backgroundStyleOn={true}
                buttonStyle={"bottom-2 z-10 "}
                onclick={() => {
                  navigate(`/course/${selectedCourse.courseId.id}`);
                }}
                small
              />
            ) : null}
          </div>

          <p className="font-light text-sm">
            {selectedCourse.courseId.description}
          </p>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <p className="text-lg font-semibold ">Lesson</p>
          {selectedCourse.courseId.videos.length > 0 ? (
            selectedCourse.courseId.videos.map((video) => (
              <div key={video._id}>
                <VideoCard video={video} />
                {video.hasAssessmentNext && <AssignmentCard />}
              </div>
            ))
          ) : (
            <p>No videos available for this course.</p>
          )}
          {modal ? null : (
            <Button
              type={"button"}
              buttonText={"Get Started"}
              backgroundStyleOn={true}
              buttonStyle={"w-full sticky bottom-2 z-10"}
              onclick={() => {
                navigate(`/course/${selectedCourse.courseId.id}`);
              }}
            />
          )}
        </div>
      </>
    );
  };

  // Update videos when activeIndex changes
  useEffect(() => {
    const current_course = allCourses?.courses.find(
      (course) =>
        (course.status === "started" && !course.assessmentsFinished) ||
        course.status === "unlocked"
    );
    setSelectedCourse(current_course);
    if (activeIndex) {
      const selectedCourse = allCourses?.courses.find(
        (course) => course._id === activeIndex
      );
      setSelectedCourse(selectedCourse);
    }
  }, [activeIndex, allCourses]);

  // to update the dialgo
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 800px)");

    const handleScreenSizeChange = () => {
      const isSmall = mediaQuery.matches;
      setIsSmallScreen(isSmall);

      if (!isSmall) {
        setOpen(false);
      }
    };

    handleScreenSizeChange();
    mediaQuery.addEventListener("change", handleScreenSizeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  if (isLoading || isError) {
    return <>Loading</>;
  }

  return (
    <div className="grid grid-cols-6 font-raleway">
      <div
        className={cn(
          "col-span-6 md:col-span-4 flex flex-col items-center gap-5 relative h-[calc(100vh_-5rem)] overflow-y-scroll overflow-x-hidden custom-scrollbar sm:px-4 md:px-20 lg:px-32"
        )}
      >
        {/* Render TennisBall components */}
        {allCourses?.courses.map((course, index) => (
          <TennisBall
            key={course._id}
            isActive={
              (course.status === "started" && !course.assessmentsFinished) ||
              course.status === "unlocked"
            }
            isCompleted={course.assessmentsFinished}
            onclick={() => {
              setActiveIndex(course._id);
              if (isSmallScreen) {
                setOpen(true);
              }
            }}
            title={course.courseId.title}
            position={positions[index % positions.length]}
          />
        ))}
      </div>
      <div
        className={cn(
          "col-span-2 bg-white h-[calc(100vh_-5rem)] rounded-tl-lg rounded-bl-lg shadow-l-gray-40 hidden md:flex flex-col gap-0 overflow-y-scroll overflow-x-hidden custom-scrollbar-two "
        )}
      >
        {selectedCourse ? (
          <SideBarCon selectedCourse={selectedCourse} modal={false} />
        ) : null}
      </div>
      <div className="block md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-[90%] h-[90%] overflow-y-scroll overflow-x-hidden custom-scrollbar-two rounded-lg">
            {selectedCourse ? (
              <SideBarCon selectedCourse={selectedCourse} modal={true} />
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Learn;
