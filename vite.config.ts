import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'

// https://vitejs.dev/config/

module.exports = defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [
    reactRefresh(),
    reactJsx(),
  ],
  build: {
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        achernar: 'src/achernar.html',
        resume: 'src/resume.html',
        gravity: 'src/gravity.html',
        projects: 'src/projects.html',
        terraingeneration: 'src/terraingeneration.html',
      }
    }
  }
})
