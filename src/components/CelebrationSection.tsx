import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, Sparkles, ExternalLink } from 'lucide-react';
import { WeddingData } from '../types';

interface CelebrationSectionProps {
  data: WeddingData;
}

export const CelebrationSection = ({ data }: CelebrationSectionProps) => {
  return (
    <section 
      id="celebration"
      className="py-28 sm:py-36 md:py-48 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20 sm:mb-28"
        >
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
            THE CELEBRATION
          </span>
          <div className="w-12 h-[1px] bg-[#E8DED0] mx-auto mt-4" />
        </motion.div>

        {/* Refined Editorial Typography Details Grid (Not bulky cards, but clean editorial layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
          {/* Left Column: Venue & Address */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="border-b border-[#E8DED0] pb-6 sm:pb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#B8A27A] stroke-1" />
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
                  LOCATION &amp; VENUE
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#252320] tracking-wide font-light">
                {data.venue.name}
              </h3>
              {data.venue.subname && (
                <p className="text-sm font-serif italic text-[#252320]/75 mt-1">
                  {data.venue.subname}
                </p>
              )}
              <p className="text-xs sm:text-sm font-sans text-[#252320]/65 mt-3 leading-relaxed">
                {data.venue.address}
                <br />
                {data.venue.city}
              </p>
            </div>

            {/* Attire note */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8A27A] stroke-1" />
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
                  DRESS CODE
                </span>
              </div>
              <p className="font-serif italic text-base sm:text-lg text-[#252320]/80">
                {data.venue.dressCode}
              </p>
              <p className="text-xs font-sans text-[#252320]/50 mt-1">
                Refined black tie, tuxedos, and evening gowns
              </p>
            </div>
          </motion.div>

          {/* Right Column: Timing & Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="space-y-6 sm:space-y-8 flex flex-col justify-between"
          >
            <div className="border-b border-[#E8DED0] pb-6 sm:pb-8">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#B8A27A] stroke-1" />
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
                  DATE &amp; TIME
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#252320] tracking-wide font-light">
                {data.date.dayOfWeek}, {data.date.fullDateDisplay}
              </h3>
              <div className="mt-4 space-y-2 text-xs sm:text-sm font-sans text-[#252320]/75">
                <div className="flex items-center gap-3">
                  <Clock className="w-3.5 h-3.5 text-[#B8A27A] stroke-1" />
                  <span>Reception begins at {data.venue.receptionTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-3.5 h-3.5 text-[#B8A27A] stroke-1" />
                  <span>Dinner &amp; Celebration at {data.venue.dinnerTime}</span>
                </div>
              </div>
            </div>

            {/* Minimalist Google Maps Location Link */}
            <div className="pt-2">
              <a
                href={data.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-[#252320] hover:border-[#B8A27A] text-[#252320] hover:text-[#B8A27A] hover:bg-[#E8DED0]/20 transition-all duration-300 rounded-none cursor-pointer"
              >
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase font-medium">
                  VIEW LOCATION
                </span>
                <ExternalLink className="w-3 h-3 stroke-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
