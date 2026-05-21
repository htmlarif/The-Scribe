import { useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const categories = ["Education", "Health", "National", "International", "Politics", "Technology", "Business", "Economy", "Sports", "Entertainment", "Lifestyle", "Science", "Environment", "Agriculture", "Jobs", "Campus", "Law & Crime", "Religion", "Travel", "Food", "Fashion", "Culture", "Opinion", "Editorial", "Fact Check", "Video News", "Live TV", "Breaking News"];

export default function AddNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', category: categories[0], content: '', published_by: '', video_url: '' });
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    let imageUrl = '';
    
    try {
      const supabase = getSupabase();
      
      if (file) {
        // Debug: listBuckets
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();
        if (listError) {
          console.error('List buckets error:', listError);
          throw listError;
        }
        console.log('Available buckets:', buckets);

        const bucketExists = buckets?.some(b => b.name === 'news-images');
        if (!bucketExists) {
           console.error('Bucket "news-images" not found');
           throw new Error('Storage bucket "news-images" not found. Please check Supabase dashboard.');
        }

        const filePath = `${Date.now()}_${file.name}`;
        console.log('Uploading to news-images, path:', filePath);
        const { data: uploadData, error: uploadError } = await supabase.storage.from('news-images').upload(filePath, file);
        if (uploadError) {
            console.error('Upload error details:', uploadError);
            throw uploadError;
        }
        
        console.log('Upload success:', uploadData);
        const { data: publicUrlData } = supabase.storage.from('news-images').getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      const newsData = {
        title: formData.title,
        content: formData.content,
        image_url: imageUrl,
        video_url: formData.video_url,
        category: formData.category,
        published_by: formData.published_by,
        created_att: new Date().toISOString()
      };

      console.log('Inserting data to Supabase:', newsData);
      const { data, error: insertError } = await supabase.from('news').insert([newsData]);
      
      if (insertError) {
        console.error('Insert error details:', insertError);
        throw insertError;
      }
      
      console.log('Insert success:', data);
      alert('News published successfully!');
      navigate('/admin/manage-news');
    } catch (err: any) {
      console.error('Final error:', err);
      setError(err.message || 'An error occurred while publishing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-200">
      <h2 className="text-2xl font-bold mb-6">Add News</h2>
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4">{error}</div>}
      <div className="space-y-4">
        <input className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" placeholder="Title" onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <select className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" onChange={(e) => setFormData({...formData, category: e.target.value})}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" />
        <input className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" placeholder="Video URL (Optional)" onChange={(e) => setFormData({...formData, video_url: e.target.value})} />
        <textarea className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 h-40" placeholder="Content" onChange={(e) => setFormData({...formData, content: e.target.value})} />
        <input className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200" placeholder="Published By" onChange={(e) => setFormData({...formData, published_by: e.target.value})} />
        <button onClick={handlePublish} disabled={loading} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700">
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
