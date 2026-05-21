import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { news } = useNews();
  
  const results = useMemo(() => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return news.filter((n) => 
      n.title.toLowerCase().includes(lowerQuery) || 
      n.content.toLowerCase().includes(lowerQuery)
    );
  }, [news, query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">
        Results for "{query}"
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((item) => (
          <Link key={item.id} to={`/news/${item.id}`} className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors">
            <img src={item.image} className="w-full h-40 object-cover" alt={item.title} />
            <div className="p-4">
              <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-2 block">{item.category}</span>
              <h3 className="font-serif leading-snug">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      {results.length === 0 && (
        <p className="text-zinc-500">No results found for "{query}".</p>
      )}
    </div>
  );
}
