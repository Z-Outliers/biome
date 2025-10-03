import { createAuth } from "@repo/auth/server";
import env from "../env.js";
import { prisma } from "./db.js";

export const auth = createAuth(
  prisma,
  "postgresql",
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
);
