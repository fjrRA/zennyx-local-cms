import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import {
  createDevlogSchema,
  updateDevlogSchema,
} from "../schemas/devlog.schema";
import {
  createDevlogController,
  deleteDevlogController,
  getAllDevlogsController,
  getDevlogByIdController,
  getDevlogBySlugController,
  updateDevlogController,
} from "../controllers/devlog.controller";

const router = Router();

router.get("/", getAllDevlogsController);
router.get("/id/:id", getDevlogByIdController);
router.get("/:slug", getDevlogBySlugController);

router.post("/", validateBody(createDevlogSchema), createDevlogController);

router.patch(
  "/:id",
  validateBody(updateDevlogSchema),
  updateDevlogController
);

router.delete("/:id", deleteDevlogController);

export default router;