// src/scripts/check-media-paths.ts

import {
  strict as assert,
} from "node:assert";

import * as path from "node:path";

import {
  GAME_MEDIA_STORAGE_ROOT,
} from "../config/media.config";

import {
  ensureGameMediaStorageRoot,
  getGameMediaFilePath,
  getGameMediaFilePathFromPublicPath,
  getGameMediaPreviewPath,
  getGameMediaPublicPath,
  parseGameMediaPublicPath,
} from "../lib/media-path";

const slug =
  "andara-beat-em-up";

const filename =
  "hero-20260705-a8f21c4d.png";

ensureGameMediaStorageRoot();

const publicPath =
  getGameMediaPublicPath(
    slug,
    filename,
  );

const previewPath =
  getGameMediaPreviewPath(
    slug,
    filename,
  );

const storagePath =
  getGameMediaFilePath(
    slug,
    filename,
  );

assert.equal(
  publicPath,
  "/images/games/andara-beat-em-up/hero-20260705-a8f21c4d.png",
);

assert.equal(
  previewPath,
  "/media/games/andara-beat-em-up/hero-20260705-a8f21c4d.png",
);

assert.equal(
  path.dirname(storagePath),
  path.join(
    GAME_MEDIA_STORAGE_ROOT,
    slug,
  ),
);

assert.deepEqual(
  parseGameMediaPublicPath(
    publicPath,
  ),
  {
    slug,
    filename,
  },
);

assert.equal(
  getGameMediaFilePathFromPublicPath(
    publicPath,
  ),
  storagePath,
);

assert.throws(() => {
  getGameMediaFilePath(
    "../outside",
    filename,
  );
});

assert.throws(() => {
  getGameMediaFilePath(
    slug,
    "../danger.png",
  );
});

assert.throws(() => {
  getGameMediaFilePathFromPublicPath(
    "/images/games/../../danger.png",
  );
});

console.log(
  "Media path check berhasil.",
);