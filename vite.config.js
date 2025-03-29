import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@games": path.resolve(__dirname, "./src/games"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@animations": path.resolve(__dirname, "./src/animations"),
    },
  },
});
