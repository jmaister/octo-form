import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'yup': ['yup'],
          'mui': ['@mui/material'],
          'mui-date': ['@mui/x-date-pickers', '@date-io/date-fns', 'date-fns'],
          'mui-icons': ['@mui/icons-material'],
          'hooks': ['react-hook-form', '@hookform/resolvers'],
        }
      }
    }
  }
})
