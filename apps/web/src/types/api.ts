import { PaperPreview } from "./paper"

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