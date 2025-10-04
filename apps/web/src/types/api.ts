import type { PaperPreview } from "./paper";

export type ApiError = {
  message: string;
  icon?: string;
  status?: number;
};

export type PapersPage = {
  currentPage: number;
  lastPage: number;
  items: PaperPreview[];
};

export type PapersFilters = {
  sortBy?: "title" | "createdAt" | "updatedAt";
  order?: "asc" | "desc";
  pageSize?: number;
};
