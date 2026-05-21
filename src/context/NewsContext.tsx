import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSupabase } from '../lib/supabase';

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  created_att: string;
  content: string;
  published_by: string;
  video_url?: string;
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
    async function fetchData() {
        setLoading(true);
        try {
            const { data, error } = await getSupabase()
                .from('news')
                .select('*')
                .order('created_att', { ascending: false });
            
            if (error) throw error;
            setNews(data || []);
        } catch (err) {
            console.error("FAILED TO FETCH NEWS:", err);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
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
