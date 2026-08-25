import { motion } from 'motion/react';
import { ChevronUp, Lock } from 'lucide-react';
import { WeddingData } from '../types';

interface FinalSceneProps {
  data: WeddingData;
  onOpenGuestlist?: () => void;
}

export const FinalScene = ({ data, onOpenGuestlist }: FinalSceneProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="final-scene"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between items-center text-center px-6 py-20 md:py-28 bg-[#FAF8F3] paper-grain overflow-hidden"
    >
      {/* Decorative fine-line corners */}
      <div className="absolute top-10 left-10 w-10 h-10 border-t border-l border-[#D8D0C5]/40 pointer-events-none hidden md:block" />
      <div className="absolute top-10 right-10 w-10 h-10 border-t border-r border-[#D8D0C5]/40 pointer-events-none hidden md:block" />

      {/* Top back to top indicator */}
      <div className="pt-4">
        <button
          type="button"
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 text-[10px] font-sans tracking-[0.3em] text-[#252320]/40 hover:text-[#B8A27A] uppercase transition-colors cursor-pointer"
        >
          <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform stroke-1" />
          <span>RETURN TO TOP</span>
        </button>
      </div>

      {/* Center Final Message & Couple Names */}
      <div className="my-auto py-12 max-w-3xl w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Couple Names */}
          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-[0.08em] text-[#252320]">
              {data.groom.firstName}
            </h2>
            <div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#B8A27A]">
                &amp;
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-[0.08em] text-[#252320]">
              {data.bride.firstName}
            </h2>
          </div>

          {/* Date */}
          <p className="text-xs sm:text-sm font-sans tracking-[0.35em] text-[#252320]/70 uppercase pt-4">
            {data.date.shortDisplay}
          </p>

          <div className="w-20 sm:w-28 h-[1px] bg-[#B8A27A]/60 mx-auto my-8" />

          {/* Closing Editorial Line */}
          <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.3em] text-[#252320]/80 uppercase font-light max-w-md mx-auto">
            AND SO, OUR NEXT CHAPTER BEGINS.
          </p>
        </motion.div>
      </div>

      {/* Footer Socials, Branding & Guestlist Access */}
      <div className="w-full max-w-5xl px-4 border-t border-[#E8DED0]/60 pt-8 pb-4 sm:pb-8 flex flex-col gap-6">
        {/* Social Media Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <a
            href="https://www.instagram.com/_everafterinvites_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/60 hover:text-[#B8A27A] uppercase transition-colors"
          >
            Instagram
          </a>
          <span className="w-1 h-1 rounded-full bg-[#B8A27A]/40" />
          <a
            href="https://www.tiktok.com/@_everafterinvites_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/60 hover:text-[#B8A27A] uppercase transition-colors"
          >
            TikTok
          </a>
          <span className="w-1 h-1 rounded-full bg-[#B8A27A]/40" />
          <a
            href="https://www.facebook.com/profile.php?id=61591562833010"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/60 hover:text-[#B8A27A] uppercase transition-colors"
          >
            Facebook
          </a>
        </div>

        {/* Bottom Bar: Brand & Guestlist */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pt-2">
          <div>
            <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/50 uppercase">
              Designed by <span className="font-medium text-[#252320]/75">EverAfterInvites</span>
            </p>
          </div>

          {/* Discreet Actions */}
          {onOpenGuestlist && (
            <div>
              <button
                type="button"
                onClick={onOpenGuestlist}
                className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#252320]/45 hover:text-[#B8A27A] uppercase transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 stroke-1" />
                <span>PRIVATE GUESTLIST</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
