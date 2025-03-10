import React, { useState } from "react";
import ReactPlayer from "react-player";
import Navbar from "../Navbar/Navbar";
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
      {/* <Navbar common={true} commonHeader={selectedVideo?.title} /> */}
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

// custom vedio player

// import ReactPlayer from "react-player";
// import Navbar from "../Navbar/Navbar";
// import mov from "../../assets/mov.mp4";
// import MaterialIcon from "../Icon/MaterialIcon";
// import { useRef, useState } from "react";

// import {
//   FaPlay,
//   FaPause,
//   FaStepBackward,
//   FaStepForward,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaExpand,
//   FaCompress,
// } from "react-icons/fa";

// const LearnLesson = () => {
//   const playerRef = useRef<ReactPlayer>(null);
//   const [playing, setPlaying] = useState<boolean>(false);
//   const [volume, setVolume] = useState<number>(0.8);
//   const [muted, setMuted] = useState<boolean>(false);
//   const [progress, setProgress] = useState<number>(0);
//   const [duration, setDuration] = useState<number>(0);
//   const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

//   const togglePlay = () => {
//     setPlaying((prev) => !prev);
//   };

//   const handlePrevious = () => {
//     if (playerRef.current) {
//       const currentTime = playerRef.current.getCurrentTime();
//       playerRef.current.seekTo(currentTime - 10 > 0 ? currentTime - 10 : 0);
//     }
//   };

//   const handleNext = () => {
//     if (playerRef.current) {
//       const currentTime = playerRef.current.getCurrentTime();
//       playerRef.current.seekTo(
//         currentTime + 10 < duration ? currentTime + 10 : duration
//       );
//     }
//   };

//   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setVolume(parseFloat(e.target.value));
//     setMuted(false);
//   };

//   const toggleMute = () => {
//     setMuted((prev) => !prev);
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const seekTo = parseFloat(e.target.value);
//     if (playerRef.current) {
//       playerRef.current.seekTo(seekTo, "seconds");
//     }
//     setProgress(seekTo);
//   };

//   const handleProgress = (state: { playedSeconds: number }) => {
//     setProgress(state.playedSeconds);
//   };

//   const handleDuration = (duration: number) => {
//     setDuration(duration);
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       document.documentElement.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//     setIsFullscreen((prev) => !prev);
//   };

//   return (
//     <div className="bg-background h-screen font-raleway">
//       <Navbar common={true} commonHeader={"Foundation"} />
//       <div className="flex flex-row justify-between px-7">
//         <div className=" w-[55%] flex flex-col gap-5">
//           <div className="relative w-full h-[360px] bg-black">
//             <ReactPlayer
//               ref={playerRef}
//               url={mov}
//               playing={playing}
//               volume={muted ? 0 : volume}
//               onProgress={handleProgress}
//               onDuration={handleDuration}
//               controls={false}
//               width="100%"
//               height="100%"
//             />

//             <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-4">
//               <input
//                 type="range"
//                 className="w-full h-1 bg-red-600 accent-red-600"
//                 min={0}
//                 max={duration}
//                 step={1}
//                 value={progress}
//                 onChange={handleSeek}
//               />

//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={handlePrevious}
//                     className="text-white text-lg"
//                   >
//                     <FaStepBackward />
//                   </button>

//                   <button onClick={togglePlay} className="text-white text-lg">
//                     {playing ? <FaPause /> : <FaPlay />}
//                   </button>

//                   <button onClick={handleNext} className="text-white text-lg">
//                     <FaStepForward />
//                   </button>
//                   <div className="flex items-center gap-2">
//                     <button onClick={toggleMute} className="text-white text-lg">
//                       {muted || volume === 0 ? (
//                         <FaVolumeMute />
//                       ) : (
//                         <FaVolumeUp />
//                       )}
//                     </button>
//                     <input
//                       type="range"
//                       className="w-24 h-1 bg-gray-600 accent-white"
//                       min={0}
//                       max={1}
//                       step={0.01}
//                       value={muted ? 0 : volume}
//                       onChange={handleVolumeChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     onClick={toggleFullscreen}
//                     className="text-white text-lg"
//                   >
//                     {isFullscreen ? <FaCompress /> : <FaExpand />}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-3">
//             <p className="text-lg font-semibold">Lesson Title</p>
//             <p className="font-light text-sm leading-7 max-w-[85%]">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Exercitationem adipisci sed, assumenda totam officiis labore
//               voluptatum molestias tenetur provident temporibus, qui autem esse
//               cum quam facere ducimus obcaecati hic dolores. Exercitationem
//               adipisci sed, assumenda totam officiis labore voluptatum molestias
//               tenetur provident temporibus, qui autem esse cum quam facere
//               ducimus obcaecati hic dolores.
//             </p>
//           </div>
//         </div>
//         <div className=" w-[50%] "></div>
//       </div>
//     </div>
//   );
// };

// export default LearnLesson;
