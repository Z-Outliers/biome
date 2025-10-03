import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { paperService } from "../endpoints"
import { PaperPreview } from "@/types/paper"
import { PapersPage, ApiError } from "@/types"

export const getPaperQuery = (id: string) => queryOptions({
  queryKey: ["paper", id],
  queryFn: () => paperService.getById(id),
  enabled: !!id,
})

export function getPapersQuery() {
  return infiniteQueryOptions<PapersPage, ApiError, PaperPreview[]>({
    queryKey: ['papers'],
    queryFn: ({ pageParam }) => paperService.getAll(pageParam as number),
    initialPageParam: 1,
    select: data => data.pages.flatMap(p => p.items),
    getNextPageParam: page => {
      const { currentPage, lastPage } = page;
      return currentPage < lastPage ? currentPage + 1 : undefined;
    },
  });
}