import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [".stevsoza.com"],
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/logout': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ws': {
        target: 'ws://localhost:1234',
        ws: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
