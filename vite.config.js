// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: process.env.VITE_API_BASE_URL,
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
  
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001', // استخدم 127.0.0.1 بدلاً من localhost
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // احذف /api لو الباكيند مش بيستخدمها
      },
    },
  },
});
