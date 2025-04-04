import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function MatchSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-6 p-6 w-full">
      <div className="flex items-center space-x-6">
        <Card className="p-4 flex flex-col items-center w-40 h-40">
          <Skeleton className="w-28 h-28 rounded-full" />
          <Skeleton className="w-24 h-8 mt-2" />
          <Skeleton className="w-28 h-6 mt-1" />
        </Card>
        <Skeleton className="w-24 h-24 rounded-md" />
        <Card className="p-4 flex flex-col items-center w-40 h-40">
          <Skeleton className="w-28 h-28 rounded-full" />
          <Skeleton className="w-24 h-8 mt-2" />
          <Skeleton className="w-28 h-6 mt-1" />
        </Card>
      </div>
      <Skeleton className="w-20 h-6 rounded-md" />
      <div className="flex space-x-4">
        <Skeleton className="w-28 h-6 rounded-md" />
        <Skeleton className="w-28 h-6 rounded-md" />
        <Skeleton className="w-28 h-6 rounded-md" />
      </div>
      <div className="w-full max-w-4xl space-y-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-32 h-5 rounded-md" />
              <Skeleton className="w-32 h-8" />
            </div>
            <Skeleton className="w-40 h-8" />
          </div>
        ))}
      </div>
      <Button variant="secondary" className="w-32">
        <Skeleton className="w-full h-6" />
      </Button>
    </div>
  );
}
