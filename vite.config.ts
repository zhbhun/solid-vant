import * as path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    devtools({
      /* additional options */
      autoname: true, // e.g. enable autoname
    }),
    solidPlugin(),
  ],
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      'solid-vant': path.resolve(__dirname, './src'),
    },
  },
});
