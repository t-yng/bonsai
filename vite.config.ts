import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Icons from "unplugin-icons/vite";

export default defineConfig(({ mode }) => ({
  root: "./renderer",
  base: "",
  resolve: {
    alias: {
      "@common/": path.join(__dirname, "common/"),
      "@renderer/": path.join(__dirname, "renderer/src/"),
    },
  },
  plugins: [solidPlugin(), Icons({ compiler: "solid" })],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: path.join(__dirname, "dist"),
    emptyOutDir: mode === "production",
  },
}));
