import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/kmw-frontend/',

  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName(name) {
          const match = /^[a-z]:/i.test(name);
          const DRIVE_LETTER = match ? name.substr(0, 3) : '';
          return DRIVE_LETTER + name.substr(match ? 3 : 0).replace(/[\x00-\x1F\x7F<>*:"|?]/g, '').replace(/^\_+/, '');
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
