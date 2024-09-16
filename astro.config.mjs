import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  publicDir: 'assets',
  outDir: './public',
  build: {
    // Ensure Astro doesn't try to handle server-side routing
    format: 'file',
    inlineStylesheets: 'never'
  }
});
