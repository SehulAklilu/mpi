import { Skeleton } from "@/components/ui/skeleton";

const ChatMessagesSkeleton: React.FC = () => {
  const skeletonMessages = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-2">
      {skeletonMessages.map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 == 0 ? "justify-end" : "justify-start"}`}
        >
          <div className="max-w-xs p-2 rounded-lg">
            <Skeleton className="h-4 w-16 mb-1" />

            <div
              className={`py-2 px-4 ${
                index % 2 === 0
                  ? "bg-[#F2851C]/20 rounded-md rounded-tr-none"
                  : "bg-[#D8D8D8]/20 rounded-md rounded-tl-none"
              }`}
            >
              <Skeleton className="h-4 w-60 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>

            {index % 3 === 0 && (
              <Skeleton className="h-8 w-full rounded mt-2" />
            )}

          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessagesSkeleton;
