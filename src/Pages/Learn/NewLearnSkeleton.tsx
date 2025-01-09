import { Skeleton } from "@/components/ui/skeleton";
import road from "../../assets/svg/road.svg";

export const CardContainerSkeleton = () => {
  return (
    <div className="border w-40 md:w-fit rounded-lg shadow-xl transition-shadow duration-300 p-1">
      <Skeleton className="w-40 h-24 md:w-96 md:h-44 rounded-xl" />
      <div className="px-4 hidden md:block">
        <Skeleton className="w-3/4 h-6 mb-2" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <div className="flex justify-between px-4 items-center text-[#1c1d47] font-bold">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
    </div>
  );
};

export default function NewLearnSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center pl-20 md:pl-0 lg:pr-24 py-4">
      <div className="w-72">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="relative w-64">
            {/* <div
              className={`absolute hidden sm:block ${
                index % 2 !== 0
                  ? "top-0 -left-24 md:-left-72"
                  : "top-0 -right-12 md:-right-[27rem]"
              }`}
            >
              <CardContainerSkeleton />
            </div> */}
            {/* Road SVG */}
            <img
              className={`w-32 md:w-64 ${
                index % 2 !== 0 ? "rotate-180 ml-[4.35rem] md:ml-[8.7rem]" : ""
              }`}
              src={road}
              alt="Road"
            />

            {/* Step indicator skeleton */}
            <div
              className={`absolute ${
                index % 2 === 0
                  ? "left-5 md:left-10"
                  : "right-[5rem] md:-right-24"
              } top-1/2 transform -translate-y-1/2`}
            >
              <Skeleton className="w-8 h-8 md:w-16 md:h-16 rounded-full" />
            </div>

            {/* Card container skeleton */}
            <div
              className={`absolute hidden sm:block ${
                index % 2 !== 0
                  ? "top-0 -left-24 md:-left-72"
                  : "top-0 -right-12 md:-right-[27rem]"
              }`}
            >
              <CardContainerSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
