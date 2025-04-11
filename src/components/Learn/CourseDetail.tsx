import { getUserCoursesById } from "@/api/course.api";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import user_image from "../../assets/user_1.jpg";
import { FaMicrophone, FaPlay, FaPlayCircle, FaUserAlt } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import ReadMore from "../common/ReadMore";

import { ReviewCard } from "./ReviewCard";
import profileImage from "../../assets/user.jpeg";
import InstructorCard from "./InstructorCard";
import DetailCard from "./DetailCard";
import FAQ from "./FAQ";
import { Review } from "./Review";
import VideoListItem from "./VideoListItem";
import CourseDetailSkeleton from "./CourseDetailSkeleton";
import { ContentLayout } from "../Sidebar/contenet-layout";
import { Module, Week } from "@/types/course.types";
import { useEffect, useState } from "react";

function CourseDetail() {
  const navigate = useNavigate();
  const { course_id, week_id } = useParams<{
    course_id: string;
    week_id: string;
  }>();
  const [selectedWeek, setSelectedWeek] = useState<Week | undefined>(undefined);

  const {
    data: selectedCourse,
    isLoading,
    isError,
  } = useQuery<Module, Error>({
    queryKey: ["course", course_id],
    queryFn: () => getUserCoursesById(course_id!),
    enabled: !!course_id,
  });

  useEffect(() => {
    const selectedWeek = selectedCourse?.weeks.find((w) => w._id === week_id);
    setSelectedWeek(selectedWeek);
  }, [isLoading, selectedCourse]);

  const reviews = [
    {
      profileImage: profileImage,
      name: "Steven",
      time: "2 hours ago",
      reviewText: "Great course, learned a lot about tennis.",
      rating: 4.9,
    },
    {
      profileImage: profileImage,
      name: "Sam",
      time: "2 hours ago",
      reviewText: "Great course, learned a lot about tennis.",
      rating: 4.9,
    },
  ];

  const details = [
    { icon: <FaUserAlt />, label: "Introduction" },
    { icon: <FaMicrophone />, label: "English" },
    { icon: <FaPlayCircle />, label: "4 Lessons (1Hr 30Min)" },
    { icon: <IoBriefcase />, label: "2 Additional resources" },
  ];

  const starDistribution = [
    { stars: 5, value: 73 },
    { stars: 4, value: 53 },
    { stars: 3, value: 33 },
    { stars: 2, value: 10 },
    { stars: 1, value: 5 },
  ];
  let videoCounter = 1;

  if (isLoading || isError) {
    return <CourseDetailSkeleton />;
  }
  return (
    <ContentLayout>
      <div className="px-2 bg-white">
        <div className="w-full h-52 rounded-md relative">
          <img
            src={selectedCourse?.thumbnail}
            alt="img"
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              onClick={() =>
                navigate(
                  `/course/${selectedCourse?._id}/${selectedCourse?.weeks[0]._id}/video/${selectedCourse?.weeks[0]?.contentItems[0]?._id}`
                )
              }
              className="flex items-center justify-center w-16 h-16 bg-black/50 rounded-full cursor-pointer"
            >
              <FaPlay className="text-white text-2xl opacity-50 hover:opacity-80 filter  transition-all duration-200" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
          <div className="col-span-4">
            <h1
              className="text-2xl font-semibold hover:text-[#000000] cursor-pointer"
              onClick={() =>
                navigate(
                  `/course/${selectedCourse?._id}/${selectedCourse?.weeks[0]._id}/video/${selectedCourse?.weeks[0]?.contentItems[0]?._id}`
                )
              }
            >
              {selectedCourse?.title}
            </h1>
            {/* instructor */}
            <InstructorCard
              name="Damian"
              role="Instructor"
              image={user_image}
              rating={5}
              students={40000}
              duration="2 Hrs 15Min"
            />
            {/* containt */}
            <div className="pt-2 ">
              <h1 className="text-lg font-semibold">Introduction</h1>
              <ReadMore text={selectedCourse?.description ?? ""} />
            </div>
            {/* Detail */}
            <DetailCard title="Details" details={details} />
            {/* about the teacher */}
            <div className="pt-2">
              <h1 className="text-lg font-semibold">About the Teacher</h1>
              <ReadMore
                text="
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              saepe assumenda odio voluptates dolore accusamus, delectus illum
              eligendi dolor voluptatum quis suscipit rerum dolores, cupiditate
              cum repellat architecto? Perferendis, dignissimos."
              />
            </div>
            {/* FAQs */}
            <FAQ />
            {/* review */}
            <Review
              rating={4.5}
              totalReviews={5000}
              starDistribution={starDistribution}
            />
            {/* review comment */}
            <div className="w-full">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  profileImage={review.profileImage}
                  name={review.name}
                  time={review.time}
                  reviewText={review.reviewText}
                  rating={review.rating}
                />
              ))}
              {/* Load More Button */}
              <button className="block w-full mt-4 text-center text-sm text-blue-600 hover:underline">
                Load More
              </button>
            </div>
          </div>
          <div className="hidden md:block col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
            {selectedWeek?.contentItems.map((item, index) => {
              let identifier;

              if (item.type === "video") {
                identifier = "0" + videoCounter;
                videoCounter++;
              }
              return (
                <div key={item._id}>
                  <VideoListItem
                    label={item.title}
                    duration={item.duration}
                    identifier={identifier}
                    status={item.progress?.status}
                    type={item.type}
                    onPlay={() => {
                      if (
                        item.progress?.status !== "locked" ||
                        item.order === 1
                      ) {
                        if (item.type === "video") {
                          navigate(
                            `/course/${course_id}/${week_id}/video/${item._id}`
                          );
                        } else if (item.type === "quiz") {
                          navigate(
                            `/course/${course_id}/${week_id}/assessment/${item._id}`
                          );
                        }
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

export default CourseDetail;
