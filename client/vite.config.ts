import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      api: "/src/api",
      types: "/src/types",
      stores: "/src/stores",
      partials: "/src/partials",
      components: "/src/components",
    },
  },
});
