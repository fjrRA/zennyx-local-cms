// src/app.ts
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import siteRoutes from "./routes/site.routes";
import gamesRoutes from "./routes/games.routes";
import devlogsRoutes from "./routes/devlogs.routes";
import teamRoutes from "./routes/team.routes";
import socialsRoutes from "./routes/socials.routes";
import exportRoutes from "./routes/export.routes";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  })
);

app.use(express.json({ limit: "2mb" }));

app.use("/api/health", healthRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/devlogs", devlogsRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/socials", socialsRoutes);
app.use("/api/export", exportRoutes);