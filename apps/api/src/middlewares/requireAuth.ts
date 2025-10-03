import { fromNodeHeaders } from "@repo/auth/server";
import type { RequestHandler } from "express";
import { auth } from "../lib/auth.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
