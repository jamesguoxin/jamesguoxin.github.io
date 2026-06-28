const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/visual",
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  use: {
    baseURL: "http://127.0.0.1:4000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 }
      }
    },
    {
      name: "mobile",
      use: {
        ...devices["Pixel 5"]
      }
    }
  ],
  webServer: {
    command: "bundle exec jekyll serve --config _config.yml,_config.dev.yml --host 127.0.0.1 --port 4000 --no-watch",
    url: "http://127.0.0.1:4000",
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000
  }
});
