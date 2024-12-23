import MaterialIcon from "../Icon/MaterialIcon";

const AssignmentCard = () => {
  return (
    <div className="w-full border rounded-lg h-[100px] shadow-sm flex flex-row gap-3 ">
      <div className=" items-center justify-center my-auto px-4">
        <MaterialIcon className="text-blue text-7xl" icon="help" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-base font-semibold">Assignment</p>
      </div>
    </div>
  );
};

export default AssignmentCard;
