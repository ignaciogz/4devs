import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false, // Si la variable de entorno VITE_ENV es production, se debe usar server HTTPS cambiando el atributo a true
    port: 8081,
    strictPort: true,
  },
  plugins: [react(), mkcert()],
})
