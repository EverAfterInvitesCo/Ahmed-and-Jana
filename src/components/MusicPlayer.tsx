import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientMusicEngine } from '../utils/audioEngine';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = async () => {
    const active = ambientMusicEngine.toggle();
    setIsPlaying(active);
  };

  // Automatically start ambient soundtrack when user interacts with the page (click, touch, scroll)
  useEffect(() => {
    let started = false;

    const startAudioSafely = async () => {
      if (started) return;
      try {
        const success = await ambientMusicEngine.start();
        if (success) {
          started = true;
          setIsPlaying(true);
          cleanup();
        }
      } catch {
        // Retry on next interaction
      }
    };

    const cleanup = () => {
      window.removeEventListener('click', startAudioSafely);
      window.removeEventListener('touchstart', startAudioSafely);
      window.removeEventListener('scroll', startAudioSafely);
      window.removeEventListener('keydown', startAudioSafely);
    };

    // Try starting immediately
    startAudioSafely();

    // Attach listeners to trigger on any interaction
    window.addEventListener('click', startAudioSafely, { passive: true });
    window.addEventListener('touchstart', startAudioSafely, { passive: true });
    window.addEventListener('scroll', startAudioSafely, { passive: true });
    window.addEventListener('keydown', startAudioSafely, { passive: true });

    return cleanup;
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative flex items-center">
        {/* Discreet Floating Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
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
