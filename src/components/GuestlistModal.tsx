import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { X, Download, Users, Lock, Trash2, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { RsvpEntry } from '../types';

interface GuestlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvps: RsvpEntry[];
  onClearAll?: () => void;
}

const FIXED_PASSCODE = 'AJ2027';

export const GuestlistModal = ({
  isOpen,
  onClose,
  rsvps,
  onClearAll,
}: GuestlistModalProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);

  // Reset inputs when opened or closed
  useEffect(() => {
    if (isOpen) {
      setPasscodeInput('');
      setErrorMessage('');
    } else {
      // Re-lock whenever modal closes for security & privacy
      setIsUnlocked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle single-step unlock attempt with fixed passcode AJ2027
  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const cleanPasscode = passcodeInput.trim();
    if (!cleanPasscode) {
      setErrorMessage('Please enter the passcode');
      return;
    }

    if (cleanPasscode === FIXED_PASSCODE) {
      setIsUnlocked(true);
      setErrorMessage('');
      setPasscodeInput('');
    } else {
      setErrorMessage('Incorrect passcode. Please try again.');
    }
  };

  const handleClearAllGuests = () => {
    if (window.confirm('Are you sure you want to clear all guest RSVP submissions from the list?')) {
      if (onClearAll) {
        onClearAll();
      }
    }
  };

  const exportRsvpsToCsv = () => {
    if (rsvps.length === 0) {
      alert('No RSVP submissions to export yet.');
      return;
    }

    const headers = ['Guest Name', 'Attending', 'Number of Guests', 'Notes', 'Date Submitted'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.attending ? 'Yes' : 'No',
      r.guestsCount,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      new Date(r.submittedAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ahmed_and_Jana_RSVP_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const attendingCount = rsvps.filter((r) => r.attending).reduce((sum, r) => sum + r.guestsCount, 0);
  const declinedCount = rsvps.filter((r) => !r.attending).length;

  return (
    <div className="fixed inset-0 z-50 bg-[#252320]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#FAF8F3] border border-[#E8DED0] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DED0] bg-[#FAF8F3]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#E8DED0]/50 border border-[#D8D0C5] text-[#252320]">
              {isUnlocked ? <Users className="w-4 h-4" /> : <Lock className="w-4 h-4 text-[#B8A27A]" />}
            </div>
            <div>
              <h3 className="text-lg font-serif tracking-wide text-[#252320]">
                Private RSVP Guestlist
              </h3>
              <p className="text-[11px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">
                {isUnlocked ? 'Ahmed & Jana — Access Granted' : 'Passcode Protected'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#252320]/50 hover:text-[#252320] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-1" />
          </button>
        </div>

        {/* View 1: Passcode Entry Screen */}
        {!isUnlocked && (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#E8DED0]/40 border border-[#D8D0C5] flex items-center justify-center mx-auto text-[#B8A27A]">
              <Lock className="w-6 h-6 stroke-1" />
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-xl text-[#252320]">
                Enter Couple Passcode
              </h4>
              <p className="text-xs font-sans text-[#252320]/60 leading-relaxed">
                Enter the passcode to view real-time RSVP submissions and export to CSV.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 text-left pt-2">
              <div>
                <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                  Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter passcode"
                    className="w-full border border-[#D8D0C5] bg-transparent p-3 pr-10 text-sm font-sans outline-none focus:border-[#B8A27A]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#252320]/40 hover:text-[#252320]"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-700 font-sans">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#252320] hover:bg-[#B8A27A] text-[#FAF8F3] text-xs font-sans tracking-[0.25em] uppercase font-medium transition-colors cursor-pointer"
              >
                UNLOCK GUESTLIST
              </button>
            </form>
          </div>
        )}

        {/* View 2: Unlocked RSVP List Screen */}
        {isUnlocked && (
          <>
            {/* Security banner */}
            <div className="px-6 py-3 bg-[#E8DED0]/25 border-b border-[#E8DED0] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-sans text-[11px] font-medium tracking-wide">Passcode Protected &amp; Verified</span>
              </div>
            </div>

            {/* Attendance metrics */}
            <div className="p-6 border-b border-[#E8DED0] bg-[#FAF8F3] space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 border border-[#E8DED0] bg-[#FAF8F3] text-center">
                  <p className="text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">Total Responses</p>
                  <p className="text-xl font-serif font-medium text-[#252320] mt-1">{rsvps.length}</p>
                </div>
                <div className="p-3 border border-[#E8DED0] bg-[#FAF8F3] text-center">
                  <p className="text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">Confirmed Attending</p>
                  <p className="text-xl font-serif font-medium text-[#252320] mt-1">{attendingCount}</p>
                </div>
                <div className="p-3 border border-[#E8DED0] bg-[#FAF8F3] text-center">
                  <p className="text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">Declined</p>
                  <p className="text-xl font-serif font-medium text-[#252320] mt-1">{declinedCount}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <span className="text-xs font-sans text-[#252320]/60">
                  {rsvps.length === 0
                    ? 'Guest list is empty and ready for incoming RSVPs.'
                    : 'Live RSVP attendance submissions'}
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {rsvps.length > 0 && onClearAll && (
                    <button
                      type="button"
                      onClick={handleClearAllGuests}
                      className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.15em] text-[#252320]/50 hover:text-red-700 border border-transparent hover:border-red-200 px-3 py-1.5 uppercase font-medium transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear List</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={exportRsvpsToCsv}
                    className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#252320] hover:text-[#B8A27A] border border-[#252320] hover:border-[#B8A27A] px-3.5 py-1.5 uppercase font-medium transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>EXPORT CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* List entries */}
            <div className="p-6 overflow-y-auto max-h-[45vh] space-y-3">
              {rsvps.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="font-serif text-base text-[#252320]/75">
                    No RSVP submissions yet
                  </p>
                  <p className="text-xs font-sans text-[#252320]/45 max-w-sm mx-auto">
                    When guests complete the RSVP form on the website, their response, guest count, and note will be securely logged here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8DED0] border border-[#E8DED0]">
                  {rsvps.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#E8DED0]/20 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-serif text-sm font-medium text-[#252320]">
                            {entry.guestName}
                          </p>
                          <span
                            className={`text-[9px] font-sans tracking-[0.15em] uppercase px-2 py-0.5 border ${
                              entry.attending
                                ? 'border-emerald-700/30 text-emerald-800 bg-emerald-50/50'
                                : 'border-[#252320]/20 text-[#252320]/60'
                            }`}
                          >
                            {entry.attending
                              ? `Attending (${entry.guestsCount} ${entry.guestsCount > 1 ? 'Guests' : 'Guest'})`
                              : 'Declined'}
                          </span>
                        </div>
                        {entry.notes && (
                          <p className="text-[11px] font-serif italic text-[#252320]/75">
                            “{entry.notes}”
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] font-sans tracking-[0.1em] text-[#252320]/40 shrink-0">
                        {new Date(entry.submittedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8DED0] bg-[#FAF8F3]">
              <button
                type="button"
                onClick={() => setIsUnlocked(false)}
                className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#252320]/60 hover:text-[#252320] uppercase cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Lock Modal</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-[#252320] hover:bg-[#B8A27A] text-[#FAF8F3] text-[10px] font-sans tracking-[0.25em] uppercase font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
