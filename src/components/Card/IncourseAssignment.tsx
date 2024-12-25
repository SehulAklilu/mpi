import sampleThumbnail from "../../assets/user_1.jpg";
import MaterialIcon from "../Icon/MaterialIcon";
import question from "../../assets/svg/question.svg";

const IncourseAssignment = () => {
  return (
    <div className="flex  gap-0 ">
      <div className="  justify-center   ">
        <img src={question} alt="" />
      </div>
      <div className="flex w-full  flex-col justify-center gap-1">
        <p className="text-lg font-normal">Assignment</p>
      </div>
    </div>
  );
};

export default IncourseAssignment;
