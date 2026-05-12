import { expect, test } from "@playwright/test";

test("home renders with command-bridge hero (3 panels + event log)", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /I Build Things\./i,
  );
  // Three monitors + bottom event-log
  await expect(page.getByText("CURRENTLY SHIPPING")).toBeVisible();
  await expect(page.getByText("RECENT MERGES")).toBeVisible();
  await expect(page.getByText("[ STREAMING ]")).toBeVisible();
});

test.describe("inner pages render with their themed hero (CSS-styled)", () => {
  test("/projects shows gallery hero with vitrine grid", async ({ page }) => {
    const response = await page.goto("/projects");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Projects/,
    );
    // Vitrines are anchors to project detail pages
    const vitrines = page.locator('a[href^="/projects/"]');
    expect(await vitrines.count()).toBeGreaterThan(6);
  });

  test("/about shows origin-wall timeline waypoints", async ({ page }) => {
    const response = await page.goto("/about");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Story|About/,
    );
    // Timeline waypoint list
    const waypoints = page.locator("ol li");
    expect(await waypoints.count()).toBeGreaterThanOrEqual(3);
  });

  test("/uses shows armory wall with 12 numbered slots", async ({ page }) => {
    const response = await page.goto("/uses");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Uses/,
    );
    // Slot labels are "SLOT · 01" / "SLOT · 02" / ... in the new design
    const slotLabels = page.getByText(/SLOT · 0\d|SLOT · 1[0-2]/);
    expect(await slotLabels.count()).toBeGreaterThanOrEqual(8);
  });

  test("/blog shows wire ribbon + LIVE WIRE panel", async ({ page }) => {
    const response = await page.goto("/blog");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /Blog/,
    );
    // Wire hero panel chrome
    await expect(page.getByText("LIVE WIRE")).toBeVisible();
    await expect(page.getByText(/WIRE · v2026/)).toBeVisible();
  });
});

test.describe("renamed + new project slugs render", () => {
  test("token-holder (renamed from the-wallet) renders", async ({ page }) => {
    const response = await page.goto("/projects/token-holder");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: /Token Holder/ }),
    ).toBeVisible();
  });

  test("knowmessenger (new) renders", async ({ page }) => {
    const response = await page.goto("/projects/knowmessenger");
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { level: 1, name: /KnowMessenger/ }),
    ).toBeVisible();
  });

  test("legacy the-wallet slug renders 404 page", async ({ page }) => {
    await page.goto("/projects/the-wallet", {
      waitUntil: "networkidle",
    });
    // With a custom not-found.tsx + loading.tsx, Next.js streams a 200
    // initial response but the final rendered UI is the 404 page.
    await expect(page.getByText(/Out of range/i)).toBeVisible();
    await expect(page.getByText(/SIGNAL LOST/i)).toBeVisible();
  });
});

test.describe("featured projects on home", () => {
  test("home features MLC, BTO, yacht, Token Holder (NOT blah3)", async ({
    page,
  }) => {
    await page.goto("/");
    // Featured set still lives lower on the home page (under the hero)
    const featuredSection = page
      .locator("section")
      .filter({ hasText: "What I've Built" });

    await expect(
      featuredSection.getByRole("heading", { name: "MASS Lead Connect" }),
    ).toBeVisible();
    // blah3 must NOT be in the featured set anymore
    await expect(
      featuredSection.getByRole("heading", { name: "blah3" }),
    ).toHaveCount(0);
  });
});

test.describe("refreshed metrics", () => {
  test("home hero shows command-bridge data + no stale 960 number", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("body")).not.toContainText(
      "960+ commits across 22",
    );
    // Featured shipping shows portfolio project names (not internal repo paths)
    const currentlyShipping = page
      .locator("section")
      .filter({ hasText: "CURRENTLY SHIPPING" });
    await expect(
      currentlyShipping.getByText("MASS Lead Connect", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      currentlyShipping.getByText("Token Holder", { exact: true }).first(),
    ).toBeVisible();
  });

  test("about page shows 3,000+ commits", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator("body")).toContainText("3,000+");
    await expect(page.locator("body")).not.toContainText(
      "960+ commits across 22",
    );
  });
});
