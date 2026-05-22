import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ekkorin-gallery.pages.dev',
  build: {
    assets: '_assets'
  }
});
