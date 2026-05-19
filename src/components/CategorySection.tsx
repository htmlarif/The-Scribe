import { NEWS_CATEGORIES } from '../constants';

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-serif font-bold mb-8">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {NEWS_CATEGORIES.map((cat, i) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase()}`}
            className="group p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-all text-center"
          >
            <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
              {['📰', '🏥', '🏛️', '🌍', '⚖️', '💻', '💼', '📊', '⚽', '🎭', '🧘', '🔬', '🌿', '🌾', '💼', '🎓', '🚓', '🙏', '✈️', '🍲', '👗', '🎨', '💡', '✍️', '✅', '🎬', '📺', '🚨'][i % 28]}
            </span>
            <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{cat}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
