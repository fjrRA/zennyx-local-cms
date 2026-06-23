// src/routes/export.route.ts
import { Router } from "express";

import {
  exportWebsiteController,
  getExportStatusController,
} from "../controllers/export.controller";

const router = Router();

router.get(
  "/status",
  getExportStatusController
);

router.post(
  "/website",
  exportWebsiteController
);

export default router;