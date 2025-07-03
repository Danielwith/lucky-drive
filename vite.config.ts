import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default ({ mode }: { mode: any }) => {
  const loadedEnv = {
    ...process.env,
    ...loadEnv(mode as string, process.cwd()),
  };
  return defineConfig({
    appType: "spa",
    define: {
      __ENV__: loadedEnv,
    },
    base: "./",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
