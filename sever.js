const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/api/crawl", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Thiếu URL chương" });

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();

    // Bypass hotlink
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      referer: "https://truyenqqgo.com/",
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    const images = await page.$$eval("img.lazy", (imgs) =>
      imgs.map((img) => img.getAttribute("data-original") || img.src)
    );

    await browser.close();
    res.json({ images });
  } catch (err) {
    console.error("Lỗi khi crawl:", err.message);
    res.status(500).json({ error: "Lỗi xử lý crawler" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});
