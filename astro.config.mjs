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
  //Localhost
  // site: 'http://localhost:4321/',

  //Deploy
  base: '/project-000-941/',
  site: 'https://project-000-941.vercel.app/',
  integrations: [react(), clerk()],
  output: 'server',
  adapter: vercel()
});
