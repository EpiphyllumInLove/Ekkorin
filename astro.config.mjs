import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'static',
  site: 'https://ekkorin.yousei.top',
  build: {
    assets: '_assets'
  }
});
