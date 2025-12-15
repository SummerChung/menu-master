import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' allows loading all env vars, not just VITE_ prefixed ones
  const env = loadEnv(mode, process.cwd(), '');

  // Prioritize system environment variables (Vercel) over .env file
  // This ensures the key set in Vercel Settings is used during build
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // Inject the API key into the client-side code
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  }
})