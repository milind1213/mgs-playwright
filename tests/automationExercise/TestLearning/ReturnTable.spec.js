import { test, expect } from "@playwright/test";

test("Mututal Fund Return Verficatino", async ({ page }) => {
  await page.goto("https://www.angelone.in/mutual-funds/fund-screener");
 
  const rows = await page.locator("table tbody tr");
  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const row = rows.nth(i);
    const fundName = await row.locator("td:nth-child(1) p.scheme-name strong").textContent();
    const rating = await row.locator("td:nth-child(2) p.rating").textContent();
    const return3Y = await row.locator("td:nth-child(3) p").textContent();
    const aum = await row.locator("td:nth-child(4) p").textContent();
    const exploreLink = await row.locator("td:nth-child(5) a").getAttribute("href");

    console.log(`Row Number  ${i}:`);
    console.log(`  Fund Name: ${fundName.trim()}`);
    console.log(`  Rating: ${rating.trim()}`);
    console.log(`  3Y Return: ${return3Y.trim()}`);
    console.log(`  AUM: ${aum.trim()}`);
    console.log(`  Explore Link: ${exploreLink}`);
    console.log("------------------------------");

   const updated = aum.replace(/[^0-9.]/g, '');  
   console.log(updated);

  }
   await page.close();
});
