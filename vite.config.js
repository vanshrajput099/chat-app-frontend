import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/socket.io': 'http://localhost:4000',
    },
  },
  plugins: [react()],
})