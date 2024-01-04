import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      $lib: '/src/index.ts',
      '$lib/*': '/src/*',
    },
  },
  build: {
    outDir: 'demo',
  },
});
