// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import clerk from '@clerk/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  build: {
    assets: 'static'
  },
  integrations: [react(), clerk()],
  output: 'server',
  adapter: vercel()
});
