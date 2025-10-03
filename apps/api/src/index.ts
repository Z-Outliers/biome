import { toNodeHandler } from "@repo/auth/server";
import cors from "cors";
import express from "express";
import env from "./env.js";
import { auth } from "./lib/auth.js";
import { requireAuth } from "./middlewares/requireAuth.js";
import { papersRouter } from "./routes/papers.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use("/api/papers", papersRouter);

app.get("/", (_, res) => {
  res.send("Hello from the other side");
});

app.get("/api/protected", requireAuth, (_, res) => {
  res.json({ message: `Hello, Man!` });
});

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
