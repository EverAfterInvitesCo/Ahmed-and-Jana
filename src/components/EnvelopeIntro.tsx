import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface EnvelopeIntroProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const EnvelopeIntro = ({
  isOpen,
  onOpenInvitation,
}: EnvelopeIntroProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasEndedRef = useRef(false);

  const handleTriggerFadeIntoSite = useCallback(() => {
    if (hasEndedRef.current) return;
    hasEndedRef.current = true;
    setIsFadingOut(true);

    if (videoRef.current) {
      videoRef.current.pause();
    }

    setTimeout(() => {
      onOpenInvitation();
    }, 700);
  }, [onOpenInvitation]);

  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    video.loop = false;

    // Direct playback attempt
    const attemptPlay = async () => {
      try {
        await video.play();
      } catch {
        // If unmuted autoplay fails due to browser policy, start muted immediately so it plays without delay
        video.muted = true;
        try {
          await video.play();
        } catch {
          // fallback
        }
      }
    };

    attemptPlay();

    // User gesture handler: unmute on first tap anywhere
    const handleFirstTap = async () => {
      if (videoRef.current && !hasEndedRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        if (videoRef.current.paused) {
          try {
            await videoRef.current.play();
          } catch {
            // fallback
          }
        }
      }
    };

    window.addEventListener('click', handleFirstTap, { passive: true });
    window.addEventListener('touchstart', handleFirstTap, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstTap);
      window.removeEventListener('touchstart', handleFirstTap);
    };
  }, [isOpen]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasEndedRef.current) return;

    // Detect when video reaches the end
    if (video.duration && video.currentTime >= video.duration - 0.08) {
      handleTriggerFadeIntoSite();
    }
  };

  const handleContainerTap = async () => {
    const video = videoRef.current;
    if (video && !hasEndedRef.current) {
      video.muted = false;
      video.volume = 1.0;
      if (video.paused) {
        try {
          await video.play();
        } catch {
          // fallback
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="envelope-intro-modal"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#1a1816] flex items-center justify-center overflow-hidden select-none cursor-pointer"
          onClick={handleContainerTap}
        >
          {/* Fullscreen Video Stage */}
          <div className="relative w-full h-full flex items-center justify-center bg-[#1a1816]">
            <video
              ref={videoRef}
              poster="/media/envelope_poster.jpg"
              autoPlay
              playsInline
              muted
              preload="auto"
              loop={false}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleTriggerFadeIntoSite}
              className={`w-full h-full object-contain max-h-screen transition-all duration-700 ${
                isFadingOut ? 'opacity-0 scale-[1.02]' : 'opacity-100'
              }`}
            >
              <source src="/media/Envelope.mp4" type="video/mp4" />
              <source src="/Envelope.mp4" type="video/mp4" />
            </video>

            {/* Discreet Skip Button */}
            <div className="absolute bottom-6 right-6 pointer-events-none z-30">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTriggerFadeIntoSite();
                }}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/15 text-[10px] font-sans tracking-[0.25em] uppercase transition-all cursor-pointer shadow-lg"
              >
                <span>Skip to Invitation</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
