import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams();
  const { news } = useNews();
  
  const filteredNews = news.filter((n) => n.category.toLowerCase() === category?.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="mr-2" size={20} /> Back to Home
      </Link>
      
      <h1 className="text-4xl font-serif font-bold mb-8 capitalize">{category}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredNews.map((item) => (
          <Link key={item.id} to={`/news/${item.id}`} className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors">
            <img src={item.image} className="w-full h-40 object-cover" alt={item.title} />
            <div className="p-4">
              <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-2 block">{item.category}</span>
              <h3 className="font-serif leading-snug">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredNews.length === 0 && (
        <p className="text-zinc-500">No news found for this category.</p>
      )}
    </div>
  );
}
