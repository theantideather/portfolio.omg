import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animations': ['gsap', '@gsap/react', 'maath'],
          'globe': ['react-globe.gl'],
        }
      }
    }
  },
  server: {
    host: true,
    open: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  }
})
