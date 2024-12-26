import TennisBall from "../../components/Tennis Ball/TennisBall";
import VideoCard from "../../components/Card/VideoCard";
import Button from "../../components/Button/Button";
import AssignmentCard from "../../components/Card/AssignmentCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./learn.css";
import { useNavigate } from "react-router-dom";

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  duration: number;
  thumbnail: string;
  caption: string;
}
const Learn = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // Track the active tennis ball
  const [allCourses, setAllCourses] = useState<any[]>([]); // Store all courses
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: "Video 1: Tennis Grip Explained",
      description:
        "This video covers how to properly grip the racket for forehands and backhands.",
      url: "https://www.tennistrainingvideos.com/grip-explained",
      duration: 15,
      thumbnail: "https://www.tennistrainingvideos.com/thumbnails/grip.jpg",
      caption: "Learn the proper tennis grip techniques.",
    },
    {
      id: 2,
      title: "Video 2: Basic Stance and Footwork",
      description:
        "A detailed breakdown of the proper stance and movement techniques to improve your game.",
      url: "https://www.tennistrainingvideos.com/footwork-basics",
      duration: 20,
      thumbnail: "https://www.tennistrainingvideos.com/thumbnails/footwork.jpg",
      caption: "Perfect your footwork to move more effectively on the court.",
    },
  ]); // Store videos for the selected course

  // Dummy tennis balls array (ensure courseId matches API response IDs)
  const tennisBalls = [
    {
      isActive: true,
      title: "Introduction",
      position: "left",
      courseId: "662e17020ac8163154d7ba98",
    },
    {
      isActive: true,
      title: "Basics",
      position: "center",
      courseId: "662e17020ac8163154d7ba99",
    },
    {
      isActive: false,
      title: "Intermediate",
      position: "right",
      courseId: "662e17020ac8163154d7ba9a",
    },
    {
      isActive: false,
      title: "Advanced",
      position: "center",
      courseId: "662e17020ac8163154d7ba9b",
    },
    {
      isActive: false,
      title: "Practice",
      position: "left",
      courseId: "662e17020ac8163154d7ba9c",
    },
    {
      isActive: false,
      title: "Practice",
      position: "center",
      courseId: "662e17020ac8163154d7ba9d",
    },
    {
      isActive: false,
      title: "Practice",
      position: "right",
      courseId: "662e17020ac8163154d7ba9e",
    },
    {
      isActive: false,
      title: "Practice",
      position: "center",
      courseId: "662e17020ac8163154d7ba9f",
    },
    {
      isActive: false,
      title: "Practice",
      position: "left",
      courseId: "662e17020ac8163154d7ba9j",
    },
  ];

  // Fetch all courses on component mount
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const token = Cookies.get("accessToken");
  //     if (!token) {
  //       console.error("Access token not found. Please log in.");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         `http://194.5.159.228:3000/api/v1/users/profile/courses/`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       console.log("API Response:", response.data);

  //       const courses = response.data.courses.map((course) => ({
  //         ...course,
  //         videos: course.courseId.videos?.map((video) => ({
  //           ...video,
  //           url: `https://www.youtube.com/watch?v=${video.url}`, // Format YouTube URL
  //         })),
  //       }));

  //       setAllCourses(courses);

  //       // Initialize with videos from the first course
  //       if (courses.length > 0) {
  //         setVideos(courses[0].videos || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // Update videos when activeIndex changes
  useEffect(() => {
    const selectedCourse = allCourses.find(
      (course) => course.courseId.id === tennisBalls[activeIndex]?.courseId
    );

    console.log("Selected Course:", selectedCourse);

    if (selectedCourse && selectedCourse.videos) {
      // setVideos(selectedCourse.videos);
    } else {
      console.warn("No videos found for this course.");
      // setVideos([]);
    }
  }, [activeIndex, allCourses]);

  return (
    <div className="flex flex-row font-raleway ">
      <div className="w-2/3 flex flex-col items-center gap-10 relative h-[88vh] overflow-y-scroll overflow-x-hidden custom-scrollbar sm:px-4 md:px-20 lg:px-40">
        {/* Render TennisBall components */}
        {tennisBalls.map((ball, index) => (
          <TennisBall
            key={index}
            isActive={ball.isActive}
            onclick={() => setActiveIndex(index)}
            title={ball.title}
            position={ball.position}
          />
        ))}
      </div>
      <div className="bg-white w-1/3 h-[88vh] rounded-tl-lg rounded-bl-lg shadow-l-gray-40 flex flex-col gap-0">
        <div className="flex flex-col p-4 gap-1">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-semibold">Foundation</p>
            {/* <Button
              type={"button"}
              buttonText={"Get Started"}
              backgroundStyleOn={true}
              onclick={() => {
                navigate("/foundation");
              }}
              small
            /> */}
          </div>

          <p className="font-light text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem adipisci sed, assumenda totam officiis labore
            voluptatum molestias tenetur provident temporibus, qui autem esse
            cum quam facere ducimus obcaecati hic dolores.
          </p>
        </div>
        <div className="flex flex-col p-4 gap-2">
          <p className="text-lg font-semibold ">Lesson</p>
          {/* Render videos */}
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoCard
                // key={video.id}
                // courseId={video._id}
                // title={video.title}
                // thumbnail={video.thumbnail}
                // description={video.description}
                // videoUrl={video.url}
                courseId="1"
              />
            ))
          ) : (
            <p>No videos available for this course.</p>
          )}
          <AssignmentCard />
          <Button
            type={"button"}
            buttonText={"Get Started"}
            backgroundStyleOn={true}
            buttonStyle={"w-full sticky bottom-2 z-10"}
            onclick={() => {
              navigate("/foundation");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Learn;
