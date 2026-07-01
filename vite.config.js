import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // تحديد المسار الأساسي لـ GitHub Pages ليقرأ ملفات الـ CSS والـ JS بشكل صحيح دون خطأ 404
  base: '/kmw-frontend/',

  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
