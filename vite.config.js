import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7032',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
