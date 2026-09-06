import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // مسار المستودع المخصص لـ GitHub Pages
  base: '/kmw-frontend/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    // حل تحذيرات Tailwind v4 (Unknown at rule @theme / @tailwind)
    transformer: 'postcss',
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
