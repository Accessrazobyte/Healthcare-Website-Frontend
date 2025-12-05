import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,        // allow LAN access (0.0.0.0)
    port: 5000,        // optional, default is 5173
  },
})
