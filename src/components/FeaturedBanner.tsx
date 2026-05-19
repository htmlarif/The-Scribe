import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS_DATA } from '../data';

export default function FeaturedBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5); // Just show first 5 in banner
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % 5);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + 5) % 5);

  return (
    <div 
      className="relative aspect-[3/2] md:aspect-auto overflow-hidden rounded-xl bg-zinc-800 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => touchStart.current = e.touches[0].clientX}
      onTouchEnd={(e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart.current - touchEnd > 50) handleNext();
        if (touchStart.current - touchEnd < -50) handlePrev();
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img 
            src={NEWS_DATA[currentIndex].image}
            alt={NEWS_DATA[currentIndex].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{NEWS_DATA[currentIndex].category}</span>
            <h1 className="text-3xl font-serif font-bold leading-tight">{NEWS_DATA[currentIndex].title}</h1>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-white w-4' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
