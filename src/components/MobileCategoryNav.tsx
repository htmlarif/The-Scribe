import { NEWS_CATEGORIES } from '../constants';

export default function MobileCategoryNav() {
  return (
    <div className="md:hidden sticky top-16 z-40 bg-zinc-950 border-b border-zinc-800">
      <div className="flex overflow-x-auto scrollbar-hide py-3 gap-2 px-4 shadow-sm">
        {NEWS_CATEGORIES.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase()}`}
            className="px-4 py-1.5 rounded-full bg-zinc-900 text-zinc-400 text-sm whitespace-nowrap hover:bg-zinc-800 hover:text-white transition-colors"
          >
            {cat}
          </a>
        ))}
      </div>
    </div>
  );
}
