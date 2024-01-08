import { Skeleton } from "./ui/skeleton";

const SkeletonTask = () => {
  return (
    <div className="flex items-center space-x-8 pt-6">
      <Skeleton className="h-5 w-5 " />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};

export default SkeletonTask;
