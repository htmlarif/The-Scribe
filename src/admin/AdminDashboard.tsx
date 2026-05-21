import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabase';
import { FileText, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, recent: 0 });

  useEffect(() => {
    async function fetchData() {
      const { count: total } = await getSupabase().from('news').select('*', { count: 'exact', head: true });
      setStats({ total: total || 0, recent: 0 });
    }
    fetchData();
  }, []);

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className="text-2xl font-bold mb-6 text-zinc-950">Dashboard</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <FileText className="text-orange-600 mb-3" />
          <p className="text-zinc-500 text-sm">Total News</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
      </div>
    </div>
  );
}
