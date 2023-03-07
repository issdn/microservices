/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:5113",
        changeOrigin: false,
        secure: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
