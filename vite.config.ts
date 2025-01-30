import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@commons': path.resolve(__dirname, './src/commons'),
    },
  },
  plugins: [react(), svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: {exportType: 'default', ref: true, svgo: false, titleProp: true},
    include: '**/*.svg',
  })],
});
