import { createReadStream } from "node:fs";
import { cp, mkdir, stat } from "node:fs/promises";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const appRoot = fileURLToPath(new URL(".", import.meta.url));
const albumRoot = resolve(appRoot, "..");
const sharedDirs = ["data", "audio", "content"];

const mimeTypes = {
  ".aac": "audio/aac",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".m4a": "audio/mp4",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".webp": "image/webp"
};

function resolveSharedAsset(requestUrl) {
  const pathname = decodeURIComponent((requestUrl ?? "").split("?")[0]).replace(/^\/+/, "");
  const [topLevel] = pathname.split("/");

  if (!sharedDirs.includes(topLevel)) {
    return null;
  }

  const targetPath = resolve(albumRoot, pathname);
  const allowedRoot = resolve(albumRoot, topLevel);

  if (!targetPath.startsWith(allowedRoot)) {
    return null;
  }

  return targetPath;
}

function sharedAlbumAssetsPlugin() {
  return {
    name: "shared-album-assets",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const filePath = resolveSharedAsset(req.url);

        if (!filePath) {
          next();
          return;
        }

        try {
          const fileInfo = await stat(filePath);

          if (!fileInfo.isFile()) {
            next();
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", mimeTypes[extname(filePath)] ?? "application/octet-stream");
          createReadStream(filePath).pipe(res);
        } catch {
          next();
        }
      });
    },
    async writeBundle() {
      const distRoot = resolve(appRoot, "dist");
      await mkdir(distRoot, { recursive: true });

      await Promise.all(
        sharedDirs.map(async (dirName) => {
          await cp(resolve(albumRoot, dirName), resolve(distRoot, dirName), {
            recursive: true,
            force: true
          });
        })
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), sharedAlbumAssetsPlugin()]
});
