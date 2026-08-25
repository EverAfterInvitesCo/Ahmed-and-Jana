import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import { WeddingData, RsvpEntry } from '../types';

interface RsvpSectionProps {
  data: WeddingData;
  onNewRsvp?: (entry: RsvpEntry) => void;
}

export const RsvpSection = ({ data, onNewRsvp }: RsvpSectionProps) => {
  const [guestName, setGuestName] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(true);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RsvpEntry | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || attending === null) return;

    const newEntry: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      guestName: guestName.trim(),
      guestsCount: attending ? Number(guestsCount) : 0,
      attending: attending,
      notes: notes.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      const updated = [newEntry, ...existing];
      localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (onNewRsvp) {
      onNewRsvp(newEntry);
    }

    setSubmittedData(newEntry);
    setSubmitted(true);
  };

  return (
    <section 
      id="rsvp"
      className="py-28 sm:py-36 md:py-48 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FAF8F3] border border-[#E8DED0] p-8 sm:p-12 md:p-16 shadow-[0_8px_30px_rgba(37,35,32,0.02)]"
        >
          {/* Subtle inside card border */}
          <div className="absolute inset-2 sm:inset-3 border border-[#E8DED0]/50 pointer-events-none" />

          {/* Card Heading */}
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light tracking-[0.08em] text-[#252320]">
              WILL YOU JOIN US?
            </h2>
            <p className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#B8A27A] uppercase mt-3 font-medium">
              Kindly confirm your attendance
            </p>
            <p className="text-[11px] font-sans text-[#252320]/45 mt-1">
              Please respond by {data.rsvpDeadline}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="rsvp-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Guest Name Input */}
                <div className="space-y-2">
                  <label 
                    htmlFor="guest-name" 
                    className="block text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/75 uppercase font-medium"
                  >
                    GUEST NAME(S) *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Mr. &amp; Mrs. Kareem Mansour"
                    className="w-full bg-transparent border-b border-[#D8D0C5] focus:border-[#B8A27A] py-2.5 px-1 text-sm sm:text-base font-serif text-[#252320] placeholder-[#252320]/30 outline-none transition-colors"
                  />
                </div>

                {/* Attendance Options */}
                <div className="space-y-3 pt-2">
                  <label className="block text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/75 uppercase font-medium">
                    ATTENDANCE *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending(true)}
                      className={`py-3 px-4 text-left border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        attending === true
                          ? 'border-[#252320] bg-[#E8DED0]/30 text-[#252320]'
                          : 'border-[#E8DED0] text-[#252320]/60 hover:border-[#D8D0C5]'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
                        JOYFULLY ACCEPTS
                      </span>
                      {attending === true && <Check className="w-3.5 h-3.5 text-[#B8A27A]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttending(false)}
                      className={`py-3 px-4 text-left border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        attending === false
                          ? 'border-[#252320] bg-[#E8DED0]/30 text-[#252320]'
                          : 'border-[#E8DED0] text-[#252320]/60 hover:border-[#D8D0C5]'
                      }`}
                    >
                      <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
                        REGRETFULLY DECLINES
                      </span>
                      {attending === false && <Check className="w-3.5 h-3.5 text-[#B8A27A]" />}
                    </button>
                  </div>
                </div>

                {/* Number of Guests (Only if attending) */}
                {attending === true && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 pt-2"
                  >
                    <label 
                      htmlFor="guests-count" 
                      className="block text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/75 uppercase font-medium"
                    >
                      NUMBER OF GUESTS
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestsCount(num)}
                          className={`flex-1 py-2 text-xs font-sans tracking-[0.1em] border transition-all cursor-pointer ${
                            guestsCount === num
                              ? 'border-[#252320] bg-[#252320] text-[#FAF8F3]'
                              : 'border-[#E8DED0] text-[#252320]/70 hover:border-[#D8D0C5]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Message / Dietary notes */}
                <div className="space-y-2 pt-2">
                  <label 
                    htmlFor="guest-notes" 
                    className="block text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320]/75 uppercase font-medium"
                  >
                    MESSAGE FOR THE COUPLE (OPTIONAL)
                  </label>
                  <textarea
                    id="guest-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dietary requests or warm wishes for Ahmed &amp; Jana..."
                    className="w-full bg-transparent border-b border-[#D8D0C5] focus:border-[#B8A27A] py-2 px-1 text-sm font-serif text-[#252320] placeholder-[#252320]/30 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Minimalist Submit Button */}
                <div className="pt-6 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3.5 border border-[#252320] hover:border-[#B8A27A] bg-[#252320] hover:bg-[#B8A27A] text-[#FAF8F3] transition-all duration-300 rounded-none cursor-pointer"
                  >
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase font-medium">
                      CONFIRM ATTENDANCE
                    </span>
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="rsvp-confirmation"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-10 h-10 rounded-full border border-[#B8A27A] flex items-center justify-center mx-auto text-[#B8A27A]">
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif text-[#252320]">
                    Thank You, {submittedData?.guestName}
                  </h3>
                  <p className="font-serif italic text-sm sm:text-base text-[#252320]/70">
                    {submittedData?.attending
                      ? 'Your response has been warmly received. Ahmed & Jana look forward to celebrating with you.'
                      : 'Your response has been noted with gratitude. You will be dearly missed.'}
                  </p>
                </div>

                <div className="p-4 border border-[#E8DED0] bg-[#FAF8F3] max-w-sm mx-auto text-left space-y-1">
                  <p className="text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">
                    CONFIRMATION DETAILS
                  </p>
                  <p className="text-xs font-sans text-[#252320]">
                    <span className="font-medium">Guest:</span> {submittedData?.guestName}
                  </p>
                  <p className="text-xs font-sans text-[#252320]">
                    <span className="font-medium">Status:</span> {submittedData?.attending ? `Attending (${submittedData.guestsCount} ${submittedData.guestsCount > 1 ? 'Guests' : 'Guest'})` : 'Declined'}
                  </p>
                  {submittedData?.notes && (
                    <p className="text-xs font-sans text-[#252320]/75 pt-1 italic">
                      "{submittedData.notes}"
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] font-sans tracking-[0.2em] text-[#252320]/60 hover:text-[#B8A27A] uppercase transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Edit Response
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
