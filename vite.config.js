import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    proxy: {
      '/api': {
        target: 'https://tripmind.runasp.net',
        changeOrigin: true,
        secure: false,
      }
    }
  },
});