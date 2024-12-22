/// <reference types="vite/client" />
/** @type {import("vite").UserConfig} */

import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default {
  plugins: [react(), viteTsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@img": path.resolve(__dirname, "./src/assets/img"),
    },
  },
};
