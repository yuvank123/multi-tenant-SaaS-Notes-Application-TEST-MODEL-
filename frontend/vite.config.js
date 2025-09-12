import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: { port: 5173 }
})
