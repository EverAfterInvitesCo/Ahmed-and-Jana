import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { WeddingData, EditorialPhoto } from '../types';

interface PhotographySectionProps {
  data: WeddingData;
}

export const PhotographySection = ({ data }: PhotographySectionProps) => {
  const [activePhoto, setActivePhoto] = useState<EditorialPhoto | null>(null);

  return (
    <section 
      id="photography"
      className="py-28 sm:py-36 md:py-48 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24 sm:mb-32 md:mb-40"
        >
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
            A LOVE, BEAUTIFULLY REMEMBERED
          </span>
          <div className="w-12 h-[1px] bg-[#E8DED0] mx-auto mt-4" />
        </motion.div>

        {/* Cinematic Sequential Story Layout */}
        <div className="space-y-32 sm:space-y-44 md:space-y-56">
          {data.photos.map((photo, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-10 sm:gap-16 md:gap-24`}
              >
                {/* Photo Frame */}
                <div 
                  className="w-full md:w-3/5 group cursor-pointer overflow-hidden bg-[#E8DED0]/40 p-2 sm:p-3 border border-[#E8DED0]/70"
                  onClick={() => setActivePhoto(photo)}
                >
                  <div className="overflow-hidden relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] bg-[#E8DED0]/20">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] contrast-[102%] brightness-[98%] group-hover:scale-[1.03] group-hover:grayscale-0 transition-all duration-1000 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#252320]/0 group-hover:bg-[#252320]/5 transition-colors duration-700 pointer-events-none" />
                  </div>
                </div>

                {/* Editorial Caption & Story note */}
                <div className={`w-full md:w-2/5 text-center ${isEven ? 'md:text-left' : 'md:text-right'} space-y-4`}>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
                      0{index + 1}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#B8A27A] uppercase font-medium">
                      ·
                    </span>
                    <h3 className="text-xs sm:text-sm font-sans tracking-[0.3em] text-[#252320] uppercase font-medium">
                      {photo.caption}
                    </h3>
                  </div>

                  {photo.subcaption && (
                    <p className="font-serif italic text-base sm:text-lg text-[#252320]/70 leading-relaxed font-light max-w-sm mx-auto md:mx-0">
                      {photo.subcaption}
                    </p>
                  )}
                  
                  <div className={`pt-2 flex justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                    <button
                      type="button"
                      onClick={() => setActivePhoto(photo)}
                      className="text-[10px] font-sans tracking-[0.25em] text-[#252320]/50 hover:text-[#B8A27A] uppercase transition-colors"
                    >
                      VIEW PORTRAIT
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#252320]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActivePhoto(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute -top-12 right-0 text-[#FAF8F3] hover:text-[#B8A27A] transition-colors p-2 cursor-pointer"
                aria-label="Close portrait view"
              >
                <X className="w-6 h-6 stroke-1" />
              </button>

              <div className="bg-[#FAF8F3] p-3 sm:p-4 border border-[#FAF8F3]/20 shadow-2xl">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
                <div className="text-center pt-4 pb-2">
                  <p className="text-xs font-sans tracking-[0.3em] text-[#252320] uppercase font-medium">
                    {activePhoto.caption}
                  </p>
                  {activePhoto.subcaption && (
                    <p className="font-serif italic text-sm text-[#252320]/70 mt-1">
                      {activePhoto.subcaption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
