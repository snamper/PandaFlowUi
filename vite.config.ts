import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

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