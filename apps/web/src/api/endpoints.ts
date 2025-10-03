import { PapersPage, Paper } from "@/types";
import { get } from "./axiosClient";

export const paperService = {
  getAll: (page: number) => get<PapersPage>(`/papers?page=${page}`),
  getById: (id: string) => get<Paper>(`/papers/${id}`),
};
