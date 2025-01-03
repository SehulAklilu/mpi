import { getCourse } from "@/api/course.api";
import { Video } from "@/types/course.types";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import VideoListItem from "./VideoListItem";
import InstructorCard from "./InstructorCard";
import instructor from "../../assets/user.jpeg";
import ReadMore from "../common/ReadMore";
import { FaDownload, FaFilePdf, FaLink, FaPlayCircle } from "react-icons/fa";

function LessonDetail() {
  const { course_id, video_id } = useParams();
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

  if (isLoading || isError) {
    return <>Loading</>;
  }

  const videoSummarys: { min: string; description: string }[] = [
    { min: "00:20", description: "average atomic mass" },
    { min: "04:56", description: "average atomic mass" },
    { min: "09:20", description: "average atomic mass" },
    { min: "12:45", description: "average atomic mass" },
    { min: "20:20", description: "average atomic mass" },
  ];

  return (
    <div>
      <div className="relative w-full h-[70vh] bg-black">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Hr2f8dmiwpU"
          controls={true}
          width="100%"
          height="100%"
        />
      </div>
      <div className="grid grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
        <div className="col-span-4">
          <h1 className="text-2xl font-semibold">
            Introductionto Professional Tennis
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
                <div className="flex gap-2 text-gray-800">
                  <FaPlayCircle color="#FFAC64" />{" "}
                  <span>{videoSummary.min}</span> -{" "}
                  <span>{videoSummary.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 ">
            <ReadMore
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              saepe assumenda odio voluptates dolore accusamus, delectus illum
              eligendi dolor voluptatum quis suscipit rerum dolores, cupiditate
              cum repellat architecto? Perferendis, dignissimos. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              saepe assumenda odio voluptates dolore accusamus, delectus illum
              eligendi dolor voluptatum quis suscipit rerum dolores, cupiditate
              cum repellat architecto? Perferendis, dignissimos."
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
        <div className="col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
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
                  onPlay={() => console.log(`Playing video: ${video.title}`)}
                  active={true}
                />
                {video.hasAssessmentNext && assessment && (
                  <VideoListItem
                    label={assessment.title}
                    duration={assessment.timeLimit}
                    onPlay={() => console.log(`Playing video: ${video.title}`)}
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

export default LessonDetail;
