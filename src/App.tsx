/**
 * Quiet Luxury Wedding Invitation
 * For AHMED ABO EL ELA & JANA MAGHRABY — 21 January 2027
 */

import { useState, useEffect } from 'react';
import { initialWeddingData } from './data/weddingData';
import { WeddingData, RsvpEntry } from './types';
import { HeaderNav } from './components/HeaderNav';
import { OpeningSection } from './components/OpeningSection';
import { InvitationSection } from './components/InvitationSection';
import { CountdownSection } from './components/CountdownSection';
import { QuoteSection } from './components/QuoteSection';
import { DateSection } from './components/DateSection';
import { RsvpSection } from './components/RsvpSection';
import { MusicPlayer } from './components/MusicPlayer';
import { FinalScene } from './components/FinalScene';
import { GuestlistModal } from './components/GuestlistModal';
import { EnvelopeIntro } from './components/EnvelopeIntro';

export default function App() {
  // Envelope intro overlay state: active when first visiting
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(true);

  // Global audio autoplay trigger helper
  useEffect(() => {
    const handleAutoPlayAudio = () => {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach((audio) => {
        audio.play().catch(() => {
          // Handled silently if browser policy restricts it until interaction
        });
      });
    };

    // Try immediately on load
    handleAutoPlayAudio();

    // Also attach a one-time global listener to guarantee soundtrack unlock on any initial movement
    const unlockHandler = () => {
      handleAutoPlayAudio();
      window.removeEventListener('click', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
    };

    window.addEventListener('click', unlockHandler);
    window.addEventListener('touchstart', unlockHandler);
    window.addEventListener('keydown', unlockHandler);

    return () => {
      window.removeEventListener('click', unlockHandler);
      window.removeEventListener('touchstart', unlockHandler);
      window.removeEventListener('keydown', unlockHandler);
    };
  }, []);

  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem('wedding_invitation_data');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return initialWeddingData;
  });

  const [rsvps, setRsvps] = useState<RsvpEntry[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out old test submissions and mock fixtures
          const cleaned = parsed.filter(
            (item: RsvpEntry) =>
              item &&
              item.guestName &&
              !item.guestName.toLowerCase().includes('test') &&
              !item.id?.startsWith('rsvp-1') &&
              !item.id?.startsWith('rsvp-2') &&
              !item.id?.startsWith('rsvp-3') &&
              !item.id?.startsWith('rsvp-4')
          );
          return cleaned;
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Keep localStorage sanitized
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (item: RsvpEntry) =>
              item &&
              item.guestName &&
              !item.guestName.toLowerCase().includes('test') &&
              !item.id?.startsWith('rsvp-1') &&
              !item.id?.startsWith('rsvp-2') &&
              !item.id?.startsWith('rsvp-3') &&
              !item.id?.startsWith('rsvp-4')
          );
          localStorage.setItem('wedding_rsvps', JSON.stringify(cleaned));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const [isGuestlistOpen, setIsGuestlistOpen] = useState(false);

  const handleClearGuestlist = () => {
    setRsvps([]);
    try {
      localStorage.setItem('wedding_rsvps', JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  const handleNewRsvp = (newEntry: RsvpEntry) => {
    setRsvps((prev) => {
      const updated = [newEntry, ...prev];
      try {
        localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleUpdateQuote = (quoteId: string) => {
    const updated = { ...weddingData, selectedQuoteId: quoteId };
    setWeddingData(updated);
    try {
      localStorage.setItem('wedding_invitation_data', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F3] text-[#252320] font-sans antialiased overflow-x-hidden selection:bg-[#E8DED0] selection:text-[#252320]">
      {/* Subtle fine paper texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#252320_1px,transparent_1px)] [background-size:16px_16px] z-50" />

      {/* Floating Header Navigation on Scroll */}
      <HeaderNav 
        data={weddingData} 
        onOpenGuestlist={() => setIsGuestlistOpen(true)} 
      />

      {/* Main Single Cinematic Continuous Invitation Stream */}
      <main className="relative z-10">
        {/* Section 1 — The Opening */}
        <OpeningSection data={weddingData} />

        {/* Section 2 — The Invitation Card */}
        <InvitationSection data={weddingData} />

        {/* Section 3 — The Live Countdown */}
        <CountdownSection data={weddingData} />

        {/* Section 4 — Surat Ar-Rum */}
        <QuoteSection data={weddingData} onUpdateQuote={handleUpdateQuote} />

        {/* Section 5 — The Date Dramatic Pause & Calendar */}
        <DateSection data={weddingData} />

        {/* Section 6 — RSVP Interactive Card */}
        <RsvpSection data={weddingData} onNewRsvp={handleNewRsvp} />

        {/* Section 7 — Final Scene */}
        <FinalScene 
          data={weddingData} 
          onOpenGuestlist={() => setIsGuestlistOpen(true)} 
        />
      </main>

      {/* Section 8 — Discreet Floating Classical Music Engine */}
      <MusicPlayer />

      {/* Intro Envelope Video Window with Smooth Crossfade */}
      <EnvelopeIntro
        isOpen={isEnvelopeOpen}
        data={weddingData}
        onOpenInvitation={() => setIsEnvelopeOpen(false)}
      />

      {/* Passcode-Protected Guestlist Responses & CSV Export Modal */}
      <GuestlistModal
        isOpen={isGuestlistOpen}
        onClose={() => setIsGuestlistOpen(false)}
        rsvps={rsvps}
        onClearAll={handleClearGuestlist}
      />
    </div>
  );
}