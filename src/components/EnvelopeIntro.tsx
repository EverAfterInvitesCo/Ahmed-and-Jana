import { useState, useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    // Handler to unmute audio on first user touch/click anywhere
    const handleUnmuteOnInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
      }
    };

    window.addEventListener('click', handleUnmuteOnInteraction, { once: true });
    window.addEventListener('touchstart', handleUnmuteOnInteraction, { once: true });

    // Step 1: Try unmuted autoplay first
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Step 2: If browser blocks unmuted audio on load, start video muted immediately
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {
            // If still blocked, user tap listener will start it
          });
        }
      });
    }

    return () => {
      window.removeEventListener('click', handleUnmuteOnInteraction);
      window.removeEventListener('touchstart', handleUnmuteOnInteraction);
    };
  }, [isOpen]);

  const handleContainerTap = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.volume = 1.0;
      if (video.paused) {
        video.play();
      }
    }
  };

  const handleTriggerFadeIntoSite = () => {
    setIsFadingOut(true);
    // Smooth transition into the main scrolling wedding invitation site
    setTimeout(() => {
      onOpenInvitation();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="envelope-intro-modal"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-[#11100F] flex items-center justify-center overflow-hidden select-none cursor-pointer"
        onClick={handleContainerTap}
      >
        {/* Fullscreen Video Stage */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src="/media/Envelope.mp4"
            autoPlay
            playsInline
            muted
            preload="auto"
            onEnded={handleTriggerFadeIntoSite}
            className={`w-full h-full object-contain max-h-screen transition-opacity duration-700 ${
              isFadingOut ? 'opacity-0 scale-[1.02]' : 'opacity-100'
            }`}
          />

          {/* Discreet Skip Button */}
          <div className="absolute bottom-6 right-6 pointer-events-none z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleTriggerFadeIntoSite();
              }}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 text-[10px] font-sans tracking-[0.25em] uppercase transition-all cursor-pointer"
            >
              <span>Skip to Invitation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
