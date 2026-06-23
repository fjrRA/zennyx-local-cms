// src/routes/games.routes.ts
import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { createGameSchema, updateGameSchema } from "../schemas/game.schema";
import {
  createGameController,
  deleteGameController,
  getAllGamesController,
  getGameByIdController,
  getGameBySlugController,
  updateGameController,
} from "../controllers/game.controller";

const router = Router();

router.get("/", getAllGamesController);
router.get("/id/:id", getGameByIdController);
router.get("/:slug", getGameBySlugController);

router.post("/", validateBody(createGameSchema), createGameController);

router.patch(
  "/id/:id",
  validateBody(updateGameSchema),
  updateGameController
);

router.delete("/id/:id", deleteGameController);

export default router;