import { Router } from "express";
import { upload } from "../lib/upload.js";
import {
  getEmbeddingsFromAudio,
  getEmbeddingsFromImage,
  getEmbeddingsFromText,
} from "../services/embeddings.js";
import {
  getPaginatedPapers,
  getPaperById,
  searchPaperChunks,
} from "../services/papers.js";

const router: Router = Router();

router.get("/", async (req, res) => {
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;
  const page = parseInt(req.query.page as string, 10) || 1;
  const sortByInput = req.query.sortBy as string;
  const sortBy = ["title", "createdAt", "updatedAt"].includes(sortByInput)
    ? (sortByInput as "title" | "createdAt" | "updatedAt")
    : "createdAt";
  const order = (req.query.order as string) === "desc" ? "desc" : "asc";

  const papers = await getPaginatedPapers(sortBy, order, page, pageSize);
  res.json(papers);
});

router.get("/:id", async (req, res) => {
  const paper = await getPaperById(req.params.id);
  res.json(paper);
});

router.post("/search", upload.single("file"), async (req, res) => {
  let embeddings: number[] | null = null;
  if (req.query.q) {
    embeddings = await getEmbeddingsFromText(req.query.q as string);
  } else if (req.file?.mimetype.startsWith("image/")) {
    embeddings = await getEmbeddingsFromImage(req.file.buffer);
  } else if (req.file?.mimetype.startsWith("audio/")) {
    embeddings = await getEmbeddingsFromAudio(req.file.buffer);
  }
  console.log("Query: ", req.query.q);

  if (!embeddings) {
    return res.status(400).json({ error: "No valid query or file provided" });
  }

  const papers = await searchPaperChunks(embeddings, 5);
  res.json(papers);
});

export { router as papersRouter };
