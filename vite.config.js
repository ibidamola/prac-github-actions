import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables global test functions like 'test' and 'expect'
    environment: "jsdom", // Needed for testing React components
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
})
