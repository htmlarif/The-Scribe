import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
  content: string;
}

interface NewsContextType {
  news: NewsItem[];
  loading: boolean;
}

const NewsContext = createContext<NewsContextType>({ news: [], loading: true });

export function NewsProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to load from cache
    const cachedNews = localStorage.getItem('news_cache');
    if (cachedNews) {
      setNews(JSON.parse(cachedNews));
      setLoading(false);
    }

    const RSS_URL = 'https://tscribebd.blogspot.com/feeds/posts/default?alt=rss';
    fetch(RSS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((str) => {
        const parser = new window.DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.getElementsByTagName("item");
        console.log(`Parsed ${items.length} news items from RSS.`);
        
        const mappedNews: NewsItem[] = Array.from(items).map((item, index) => {
          const title = item.getElementsByTagName("title")[0]?.textContent || 'Untitled';
          const category = item.getElementsByTagName("category")[0]?.textContent || 'General';
          
          let image = 'https://images.unsplash.com/photo-1504711434269-d00755f46401?q=80&w=2070&auto=format&fit=crop';
          const content = item.getElementsByTagName("description")[0]?.textContent || '';
          const match = content.match(/src=["'](.*?)["']/);
          if (match && match[1]) {
            image = match[1];
          }
          
          const pubDate = item.getElementsByTagName("pubDate")[0]?.textContent;
          const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
          
          return {
            id: index + 1,
            title,
            category,
            image,
            date,
            content
          };
        });
        
        console.log("Mapped News Items:", mappedNews);
        setNews(mappedNews);
        if (mappedNews.length > 0) {
          localStorage.setItem('news_cache', JSON.stringify(mappedNews));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("FAILED TO FETCH BLOGGER RSS:", err);
        setLoading(false);
      });
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  return useContext(NewsContext);
}
