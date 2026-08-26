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
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Fallback to muted autoplay if browser blocks audio
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime;
      // Start fading out gracefully right before the video ends
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden"
        >
          {/* Full Frame Video filling the entire viewport */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}open.mp4`}
              autoPlay
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const VideoIntroScreen = EnvelopeIntro;