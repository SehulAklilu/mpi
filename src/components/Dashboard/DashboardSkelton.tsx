import { Skeleton } from "../ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="px-4 md:px-14 pt-10 rounded-lg pb-[8rem] bg-white">
      <div className="flex gap-4 mt-4">
        <Skeleton className="!w-full flex-1 h-12 !py-4" />
        <Skeleton className="!w-full flex-1 h-12 !py-4" />
      </div>

      {/* Time Range */}
      <Skeleton className="my-8 h-10" />

      {/* status cards */}
      <div className="my-8">
        <Skeleton className="w-full h-20" />
      </div>

      {/* weekly sessions graph */}
      <div className="my-8">
        <Skeleton className="w-full h-40" />
      </div>

      {/* Todos */}
      <div className="my-8">
        <Skeleton className="w-full h-10" />
      </div>

      {/* Top players */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="p-6 shadow-lg flex items-center w-full">
          <Skeleton className="w-20 h-20 rounded-full object-cover" />
          <div className="flex flex-col ml-4">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-4 mt-2" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start w-full">
          <Skeleton className="w-full h-20 mb-4" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="px-5 py-4 w-16 h-10 bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl shadow-md" />
            <Skeleton className="w-24 h-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
