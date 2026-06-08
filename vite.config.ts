import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base URL for GitHub Pages — solo en producción (GitHub Actions)
  base: process.env.GITHUB_ACTIONS ? '/som-la-mesa/' : '/',
})
