// import sampleThumbnail from "../../assets/user_1.jpg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
}

interface VideoCardProps {
  courseId: string; // The course ID to fetch the video
}

const VideoCard: React.FC<VideoCardProps> = ({ courseId }) => {
  const [videoData, setVideoData] = useState<VideoData | null>({
    id: "1",
    title: "How to Find a Tennis Grip",
    description:
      "This video provides a detailed explanation of various tennis grips.",
    url: "https://www.youtube.com/watch?v=Hr2f8dmiwpU",
    thumbnail: "https://img.youtube.com/vi/Hr2f8dmiwpU/0.jpg",
  });

  useEffect(() => {
    const fetchVideoData = async () => {
      const token = Cookies.get("accessToken"); // Retrieve the access token from cookies

      if (!token) {
        console.error("Access token not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://194.5.159.228:3000/api/v1/users/profile/courses/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
            },
          }
        );

        // Find the specific course and video data by courseId
        const course = response.data.courses?.find(
          (course: any) => course.courseId.id === courseId
        );

        // Assuming the response contains video data under `response.data.videos[0]`
        if (course && course.videos && course.videos.length > 0) {
          const video = course.videos[0]; // Assuming the first video for simplicity
          setVideoData({
            ...video,
            url: `https://www.youtube.com/watch?v=${video.url}`, // Append YouTube base URL
          });
          console.log(video.url);
        } else {
          console.warn("No videos found for the course.");
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
  }, [courseId]);

  if (!videoData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="w-full border rounded-lg shadow-sm flex flex-row gap-3 ">
      <div
        className="rounded-tl-lg rounded-bl-lg"
        style={{
          position: "relative",
          backgroundImage: `url(${videoData.thumbnail})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "45%",
          height: "100px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-base font-semibold">{videoData.title}</p>
        <p className="text-xs font-extralight">{videoData.description}</p>
        <a
          href={videoData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm underline"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoCard;
