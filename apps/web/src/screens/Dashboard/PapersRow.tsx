import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { getPapersQuery } from "@/api/queries/paperQueries";
import PaperCard from "@/components/PaperCard";
import { Button } from "@/components/ui/button";
import type { PapersFilters } from "@/types";

export default function PapersRow({
  filters,
  title,
}: {
  filters: PapersFilters;
  title: string;
}) {
  const { data } = useInfiniteQuery(getPapersQuery(filters));

  return (
    <section className="space-y-3 p-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <Button asChild variant="link" size="sm" className="text-foreground/80">
          <a href="/dashboard/papers" aria-label="View more papers">
            View more
            <ArrowRight className="ml-1" />
          </a>
        </Button>
      </div>

      <div className="relative">
        <div className="flex gap-4">
          {data?.map((paper) => (
            <div key={paper.id}>
              <PaperCard paper={paper} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
