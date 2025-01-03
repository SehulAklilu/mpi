import { getCourse } from "@/api/course.api";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import user_image from "../../assets/user_1.jpg";
import { FaMicrophone, FaPlayCircle, FaUserAlt } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import ReadMore from "../common/ReadMore";

import { ReviewCard } from "./ReviewCard";
import profileImage from "../../assets/user.jpeg";
import InstructorCard from "./InstructorCard";
import DetailCard from "./DetailCard";
import FAQ from "./FAQ";
import { Review } from "./Review";
import VideoListItem from "./VideoListItem";

function CourseDetail() {
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

  if (isLoading || isError) {
    return <>Loading</>;
  }
  return (
    <div className="px-2 bg-white">
      <div className="w-full h-52 rounded-md">
        <img
          src="https://cdn.create.vista.com/api/media/small/206135578/stock-video-close-tennis-equipment-court-sport-recreation-concept-yellow-racket-tennis?videoStaticPreview=true&token="
          alt="img"
          className="w-full h-full object-cover rounded-md"
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
            image={user_image}
            rating={5}
            students={40000}
            duration="2 Hrs 15Min"
          />
          {/* containt */}
          <div className="pt-2 ">
            <h1 className="text-lg font-semibold">Introduction</h1>
            <ReadMore
              text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              saepe assumenda odio voluptates dolore accusamus, delectus illum
              eligendi dolor voluptatum quis suscipit rerum dolores, cupiditate
              cum repellat architecto? Perferendis, dignissimos."
            />
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
        <div className="col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold bg-[#ff9328]">
              01
            </div>
            <p className="text-[#152946] text-xl font-semibold">Introduction</p>
          </div>
          {selectedCourse?.course.courseId.videos.map((video, index) => {
            const assessment = video.hasAssessmentNext
              ? selectedCourse.course.courseId.assessments.find(
                  (a) => a._id === video.assessmentId
                )
              : null;

            return (
              <div key={video._id}>
                <VideoListItem
                  label={video.title}
                  duration={video.duration}
                  identifier={"0" + (index + 1)}
                  onPlay={() =>
                    navigate(
                      "/course/662e17510ac8163154d7bae2/video/662e17510ac8163154d7bae5"
                    )
                  }
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

export default CourseDetail;
