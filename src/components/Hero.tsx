export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[3/2] md:aspect-auto overflow-hidden rounded-xl bg-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1504711434269-d00755f46401?q=80&w=2070&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent p-6 flex flex-col justify-end">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">Breaking News</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">Global Markets Shift Amidst Unexpected Regulatory Updates</h1>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 border-b border-zinc-800 pb-6 last:border-0 hover:opacity-80 transition-opacity">
              <div className="w-24 h-24 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
                 <img src={`https://picsum.photos/200/200?random=${i}`} className="w-full h-full object-cover" alt="Thumb" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 mb-1 block">Politics</span>
                <h3 className="font-serif text-lg leading-snug">New Diplomatic Relations Formed Between Major Regions</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
