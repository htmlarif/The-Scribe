import { useState } from 'react';
import { Menu, Search, User, Moon, Sun, Bell, ChevronDown } from 'lucide-react';
import { NEWS_CATEGORIES } from '../constants';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="w-6 h-6 text-zinc-400 hover:text-white cursor-pointer" />
          <span className="text-2xl font-serif font-bold tracking-tight">The Scribe</span>
        </div>
        
        <div className="hidden md:flex gap-6 text-sm font-medium text-zinc-400 items-center">
          {NEWS_CATEGORIES.slice(0, 6).map(cat => (
            <a key={cat} href={`#${cat.toLowerCase()}`} className="hover:text-white">{cat}</a>
          ))}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white">
              More <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 bg-zinc-900 border border-zinc-800 p-4 w-60 hidden group-hover:block grid grid-cols-2 gap-2 text-xs">
              {NEWS_CATEGORIES.slice(6).map(cat => (
                <a key={cat} href={`#${cat.toLowerCase()}`} className="hover:text-white block p-1">{cat}</a>
              ))}
            </div>
          </div>
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
