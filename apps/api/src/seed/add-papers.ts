import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse/sync";
import { prisma } from "../lib/db.js";

const filePath = path.join(process.cwd(), "src/seed/papers.csv");
const fileContent = fs.readFileSync(filePath, "utf-8");
const records = parse(fileContent, { delimiter: "," });
console.log(records.length);
for (const record of records) {
  const [id = "", , , , , content = ""] = record;
  const matches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
  const thumbnail = matches[1]?.[1] ?? matches[0]?.[1] ?? null;
  await prisma.paper.update({
    where: { id },
    data: {
      thumbnail,
    },
  });
  console.log(`Updated paper with id: ${id}`);
}
