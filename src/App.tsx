/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import MobileCategoryNav from './components/MobileCategoryNav';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import { NEWS_DATA } from './data';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />
      <MobileCategoryNav />
      <Hero />
      <CategorySection />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-serif font-bold mb-8">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEWS_DATA.slice(8, 16).map((news) => (
            <div key={news.id} className="group bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition-colors">
              <img src={news.image} className="w-full h-40 object-cover" alt={news.title} />
              <div className="p-4">
                <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-2 block">{news.category}</span>
                <h3 className="font-serif leading-snug">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-serif font-bold mt-16 mb-8">More Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_DATA.slice(16, 24).map((news) => (
            <div key={news.id} className="flex gap-4 p-4 border border-zinc-800 rounded-xl">
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <img src={news.image} className="w-full h-full object-cover" alt={news.title} />
              </div>
              <div>
                <span className="text-xs text-zinc-500 mb-1 block">{news.category}</span>
                <h3 className="font-serif text-sm leading-snug">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
