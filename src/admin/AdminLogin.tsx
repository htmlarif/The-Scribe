import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'arif') {
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <form onSubmit={handleLogin} className="p-8 bg-zinc-900 rounded-xl border border-zinc-800 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h2>
        <input 
          type="password"
          placeholder="Enter password"
          className="w-full p-3 rounded bg-zinc-800 text-white mb-4 border border-zinc-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded font-bold hover:bg-orange-700">Login</button>
      </form>
    </div>
  );
}
