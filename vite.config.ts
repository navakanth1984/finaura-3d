import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three'],
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'gsap', 'clsx', 'tailwind-merge'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});

