import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(({ mode }) => ({
  root: "./renderer",
  base: "",
  resolve: {
    alias: {
      "@common/": path.join(__dirname, "common/"),
    },
  },
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: path.join(__dirname, "dist"),
    emptyOutDir: mode === "production",
  },
}));
