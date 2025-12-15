import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Get API Key from Vercel system env OR .env file
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Force inject the API key so it's available in the browser
      // We map it to VITE_API_KEY which is the standard for Vite apps
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
      // Fallback for older code referencing process.env
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  }
})