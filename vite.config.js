import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/charisma_app/',
  server: {
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'c506-185-236-203-163.ngrok-free.app'  // new ngrok domain
    ]
  }
})
