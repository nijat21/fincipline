import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import fs from 'fs';

// Path to certificate and key
const Cert = fs.readFileSync('cert.crt');
const Key = fs.readFileSync('cert.key');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: Key,
      cert: Cert
    },
    port: 5173,
  }
});
