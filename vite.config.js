import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // GitHub Pages用にベースパスを設定
  build: {
    outDir: "dist",
  },
});
