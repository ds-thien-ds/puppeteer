const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new", // Dùng headless mode mới
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');

    console.log('✅ Puppeteer đã mở trang thành công!');

    await browser.close();

    // Giữ server chạy nếu không sẽ bị Render auto đóng sau 1 giây
    setTimeout(() => {
      console.log('🕒 Giữ phiên chạy 5 phút');
    }, 5 * 60 * 1000);

  } catch (err) {
    console.error('❌ Lỗi khi chạy Puppeteer:', err);
  }
})();
