import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import fs from 'fs';
// const baseUrl = `https://localhost:5005`;

// Path to certificate and key
const Cert = fs.readFileSync('cert.crt');
const Key = fs.readFileSync('cert.key');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: Key,
      cert: Cert
    },
    port: 5173,

    // proxy: {
    //   '/api': { // Proxy all requests starting with /api
    //     target: baseUrl, // Backend server URL
    //     changeOrigin: true, // Change the origin of the host header to the target URL
    //     secure: false, // If using self-signed certificates on the target
    //     rewrite: (path) => path.replace(/^\/api/, '') // Remove /api prefix when forwarding the request
    //   }
    // }
  }
});



