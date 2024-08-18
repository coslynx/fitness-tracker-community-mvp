import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
      'components': resolve(__dirname, './components'),
      'pages': resolve(__dirname, './pages'),
      'styles': resolve(__dirname, './styles'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('app')) {
            return 'app'
          }
          if (id.includes('components')) {
            return 'components'
          }
          if (id.includes('styles')) {
            return 'styles'
          }
          return 'main'
        },
      },
    },
  },
})