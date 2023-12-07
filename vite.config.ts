import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "node:path";

import dts from "vite-plugin-dts";
import EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
const { EsLinter, linterPlugin } = EsLint;
import * as packageJson from "./package.json";
// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })],
    }),
    dts({
      include: ["src/lib/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "lib/index.tsx"),
      name: "npmtestapp",
      formats: ["es", "umd"],
      fileName: (format) => `npmtestapp.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}));
