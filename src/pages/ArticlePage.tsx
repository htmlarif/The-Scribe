import { useParams, Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { ArrowLeft, Share2, Tag, Calendar, User } from 'lucide-react';

export default function ArticlePage() {
  const { id } = useParams();
  const { news, loading } = useNews();
  const article = news.find((n) => n.id === Number(id));

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!article) {
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
          <Tag size={16} /> {article.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">{article.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-zinc-400 text-sm">
          <div className="flex items-center gap-2"><User size={18} /> {article.published_by}</div>
          <div className="flex items-center gap-2"><Calendar size={18} /> {new Date(article.created_att).toLocaleDateString()}</div>
        </div>
      </header>

      <div className="rounded-2xl overflow-hidden mb-8 shadow-2xl">
        <img src={article.image_url} alt={article.title} className="w-full aspect-video object-cover" />
      </div>

      <div className="prose prose-invert prose-lg max-w-none font-serif text-zinc-300 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: article.content }}>
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
