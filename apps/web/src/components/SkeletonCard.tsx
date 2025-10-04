import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-[320px] sm:w-[340px] overflow-hidden" aria-hidden>
      <Skeleton className="aspect-[16/9] w-full" />
      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="mt-2 flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-12" />
        </div>
      </CardContent>
    </Card>
  );
}
