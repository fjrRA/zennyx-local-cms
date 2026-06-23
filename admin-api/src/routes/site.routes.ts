// src/routes/site.routes.ts
import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const site = await prisma.siteConfig.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    if (!site) {
      return res.status(404).json({
        message: "Site config not found",
      });
    }

    res.json(site);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch site config",
    });
  }
});

export default router;