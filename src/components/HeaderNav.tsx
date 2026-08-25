import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users } from 'lucide-react';
import { WeddingData } from '../types';

interface HeaderNavProps {
  data: WeddingData;
  onOpenGuestlist: () => void;
}

export const HeaderNav = ({ data, onOpenGuestlist }: HeaderNavProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-30 bg-[#FAF8F3]/85 backdrop-blur-md border-b border-[#E8DED0]/60 transition-all"
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo / Monogram */}
            <button
              type="button"
              onClick={() => scrollToSection('opening')}
              className="text-xs sm:text-sm font-serif tracking-[0.2em] text-[#252320] uppercase font-light cursor-pointer hover:text-[#B8A27A] transition-colors"
            >
              {data.groom.firstName} &amp; {data.bride.firstName}
            </button>

            {/* Quick Links */}
            <nav className="hidden md:flex items-center gap-8 text-[10px] font-sans tracking-[0.25em] text-[#252320]/60 uppercase">
              <button
                type="button"
                onClick={() => scrollToSection('invitation')}
                className="hover:text-[#B8A27A] transition-colors cursor-pointer"
              >
                INVITATION
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('date')}
                className="hover:text-[#B8A27A] transition-colors cursor-pointer"
              >
                DATE
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('rsvp')}
                className="text-[#252320] border-b border-[#B8A27A] pb-0.5 font-medium hover:text-[#B8A27A] transition-colors cursor-pointer"
              >
                RSVP
              </button>
            </nav>

            {/* Guestlist trigger & mobile RSVP button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('rsvp')}
                className="md:hidden text-[9px] font-sans tracking-[0.2em] uppercase px-3 py-1.5 border border-[#252320] text-[#252320] cursor-pointer"
              >
                RSVP
              </button>
              <button
                type="button"
                onClick={onOpenGuestlist}
                title="Private Guestlist Access (Passcode Required)"
                className="p-1.5 text-[#252320]/40 hover:text-[#B8A27A] transition-colors cursor-pointer flex items-center gap-1.5 text-[10px] font-sans tracking-[0.15em] uppercase"
              >
                <Users className="w-4 h-4 stroke-1" />
                <span className="hidden sm:inline">Guestlist</span>
              </button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
