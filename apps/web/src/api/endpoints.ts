import type { Paper, PapersFilters, PapersPage, SearchResults } from "@/types";
import { get, post } from "./axiosClient";

export const paperService = {
  getAll: (page: number, filters: PapersFilters) =>
    get<PapersPage>("/papers", {
      params: { page, ...filters },
    }),
  getById: (id: string) => get<Paper>(`/papers/${id}`),
  search: (q?: string, fileData?: FormData) =>
    post<SearchResults>("/papers/search", fileData || undefined, {
      params: { q },
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
