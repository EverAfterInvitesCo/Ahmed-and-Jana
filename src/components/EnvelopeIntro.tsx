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
      // Ensure video is unmuted and preloaded
      videoRef.current.muted = false;
    }
  }, [isOpen]);

  const handleOpenClick = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Fallback to muted if needed
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }

    // Also trigger any background audio players on the page
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach((audio) => {
      audio.play().catch(() => {});
    });

    // Trigger the smooth fade out into the site
    onOpenInvitation();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
      if (timeLeft <= 0.8 && timeLeft > 0) {
        onOpenInvitation();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="envelope-video-intro"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black text-white select-none overflow-hidden pb-16 sm:pb-20"
        >
          {/* Full Frame Video filling the entire viewport */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black -z-10">
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}open.mp4`}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={onOpenInvitation}
              className="w-full h-full object-cover sm:object-contain opacity-95"
            >
              <source src={`${import.meta.env.BASE_URL}open.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Subtle Vignette Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />
          </div>

          {/* Luxury Tap Button to Unlock Audio & Enter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-20 px-4"
          >
            <motion.button
              type="button"
              onClick={handleOpenClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center space-x-3 bg-[#FAF6EE] px-9 py-4 rounded-full border border-[#E1D4C2] shadow-2xl hover:bg-[#EFE4D3] transition-all cursor-pointer"
            >
              <span className="font-cormorant text-xs sm:text-sm tracking-[0.25em] uppercase text-[#4A3E33] font-bold">
                OPEN ENVELOPE
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