import path from 'path';
import { globSync } from 'glob';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSectionize from './plugins/remark-sectionize.mjs';

// https://vitejs.dev/config/

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath, remarkSectionize],
        rehypePlugins: [rehypeKatex],
      })
    },
    // `include` also covers .mdx so it gets JSX handling and Fast Refresh
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    viteStaticCopy({
      targets: [
        {
          src: '../node_modules/onnxruntime-web/dist/*.wasm',
          dest: '.'
        }
      ]
    }),
  ],
  build: {
    assetsInlineLimit: 0,
    outDir: "../docs",
    emptyOutDir: true,
    rollupOptions: {
      // absolute paths: these are resolved against `root` (which is already
      // src/), so cwd-relative ones would look for src/src/*.html
      input: globSync(path.resolve(__dirname, "src/**/*.html"))
    }
  }
})
