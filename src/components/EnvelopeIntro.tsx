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
      // Unmute or play audio if desired, keeping in mind browser audio policies 
      // (muted videos autoplay reliably; unmuted sound may require user interaction first)
      videoRef.current.muted = false; 
      videoRef.current.play().catch((error: unknown) => {
        console.warn("Autoplay with sound was blocked by the browser, falling back to muted:", error);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, [isOpen]);

  // Automatically transition into the site after the intro plays (e.g., 4 seconds)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onOpenInvitation();
    }, 4000); // Change this duration (in milliseconds) to match your video length

    return () => clearTimeout(timer);
  }, [isOpen, onOpenInvitation]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="envelope-video-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden"
        >
          {/* Full Frame Video filling the entire viewport */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}open.mp4`}
              autoPlay
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const VideoIntroScreen = EnvelopeIntro;