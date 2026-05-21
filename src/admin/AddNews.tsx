import { useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const categories = ["Education", "Health", "National", "International", "Politics", "Technology", "Business", "Economy", "Sports", "Entertainment", "Lifestyle", "Science", "Environment", "Agriculture", "Jobs", "Campus", "Law & Crime", "Religion", "Travel", "Food", "Fashion", "Culture", "Opinion", "Editorial", "Fact Check", "Video News", "Live TV", "Breaking News"];

export default function AddNews() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: categories[0], content: '', published_by: '' });
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handlePublish = async () => {
    setLoading(true);
    let imageUrl = '';
    if (file) {
      const { data } = await getSupabase().storage.from('news').upload(`${Date.now()}_${file.name}`, file);
      imageUrl = data?.fullPath || '';
    }

    await getSupabase().from('news').insert([{ ...formData, image_url: imageUrl }]);
    setLoading(false);
    navigate('/admin/manage-news');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200">
      <h2 className="text-2xl font-bold mb-6">Add News</h2>
      <div className="space-y-4">
        <input className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" placeholder="Title" onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <select className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" onChange={(e) => setFormData({...formData, category: e.target.value})}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" />
        <textarea className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 h-40" placeholder="Content" onChange={(e) => setFormData({...formData, content: e.target.value})} />
        <input className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" placeholder="Published By" onChange={(e) => setFormData({...formData, published_by: e.target.value})} />
        <button onClick={handlePublish} disabled={loading} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700">
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
