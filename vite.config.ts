import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(__dirname, 'app'),
  build: {
    outDir: resolve(__dirname, 'app', 'dist'),
  },
});
