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

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash].[ext]';
          }
          return 'assets/[ext]/[name]-[hash].[ext]';
        },
      },
    },
  },
})
