import { Skeleton } from "@/components/ui/skeleton";

export const UpdateAvailabilityButtonSkeleton = () => {
  return (
    <div className="flex items-center gap-2 w-fit">
      <Skeleton className="h-6 w-6 rounded-md" />
      <Skeleton className="h-5 w-40 rounded-md" />
    </div>
  );
};
