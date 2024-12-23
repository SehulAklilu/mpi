import TennisBall from "../components/Tennis Ball/TennisBall";
import VideoCard from "../components/Card/VideoCard";
import Button from "../components/Button/Button";
import AssignmentCard from "../components/Card/AssignmentCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Learn = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active tennis ball
  const [allCourses, setAllCourses] = useState([]); // Store all courses
  const [videos, setVideos] = useState([]); // Store videos for the selected course

  // Dummy tennis balls array (ensure courseId matches API response IDs)
  const tennisBalls = [
    { isActive: true, title: "Introduction", position: "left", courseId: "662e17020ac8163154d7ba98" },
    { isActive: true, title: "Basics", position: "right", courseId: "662e17020ac8163154d7ba99" },
    { isActive: true, title: "Intermediate", position: "left", courseId: "662e17020ac8163154d7ba9a" },
    { isActive: true, title: "Advanced", position: "right", courseId: "662e17020ac8163154d7ba9b" },
    { isActive: true, title: "Practice", position: "left", courseId: "662e17020ac8163154d7ba9c" },
  ];

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Access token not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://194.5.159.228:3000/api/v1/users/profile/courses/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        const courses = response.data.courses.map((course) => ({
          ...course,
          videos: course.courseId.videos?.map((video) => ({
            ...video,
            url: `https://www.youtube.com/watch?v=${video.url}`, // Format YouTube URL
          })),
        }));

        setAllCourses(courses);

        // Initialize with videos from the first course
        if (courses.length > 0) {
          setVideos(courses[0].videos || []);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Update videos when activeIndex changes
  useEffect(() => {
    const selectedCourse = allCourses.find(
      (course) => course.courseId.id === tennisBalls[activeIndex]?.courseId
    );

    console.log("Selected Course:", selectedCourse);

    if (selectedCourse && selectedCourse.videos) {
      setVideos(selectedCourse.videos);
    } else {
      console.warn("No videos found for this course.");
      setVideos([]);
    }
  }, [activeIndex, allCourses]);

  return (
    <div className="learnContainer flex flex-row font-raleway">
      <div className="w-2/3 flex flex-col items-center gap-10 relative">
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
      <div className="bg-white h-screen w-1/3 rounded-tl-lg rounded-bl-lg shadow-l-gray-40 flex flex-col gap-0">
        <div className="flex flex-col p-4 gap-1">
          <div className="flex flex-row justify-between items-center">
            <p className="text-xl font-semibold">Foundation</p>
            <Button
              type={"button"}
              buttonText={"Get Started"}
              backgroundStyleOn={true}
              onclick={() => {}}
              small
            />
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
                key={video._id}
                courseId={video._id}
                title={video.title}
                thumbnail={video.thumbnail}
                description={video.description}
                videoUrl={video.url}
              />
            ))
          ) : (
            <p>No videos available for this course.</p>
          )}
          <AssignmentCard />
        </div>
      </div>
    </div>
  );
};

export default Learn;
