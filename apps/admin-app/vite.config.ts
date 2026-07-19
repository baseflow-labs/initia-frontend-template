import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  envDir: path.resolve(__dirname, "../.."),
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, "../../node_modules")],
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@initia/shared": path.resolve(__dirname, "../../packages/shared/src"),
      "@initia/user-services": path.resolve(__dirname, "../../packages/user-services/src"),
    },
  },
  server: {
    port: 5174,
  },
});
