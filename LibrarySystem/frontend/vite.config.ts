  import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? './' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Spring Boot 的後端服務
        changeOrigin: true,  // 改變來源，解決 CORS 問題
        secure: false,  // 如果是 HTTPS 的話設置為 true
      },
    },
  },
}))
