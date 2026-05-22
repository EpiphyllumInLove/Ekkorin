import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ekkorin.yousei.top',
  build: {
    assets: '_assets'
  }
});
