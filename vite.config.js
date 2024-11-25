import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // Root directory for your project
  server: {
    host: true, // Allows network access (useful for testing on other devices)
    port: 3000, // Optional: Specify the port
  },
  build: {
    outDir: 'dist', // Output directory for production build
    emptyOutDir: true, // Clears the output directory before each build
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Ensures key dependencies are bundled
  },
});
