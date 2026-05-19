import { useEffect, useRef } from 'react';
import { NEWS_CATEGORIES } from '../constants';

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;

    const animate = () => {
      if (!isPaused.current) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.5;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section 
      className="container mx-auto px-4 py-12"
      onMouseEnter={() => isPaused.current = true}
      onMouseLeave={() => isPaused.current = false}
      onTouchStart={() => isPaused.current = true}
      onTouchEnd={() => isPaused.current = false}
    >
      <h2 className="text-2xl font-serif font-bold mb-8">Browse Categories</h2>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 md:grid md:grid-cols-4 lg:grid-cols-7 md:pb-0"
      >
        {NEWS_CATEGORIES.map((cat, i) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase()}`}
            className="group flex-shrink-0 w-32 md:w-auto p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-amber-500/50 transition-all text-center"
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
