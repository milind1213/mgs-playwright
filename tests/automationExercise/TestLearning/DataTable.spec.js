import {test, expect} from "@playwright/test";

test('Read simple table data', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_tables.asp');
  const table = page.locator('#customers');
  const rows = await table.locator('tr').all();
  const headers = await rows[0].locator('th').allInnerTexts();
  for (let i = 1; i < rows.length; i++) {
    const cells = await rows[i].locator('td').allInnerTexts();
    const rowData = {};
    headers.forEach((header, index) => { rowData[header] = cells[index];});
    console.log(rowData);
  }
});


test('Read simple table', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_tables.asp');
  
  const table = page.locator('#customers');
  const rows = await table.locator('tr').all();
  const headers = await rows[0].locator('th').allInnerTexts();

  console.log('Table Headers:', headers);

  for (let i = 1; i < rows.length; i++) {
       const cells = await rows[i].locator('td').allInnerTexts();
       if (cells.includes('Germany')) {
          console.log(`Row ${i} :`, cells);
        }

       if (cells.includes('UK')) {
          console.log(`Row ${i} :`, cells);
        }
     }
});


test('Extract data from HTML table', async ({ page }) => {
  await page.setContent(`
    <table>
      <tbody>
        <tr><th>#Type</th><th>#Tables</th><th>% of all tables</th></tr>
        <tr><th>Relational</th><td align="right">90,266,223</td><td align="right">0.90</td></tr>
        <tr><th>Entity</th><td align="right">139,687,207</td><td align="right">1.40</td></tr>
        <tr><th>Matrix</th><td align="right">3,086,430</td><td align="right">0.03</td></tr>
        <tr><th>Sum</th><td align="right"><strong>233,039,860</strong></td><td align="right"><strong>2.25</strong></td></tr>
      </tbody>
      <caption><strong>Table 1: Table Types in WDC 2015 Corpus</strong></caption>
    </table>
  `);

  const headers = await page.locator('table tr').first().locator('th').allTextContents();
  const rows = await page.locator('table tr').nth(1).locator('xpath=following-sibling::tr').all();
  const tableData = [];

  for (const row of rows) {
    const cells = await row.locator('th, td').allTextContents();
    const rowObj = {};
    headers.forEach((key, i) => {
      rowObj[key] = cells[i];
    });
    tableData.push(rowObj);
  }

  console.log('Extracted Table Data:\n', tableData);
});
