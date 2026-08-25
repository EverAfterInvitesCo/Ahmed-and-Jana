import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientMusicEngine } from '../utils/audioEngine';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const togglePlay = async () => {
    setHasInteracted(true);
    const active = ambientMusicEngine.toggle();
    setIsPlaying(active);
  };

  // Attempt gentle autoplay on user's first scroll/click if browser allows
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasInteracted) {
        // We do not force audio until user taps the button or acknowledges
      }
    };
    window.addEventListener('click', handleFirstGesture, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstGesture);
    };
  }, [hasInteracted]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative flex items-center gap-2">
        {/* Subtle Tooltip on hover */}
        {showTooltip && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#252320] text-[#FAF8F3] text-[10px] font-sans tracking-[0.2em] uppercase px-3 py-1.5 shadow-lg border border-[#FAF8F3]/10 pointer-events-none">
            {isPlaying ? 'PAUSE AMBIENT SOUNDTRACK' : 'PLAY ROMANTIC PIANO & STRINGS'}
          </div>
        )}

        {/* Discreet Floating Button */}
        <button
          type="button"
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={isPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 bg-[#FAF8F3]/90 backdrop-blur-md border border-[#D8D0C5]/80 hover:border-[#B8A27A] text-[#252320] shadow-[0_4px_20px_rgba(37,35,32,0.06)] transition-all duration-300 rounded-full cursor-pointer"
        >
          {isPlaying ? (
            <>
              {/* Minimal Waveform animation */}
              <div className="flex items-center gap-[2px] h-3">
                <span className="w-[1.5px] h-2.5 bg-[#B8A27A] animate-pulse" style={{ animationDuration: '0.8s' }} />
                <span className="w-[1.5px] h-3.5 bg-[#B8A27A] animate-pulse" style={{ animationDuration: '1.2s' }} />
                <span className="w-[1.5px] h-1.5 bg-[#B8A27A] animate-pulse" style={{ animationDuration: '0.6s' }} />
                <span className="w-[1.5px] h-3 bg-[#B8A27A] animate-pulse" style={{ animationDuration: '1.0s' }} />
              </div>
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-[#252320] uppercase font-medium">
                SOUND ON
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#252320]/60 group-hover:text-[#B8A27A] transition-colors stroke-1" />
              <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] text-[#252320]/60 group-hover:text-[#252320] uppercase font-normal">
                MUSIC
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
