import type { IncomingMessage } from "node:http";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/** Mirrors production rewrite: /credit-intelligence/africa → static HTML (public/…/index.html). */
function creditIntelligenceAfricaHtml() {
  const rewrite = (req: IncomingMessage) => {
    const raw = req.url ?? "";
    const q = raw.indexOf("?");
    const pathname = q === -1 ? raw : raw.slice(0, q);
    const search = q === -1 ? "" : raw.slice(q);
    if (pathname === "/credit-intelligence/africa" || pathname === "/credit-intelligence/africa/") {
      req.url = "/credit-intelligence/africa/index.html" + search;
    }
  };

  return {
    name: "credit-intelligence-africa-html",
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
    creditIntelligenceAfricaHtml(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
