import { Router } from "express";
import { getPaginatedPapers, getPaperById } from "../services/papers.js";

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

export { router as papersRouter };
