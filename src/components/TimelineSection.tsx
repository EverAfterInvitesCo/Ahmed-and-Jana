import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface TimelineSectionProps {
  data: WeddingData;
}

export const TimelineSection = ({ data }: TimelineSectionProps) => {
  return (
    <section 
      id="timeline"
      className="py-28 sm:py-36 md:py-48 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-20 sm:mb-28"
        >
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
            EVENT TIMELINE
          </span>
          <p className="text-xs sm:text-sm font-serif italic text-[#252320]/60 mt-2">
            The evening's itinerary
          </p>
          <div className="w-12 h-[1px] bg-[#E8DED0] mx-auto mt-4" />
        </motion.div>

        {/* Sophisticated Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 md:pl-16 border-l border-[#E8DED0] space-y-16 sm:space-y-20 md:space-y-24 ml-4 sm:ml-8 md:ml-12">
          {data.timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.2, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Minimalist dot indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] md:-left-[71px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FAF8F3] border border-[#B8A27A] group-hover:bg-[#B8A27A] transition-colors duration-500" />

              {/* Time */}
              <div className="mb-2">
                <span className="text-xs sm:text-sm font-sans tracking-[0.25em] text-[#B8A27A] font-medium uppercase">
                  {item.time}
                </span>
              </div>

              {/* Event Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-light text-[#252320] tracking-wide">
                {item.title}
              </h3>

              {/* Location */}
              <p className="text-xs font-sans tracking-[0.15em] text-[#252320]/60 uppercase mt-1">
                {item.location}
              </p>

              {/* Description if present */}
              {item.description && (
                <p className="font-serif italic text-sm sm:text-base text-[#252320]/75 mt-2 leading-relaxed max-w-lg">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
