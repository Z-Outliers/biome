export type Paper = {
  id: string;
  title: string;
  content: string;
  abstract: string;
  thumbnail: string | null;
  summary: string | null;
  authors: string[];
  originalUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type PaperPreview = Omit<Paper, "content" | "summary" | "updatedAt">;
