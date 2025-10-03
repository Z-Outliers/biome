import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { prisma } from "../lib/db.js";

const filePath = path.join(process.cwd(), "src/seed/papers.csv");
const fileContent = fs.readFileSync(filePath, "utf-8");
const records = parse(fileContent, { delimiter: "," });
console.log(records.length);
for (const record of records) {
  const [
    id = "",
    title = "",
    url = "",
    authors = "",
    abstract = "",
    content = "",
  ] = record;
  const authorsArray = authors.split(", ");
  await prisma.paper.upsert({
    where: { id },
    create: {
      id,
      title,
      originalUrl: url,
      authors: authorsArray,
      abstract,
      content,
    },
    update: {
      title,
      originalUrl: url,
      authors: authorsArray,
      abstract,
      content,
    },
  });
  console.log(`Upserted paper with id: ${id}`);
}
