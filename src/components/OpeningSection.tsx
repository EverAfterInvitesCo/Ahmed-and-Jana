import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface OpeningSectionProps {
  data: WeddingData;
}

export const OpeningSection = ({ data }: OpeningSectionProps) => {
  return (
    <section 
      id="opening"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between items-center text-center px-6 py-16 md:py-24 paper-grain overflow-hidden"
    >
      {/* Subtle fine corner border accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[#D8D0C5]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[#D8D0C5]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[#D8D0C5]/40 pointer-events-none hidden md:block" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[#D8D0C5]/40 pointer-events-none hidden md:block" />

      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pt-4 md:pt-8"
      >
        <span className="text-[11px] md:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
          WITH JOY IN OUR HEARTS
        </span>
      </motion.div>

      {/* Center Couple Names & Date */}
      <div className="my-auto py-12 max-w-4xl w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center select-none"
        >
          {/* Groom Name */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-[0.06em] text-[#252320] leading-tight">
            {data.groom.firstName}
          </h1>

          {/* Ampersand */}
          <div className="my-1 md:my-3">
            <span className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#B8A27A]/90 font-normal">
              &amp;
            </span>
          </div>

          {/* Bride Name */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-light tracking-[0.06em] text-[#252320] leading-tight">
            {data.bride.firstName}
          </h1>
        </motion.div>

        {/* Date Display */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 md:mt-12 flex flex-col items-center"
        >
          <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.4em] text-[#252320]/75 uppercase font-normal">
            {data.date.shortDisplay}
          </p>

          {/* Muted champagne gold line that gently draws itself */}
          <div className="w-24 sm:w-32 md:w-40 h-[1px] bg-[#B8A27A]/70 mt-4 animate-draw-line" />
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.9 }}
        className="pb-2 md:pb-6 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => {
          document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] md:text-[11px] font-sans tracking-[0.35em] text-[#252320]/50 uppercase hover:text-[#B8A27A] transition-colors">
          SCROLL TO DISCOVER
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#B8A27A]/70 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};