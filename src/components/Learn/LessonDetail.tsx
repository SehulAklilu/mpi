import {
  getCourse,
  UpdateVideoParams,
  UpdateVideoPayload,
  updateVideoStatus,
} from "@/api/course.api";
import { Video } from "@/types/course.types";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import VideoListItem from "./VideoListItem";
import InstructorCard from "./InstructorCard";
import instructor from "../../assets/user.jpeg";
import ReadMore from "../common/ReadMore";
import { FaDownload, FaFilePdf, FaLink, FaPlayCircle } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import LessonDetailSkeleton from "./LessonDetailSkeleton";
import { ContentLayout } from "../Sidebar/contenet-layout";

function LessonDetail() {
  const { course_id, video_id } = useParams();
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<Video | undefined>(
    undefined
  );
  const {
    data: selected_course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", course_id],
    queryFn: () => getCourse(course_id!),
    onSuccess: () =>
      setSelectedVideo(() =>
        selected_course?.course.courseId.videos.find(
          (video) => video._id === video_id
        )
      ),
  });

  const {
    mutate: update_video_status,
    isLoading: update_video_loading,
    isError: update_video_error,
  } = useMutation<
    any,
    Error,
    { params: UpdateVideoParams; payload: UpdateVideoPayload }
  >({
    mutationKey: ["updateVideoStatus", course_id, video_id],
    mutationFn: ({ params, payload }) => updateVideoStatus(params, payload),
    onSuccess: () => {
      handleNext();
    },
    onError: (error: Error) => {
      console.error("Error updating video status:", error);
    },
  });

  const videoSummarys: { min: string; description: string }[] = [
    { min: "00:20", description: "average atomic mass" },
    { min: "04:56", description: "average atomic mass" },
    { min: "09:20", description: "average atomic mass" },
    { min: "12:45", description: "average atomic mass" },
    { min: "20:20", description: "average atomic mass" },
  ];

  const handlePrevious = () => {
    const course = selected_course?.course.courseId;
    if (!selectedVideo || !course) return;

    const currentIndex = course.videos.findIndex(
      (video) => video._id === selectedVideo._id
    );

    if (currentIndex > 0) {
      const prevVideo = course.videos[currentIndex - 1];
      navigate(`/course/${course.id}/video/${prevVideo._id}`);
    } else if (course?.prevCourse) {
      navigate(
        `/course/${course.prevCourse}/video/${
          course.videos[course.videos.length - 1]._id
        }`
      );
    } else {
      console.log("No previous video or course");
    }
  };

  const handleNext = () => {
    const course = selected_course?.course.courseId;

    if (!selectedVideo || !course) return;

    const videoStatus = selected_course.course.videos.find(
      (video) => video.videoId === selectedVideo._id
    );

    if (
      selectedVideo.hasAssessmentNext &&
      videoStatus &&
      videoStatus.status !== "locked"
    ) {
      navigate(`/course/${course.id}/assessment/${selectedVideo.assessmentId}`);
    } else {
      const currentIndex = course.videos.findIndex(
        (video) => video._id === selectedVideo._id
      );

      if (currentIndex < course.videos.length - 1) {
        const nextVideo = course.videos[currentIndex + 1];
        navigate(`/course/${course.id}/video/${nextVideo._id}`);
      } else if (
        course.nextCourse &&
        selected_course.course.status !== "locked"
      ) {
        navigate(`/course/${course.nextCourse}`);
      } else {
        console.log("No next video or course");
      }
    }
  };
  const handleVideoEnd = () => {
    if (course_id && video_id) {
      const params = { course_id, video_id };
      const payload = { status: "finished" };

      update_video_status({ params, payload });
    }
  };

  if (isLoading || update_video_loading) {
    return <LessonDetailSkeleton />;
  }

  return (
    <ContentLayout>
      <div>
        <div className="relative w-full h-[70vh] bg-black group">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${selectedVideo?.url}`}
            controls={true}
            width="100%"
            height="100%"
            onEnded={handleVideoEnd}
          />
          {/* <button
          onClick={handlePrevious}
          className="absolute left-1/2 top-1/2 transform -translate-x-[240%] -translate-y-1/2 flex items-center justify-center w-12 h-12  text-white rounded-full hover:bg-gray-700 pointer-events-auto z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <MdSkipPrevious size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute left-1/2 top-1/2 transform translate-x-[140%] -translate-y-1/2 flex items-center justify-center w-12 h-12  text-white rounded-full hover:bg-gray-700 pointer-events-auto z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <MdSkipNext size={24} />
        </button> */}
        </div>
        <div className="grid  grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
          <div className="col-span-6 lg:col-span-4 order-2 lg:order-1">
            <h1 className="text-2xl font-semibold">
              {selected_course?.course.courseId.title}
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
                {videoSummarys.map((videoSummary) => (
                  <div
                    key={videoSummary.min}
                    className="flex gap-2 text-gray-800"
                  >
                    <FaPlayCircle color="#FFAC64" />{" "}
                    <span>{videoSummary.min}</span> -{" "}
                    <span>{videoSummary.description}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 ">
              <ReadMore
                text={selectedVideo?.description ?? ""}
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
              <p className="text-[#152946] text-xl font-semibold">
                Introduction
              </p>
            </div>
            {selected_course?.course.courseId.videos.map((video, index) => {
              const assessment = video.hasAssessmentNext
                ? selected_course.course.courseId.assessments.find(
                    (a) => a._id === video.assessmentId
                  )
                : null;

              const videoExists = selected_course?.course.videos.find(
                (vid) => vid.videoId === video._id
              );

              const assessmentExists = assessment
                ? selected_course?.course.assessments.find(
                    (asses) => asses.assessmentId === assessment._id
                  )
                : undefined;

              return (
                <div key={video._id}>
                  <VideoListItem
                    label={video.title}
                    duration={video.duration}
                    active={video._id === video_id}
                    identifier={"0" + (index + 1)}
                    locked={videoExists && videoExists.status == "locked"}
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
                      locked={
                        assessmentExists && assessmentExists.status == "locked"
                      }
                      onPlay={() => {
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
    </ContentLayout>
  );
}

export default LessonDetail;
