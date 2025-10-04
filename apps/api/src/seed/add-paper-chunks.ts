import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

import { prisma } from "../lib/db.js";

const filePath = path.join(process.cwd(), "src/seed/chunks-1.csv");
const fileContent = fs.readFileSync(filePath, "utf-8");
const records = parse(fileContent, { delimiter: "," });

const availablePaperIds = await prisma.paper.findMany({
  select: { id: true },
});
const availablePaperIdSet = new Set(availablePaperIds.map((p) => p.id));

for (const record of records) {
  const id = record[0];
  const content = record[1];
  const embedding = record[2];
  const type = record[4]?.toUpperCase();
  const filename = record[5];
  const paperId = filename?.split(".")?.[0];

  if (!availablePaperIdSet.has(paperId as string)) continue;

  if (!embedding?.startsWith("[")) continue;

  console.log(`Adding chunk for paperId: ${paperId}`);

  const result = await prisma.$executeRawUnsafe(
    `INSERT INTO "PaperChunk" ("id", "paperId", "type", "chunkText", "chunkEmbedding") VALUES ($1, $2, $3::"ChunckType", $4, $5::vector) ON CONFLICT DO NOTHING`,
    id,
    paperId,
    type,
    content,
    embedding,
  );
  console.log(`Inserted chunk for paperId: ${paperId}`);
  console.log(result);
}
