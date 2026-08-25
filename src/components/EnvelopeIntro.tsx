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
    }, 600);
  }, [onOpenInvitation]);

  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    video.loop = false;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    const startPlaying = async () => {
      try {
        await video.play();
      } catch {
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    startPlaying();
    video.addEventListener('loadeddata', startPlaying);
    video.addEventListener('canplay', startPlaying);

    // Global listener for first click/tap to unmute and play with sound
    const handleFirstInteraction = async () => {
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

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    // Safety fallback: if video stalls or takes too long to load, auto-proceed into site
    const safetyTimer = setTimeout(() => {
      if (!hasEndedRef.current) {
        handleTriggerFadeIntoSite();
      }
    }, 8000);

    return () => {
      video.removeEventListener('loadeddata', startPlaying);
      video.removeEventListener('canplay', startPlaying);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      clearTimeout(safetyTimer);
    };
  }, [isOpen, handleTriggerFadeIntoSite]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || hasEndedRef.current) return;

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
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#121110] flex items-center justify-center overflow-hidden select-none cursor-pointer"
          onClick={handleContainerTap}
        >
          {/* Main Video Presentation Stage */}
          <div className="relative w-full h-full flex items-center justify-center p-0 md:p-4">
            <video
              ref={videoRef}
              src="/Envelope.mp4"
              autoPlay
              playsInline
              muted
              preload="auto"
              loop={false}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleTriggerFadeIntoSite}
              className={`w-auto h-full max-h-screen md:max-h-[92vh] max-w-full aspect-[9/16] object-contain transition-all duration-700 ${
                isFadingOut ? 'opacity-0 scale-[1.02]' : 'opacity-100'
              }`}
            >
              <source src="/Envelope.mp4" type="video/mp4" />
              <source src="/media/Envelope.mp4" type="video/mp4" />
            </video>

            {/* Discreet Skip Button */}
            <div className="absolute bottom-6 right-6 pointer-events-none z-30">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTriggerFadeIntoSite();
                }}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-[10px] font-sans tracking-[0.25em] uppercase transition-all cursor-pointer shadow-xl"
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
