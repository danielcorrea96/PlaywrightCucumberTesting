import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: { timeout: 5000 },
  reporter: [
    ['list'],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: 'https://eaapp.somee.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
});
