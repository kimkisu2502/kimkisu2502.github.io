import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.mjs';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  // If you are deploying to https://<USERNAME>.github.io/, set base to '/'.
  // If you are deploying to https://<USERNAME>.github.io/<REPO>/, for example your repository is at https://github.com/<USERNAME>/<REPO>, then set base to '/<REPO>/'.
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        diagram: 'diagram.html',
      },
      output: {
        // Excalidraw drags in mermaid/katex/cytoscape. Emit those chunks under
        // assets/diagram/ so the service worker can skip precaching them.
        chunkFileNames: (chunk) =>
          chunk.moduleIds?.some((id) =>
            /node_modules[\\/](@excalidraw|mermaid|katex|cytoscape|roughjs|image-blob-reduce)/.test(
              id
            )
          )
            ? 'assets/diagram/[name]-[hash].js'
            : 'assets/[name]-[hash].js',
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png'],
      workbox: {
        // Excalidraw and its diagram data are only needed on /diagram.html,
        // so keep them out of the precache and let them load on demand.
        globIgnores: [
          '**/excalidraw/*.json',
          '**/assets/diagram/**',
          '**/assets/diagram-*.css',
        ],
        maximumFileSizeToCacheInBytes: 500 * 1024,
      },
      manifest: {
        name: 'Portfolio',
        short_name: 'Portfolio',
        description: 'Personal Portfolio',
        icons: [
          {
            src: 'logo.png',
            sizes: '64x64 32x32 24x24 16x16 192x192 512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind(tailwindConfig), autoprefixer],
    },
  },
});
