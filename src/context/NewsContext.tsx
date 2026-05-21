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

    const BLOGGER_API = 'https://tscribebd.blogspot.com/feeds/posts/default?alt=json&max-results=50';
    fetch(BLOGGER_API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Blogger Data Received:", data);
        const entries = data.feed.entry || [];
        console.log(`Parsed ${entries.length} news items.`);
        
        const mappedNews: NewsItem[] = entries.map((entry: any, index: number) => {
          const title = entry.title?.$t || 'Untitled';
          const category = entry.category?.[0]?.term || 'General';
          
          let image = 'https://images.unsplash.com/photo-1504711434269-d00755f46401?q=80&w=2070&auto=format&fit=crop';
          if (entry['media$thumbnail']?.url) {
            image = entry['media$thumbnail'].url;
          } else if (entry.content?.$t) {
            const match = entry.content.$t.match(/src=["'](.*?)["']/);
            if (match && match[1]) {
              image = match[1];
            }
          }
          
          const date = entry.published?.$t ? new Date(entry.published.$t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
          const content = entry.content?.$t || '';
          
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
        console.error("FAILED TO FETCH BLOGGER DATA:", err);
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
