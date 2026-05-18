import { useState } from 'react';
import { Menu, Search, User, Moon, Sun, Bell } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-zinc-400 hover:text-white cursor-pointer" />
          <span className="text-2xl font-serif font-bold tracking-tight">The Scribe</span>
        </div>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white">Politics</a>
          <a href="#" className="hover:text-white">Technology</a>
          <a href="#" className="hover:text-white">Business</a>
          <a href="#" className="hover:text-white">Sports</a>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <Search className="w-5 h-5 hover:text-white cursor-pointer" />
          <Bell className="w-5 h-5 hover:text-white cursor-pointer" />
          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <User className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
