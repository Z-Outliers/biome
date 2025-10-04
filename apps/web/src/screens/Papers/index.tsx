import { useInfiniteQuery } from "@tanstack/react-query";
import { getPapersQuery } from "@/api/queries/paperQueries";
import PaperCard from "@/components/PaperCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Papers() {
  const {
    data: papers,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    refetch,
  } = useInfiniteQuery(getPapersQuery());

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Scientific Papers</h1>
        <p className="text-muted-foreground">
          Browse and manage your research publications
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[16/9] w-full" />
              <CardContent className="space-y-3 p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2 pt-1">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <div className="mt-2 flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-12" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : papers && papers.length > 0 ? (
          papers.map((paper) => <PaperCard key={paper.id} paper={paper} />)
        ) : isError ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-md border p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Couldn’t load papers. Please try again.
            </p>
            <Button
              className="mt-3"
              variant="outline"
              onClick={() => refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="col-span-full rounded-md border p-8 text-center text-sm text-muted-foreground">
            No papers found.
          </div>
        )}
      </div>

      {/* Infinite Pagination */}
      <div className="flex items-center justify-center">
        {hasNextPage ? (
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="hover:text-white"
          >
            {isFetchingNextPage ? "Loading more…" : "Load more"}
          </Button>
        ) : (
          <div className="text-sm text-muted-foreground">
            You’ve reached the end.
          </div>
        )}
      </div>
    </div>
  );
}
