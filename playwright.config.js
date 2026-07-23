import { defineConfig, devices } from '@playwright/test';

// Set PLAYWRIGHT_BASE_URL to run this suite against a deployed site
// (e.g. Netlify) instead of the local dev server — see docs/DEPLOYMENT.md §6.
const remoteBaseURL = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: remoteBaseURL || 'http://localhost:3000',
        trace: 'on-first-retry',
    },
    webServer: remoteBaseURL ? undefined : {
        command: 'npm start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
