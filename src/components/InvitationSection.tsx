import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface InvitationSectionProps {
  data: WeddingData;
}

export const InvitationSection = ({ data }: InvitationSectionProps) => {
  return (
    <section 
      id="invitation"
      className="relative py-28 sm:py-36 md:py-48 px-6 bg-[#FAF8F3] paper-grain flex justify-center items-center overflow-hidden"
    >
      {/* Decorative fine-line frame mimicking handmade deckled stationery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-2xl w-full bg-[#FAF8F3] border border-[#E8DED0] px-8 sm:px-14 md:px-20 py-16 sm:py-20 md:py-24 text-center shadow-[0_10px_40px_rgba(37,35,32,0.02)]"
      >
        {/* Inner delicate border */}
        <div className="absolute inset-2.5 sm:inset-3.5 border border-[#E8DED0]/60 pointer-events-none" />

        {/* Small header */}
        <div className="mb-10 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
            {data.invitationText.header}
          </p>
        </div>

        {/* Couple Full Names */}
        <div className="space-y-3 sm:space-y-4 my-8 sm:my-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.08em] text-[#252320] leading-tight">
            {data.groom.fullName}
          </h2>
          
          <div className="py-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#B8A27A] font-light">
              &amp;
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-[0.08em] text-[#252320] leading-tight">
            {data.bride.fullName}
          </h2>
        </div>

        {/* Request text */}
        <div className="my-10 sm:my-12 max-w-lg mx-auto">
          <p className="font-serif italic text-base sm:text-xl md:text-2xl text-[#252320]/80 leading-relaxed font-light">
            {data.invitationText.body}
          </p>
        </div>

        {/* Date line */}
        <div className="pt-8 sm:pt-10 border-t border-[#E8DED0] max-w-sm mx-auto space-y-2">
          <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.25em] text-[#252320] uppercase font-medium">
            {data.date.fullDateDisplay}
          </p>
          <p className="text-[11px] sm:text-xs font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
            {data.date.timePhrase || 'AT SIX O’CLOCK IN THE EVENING'}
          </p>
          <p className="text-[11px] font-sans tracking-[0.2em] text-[#252320]/50 uppercase pt-1">
            {data.venue.city}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
