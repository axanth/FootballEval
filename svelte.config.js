// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // 1. Use the static adapter
    adapter: adapter({
      // default options are shown
      pages: 'dist',
      assets: 'dist',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),

    // 2. Set the base path for your repo
    // Replace 'your-repo-name' with the actual name of your repository (e.g., 'my-svelte-app')
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/FootballEval' : '/',
    }
  }
};

export default config;