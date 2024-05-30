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
  }
});



