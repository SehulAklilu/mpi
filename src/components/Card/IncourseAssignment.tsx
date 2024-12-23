import sampleThumbnail from "../../assets/user_1.jpg";
import MaterialIcon from "../Icon/MaterialIcon";

const IncourseAssignment = () => {
  return (
    <div className="flex flex-row gap-3 ">
      <div className=" items-center justify-center my-auto px-4">
        <MaterialIcon className="text-blue text-7xl" icon="help" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <p className="text-lg font-normal">Assignment</p>
      </div>
    </div>
  );
};

export default IncourseAssignment;
