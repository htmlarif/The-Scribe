import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useNews } from '../context/NewsContext';

export default function FeaturedBanner() {
  const { news } = useNews();
  const bannerNews = news.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);

  useEffect(() => {
    if (isPaused || bannerNews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerNews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, bannerNews.length]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % bannerNews.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + bannerNews.length) % bannerNews.length);

  if (bannerNews.length === 0) return <div className="aspect-[3/2] bg-zinc-800 rounded-xl" />;

  const currentNews = bannerNews[currentIndex];

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
          <Link to={`/news/${currentNews.id}`}>
            <img 
              src={currentNews.image}
              alt={currentNews.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{currentNews.category}</span>
              <h1 className="text-3xl font-serif font-bold leading-tight">{currentNews.title}</h1>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {bannerNews.map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-white w-4' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
