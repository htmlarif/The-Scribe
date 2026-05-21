import { Link } from 'react-router-dom';
import FeaturedBanner from './FeaturedBanner';
import { useNews } from '../context/NewsContext';

export default function Hero() {
  const { news } = useNews();
  const heroNews = news.slice(5, 8); // Take 3 items for hero side
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeaturedBanner />
        
        <div className="flex flex-col gap-6">
          {heroNews.map((newsItem) => (
            <Link key={newsItem.id} to={`/news/${newsItem.id}`} className="flex gap-4 border-b border-zinc-800 pb-6 last:border-0 hover:opacity-80 transition-opacity">
              <div className="w-24 h-24 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                 <img src={newsItem.image} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 mb-1 block uppercase tracking-wider">{newsItem.category}</span>
                <h3 className="font-serif text-lg leading-snug">{newsItem.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
