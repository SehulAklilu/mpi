import { useNavigate, useParams } from "react-router-dom";
import AssignmentCard from "../components/Card/AssignmentCard";
import IncourseAssignment from "../components/Card/IncourseAssignment";
import IncourseCard from "../components/Card/IncourseCard";
import VideoCard from "../components/Card/VideoCard";
import LearnNotes from "../components/Learn/LearnNotes";
import LearnResources from "../components/Learn/LearnResources";
import Navbar from "../components/Navbar/Navbar";
import Tabs from "../components/Tabs/Tabs";
import { useQuery } from "react-query";
import { getCourse } from "@/api/course.api";

const Foundation = () => {
  const navigate = useNavigate();
  const { course_id } = useParams<{ course_id: string }>();

  const {
    data: selectedCourse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", course_id],
    queryFn: () => getCourse(course_id!),
    enabled: !!course_id,
  });

  if (isLoading || isError) {
    return <>Loading</>;
  }
  return (
    <div className="bg-background h-screen font-raleway">
      <Navbar
        common={true}
        commonHeader={selectedCourse?.course.courseId.title}
      />
      <div className="flex flex-col lg:flex-row  justify-between md:px-7 gap-10 px-3 ">
        <div className=" lg:w-[55%]  flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <p className="text-lg font-semibold">About</p>
            <p className="font-light text-sm leading-7 max-w-[85%]">
              {selectedCourse?.course.courseId.description}
            </p>
          </div>
          <div className="flex flex-col gap-5 pb-12">
            <p className="text-lg font-semibold">Lesson</p>
            {selectedCourse?.course.courseId.videos.map((video) => (
              <>
                <IncourseCard
                  onClick={() => {
                    navigate(
                      `/course/${selectedCourse?.course.courseId.id}/video/${video._id}`
                    );
                  }}
                  video={video}
                />
                {video.hasAssessmentNext && <IncourseAssignment />}
              </>
            ))}
          </div>
        </div>
        <div className=" lg:w-[45%] pb-20">
          <Tabs
            children={[<LearnNotes />, <LearnResources />]}
            tabs={["Notes", "Resources"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Foundation;
