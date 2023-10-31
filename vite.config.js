import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginNode } from 'vite-plugin-node';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePluginNode({
    //   adapter: 'express',
    //   appPath: 'src/client/index.jsx',
    //   exportName: 'viteNodeApp',
    // }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
});
