import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';
import * as path from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export const STANDARD_USER_STORAGE_STATE = path.join(__dirname, 'utils/functions/loginSetup/loginData/standardUserStorageState.json');

export default defineConfig({
  globalTeardown: 'globalTeardown.ts',
  testDir: './tests',
  timeout: 120 * 1000,
  expect: { timeout: 120 * 1000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ?
    [
      ['html', { outputFolder: './reports/playwright-report/' }],
      ['list'],
      ["playwright-ctrf-json-reporter", { outputDir: "./reports/", outputFile: "test-results.json" },],
      ['monocart-reporter', {
        name: "My Test Report",
        outputFile: './reports/monocart-report/index.html'
      }]
    ]
    :
    [
      ['html', { outputFolder: './reports/playwright-report/' }],
      ['list'],
      ["playwright-ctrf-json-reporter", { outputDir: "./reports/", outputFile: "test-results.json" },],
      ['monocart-reporter', {
        name: "My Test Report",
        outputFile: './reports/monocart-report/index.html'
      }]
    ],
  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI,
  },
  projects: [
    // {
    //   name: 'standardUserSetup',
    //   testDir: './utils/functions/loginSetup',
    //   testMatch: /standardUser\.setup\.ts/,
    // },
    {
      name: 'standardUserTestCases',
      testDir: './tests',
      testMatch: /.*.spec.ts/,
      use: {
        ...devices['Desktop Chrome'],        
      },
      // dependencies: ['standardUserSetup'],
    },
  ],
});