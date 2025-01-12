import { Skeleton } from "@/components/ui/skeleton";

const ChatItemSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 hover:bg-gray-100 rounded-lg cursor-pointer">
      <div className="relative">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full" />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ChatItemSkeleton;
