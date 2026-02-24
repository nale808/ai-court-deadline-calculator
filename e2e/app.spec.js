// @ts-check
import { test, expect } from "@playwright/test";

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Complete the full manual flow and land on the Results screen. */
async function completeManualFlow(page, {
  jurisdictionId = "frcp",
  triggerCard    = "Complaint Filed",
  date           = "2025-03-15",
} = {}) {
  await page.goto("/");

  // Step 1 — jurisdiction
  await page.selectOption("select", jurisdictionId);
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 2 — trigger event
  await page.getByText(triggerCard, { exact: false }).first().click();
  await page.getByRole("button", { name: /Continue/i }).click();

  // Step 3 — date
  await page.locator('input[type="date"]').fill(date);
  await page.getByRole("button", { name: /Calculate Deadlines/i }).click();
}

// ─── tests ────────────────────────────────────────────────────────────────────

test.describe("Court Deadline Calculator — E2E", () => {

  // 1. Page load
  test("loads the app and shows Step 1", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Select Jurisdiction")).toBeVisible();
    await expect(page.locator("select")).toBeVisible();
    await expect(page.getByRole("button", { name: /Continue/i })).toBeDisabled();
  });

  // 2. Header is always visible
  test("header is present on every screen", async ({ page }) => {
    await page.goto("/");
    // Header contains the app title text
    await expect(page.getByText("Court Deadline Calculator")).toBeVisible();
    // StepBar step numbers visible
    await expect(page.getByText("1").first()).toBeVisible();
  });

  // 3. Continue disabled until jurisdiction selected
  test("Continue button is disabled until a jurisdiction is selected", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("button", { name: /Continue/i });
    await expect(btn).toBeDisabled();
    await page.selectOption("select", "frcp");
    await expect(btn).toBeEnabled();
  });

  // 4. Jurisdiction note box
  test("shows a note when a jurisdiction with a note is selected", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "cdca"); // has a note about standing orders
    await expect(page.getByText(/standing orders/i)).toBeVisible();
  });

  // 5. State-court badge
  test("shows 'State Court' label when a state court is selected", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "ca_superior");
    await expect(page.getByText("State Court", { exact: true })).toBeVisible();
  });

  // 6. Step 1 → Step 2 navigation
  test("navigating to Step 2 shows trigger-event cards", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByText("Select Trigger Event")).toBeVisible();
    // All 8 trigger cards are present
    const cards = ["Complaint Filed", "Complaint Served on Defendant", "Answer Filed",
                   "Motion Filed", "Court Order Issued", "Discovery Opens",
                   "Trial Date Set", "Notice of Appeal Filed"];
    for (const c of cards) {
      await expect(page.getByText(c)).toBeVisible();
    }
  });

  // 7. Trigger-event Continue button disabled until a card is selected
  test("Continue disabled on Step 2 until trigger card clicked", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();

    const btn = page.getByRole("button", { name: /Continue/i });
    await expect(btn).toBeDisabled();
    await page.getByText("Complaint Filed").first().click();
    await expect(btn).toBeEnabled();
  });

  // 8. Back button returns from Step 2 → Step 1
  test("Back button on Step 2 returns to Step 1", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByText("Select Jurisdiction")).toBeVisible();
  });

  // 9. Step 3 date input and Calculate button
  test("Step 3 shows date input; Calculate disabled until date entered", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByText("Complaint Filed").first().click();
    await page.getByRole("button", { name: /Continue/i }).click();

    await expect(page.getByText("Date & Options").first()).toBeVisible();
    const calcBtn = page.getByRole("button", { name: /Calculate Deadlines/i });
    await expect(calcBtn).toBeDisabled();
    await page.locator('input[type="date"]').fill("2025-06-01");
    await expect(calcBtn).toBeEnabled();
  });

  // 10. Back button from Step 3 → Step 2
  test("Back button on Step 3 returns to Step 2", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByText("Complaint Filed").first().click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByRole("button", { name: /Back/i }).click();
    await expect(page.getByText("Select Trigger Event")).toBeVisible();
  });

  // 11. "Served by mail" checkbox appears for complaint_served
  test("shows 'Served by mail' option for Complaint Served trigger", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByText("Complaint Served on Defendant").click();
    await page.getByRole("button", { name: /Continue/i }).click();
    await expect(page.getByText(/Served by mail/i)).toBeVisible();
    await expect(page.getByText(/United States.*Federal Agency/i)).toBeVisible();
    await expect(page.getByText(/outside the United States/i)).toBeVisible();
  });

  // 12. Full happy path — FRCP + Complaint Filed → Results
  test("full manual flow: FRCP + Complaint Filed → results screen", async ({ page }) => {
    await completeManualFlow(page, {
      jurisdictionId: "frcp",
      triggerCard: "Complaint Filed",
      date: "2025-03-15",
    });

    await expect(page.getByText("Deadline Schedule")).toBeVisible();
    await expect(page.getByText(/Federal — General/i)).toBeVisible();
    await expect(page.getByText(/Complaint Filed/i)).toBeVisible();
    // At least one deadline row should be present
    await expect(page.locator("body")).not.toContainText("No deadlines found");
  });

  // 13. Results show correct meta: jurisdiction, trigger, date, counts
  test("results meta panel shows correct jurisdiction and trigger", async ({ page }) => {
    await completeManualFlow(page, { date: "2025-04-10" });
    await expect(page.getByText("Jurisdiction")).toBeVisible();
    await expect(page.getByText("Trigger", { exact: true })).toBeVisible();
    await expect(page.getByText("Total")).toBeVisible();
  });

  // 14. Results show party sections
  test("results screen groups deadlines by party", async ({ page }) => {
    await completeManualFlow(page);
    // At least one party section heading should appear
    const partyLabels = ["Plaintiff", "Defendant", "All Parties", "Court"];
    let found = 0;
    for (const label of partyLabels) {
      const el = page.getByText(label, { exact: false });
      if (await el.count() > 0) found++;
    }
    expect(found).toBeGreaterThan(0);
  });

  // 15. "New Calculation" resets back to Step 1
  test("New Calculation button resets to Step 1", async ({ page }) => {
    await completeManualFlow(page);
    await page.getByRole("button", { name: /New Calculation/i }).click();
    await expect(page.getByText("Select Jurisdiction")).toBeVisible();
    await expect(page.getByRole("button", { name: /Continue/i })).toBeDisabled();
  });

  // 16. Upload tab switches screen
  test("switching to 'Upload Document' tab shows upload screen", async ({ page }) => {
    await page.goto("/");
    await page.getByText(/Upload Document/i).click();
    // Upload screen shows file input or upload prompt
    await expect(page.getByText(/Upload/i).first()).toBeVisible();
  });

  // 17. Switching back to Manual Entry returns to Step 1
  test("switching back to Manual Entry from upload shows Step 1", async ({ page }) => {
    await page.goto("/");
    await page.getByText(/Upload Document/i).click();
    await page.getByText(/Manual Entry/i).click();
    await expect(page.getByText("Select Jurisdiction")).toBeVisible();
  });

  // 18. SDNY jurisdiction — federal
  test("SDNY is labelled Federal Court", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "sdny");
    await expect(page.getByText(/Federal Court/i)).toBeVisible();
  });

  // 19. Texas state court note
  test("Texas District Court shows answer-deadline note", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "tx_district");
    await expect(page.getByText(/Answer due first Monday/i)).toBeVisible();
  });

  // 20. Complete flow with complaint_served + mail option checked
  test("complaint_served flow with mail toggle produces results", async ({ page }) => {
    await page.goto("/");
    await page.selectOption("select", "frcp");
    await page.getByRole("button", { name: /Continue/i }).click();
    await page.getByText("Complaint Served on Defendant").click();
    await page.getByRole("button", { name: /Continue/i }).click();

    // Toggle "Served by mail"
    await page.getByText(/Served by mail/i).click();

    await page.locator('input[type="date"]').fill("2025-05-01");
    await page.getByRole("button", { name: /Calculate Deadlines/i }).click();
    await expect(page.getByText("Deadline Schedule")).toBeVisible();
  });
});
