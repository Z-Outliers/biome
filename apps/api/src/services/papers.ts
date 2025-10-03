import { prisma } from "../lib/db.js";

export const getPaginatedPapers = async (
  sortBy?: "title" | "createdAt" | "updatedAt",
  order: "asc" | "desc" = "asc",
  page: number = 1,
  pageSize: number = 10,
) => {
  const skip = (page - 1) * pageSize;

  return await prisma.paper.findMany({
    orderBy: {
      [sortBy || "createdAt"]: order,
    },
    skip,
    take: pageSize,
    select: { title: true, id: true, abstract: true, originalUrl: true },
  });
};

export const getPaperById = async (id: string) => {
  return await prisma.paper.findUnique({
    where: { id },
  });
};
