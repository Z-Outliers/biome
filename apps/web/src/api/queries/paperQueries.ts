import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import type {
  ApiError,
  PaperPreview,
  PapersFilters,
  PapersPage,
} from "@/types";
import { paperService } from "../endpoints";

export const getPaperQuery = (id: string) =>
  queryOptions({
    queryKey: ["paper", id],
    queryFn: () => paperService.getById(id),
    enabled: !!id,
  });

export function getPapersQuery(filters: PapersFilters) {
  return infiniteQueryOptions<PapersPage, ApiError, PaperPreview[]>({
    queryKey: ["papers", filters],
    queryFn: ({ pageParam }) =>
      paperService.getAll(pageParam as number, filters),
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((p) => p.items),
    getNextPageParam: (page) => {
      const { currentPage, lastPage } = page;
      return currentPage < lastPage ? currentPage + 1 : undefined;
    },
  });
}
