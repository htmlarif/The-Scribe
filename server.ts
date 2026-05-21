import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';

const parser = new Parser();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/news", async (req, res) => {
    try {
      const feed = await parser.parseURL('https://tscribebd.blogspot.com/feeds/posts/default?alt=rss&max-results=50');
      const news = feed.items.map((item, index) => {
        // Extract image from content
        const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
        const image = imgMatch ? imgMatch[1] : '';
        
        return {
          id: index + 1,
          title: item.title,
          category: item.categories ? item.categories[0] : 'General',
          image: image,
          date: item.pubDate,
          content: item.content
        };
      });
      res.json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
