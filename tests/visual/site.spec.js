const { expect, test } = require("@playwright/test");

const pages = [
  ["/", "home"],
  ["/blog/", "blog"],
  ["/tech/2026/04/05/foundation-models-meet-biology.html", "post"],
  ["/publications/", "publications"],
  ["/news/", "news"],
  ["/activities/", "activities"]
];

test.describe("site visual smoke", () => {
  test.beforeEach(async ({ page }) => {
    if (process.env.VISUAL_ASSET_HAR) {
      await page.routeFromHAR(process.env.VISUAL_ASSET_HAR, {
        url: /^https?:\/\/(?:fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)\//,
        notFound: "abort"
      });
    }
    await page.addInitScript(() => {
      window.localStorage.setItem("blog-swipeshowed", "true");
      window.localStorage.setItem("post-swipeshowed", "true");
    });
  });

  for (const [path, name] of pages) {
    test(`${name} renders without console errors`, async ({ page }, testInfo) => {
      const errors = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => {
        if (message.type() === "error") errors.push(message.text());
      });

      await page.goto(path);
      await expect(page.locator("body")).toBeVisible();
      await expect(page.locator(".navbar-custom")).toBeVisible();
      expect(await page.evaluate(() =>
        document.documentElement.scrollWidth <= window.innerWidth
      )).toBe(true);
      await expect(page).toHaveScreenshot(`${name}.png`, {
        animations: "disabled",
        maxDiffPixelRatio: 0.04
      });
      expect(errors).toEqual([]);
      await page.screenshot({
        path: testInfo.outputPath(`${name}-full.png`),
        fullPage: true,
        animations: "disabled"
      });
    });
  }

  for (const section of ["publications", "news"]) {
    test(`homepage ${section} section renders`, async ({ page }) => {
      await page.goto("/");
      const content = page.locator(`#${section}`);
      await expect(content).toBeVisible();
      await expect(content).toHaveScreenshot(`home-${section}.png`, {
        animations: "disabled",
        // Fixed navigation is checked in the page screenshots; keep it from
        // covering content when Playwright scrolls to capture a long section.
        stylePath: require.resolve("./section-screenshot.css"),
        maxDiffPixelRatio: 0.04
      });
    });
  }

  test("desktop navbar brand and links share a vertical center", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop-only alignment check");

    await page.goto("/");
    const brandBox = await page.locator(".navbar-brand").boundingBox();
    const navBox = await page.locator("#site-navbar .navbar-nav").boundingBox();

    expect(brandBox).not.toBeNull();
    expect(navBox).not.toBeNull();

    const brandCenter = brandBox.y + brandBox.height / 2;
    const navCenter = navBox.y + navBox.height / 2;
    expect(Math.abs(brandCenter - navCenter)).toBeLessThanOrEqual(2);
  });

  test("desktop research card bodies align across the grid", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "desktop-only alignment check");

    await page.goto("/");
    const bodyTops = await page.locator(".research-card p").evaluateAll(nodes =>
      nodes.map(node => Math.round(node.getBoundingClientRect().top))
    );

    expect(bodyTops.length).toBe(4);
    expect(Math.abs(bodyTops[0] - bodyTops[1])).toBeLessThanOrEqual(2);
    expect(Math.abs(bodyTops[2] - bodyTops[3])).toBeLessThanOrEqual(2);
  });

  test("mobile navbar opens and closes", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "mobile-only navigation check");

    await page.goto("/");
    const menu = page.locator("#site-navbar");
    await expect(menu).not.toHaveClass(/show/);

    await page.locator(".navbar-toggler").tap();
    await expect(menu).toHaveClass(/show/);

    await page.locator("#site-navbar .nav-link").first().tap();
    await expect(menu).not.toHaveClass(/show/);
  });
});
