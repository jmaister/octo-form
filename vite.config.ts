import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// https://vitejs.dev/guide/build.html#library-mode

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    peerDepsExternal(),
    react(),
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    target: 'es6',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      name: 'OctoForm',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
    },
  }
})
