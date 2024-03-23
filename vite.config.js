import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
   build: {
      lib: {
         entry: resolve(__dirname, 'src/main.ts'),
         formats: ['es'],
      },
      rollupOptions: {
         external: [/^node:.*/],
      },
      target: 'ES2022'
   },
   plugins: [dts()]
});
