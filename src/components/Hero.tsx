import FeaturedBanner from './FeaturedBanner';
import { NEWS_DATA } from '../data';

export default function Hero() {
  const heroNews = NEWS_DATA.slice(5, 8); // Take 3 items for hero side
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeaturedBanner />
        
        <div className="flex flex-col gap-6">
          {heroNews.map((news) => (
            <div key={news.id} className="flex gap-4 border-b border-zinc-800 pb-6 last:border-0 hover:opacity-80 transition-opacity">
              <div className="w-24 h-24 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                 <img src={news.image} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 mb-1 block uppercase tracking-wider">{news.category}</span>
                <h3 className="font-serif text-lg leading-snug">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
