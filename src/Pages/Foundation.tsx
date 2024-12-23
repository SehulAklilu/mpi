import AssignmentCard from "../components/Card/AssignmentCard";
import IncourseAssignment from "../components/Card/IncourseAssignment";
import IncourseCard from "../components/Card/IncourseCard";
import VideoCard from "../components/Card/VideoCard";
import LearnNotes from "../components/Learn/LearnNotes";
import LearnResources from "../components/Learn/LearnResources";
import Navbar from "../components/Navbar/Navbar";
import Tabs from "../components/Tabs/Tabs";

const Foundation = () => {
  return (
    <div className="bg-backgroundColor h-screen font-raleway">
      <Navbar common={true} commonHeader={"Foundation"} />
      <div className="flex flex-row justify-between px-7">
        <div className=" w-[55%] flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <p className="text-lg font-semibold">About</p>
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
          <div className="flex flex-col gap-5">
            <p className="text-lg font-semibold">Lesson</p>
            <IncourseCard />
            <IncourseCard />
            <IncourseAssignment />
            <IncourseCard />
          </div>
        </div>
        <div className=" w-[45%] ">
          <Tabs
            children={[<LearnNotes />, <LearnResources />]}
            tabs={["Notes", "Resources"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Foundation;
