import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

const viteConfig: UserConfig = {
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  build: {
    //outDir: 'static',
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: 'TestPub',
      fileName: (format) => `flow.${format}.ts`
    },
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].${new Date().getTime()}.js`,
        chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
        assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
      },
    },
  },
};

export default viteConfig;
