import { sql } from "../generated/prisma/internal/prismaNamespace.js";
import { prisma } from "../lib/db.js";

export const getPaginatedPapers = async (
  sortBy?: "title" | "createdAt" | "updatedAt",
  order: "asc" | "desc" = "asc",
  page: number = 1,
  pageSize: number = 10,
) => {
  const skip = (page - 1) * pageSize;

  const [items, total] = await prisma.$transaction([
    prisma.paper.findMany({
      orderBy: {
        [sortBy || "createdAt"]: order,
      },
      skip,
      take: pageSize,
      select: {
        title: true,
        id: true,
        abstract: true,
        originalUrl: true,
        tags: true,
        authors: true,
        thumbnail: true,
        createdAt: true,
      },
    }),
    prisma.paper.count(),
  ]);

  return {
    items,
    currentPage: page,
    lastPage: Math.ceil(total / pageSize),
  };
};

export const getPaperById = async (id: string) => {
  return await prisma.paper.findUnique({
    where: { id },
  });
};

export async function searchPaperChunks(embedding: number[], limit: number) {
  const rows = await prisma.$queryRaw<
    {
      chunkId: string;
      chunkText: string;
      id: string;
      thumbnail: string | null;
      authors: string[]; // adjust if your column is text/JSON
      similarity: number;
    }[]
  >(sql`
    SELECT
      pc.id AS "chunkId",
      pc."chunkText",
      p.id,
      p.thumbnail,
      p.title,
      p.abstract,
      p."originalUrl",
      p.authors,
      1 - (pc."chunkEmbedding" <=> ${JSON.stringify(embedding)}::vector) AS similarity
    FROM "PaperChunk" pc
    JOIN "Paper" p ON pc."paperId" = p.id
    ORDER BY pc."chunkEmbedding" <=> ${JSON.stringify(embedding)}::vector ASC
    LIMIT ${limit};
  `);

  return rows;
}
