// src/routes/team.routes.ts
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: {
        order: "asc",
      },
    });

    res.json(team);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch team members",
    });
  }
});

export default router;