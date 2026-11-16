import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto("http://127.0.0.1:3000/products", { waitUntil: "networkidle" });
const header = await page.locator("header").innerText();
console.log("HEADER_TEXT:\n", header);
const links = await page.locator("header a").allTextContents();
console.log("LINKS", links);
await browser.close();
