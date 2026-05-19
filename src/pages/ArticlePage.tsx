import { useParams, Link } from 'react-router-dom';
import { NEWS_DATA } from '../data';
import { ArrowLeft, Share2, Tag, Calendar, User } from 'lucide-react';

export default function ArticlePage() {
  const { id } = useParams();
  const news = NEWS_DATA.find((n) => n.id === Number(id));

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">Article Not Found</h1>
        <Link to="/" className="text-amber-500 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="mr-2" size={20} /> Back to Home
      </Link>
      
      <header className="mb-8">
        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-xs mb-4">
          <Tag size={16} /> {news.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">{news.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
          <div className="flex items-center gap-2"><User size={18} /> Reporter Name</div>
          <div className="flex items-center gap-2"><Calendar size={18} /> {news.date}</div>
        </div>
      </header>

      <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
        <img src={news.image} alt={news.title} className="w-full aspect-video object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none font-serif text-zinc-300 leading-relaxed mb-12">
        <p className="mb-6">This is a placeholder for the full article body content. In a real application, you would fetch additional data for the article including paragraphs, subheadings, and more in-depth reporting about "{news.title}".</p>
        <p className="mb-6">The news portal provides comprehensive coverage on {news.category} topics, ensuring that our readers stay informed about the latest developments globally. Our reporters are dedicated to presenting accurate and timely information.</p>
        <p>Stay tuned to "The Scribe" for more updates on this developing story.</p>
      </div>

      <footer className="border-t border-zinc-800 pt-8 mt-8">
        <div className="flex justify-between items-center">
          <h4 className="font-bold">Share this article:</h4>
          <div className="flex gap-4">
            <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700transition-colors text-zinc-300"><Share2 size={20} /></button>
          </div>
        </div>
      </footer>
    </article>
  );
}
