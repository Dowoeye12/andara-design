import type { IncomingMessage } from "node:http";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

/**
 * Mirrors how Vercel serves static pages: any folder under public/ that contains
 * an index.html is reachable at /folder (and any nested subfolder too). Without
 * this middleware, Vite's SPA fallback catches those URLs and serves the React
 * app's NotFound route instead.
 *
 * The folder list is built by scanning public/ once at server start and checked
 * on every request, so adding a new static page (e.g. public/intelligence/air-002/)
 * just requires restarting the dev server — no config edit needed.
 *
 * Production rewrites still live in vercel.json; keep both in sync when adding
 * a new top-level static folder.
 */
function staticHtmlRoutes() {
  const publicDir = path.resolve(__dirname, "public");

  function collectIndexHtmlFolders(): Set<string> {
    const found = new Set<string>();
    if (!fs.existsSync(publicDir)) return found;
    const walk = (dir: string, urlPrefix: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const sub = path.join(dir, entry.name);
        const urlPath = urlPrefix + "/" + entry.name;
        if (fs.existsSync(path.join(sub, "index.html"))) {
          found.add(urlPath);
        }
        walk(sub, urlPath);
      }
    };
    walk(publicDir, "");
    return found;
  }

  const routes = collectIndexHtmlFolders();

  const rewrite = (req: IncomingMessage) => {
    const raw = req.url ?? "";
    const q = raw.indexOf("?");
    const pathname = q === -1 ? raw : raw.slice(0, q);
    const search = q === -1 ? "" : raw.slice(q);
    const stripped = pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;
    if (routes.has(stripped)) {
      req.url = stripped + "/index.html" + search;
    }
  };

  return {
    name: "static-html-routes",
    enforce: "pre" as const,
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req);
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    staticHtmlRoutes(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
