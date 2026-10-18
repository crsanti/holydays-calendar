import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import zlib from "zlib";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    react(),
    visualizer({ template: "treemap", filename: `${process.cwd()}/stats/stats.treemap.html` }),
    visualizer({ template: "sunburst", filename: `${process.cwd()}/stats/stats.sunburst.html` }),
    viteCompression({
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
          [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
        },
      },
    }),
    viteCompression({
      algorithm: "gzip",
      compressionOptions: {
        params: {
          [zlib.constants.GZIP]: zlib.constants.Z_BEST_COMPRESSION,
        },
      },
    }),
  ],
});
