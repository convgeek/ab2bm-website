import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    // Only run unit tests — exclude e2e specs which use Playwright's test runner
    include: ['tests/unit/**/*.test.ts', 'tests/unit/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
