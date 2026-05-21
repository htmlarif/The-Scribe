import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';

export default function ManageNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getSupabase().from('news').select('*');
      setNews(data || []);
    }
    fetchData();
  }, []);

  const deleteNews = async (id: number) => {
    await getSupabase().from('news').delete().eq('id', id);
    setNews(news.filter(n => n.id !== id));
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className="text-2xl font-bold mb-6 text-zinc-950">Manage News</h2>
      <div className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-lg">{item.title}</p>
              <p className="text-sm text-zinc-500">{item.category} • {item.published_by}</p>
            </div>
            <div className='flex gap-2'>
              <button className="text-orange-600 font-bold px-4 py-2">Edit</button>
              <button className="text-red-500 font-bold px-4 py-2" onClick={() => deleteNews(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
