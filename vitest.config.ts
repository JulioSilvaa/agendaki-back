import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'http': path.resolve(__dirname, 'src/http'),
      'environment': path.resolve(__dirname, 'src/environments'),
      'useCase': path.resolve(__dirname, 'src/useCase'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'tests': path.resolve(__dirname, 'src/tests')
    }
  },
});