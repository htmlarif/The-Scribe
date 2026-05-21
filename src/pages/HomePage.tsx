import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';
import { useNews } from '../context/NewsContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { news, loading } = useNews();

  if (loading) {
     return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <>
      <Hero />
      <CategorySection />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-serif font-bold mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.slice(0, 8).map((item) => (
            <Link key={item.id} to={`/news/${item.id}`} className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors">
              <img src={item.image_url} className="w-full h-40 object-cover" alt={item.title} />
              <div className="p-4">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-2 block">{item.category}</span>
                <h3 className="font-serif leading-snug">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {news.length > 8 && (
          <>
            <h2 className="text-2xl font-serif font-bold mt-16 mb-8">More Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.slice(8, 20).map((item) => (
                <Link key={item.id} to={`/news/${item.id}`} className="flex gap-4 p-4 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image_url} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 mb-1 block">{item.category}</span>
                    <h3 className="font-serif text-sm leading-snug">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
