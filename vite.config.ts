import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

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
    lib: {
      entry: 'src/index.ts',
      name: 'OctoForms',
      fileName: (format) => `octo-form.${format}.js`,
    },
    rollupOptions: {
    },
  }
})
