import ReactPlayer from "react-player";
import Navbar from "../Navbar/Navbar";
import mov from "../../assets/mov.mp4";
import MaterialIcon from "../Icon/MaterialIcon";

const LearnLesson = () => {
  return (
    <div className="bg-backgroundColor h-screen font-raleway">
      <Navbar common={true} commonHeader={"Foundation"} />
      <div className="flex flex-row justify-between px-7">
        <div className=" w-[55%] flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <ReactPlayer
              style={{ backgroundColor: "black" }}
              className=""
              url={mov}
              controls
              light
              width={750}
              playIcon={
                <MaterialIcon
                  className="text-white text-4xl"
                  icon="play_circle"
                />
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-lg font-semibold">Lesson Title</p>
            <p className="font-light text-sm leading-7 max-w-[85%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem adipisci sed, assumenda totam officiis labore
              voluptatum molestias tenetur provident temporibus, qui autem esse
              cum quam facere ducimus obcaecati hic dolores. Exercitationem
              adipisci sed, assumenda totam officiis labore voluptatum molestias
              tenetur provident temporibus, qui autem esse cum quam facere
              ducimus obcaecati hic dolores.
            </p>
          </div>
        </div>
        <div className=" w-[50%] "></div>
      </div>
    </div>
  );
};

export default LearnLesson;
