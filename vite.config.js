import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://backendsystem-rnf1yw3gk-karims-projects-c3a021f0.vercel.app",
      "/uploads/": "https://backendsystem-rnf1yw3gk-karims-projects-c3a021f0.vercel.app",
    },
  },
});
