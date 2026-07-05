// src/middlewares/media-static.ts

import express from "express";

import {
  MEDIA_STORAGE_ROOT,
} from "../config/media.config";

export const mediaStaticMiddleware =
  express.static(
    MEDIA_STORAGE_ROOT,
    {
      dotfiles: "deny",
      etag: true,
      fallthrough: false,
      index: false,
      lastModified: true,
      redirect: false,
      maxAge: 0,

      setHeaders(response) {
        response.setHeader(
          "X-Content-Type-Options",
          "nosniff",
        );

        response.setHeader(
          "Cache-Control",
          "no-store",
        );
      },
    },
  );