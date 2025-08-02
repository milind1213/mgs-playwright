import { test, expect } from "@playwright/test";

test.describe("Web Table Handling", () => {
  test("Handle dynamic web table with changing columns and rows", async ({page,}) => {
    await page.goto("https://www.uitestingplayground.com/dynamictable");
    
    const columnHeaders = await page.locator('div[role="table"] div[role="row"] span[role="columnheader"]').allTextContents();

    const columnMap = {};
    columnHeaders.forEach((header, index) => {columnMap[header] = index;});
    console.log("Column Index Map:", columnMap);
    const rows = await page.locator('div[role="table"] div[role="row"]').all();

    for (let i = 1; i < rows.length; i++) {
      const cells = await rows[i].locator('span[role="cell"]').allTextContents();
      if (cells[columnMap["Name"]] === "Firefox") {
        console.log("Firefox Details:");
        console.log(`Memory: ${cells[columnMap["Memory"]]}`);
        console.log(`CPU: ${cells[columnMap["CPU"]]}`);
        console.log(`Disk: ${cells[columnMap["Disk"]]}`);
        console.log(`Network: ${cells[columnMap["Network"]]}`);
        break;
      }
    }
  });

  test("Dynamic table handling using indexOf()", async ({ page }) => {
    await page.goto("https://www.uitestingplayground.com/dynamictable");

    const headers = await page.locator('div[role="table"] div[role="row"] span[role="columnheader"]').allTextContents();
    const nameIndex = headers.indexOf("Name");
    const cpuIndex = headers.indexOf("CPU");
    const memoryIndex = headers.indexOf("Memory");
    const diskIndex = headers.indexOf("Disk");
    const networkIndex = headers.indexOf("Network");

    const rows = await page.locator('div[role="table"] div[role="row"]').all();

    for (let i = 1; i < rows.length; i++) {
      const cells = await rows[i].locator('span[role="cell"]').allTextContents();
      if (cells[nameIndex] === "Chrome") {
        console.log("Chrome Details :");
        console.log(`CPU      : ${cells[cpuIndex]}`);
        console.log(`Memory   : ${cells[memoryIndex]}`);
        console.log(`Disk     : ${cells[diskIndex]}`);
        console.log(`Network  : ${cells[networkIndex]}`);
        break;
      }
    }
  });

  test("Verify dynamic table data", async ({ page }) => {
    await page.goto("https://www.uitestingplayground.com/dynamictable");
    const headers = await page
      .locator('div[role="row"] span[role="columnheader"]')
      .allTextContents();

    const getIndex = (name) => headers.indexOf(name);
    const rows = await page.locator('div[role="table"] div[role="row"]').all();

    for (let i = 1; i < rows.length; i++) {
      const cells = await rows[i].locator('span[role="cell"]').allTextContents();
     
      if (cells[getIndex("Name")] === "Firefox") {
        console.log({
          Memory: cells[getIndex("Memory")],
          CPU: cells[getIndex("CPU")],
          Disk: cells[getIndex("Disk")],
          Network: cells[getIndex("Network")],
        });
        break;
      }
    }
  });

  test("Dynamic Data Table - Extract All Rows", async ({ page }) => {
    await page.goto("https://www.uitestingplayground.com/dynamictable");

    // Get all header names
    const headers = await page
      .locator("//div[@role='rowgroup'][1]//span")
      .allTextContents();

    const Name = headers.indexOf("Name") + 1;
    const Memory = headers.indexOf("Memory") + 1;
    const CPU = headers.indexOf("CPU") + 1;
    const Disk = headers.indexOf("Disk") + 1;
    const Network = headers.indexOf("Network") + 1;

    const rowCount = await page
      .locator("//div[@role='rowgroup'][2]/div[@role='row']")
      .count();
    console.log(`Total Rows: ${rowCount}`);

    for (let i = 0; i < rowCount; i++) {
      const rowBase = `//div[@role='rowgroup'][2]/div[@role='row'][${i + 1}]`;
      console.log(`Row ${i + 1}:`);

      const name = await page.locator(`${rowBase}/span[${Name}]`).textContent();
      const memory = await page
        .locator(`${rowBase}/span[${Memory}]`)
        .textContent();
      const cpu = await page.locator(`${rowBase}/span[${CPU}]`).textContent();
      const disk = await page.locator(`${rowBase}/span[${Disk}]`).textContent();
      const network = await page
        .locator(`${rowBase}/span[${Network}]`)
        .textContent();

      console.log(
        `Name: ${name}, Memory: ${memory}, CPU: ${cpu}, Disk: ${disk}, Network: ${network}`
      );
    }
  });

  test("Dynamic Data Table - Extract Specific Row", async ({ page }) => {
    await page.goto("https://www.uitestingplayground.com/dynamictable");
    
    const headerMap = new Map();
    const headers = await page.locator('div[role="row"] span[role="columnheader"]').allTextContents();
    headers.forEach((header, index) => headerMap.set(header, index));
    headerMap.forEach((value, key) => console.log(`${key} : ${value}`));
   
    const rows = await page.locator('div[role="table"] div[role="row"]').all();
    for(let row of rows) {
      const cells = await row.locator('span[role="cell"]').allTextContents();
      if (cells[headerMap.get("Name")] === "Firefox") 
      {
        console.log("Firefox Details:");
        console.log(`Memory: ${cells[headerMap.get("Memory")]}`);
        console.log(`CPU: ${cells[headerMap.get("CPU")]}`);
        console.log(`Disk: ${cells[headerMap.get("Disk")]}`);
        console.log(`Network: ${cells[headerMap.get("Network")]}`);
      }  
      else if (cells[headerMap.get("Name")] === "Chrome")  
      {
        console.log("Chrome Details:");
        console.log(`Memory: ${cells[headerMap.get("Memory")]}`);
        console.log(`CPU: ${cells[headerMap.get("CPU")]}`);
        console.log(`Disk: ${cells[headerMap.get("Disk")]}`);
        console.log(`Network: ${cells[headerMap.get("Network")]}`);
      }
      }
  });




});











