import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/AgencyWebsite/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v1: resolve(__dirname, 'index-v1.html'),
        v2: resolve(__dirname, 'index-v2.html'),
        v3: resolve(__dirname, 'index-v3.html'),
        v4: resolve(__dirname, 'index-v4.html'),
        v5: resolve(__dirname, 'index-v5.html'),
        v6: resolve(__dirname, 'index-v6.html'),
        v7: resolve(__dirname, 'index-v7.html'),
        v8: resolve(__dirname, 'index-v8.html'),
        v9: resolve(__dirname, 'index-v9.html'),
        v10: resolve(__dirname, 'index-v10.html'),
        v11: resolve(__dirname, 'index-v11.html'),
        v12: resolve(__dirname, 'index-v12.html'),
        v13: resolve(__dirname, 'index-v13.html'),
        v14: resolve(__dirname, 'index-v14.html'),
        v15: resolve(__dirname, 'index-v15.html'),
        v16: resolve(__dirname, 'index-v16.html'),
        v17: resolve(__dirname, 'index-v17.html'),
        v18: resolve(__dirname, 'index-v18.html'),
        v19: resolve(__dirname, 'index-v19.html'),
        v20: resolve(__dirname, 'index-v20.html'),
      },
    },
  },
});
