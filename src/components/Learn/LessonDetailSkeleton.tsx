import { Skeleton } from "../ui/skeleton";

function LessonDetailSkeleton() {
  return (
    <div>
      <div className="relative w-full h-[60vh] bg-white group">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="grid grid-cols-6 py-2 p-2 text-[#1c1d47] gap-10">
        <div className="col-span-4">
          <Skeleton className="h-10 w-[60%] mb-4" />

          <div className="flex gap-4 items-center mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Skeleton className="h-6 w-[50%] mb-4" />
          <div className="grid grid-cols-2 gap-x-10 my-2 gap-y-4">
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[80%]" />
          </div>

          <Skeleton className="h-6 w-[100%] mb-4" />

          <div className="my-2">
            <Skeleton className="h-6 w-[50%] mb-4" />
            <div className="flex gap-x-10 py-1">
              <Skeleton className="h-5 w-[60%]" />
              <Skeleton className="h-5 w-[60%]" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
          </div>
        </div>

        <div className="col-span-2 p-2 bg-[#F8F9FA] rounded-lg">
          <Skeleton className="h-6 w-[50%] mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[100%]" />
            <Skeleton className="h-6 w-[100%]" />
            <Skeleton className="h-6 w-[100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetailSkeleton;
