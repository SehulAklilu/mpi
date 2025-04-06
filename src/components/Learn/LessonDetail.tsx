import {
  getUserCoursesById,
  UpdateVideoParams,
  UpdateVideoPayload,
  updateVideoStatus,
} from "@/api/course.api";
import { ContentItem, Module } from "@/types/course.types";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import VideoListItem from "./VideoListItem";
import InstructorCard from "./InstructorCard";
import instructor from "../../assets/user.jpeg";
import ReadMore from "../common/ReadMore";
import { FaDownload, FaFilePdf, FaLink, FaPlayCircle } from "react-icons/fa";
import LessonDetailSkeleton from "./LessonDetailSkeleton";
import { ContentLayout } from "../Sidebar/contenet-layout";

function LessonDetail() {
  const { course_id, week_id, video_id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const currentItemId = video_id;
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const {
    data: selectedCourse,
    isLoading,
    isError,
  } = useQuery<Module, Error>({
    queryKey: ["course", course_id],
    queryFn: () => getUserCoursesById(course_id!),
    enabled: !!course_id,
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
    onSuccess: async () => {
      handleNext();
      queryClient.invalidateQueries("courses");
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

  function navigateToItem(courseId: string, weekId: string, item: ContentItem) {
    if (item.type === "video") {
      navigate(`/course/${courseId}/${weekId}/video/${item._id}`);
    } else if (item.type === "quiz") {
      navigate(`/course/${courseId}/${weekId}/assessment/${item._id}`);
    }
  }

  useEffect(() => {
    if (selectedCourse) {
      const selectedWeek = selectedCourse.weeks.find(
        (week) => week._id == week_id
      );
      const selectedItem = selectedWeek?.contentItems.find(
        (item) => item._id === video_id
      );
      selectedItem && setSelectedItem(selectedItem);
    }
  }, [isLoading, selectedCourse, selectedItem, setSelectedItem]);

  function handleNext() {
    if (!selectedCourse || !course_id || !week_id || !currentItemId) return;

    const weeks = selectedCourse?.weeks.sort(
      (a, b) => a.weekNumber - b.weekNumber
    );
    const currentWeekIndex = weeks.findIndex((w) => w._id === week_id);
    if (currentWeekIndex === -1) return;

    const currentWeek = weeks[currentWeekIndex];
    const contentItems = currentWeek.contentItems
      .filter((item) => !item.deleted && item.isPublished)
      .sort((a, b) => a.order - b.order);

    const currentItemIndex = contentItems.findIndex(
      (item) => item._id === currentItemId
    );
    if (currentItemIndex === -1) return;

    if (currentItemIndex < contentItems.length - 1) {
      const nextItem = contentItems[currentItemIndex + 1];
      // setItem(nextItem);
      navigateToItem(course_id, week_id, nextItem);
      return;
    }

    if (currentWeekIndex < weeks.length - 1) {
      const nextWeek = weeks[currentWeekIndex + 1];
      const nextItems = nextWeek.contentItems
        .filter((item) => !item.deleted && item.isPublished)
        .sort((a, b) => a.order - b.order);
      if (nextItems.length > 0) {
        const nextItem = nextItems[0];
        // setItem(nextItem);
        navigateToItem(course_id, nextWeek._id, nextItem);
      }
    }
  }

  const handleVideoEnd = () => {
    if (course_id && video_id) {
      const params = { course_id, video_id };
      const payload = { status: "finished" };

      update_video_status({ params, payload });
    }
  };

  if (isLoading || !selectedItem) {
    return <LessonDetailSkeleton />;
  }

  return (
    <ContentLayout>
      <div>
        <div className="relative w-full h-[70vh] bg-black group">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${selectedItem?.videoId}`}
            controls={true}
            width="100%"
            height="100%"
            onEnded={handleVideoEnd}
          />
        </div>
        <div className="grid  grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
          <div className="col-span-6 lg:col-span-4 order-2 lg:order-1">
            <h1 className="text-2xl font-semibold">{selectedItem?.title}</h1>
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
                text={selectedItem?.description ?? ""}
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
            <div className="hidden md:block col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
              {selectedCourse?.weeks.map((week) => (
                <div key={week._id}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold bg-[#ff9328]">
                      {week.weekNumber.toString().padStart(2, "0")}
                    </div>
                    <p className="text-[#152946] text-xl font-semibold">
                      {week.title}
                    </p>
                  </div>

                  {week.contentItems.map((item, index) => {
                    const identifier =
                      item.type === "video" ? "0" + (index + 1) : undefined;

                    return (
                      <div key={item._id}>
                        <VideoListItem
                          label={item.title}
                          duration={item.duration}
                          identifier={identifier}
                          active={item._id === video_id}
                          status={item.progress?.status}
                          locked={
                            item.progress?.status === "locked" ||
                            (item.type === "video" && item.order !== 1)
                          }
                          onPlay={() => {
                            if (
                              item.progress?.status !== "locked" ||
                              (item.type === "video" && item.order !== 1)
                            ) {
                              if (item.type === "video") {
                                navigate(
                                  `/course/${course_id}/${week._id}/video/${item._id}`
                                );
                              } else if (item.type === "quiz") {
                                navigate(
                                  `/course/${course_id}/${week._id}/assessment/${item._id}`
                                );
                              }
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default LessonDetail;
