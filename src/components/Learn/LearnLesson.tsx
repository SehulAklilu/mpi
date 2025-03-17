import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getCourse } from "@/api/course.api";
import { Video } from "@/types/course.types";

function LearnLesson() {
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

  return (
    <div className="bg-background h-screen font-raleway">
      <div className="grid grid-cols-4 gap-10 px-7">
        <div className="col-span-4 md:col-span-3 flex-col gap-5">
          <div className="relative w-full h-[70vh] bg-black">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${selectedVideo?.url}`}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">{selectedVideo?.title}</p>
            <p className="font-light text-sm leading-7 max-w-[85%]">
              {selectedVideo?.description}
            </p>
          </div>
        </div>
        <div className="md:col-span-1 w-full">what to display here</div>
      </div>
    </div>
  );
}

export default LearnLesson;
