import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

interface EnvelopeIntroProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const EnvelopeIntro = ({
  isOpen,
  onOpenInvitation,
}: EnvelopeIntroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt unmuted automatic playback on mount
  useEffect(() => {
    if (!isOpen) return;

    const startVideoWithAudio = async () => {
      const video = videoRef.current;
      if (!video) return;

      video.muted = false;
      video.volume = 1.0;

      try {
        await video.play();
        setIsPlaying(true);
        setNeedsGesture(false);
      } catch {
        // Browser requires a user gesture before starting unmuted audio
        setNeedsGesture(true);

        // One-time listener: any tap/touch immediately starts playback with sound
        const handleFirstInteraction = async () => {
          if (videoRef.current) {
            try {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              await videoRef.current.play();
              setIsPlaying(true);
              setNeedsGesture(false);
            } catch {
              // fallback
            }
          }
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction, { once: true });
        window.addEventListener('touchstart', handleFirstInteraction, { once: true });
      }
    };

    const timer = setTimeout(startVideoWithAudio, 100);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleTapToPlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1.0;
      await video.play();
      setIsPlaying(true);
      setNeedsGesture(false);
    } catch {
      try {
        await video.play();
        setIsPlaying(true);
        setNeedsGesture(false);
      } catch {
        // fallback
      }
    }
  };

  const handleTriggerFadeIntoSite = () => {
    setIsFadingOut(true);
    // Smooth transition into the wedding invitation site
    setTimeout(() => {
      onOpenInvitation();
    }, 500);
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
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#11100F] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Fullscreen Video Stage */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={needsGesture ? handleTapToPlay : undefined}
          >
            <video
              ref={videoRef}
              src="/media/Envelope.mp4"
              playsInline
              autoPlay
              preload="auto"
              loop={false}
              onEnded={handleTriggerFadeIntoSite}
              onPlay={() => setIsPlaying(true)}
              className={`w-full h-full object-contain max-h-screen transition-opacity duration-1000 ${
                isFadingOut ? 'opacity-0 scale-[1.03]' : 'opacity-100'
              }`}
            />

            {/* Gesture overlay if browser awaits tap to unseal with sound */}
            {needsGesture && !isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleTapToPlay}
                className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer text-white gap-4 z-20"
              >
                <button
                  type="button"
                  className="w-20 h-20 rounded-full bg-[#FAF8F3] text-[#1C1A18] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Open Invitation"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
                <div className="text-center space-y-1">
                  <p className="font-serif text-sm tracking-[0.25em] uppercase text-[#FAF8F3]">
                    Tap to Open Invitation
                  </p>
                  <p className="text-[10px] font-sans tracking-[0.2em] text-[#FAF8F3]/60 uppercase">
                    Unsealing with sound
                  </p>
                </div>
              </motion.div>
            )}

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
      )}
    </AnimatePresence>
  );
};
