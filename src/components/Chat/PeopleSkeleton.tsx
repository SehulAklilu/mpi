import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => (
  <div className="w-56 md:w-72 relative bg-[#F2F2F7] shadow-md rounded-lg border border-[#AEAFB2] p-6 text-center">
    <div className="absolute top-3 right-3">
      <Skeleton className="w-6 h-6 rounded-full" />
    </div>
    <div className="flex flex-col items-center">
      <Skeleton className="w-20 h-20 rounded-full" />
      <Skeleton className="w-3/4 sm:w-2/3 md:w-1/2 mt-2 h-6" />
      <Skeleton className="w-1/2 sm:w-1/3 md:w-1/4 mt-2 h-5" />
      <div className="flex items-center justify-center py-1 gap-4">
        <Skeleton className="w-1/3 sm:w-1/4 md:w-1/2 h-8 rounded-md" />
        <Skeleton className="w-1/3 sm:w-1/4 md:w-1/2 h-8 rounded-md" />
      </div>
    </div>
  </div>
);

const SearchSkeleton = () => (
  <div className="sticky top-0 p-4 rounded-lg">
    <Skeleton className="py-2 w-full !rounded-lg !outline-none !bg-white h-10" />
  </div>
);

const PeopleSkeleton = () => (
  <div>
    <SearchSkeleton />
    <div className="h-[65vh] rounded-md">
      <div className="justify-center sm:justify-start flex flex-wrap gap-x-2 gap-y-4">
        <ProfileSkeleton />
        <ProfileSkeleton />
        <ProfileSkeleton />
      </div>
    </div>
  </div>
);

export default PeopleSkeleton;
