import { Video } from "@/types/course.types";

const VideoCard = ({ video }: { video: Video }) => {
  // const [videoData, setVideoData] = useState<VideoData | null>({
  //   id: "1",
  //   title: "How to Find a Tennis Grip",
  //   description:
  //     "This video provides a detailed explanation of various tennis grips.",
  //   url: "https://www.youtube.com/watch?v=Hr2f8dmiwpU",
  //   thumbnail: "https://img.youtube.com/vi/Hr2f8dmiwpU/0.jpg",
  // });

  // useEffect(() => {
  //   const fetchVideoData = async () => {
  //     const token = Cookies.get("accessToken"); // Retrieve the access token from cookies

  //     if (!token) {
  //       console.error("Access token not found. Please log in.");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         `http://194.5.159.228:3000/api/v1/users/profile/courses/`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`, // Add Authorization header with Bearer token
  //           },
  //         }
  //       );

  //       // Find the specific course and video data by courseId
  //       const course = response.data.courses?.find(
  //         (course: any) => course.courseId.id === courseId
  //       );

  //       // Assuming the response contains video data under `response.data.videos[0]`
  //       if (course && course.videos && course.videos.length > 0) {
  //         const video = course.videos[0]; // Assuming the first video for simplicity
  //         setVideoData({
  //           ...video,
  //           url: `https://www.youtube.com/watch?v=${video.url}`, // Append YouTube base URL
  //         });
  //         console.log(video.url);
  //       } else {
  //         console.warn("No videos found for the course.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching video data:", error);
  //     }
  //   };

  //   fetchVideoData();
  // }, [courseId]);

  // if (!videoData) {
  //   return <div>Loading...</div>; // Loading state
  // }

  return (
    // <div className="w-full border rounded-lg shadow-sm flex flex-row gap-3 mt-2 mb-2">
    //   <div
    //     className="rounded-tl-lg rounded-bl-lg w-[150px] h-[100px] overflow-hidden relative bg-cover bg-center"
    //     style={{
    //       backgroundImage: `url(${video.thumbnail})`,
    //     }}
    //   >
    //     <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
    //   </div>
    //   <div className="flex flex-col justify-center gap-2">
    //     <p className="text-base font-semibold">{video.title}</p>
    //     <p className="text-xs font-extralight line-clamp-3">
    //       {video.description}
    //     </p>
    //   </div>
    // </div>
    <div className="grid grid-cols-6 gap-4 my-2 w-full">
      <div className="col-span-2">
        <div className="w-full h-full  rounded">
          <img
            className="w-full h-full object-cover rounded"
            alt="thumbnail"
            src={video.thumbnail}
          />
        </div>
      </div>
      <div className="col-span-4">
        <div className="flex w-full flex-col justify-center gap-2">
          <p className="text-base font-semibold">{video.title}</p>
          <p className="text-xs font-extralight line-clamp-3">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
