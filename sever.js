const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/api/crawl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Thiếu URL" });

  try {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"], headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    await page.setExtraHTTPHeaders({ Referer: "https://truyenqqgo.com" });

    await page.goto(url, { waitUntil: "networkidle2" });

    const images = await page.$$eval("img.lazy", imgs =>
      imgs.map(img => img.getAttribute("data-original") || img.src)
    );

    await browser.close();
    res.json({ images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi khi crawl" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server chạy ở cổng 3000");
});
