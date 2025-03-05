import { ContentLayout } from "../Sidebar/contenet-layout";
import { Skeleton } from "../ui/skeleton"; // Import the Skeleton component from ShadCN

export const MatchSkeleton = () => {
  return (
    <ContentLayout>
      <div className="pt-5 pb-20 px-4 bg-white w-full min-h-screen">
        <div className="flex w-full">
          {/* Skeleton for search input */}
          <Skeleton className="w-full h-10 rounded-md" />
        </div>
        <div className="mt-5">
          <div className="flex justify-between">
            <div className="font-semibold text-xl text-primary pl-4">
              {/* Skeleton for Pending Matches section title */}
              <Skeleton className="w-40 h-6" />
            </div>
            <div className="text-primary font-semibold cursor-pointer text-sm underline">
              {/* Skeleton for 'View All' / 'Show Less' link */}
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
          <div className="grid mt-3 grid-cols-2 gap-y-12 max-md:grid-cols-1 justify-center items-center mx-auto">
            {/* Skeleton for match items */}
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <PendingMatchSkeleton />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <div className="mb-2 flex justify-between">
            <div className="font-semibold text-xl text-primary pl-4">
              {/* Skeleton for Recent Matches section title */}
              <Skeleton className="w-40 h-6" />
            </div>
            <div className="text-primary font-semibold cursor-pointer text-sm underline">
              {/* Skeleton for 'View All' / 'Show Less' link */}
              <Skeleton className="w-20 h-4" />
            </div>
          </div>
          <div className="grid mt-3 grid-cols-2 gap-y-12 max-md:grid-cols-1">
            {/* Skeleton for recent match items */}
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <PendingMatchSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export const PendingMatchSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center flex-col justify-center">
        <div className="flex gap-2">
          {/* Skeleton Loader for Player 1 */}
          <Skeleton className="w-24 h-24 border rounded-full" />
          <div className="my-auto px-3 py-2 w-14 h-14 text-3xl font-bold text-white bg-gradient-to-b from-[#F8B36D] to-[#F28822] rounded-xl flex justify-center items-center">
            VS
          </div>
          {/* Skeleton Loader for Player 2 */}
          <Skeleton className="w-24 h-24 border rounded-full" />
        </div>
        {/* Skeleton for Match Status */}
        <Skeleton className="w-32 h-6 rounded-full mt-2" />
        {/* Skeleton for Date */}
        <Skeleton className="w-40 h-4 mt-2" />
      </div>
    </div>
  );
};
