// src/routes/media.routes.ts

import {
  Router,
} from "express";

import {
  deleteMediaImageController,
  uploadMediaImageController,
} from "../controllers/media.controller";

import {
  uploadSingleImage,
} from "../middlewares/media-upload";

const router = Router();

router.post(
  "/images",
  uploadSingleImage,
  uploadMediaImageController,
);

router.delete(
  "/images",
  deleteMediaImageController,
);

export default router;