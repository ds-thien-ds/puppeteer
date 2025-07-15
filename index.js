const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log('Đã mở trang');

  await browser.close();
})();
