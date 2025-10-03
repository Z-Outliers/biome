import { toNodeHandler } from "@repo/auth/server";
import cors from "cors";
import express from "express";
import env from "./env.js";
import { auth } from "./lib/auth.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (_, res) => {
  res.send("Hello from the other side");
});

app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
});
