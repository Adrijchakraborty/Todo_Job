import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      '/api' : "https://job-traker-yy1w.onrender.com" //http://localhost:3000 //https://job-traker-yy1w.onrender.com
    }
  }
})
