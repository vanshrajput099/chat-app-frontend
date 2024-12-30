import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/chat-app-frontend/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/api': 'https://chat-app-backend-bo1l.onrender.com',
      '/socket.io': 'https://chat-app-backend-bo1l.onrender.com',
    },
  },
  plugins: [react()],
})
