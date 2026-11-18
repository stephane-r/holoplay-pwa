import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // Defaults to root ("/"), which is what the Docker/nginx deployment and
    // local dev both expect. GitHub Pages serves this repo at a subpath
    // (stephane-r.github.io/holoplay-pwa/) instead of the domain root, so
    // its deploy workflow builds with VITE_BASE_PATH=/holoplay-pwa/ to
    // prefix every asset URL accordingly — without this, every asset 404s
    // under a subpath since Vite emits root-absolute paths by default.
    base: env.VITE_BASE_PATH || "/",
    plugins: [
      react(),
      VitePWA({
        strategies: "injectManifest",
        srcDir: "src",
        filename: "service-worker.ts",
        injectRegister: false,
        registerType: "prompt",
        manifest: false,
        injectManifest: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff,woff2}"],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
        devOptions: {
          enabled: false,
        },
      }),
    ],
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
    },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(
        env.REACT_APP_API_URL,
      ),
      "process.env.REACT_APP_PLAUSIBLE_ANALYTICS": JSON.stringify(
        env.REACT_APP_PLAUSIBLE_ANALYTICS,
      ),
    },
  };
});
