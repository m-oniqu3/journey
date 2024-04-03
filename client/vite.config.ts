import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';


export default defineConfig((env) => {
  const envars = loadEnv(env.mode, './');

  const serverURL = new URL(
    envars.VITE_SERVER_URL ?? '<http://localhost:3001>'
  );
  const serverAPIPath = envars.VITE_SERVER_API_PATH ?? '/api';

  return {
    envDir: './',
    plugins: [react()],

    define: {
      __API_PATH__: JSON.stringify(serverAPIPath),
    },

     resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
     
    server: {
      port: 5173,
      proxy: {
        [serverAPIPath]: serverURL.origin
      }
     }
  }

});