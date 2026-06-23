// src/routes/health.routes.ts
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    app: "zennyx-local-cms-admin-api",
  });
});

export default router;