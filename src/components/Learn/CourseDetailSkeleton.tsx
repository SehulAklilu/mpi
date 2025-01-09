import { Skeleton } from "../ui/skeleton";
import { FaMicrophone, FaPlayCircle, FaUserAlt } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";

const CourseDetailSkeleton = () => {
  return (
    <div className="px-2 bg-white">
      <div className="w-full h-52 rounded-md relative">
        <Skeleton className="w-full h-full rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
        <div className="col-span-4">
          <Skeleton className="w-3/4 h-8 mb-2" />
          <div className="flex gap-4 items-center mb-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <div className="pt-2">
            <Skeleton className="w-1/4 h-6 mb-2" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="pt-4">
            <Skeleton className="w-1/4 h-6 mb-2" />
            <div className="flex gap-4">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
          <div className="pt-2">
            <Skeleton className="w-1/4 h-6 mb-2" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="pt-2">
            <Skeleton className="w-1/4 h-6 mb-2" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="pt-4">
            <Skeleton className="w-1/4 h-6 mb-2" />
            <Skeleton className="w-full h-10" />
          </div>
          <div className="w-full mt-4">
            <Skeleton className="w-full h-16 mb-2" />
            <Skeleton className="w-full h-16 mb-2" />
            <Skeleton className="w-full h-16" />
          </div>
        </div>
        <div className="hidden md:block col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
          <Skeleton className="w-1/4 h-6 mb-2" />
          <Skeleton className="w-full h-16" />
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-32 h-4" />
          </div>
          <Skeleton className="w-full h-16 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
