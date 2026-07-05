// src/controller/game.controller.ts
import type { Request, Response } from "express";

import {
  isPrismaUniqueConstraintError,
} from "../lib/prisma-error";

import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  getGameBySlug,
  parsePositiveId,
  updateGame,
} from "../services/game.service";


type IdParams = {
  id: string;
};

type SlugParams = {
  slug: string;
};

export async function getAllGamesController(_req: Request, res: Response) {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch games" });
  }
}

export async function getGameByIdController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid game id" });
    }

    const game = await getGameById(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch game by id" });
  }
}

export async function getGameBySlugController(
  req: Request<SlugParams>,
  res: Response
) {
  try {
    const game = await getGameBySlug(req.params.slug);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch game detail" });
  }
}

export async function createGameController(
  req: Request,
  res: Response,
) {
  try {
    const game = await createGame(req.body);

    return res.status(201).json(game);
  } catch (error) {
    if (
      isPrismaUniqueConstraintError(error)
    ) {
      return res.status(409).json({
        message: "Validation error",
        errors: {
          formErrors: [],
          fieldErrors: {
            slug: [
              "Slug Game sudah digunakan. Gunakan slug yang berbeda.",
            ],
          },
        },
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Failed to create game",
    });
  }
}

export async function updateGameController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid game id" });
    }

    const existingGame = await getGameById(id);

    if (!existingGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game = await updateGame(id, req.body);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update game" });
  }
}

export async function deleteGameController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid game id" });
    }

    const existingGame = await getGameById(id);

    if (!existingGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    await deleteGame(id);

    res.json({ message: "Game deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete game" });
  }
}