/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": {
        target: "http://127.0.0.1:5113",
        changeOrigin: false,
        secure: true,
      },
      "/group": {
        target: "http://127.0.0.1:8000",
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
