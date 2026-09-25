import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// Dynamically discover screen directories
const screensDir = resolve(__dirname, "src/screens");
const screenEntries: Record<string, string> = {};

// Only add screens that exist in the src/screens directory
if (fs.existsSync(screensDir)) {
  const screenDirs = fs
    .readdirSync(screensDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Create an entry point for each screen
  screenDirs.forEach((screen) => {
    const entryFile = resolve(screensDir, screen, "index.tsx");
    if (fs.existsSync(entryFile)) {
      screenEntries[screen] = entryFile;
    }
  });
}

const aculBrand = (process.env.VITE_ACUL_BRAND || "").trim().toLowerCase();
const isBrandBuild = aculBrand === "client1" || aculBrand === "client2";
// Stable filenames so Auth0 Liquid {{client.metadata.acul_brand}} URLs work without hash churn.
const useStableNames = isBrandBuild;
// Brand builds upload to https://acul.innodeed.com/assets/{client1|client2}/...
const brandAssetPrefix = isBrandBuild ? "" : "assets/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Use './' for relative paths
  // Force brand id into the client bundle (reliable on Windows brand builds).
  define: isBrandBuild
    ? {
        "import.meta.env.VITE_ACUL_BRAND": JSON.stringify(aculBrand),
      }
    : undefined,
  server: {
    port: 3000,
    strictPort: true,
    fs: {
      deny: ["dist"],
    },
  },
  clearScreen: false,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/screens": resolve(__dirname, "./src/screens"),
      "@/utils": resolve(__dirname, "./src/utils"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/constants": resolve(__dirname, "./src/constants"),
      "@/assets": resolve(__dirname, "./src/assets"),
      "@/lib": resolve(__dirname, "./src/lib"),
      "@/hooks": resolve(__dirname, "./src/hooks"),
      "@/test": resolve(__dirname, "./src/test"),
      "@/brands": resolve(__dirname, "./src/brands"),
    },
  },
  build: {
    outDir: isBrandBuild ? `dist-brands/${aculBrand}` : "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...screenEntries,
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // Screen-specific entries
        entryFileNames: (chunkInfo) => {
          if (screenEntries[chunkInfo.name]) {
            return useStableNames
              ? `${brandAssetPrefix}${chunkInfo.name}/index.js`
              : `assets/${chunkInfo.name}/index.[hash].js`;
          }
          return useStableNames
            ? `${brandAssetPrefix}main.js`
            : "assets/main.[hash].js";
        },

        // Chunks naming strategy
        chunkFileNames: (chunkInfo) => {
          const chunkName = chunkInfo.name || "";

          // For screen-specific chunks
          const screenMatch = Object.keys(screenEntries).find((screen) =>
            chunkName.startsWith(`${screen}-`)
          );

          if (screenMatch) {
            return useStableNames
              ? `${brandAssetPrefix}${screenMatch}/chunk.js`
              : `assets/${screenMatch}/chunk.[hash].js`;
          }

          // For shared chunks, use a simplified naming scheme
          return useStableNames
            ? `${brandAssetPrefix}shared/[name].js`
            : "assets/shared/[name].[hash].js";
        },

        // Assets naming (CSS, images, etc)
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || "";
          if (info.endsWith(".css")) {
            return useStableNames
              ? `${brandAssetPrefix}shared/style.css`
              : "assets/shared/style.[hash][extname]";
          }
          return useStableNames
            ? `${brandAssetPrefix}shared/[name][extname]`
            : "assets/shared/[name].[hash][extname]";
        },

        manualChunks: (id) => {
          // Keep each screen entry self-contained enough that Auth0 head_tags
          // for one screen do not depend on another screen's entry chunk.
          if (!id.includes("node_modules")) {
            const absoluteId = resolve(id).replace(/\\/g, "/");
            const screensRoot = resolve(__dirname, "src/screens").replace(
              /\\/g,
              "/"
            );

            // Keep app bootstrap in the main entry (not shared/common).
            // Otherwise Auth0 can load scripts without ever calling initializeApp.
            if (
              absoluteId.endsWith("/src/main.tsx") ||
              absoluteId.endsWith("/src/App.tsx")
            ) {
              return undefined;
            }

            // Shared app code (not screen-specific) → shared/common chunk
            if (
              absoluteId.includes("/src/") &&
              !absoluteId.startsWith(screensRoot + "/")
            ) {
              return "common";
            }

            // Do not manually chunk screen modules — leave them with their entry
            return undefined;
          }

          // React core packages (no external dependencies) go to react-vendor
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/") // Keep React's internals together
          ) {
            return "react-vendor";
          }

          // All other node_modules go to vendor
          return "vendor";
        },
      },
      // Prevent Rollup from collapsing main/bootstrap into a screen entry chunk
      preserveEntrySignatures: "strict",
    },
    minify: true,
    cssCodeSplit: false, // Keep CSS in a single file
    sourcemap: true,
  },
  logLevel: "info",
});
