import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Play } from 'lucide-react';

interface EnvelopeIntroProps {
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const EnvelopeIntro = ({
  isOpen,
  onOpenInvitation,
}: EnvelopeIntroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUserTap, setNeedsUserTap] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt autoplay when intro opens
  useEffect(() => {
    if (!isOpen) return;

    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
          setIsPlaying(true);
          setNeedsUserTap(false);
        } catch {
          // If browser blocked unmuted autoplay, try muted autoplay first
          if (videoRef.current) {
            try {
              videoRef.current.muted = true;
              setIsMuted(true);
              await videoRef.current.play();
              setIsPlaying(true);
              setNeedsUserTap(false);
            } catch {
              // If fully blocked, show clean tap-to-play overlay
              setNeedsUserTap(true);
            }
          }
        }
      }
    };

    const timer = setTimeout(() => {
      playVideo();
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setNeedsUserTap(false);
        })
        .catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play();
            setIsPlaying(true);
            setNeedsUserTap(false);
          }
        });
    }
  };

  const handleVideoEnded = () => {
    // Automatically transition to the scroll website when the video finishes
    onOpenInvitation();
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="envelope-intro-window"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] bg-[#11100F] flex items-center justify-center overflow-hidden"
      >
        {/* Fullscreen Video Element */}
        <div className="relative w-full h-full flex items-center justify-center">
          <video
            ref={videoRef}
            src="/media/Envelope.mp4"
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            onClick={needsUserTap ? handleManualPlay : undefined}
            className="w-full h-full object-contain max-h-screen"
          />

          {/* Minimalist Tap to Play Overlay if blocked by browser */}
          {needsUserTap && !isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleManualPlay}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer text-white gap-4 z-20"
            >
              <button
                type="button"
                className="w-20 h-20 rounded-full bg-[#FAF8F3] text-[#1C1A18] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
              <p className="font-serif text-sm tracking-[0.25em] uppercase text-[#FAF8F3]">
                Tap to Open Invitation
              </p>
            </motion.div>
          )}

          {/* Discreet Controls in bottom corners */}
          <div className="absolute bottom-6 inset-x-6 flex items-center justify-between pointer-events-none z-30">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="pointer-events-auto p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Skip to scroll site */}
            <button
              type="button"
              onClick={onOpenInvitation}
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
