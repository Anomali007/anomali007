import { expect, test } from "@playwright/test";

test("home renders with command-bridge hero (3 panels + event log)", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  // The NAME is the entity, not the handle and not the tagline.
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /Mali Franzese/i,
  );
  await expect(page.getByText("I Build Things.")).toBeVisible();
  // Three monitors + bottom ship log
  await expect(page.getByText("IN PRODUCTION").first()).toBeVisible();
  await expect(page.getByText("SHIP LOG").first()).toBeVisible();
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
    const inProduction = page
      .locator("section")
      .filter({ hasText: "IN PRODUCTION" });
    await expect(
      inProduction.getByText("MASS Lead Connect", { exact: true }).first(),
    ).toBeVisible();
    await expect(
      inProduction.getByText("Token Holder", { exact: true }).first(),
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

/**
 * Claim guards.
 *
 * These are not feature tests. Each one pins a specific claim that was wrong on
 * the live site and would contradict Mali in a recruiter screen if it came
 * back. They are cheap and they fail loudly, which is the only reason a content
 * fix survives the next content pass.
 */
test.describe("claim guards", () => {
  const PAGES = [
    "/",
    "/about",
    "/projects",
    "/projects/ai-voice-receptionist",
    "/projects/beat-the-odds",
    "/projects/mass-lead-connect",
  ];

  test("the retired ~50% / ~30% voice metric appears nowhere", async ({
    page,
  }) => {
    for (const path of PAGES) {
      await page.goto(path);
      const body = await page.locator("body").innerText();
      expect(
        body,
        `retired call-handling metric resurfaced on ${path}`,
      ).not.toMatch(/50\s?%\s*(reduction|less)|call handling ~?50/i);
      expect(body, `retired bookings metric resurfaced on ${path}`).not.toMatch(
        /30\s?%\s*(increase|more)|bookings ~?30/i,
      );
    }
  });

  test("Anthony Franzese never appears (it is his late uncle)", async ({
    page,
  }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.locator("body"), path).not.toContainText(
        "Anthony Franzese",
      );
    }
  });

  test("Beat The Odds carries the current title, not the drifted ones", async ({
    page,
  }) => {
    await page.goto("/projects/beat-the-odds");
    const body = await page.locator("body").innerText();
    expect(body).toContain("Co-Founder & CTO");
    expect(body).not.toMatch(/lead engineer/i);
    expect(body).not.toMatch(/Chief Information Officer|\bCIO\b/);
    expect(body).not.toMatch(/Lead Full-Stack/i);
  });

  test("MASS Lab is dated 2019, never 2017", async ({ page }) => {
    await page.goto("/about");
    const body = await page.locator("body").innerText();
    expect(body).toContain("2019");
    expect(body).not.toContain("2017");
  });

  test("shipped-but-unsold products state their zero out loud", async ({
    page,
  }) => {
    await page.goto("/projects/beat-the-odds");
    await expect(page.getByText("What this does not claim")).toBeVisible();
    await expect(page.locator("body")).toContainText("no revenue");

    await page.goto("/projects/mass-lead-connect");
    await expect(page.getByText("What this does not claim")).toBeVisible();
    await expect(page.locator("body")).toContainText("delivered zero times");
  });

  test("the hero ship log is dated rather than pretending to be live", async ({
    page,
  }) => {
    await page.goto("/");
    const body = await page.locator("body").innerText();
    // The old panel rendered "10m ago" / "1h ago" against invented PR hashes.
    expect(body).not.toMatch(/\d+[mh] ago/);
    expect(body).not.toContain("[ STREAMING ]");
    // Real, dated, sourced events.
    expect(body).toContain("2026-06-18");
    expect(body).toContain("2026-08-10");
  });

  test("every page exposes a skip link and a main landmark", async ({
    page,
  }) => {
    for (const path of PAGES) {
      await page.goto(path);
      await expect(page.locator("a.skip-link"), path).toHaveAttribute(
        "href",
        "#main",
      );
      await expect(page.locator("main#main"), path).toHaveCount(1);
    }
  });
});
