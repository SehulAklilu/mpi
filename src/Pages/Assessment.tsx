import { getCourse, Question, updateAssessmentStatus } from "@/api/course.api";
import AssessmentComponent from "@/components/Assessment/assessment";
import ReadMore from "@/components/common/ReadMore";
import InstructorCard from "@/components/Learn/InstructorCard";
import VideoListItem from "@/components/Learn/VideoListItem";
import { Assessment as AssessmentProps } from "@/types/course.types";
import { useState } from "react";
import {
  FaClock,
  FaDownload,
  FaFilePdf,
  FaLink,
  FaQuestion,
} from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import instructor from "../assets/user.jpeg";
import { TbReload } from "react-icons/tb";
import LessonDetailSkeleton from "@/components/Learn/LessonDetailSkeleton";

const AssessmentSummary = ({
  assessment,
}: {
  assessment: AssessmentProps | undefined;
}) => {
  if (!assessment) {
    return null;
  }
  return (
    <div>
      <div
        key={assessment._id}
        className="grid grid-cols-2 gap-2 text-gray-800 "
      >
        {/* <div className="flex items-center w-fit gap-2">
          <FaBook color="#ff9328" />
          <span className="">{assessment.title}</span>
        </div> */}
        <div className="flex items-center gap-2">
          <FaQuestion color="#ff9328" />
          <span className="">{assessment.questions.length} Questions</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-[#ff9328]" />
          <span className="">{assessment.timeLimit} minutes</span>
        </div>
        <div className="flex items-center gap-2 ">
          <TbReload color="#ff9328" />
          <span className=""> {assessment.attemptsAllowed} Attempt</span>
        </div>
      </div>
    </div>
  );
};

function Assessment() {
  const { course_id, assessment_id } = useParams();
  const [selectedAssessment, setSelectedAssessment] = useState<
    AssessmentProps | undefined
  >(undefined);
  const navigate = useNavigate();

  const {
    data: selected_course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", course_id],
    queryFn: () => getCourse(course_id!),
    onSuccess: (data) =>
      setSelectedAssessment(() =>
        data?.course.courseId.assessments.find(
          (assessment) => assessment._id == assessment_id
        )
      ),
  });
  interface MutationVariables {
    params: {
      course_id: string;
      assessment_id: string;
    };
    payload: Question[];
  }

  const updateAssessment = useMutation({
    mutationKey: ["update-assessment"],
    mutationFn: ({ params, payload }: MutationVariables) =>
      updateAssessmentStatus(params, payload),
    onSuccess: () => {
      goToNext();
    },
  });

  const handleNext = (answers: Question[]) => {
    if (course_id && assessment_id) {
      const params = { course_id, assessment_id };
      updateAssessment.mutate({ params, payload: answers });
    }
  };

  const goToNext = () => {
    const course = selected_course?.course.courseId;

    if (!selectedAssessment || !course) return;

    const connectedVideo = course.videos.find(
      (video) => video._id === selectedAssessment.connectedVideoId
    );

    if (connectedVideo) {
      const currentIndex = course.videos.findIndex(
        (video) => video._id === connectedVideo._id
      );

      if (currentIndex < course.videos.length - 1) {
        const nextVideo = course.videos[currentIndex + 1];
        navigate(`/course/${course.id}/video/${nextVideo._id}`);
      } else if (course.nextCourse) {
        navigate(`/course/${course.nextCourse}`);
      } else {
        console.log("No next video or course");
      }
    } else {
      console.log("No connected video for this assessment");
    }
  };

  if (isLoading) {
    return <LessonDetailSkeleton />;
  }

  return (
    <div>
      <div className="relative w-full min-h-[50vh] bg-white">
        {selectedAssessment ? (
          <AssessmentComponent
            assessment={selectedAssessment}
            onContinue={(answers) => handleNext(answers)}
            assessmentPage={false}
            isLoading={updateAssessment.isLoading}
          />
        ) : null}
      </div>
      <div className="grid grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
        <div className="col-span-6 lg:col-span-4 order-2 lg:order-1">
          <h1 className="text-2xl font-semibold">
            {selectedAssessment?.title}
          </h1>
          {/* instructor */}
          <InstructorCard
            name="Damian"
            role="Instructor"
            image={instructor}
            rating={5}
            students={40000}
            duration="2 Hrs 15Min"
          />
          {/* course summary */}
          <div className="pt-2 ">
            <h1 className="text-lg">Summary</h1>
            <div className="grid grid-cols-2 gap-x-10 my-2 gap-y-4">
              <AssessmentSummary assessment={selectedAssessment} />
            </div>
          </div>
          <div className="pt-2 ">
            <ReadMore
              text={selectedAssessment?.description ?? ""}
              previewLength={300}
            />
          </div>
          {/* resources */}

          <div className="my-2">
            <h1 className="text-lg">Resources</h1>
            <div className="w-fit text-gray-800">
              <div className="flex gap-x-10 py-1 cursor-pointer">
                <div className="flex gap-x-1">
                  <FaFilePdf color="#FFAC64" />
                  <span>Note-1</span>
                </div>
                <FaDownload />
              </div>
              <div className="flex gap-x-10 py-1 cursor-pointer">
                <div className="flex gap-x-1">
                  <FaFilePdf color="#FFAC64" />
                  <span>Slide-1</span>
                </div>
                <FaDownload />
              </div>
              <div className="flex gap-x-2 py-1 cursor-pointer">
                <FaLink color="#FFAC64" />
                <span className="underline">Link to a webpage/blog</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-2 order-1 lg:order-2 p-2 bg-[#F8F9FA] rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold bg-[#ff9328]">
              01
            </div>
            <p className="text-[#152946] text-xl font-semibold">Introduction</p>
          </div>
          {selected_course?.course.courseId.videos.map((video, index) => {
            const assessment = video.hasAssessmentNext
              ? selected_course.course.courseId.assessments.find(
                  (a) => a._id === video.assessmentId
                )
              : null;

            return (
              <div key={video._id}>
                <VideoListItem
                  label={video.title}
                  duration={video.duration}
                  identifier={"0" + (index + 1)}
                  onPlay={() => {
                    const videoExists = selected_course?.course.videos.find(
                      (vid) => vid.videoId === video._id
                    );

                    if (videoExists && videoExists.status !== "locked") {
                      navigate(
                        `/course/${selected_course.course.courseId.id}/video/${video._id}`
                      );
                    }
                  }}
                />
                {video.hasAssessmentNext && assessment && (
                  <VideoListItem
                    label={assessment.title?.slice(0, 30)}
                    duration={assessment.timeLimit}
                    active={assessment._id === assessment_id}
                    onPlay={() => {
                      const assessmentExists =
                        selected_course?.course.assessments.find(
                          (asses) => asses.assessmentId === assessment._id
                        );

                      if (
                        assessmentExists &&
                        assessmentExists.status !== "locked"
                      ) {
                        navigate(
                          `/course/${selected_course.course.courseId.id}/assessment/${assessment._id}`
                        );
                      }
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Assessment;
