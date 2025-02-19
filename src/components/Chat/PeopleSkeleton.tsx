// import { Skeleton } from "../ui/skeleton";

// const ProfileSkeleton = () => (
//   <div className="w-56 md:w-72 relative bg-[#F2F2F7] shadow-md rounded-lg border border-[#AEAFB2] p-6 text-center">
//     <div className="absolute top-3 right-3">
//       <Skeleton className="w-6 h-6 rounded-full" />
//     </div>
//     <div className="flex flex-col items-center">
//       <Skeleton className="w-20 h-20 rounded-full" />
//       <Skeleton className="w-3/4 sm:w-2/3 md:w-1/2 mt-2 h-6" />
//       <Skeleton className="w-1/2 sm:w-1/3 md:w-1/4 mt-2 h-5" />
//       <div className="flex items-center justify-center py-1 gap-4">
//         <Skeleton className="w-1/3 sm:w-1/4 md:w-1/2 h-8 rounded-md" />
//         <Skeleton className="w-1/3 sm:w-1/4 md:w-1/2 h-8 rounded-md" />
//       </div>
//     </div>
//   </div>
// );

// const SearchSkeleton = () => (
//   <div className="sticky top-0 p-4 rounded-lg">
//     <Skeleton className="py-2 w-full !rounded-lg !outline-none !bg-white h-10" />
//   </div>
// );

// const PeopleSkeleton = () => (
//   <div>
//     <SearchSkeleton />
//     <div className="h-[65vh] rounded-md">
//       <div className="justify-center sm:justify-start flex flex-wrap gap-x-2 gap-y-4">
//         <ProfileSkeleton />
//         <ProfileSkeleton />
//         <ProfileSkeleton />
//       </div>
//     </div>
//   </div>
// );

// export default PeopleSkeleton;

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FriendsSkeleton() {
  return (
    <div className="p-4 space-y-4 bg-muted rounded-md">
      {/* Search Bar Skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />

      {/* Friend Requests Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" /> {/* Friend Requests Header */}
        <Skeleton className="h-6 w-6 rounded-full" /> {/* Count Badge */}
        <Card className="p-4 flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </Card>
      </div>

      {/* Friends Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-20" /> {/* Friends Header */}
        <Skeleton className="h-6 w-6 rounded-full" /> {/* Count Badge */}
      </div>

      {/* Following Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-20" /> {/* Following Header */}
        <Card className="p-4 flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </Card>
      </div>

      {/* Followers Section */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-20" /> {/* Followers Header */}
      </div>
    </div>
  );
}
