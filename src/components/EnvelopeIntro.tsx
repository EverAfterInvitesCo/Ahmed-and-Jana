import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WeddingData } from '../types';

export interface EnvelopeIntroProps {
  isOpen?: boolean;
  data?: WeddingData;
  onOpenInvitation: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  isOpen = true,
  onOpenInvitation,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch((error: unknown) => {
        console.warn("Autoplay was prevented by the browser:", error);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="envelope-video-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black text-white select-none overflow-hidden cursor-pointer"
          onClick={onOpenInvitation}
        >
          {/* Full Frame Video filling the entire viewport */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}open.mp4`}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover sm:object-contain opacity-95 transition-transform duration-700"
            >
              <source src={`${import.meta.env.BASE_URL}open.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Subtle Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
          </div>

          {/* Simple Open the Invitation Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative z-10 pb-10 sm:pb-14 px-4"
          >
            <motion.button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                onOpenInvitation();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center space-x-2.5 bg-[#FAF6EE] px-8 py-3.5 rounded-full border border-[#E1D4C2] shadow-2xl hover:bg-[#EFE4D3] transition-all cursor-pointer"
            >
              <span className="font-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase text-[#4A3E33] font-bold">
                OPEN THE INVITATION
              </span>
              <span className="text-[#8C7A68] text-xs transition-transform duration-300 group-hover:translate-x-0.5">✦</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const VideoIntroScreen = EnvelopeIntro;