import path from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import reactJsx from 'vite-react-jsx'
import multiInput from 'rollup-plugin-multi-input';

// https://vitejs.dev/config/

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [
    reactRefresh(),
    reactJsx(),
    multiInput(),
  ],
  build: {
    assetsInlineLimit: 0,
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/**/*.html")
    }
  }
})
