import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { join } from "path"

const PROJECT_ROOT = process.cwd()
const projectPath = (path: string) => join(PROJECT_ROOT, path)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  root: projectPath("src"),
  build: {
    outDir: projectPath("dist"),
    emptyOutDir: true,
  },
})
