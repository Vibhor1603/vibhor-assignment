import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 max-w-fit p-4">
      <Skeleton className=" h-104 w-80 rounded-xl" />
      <div className="space-y-2 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
