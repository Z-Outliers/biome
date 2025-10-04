import type { Paper, PapersFilters, PapersPage } from "@/types";
import { get } from "./axiosClient";

export const paperService = {
  getAll: (page: number, filters: PapersFilters) =>
    get<PapersPage>("/papers", {
      params: { page, ...filters },
    }),
  getById: (id: string) => get<Paper>(`/papers/${id}`),
};
