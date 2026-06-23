// src/routes/socials.routes.ts
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const socials = await prisma.socialConfig.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (!socials) {
      return res.status(404).json({
        message: "Social config not found",
      });
    }

    res.json(socials);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch social config",
    });
  }
});

export default router;