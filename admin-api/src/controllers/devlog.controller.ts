// src/controllers/devlog.controller.ts
import type { Request, Response } from "express";
import {
  createDevlog,
  deleteDevlog,
  getAllDevlogs,
  getDevlogById,
  getDevlogBySlug,
  parsePositiveId,
  updateDevlog,
} from "../services/devlog.service";

type IdParams = {
  id: string;
};

type SlugParams = {
  slug: string;
};

export async function getAllDevlogsController(_req: Request, res: Response) {
  try {
    const devlogs = await getAllDevlogs();
    res.json(devlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch devlogs" });
  }
}

export async function getDevlogByIdController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid devlog id" });
    }

    const devlog = await getDevlogById(id);

    if (!devlog) {
      return res.status(404).json({ message: "Devlog not found" });
    }

    res.json(devlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch devlog by id" });
  }
}

export async function getDevlogBySlugController(
  req: Request<SlugParams>,
  res: Response
) {
  try {
    const devlog = await getDevlogBySlug(req.params.slug);

    if (!devlog) {
      return res.status(404).json({ message: "Devlog not found" });
    }

    res.json(devlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch devlog detail" });
  }
}

export async function createDevlogController(req: Request, res: Response) {
  try {
    const devlog = await createDevlog(req.body);
    res.status(201).json(devlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create devlog" });
  }
}

export async function updateDevlogController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid devlog id" });
    }

    const existingDevlog = await getDevlogById(id);

    if (!existingDevlog) {
      return res.status(404).json({ message: "Devlog not found" });
    }

    const devlog = await updateDevlog(id, req.body);
    res.json(devlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update devlog" });
  }
}

export async function deleteDevlogController(
  req: Request<IdParams>,
  res: Response
) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({ message: "Invalid devlog id" });
    }

    const existingDevlog = await getDevlogById(id);

    if (!existingDevlog) {
      return res.status(404).json({ message: "Devlog not found" });
    }

    await deleteDevlog(id);

    res.json({ message: "Devlog deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete devlog" });
  }
}