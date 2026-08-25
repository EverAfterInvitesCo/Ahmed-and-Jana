import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Download, Save, RefreshCw, Users } from 'lucide-react';
import { WeddingData, RsvpEntry } from '../types';
import { initialWeddingData } from '../data/weddingData';

interface EditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WeddingData;
  onSave: (newData: WeddingData) => void;
  rsvps: RsvpEntry[];
}

export const EditDetailsModal = ({
  isOpen,
  onClose,
  data,
  onSave,
  rsvps,
}: EditDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState<'general' | 'rsvps'>('general');
  const [formData, setFormData] = useState<WeddingData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all invitation details to original defaults?')) {
      setFormData(initialWeddingData);
      onSave(initialWeddingData);
      localStorage.removeItem('wedding_invitation_data');
    }
  };

  const exportRsvpsToCsv = () => {
    if (rsvps.length === 0) {
      alert('No RSVP responses received yet.');
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
          <div>
            <h3 className="text-lg font-serif tracking-wide text-[#252320]">
              Invitation Studio &amp; Guestlist
            </h3>
            <p className="text-[11px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase">
              Ahmed &amp; Jana — 21 January 2027
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#252320]/50 hover:text-[#252320] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-1" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DED0] bg-[#FAF8F3] px-6 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 font-sans tracking-[0.15em] uppercase border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'general'
                ? 'border-[#B8A27A] text-[#252320] font-medium'
                : 'border-transparent text-[#252320]/50 hover:text-[#252320]'
            }`}
          >
            Couple &amp; Date
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rsvps')}
            className={`py-3 px-4 font-sans tracking-[0.15em] uppercase border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rsvps'
                ? 'border-[#B8A27A] text-[#252320] font-medium'
                : 'border-transparent text-[#252320]/50 hover:text-[#252320]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>RSVP Responses ({rsvps.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Groom First Name
                  </label>
                  <input
                    type="text"
                    value={formData.groom.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, firstName: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Groom Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.groom.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        groom: { ...formData.groom, fullName: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Bride First Name
                  </label>
                  <input
                    type="text"
                    value={formData.bride.firstName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, firstName: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Bride Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.bride.fullName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bride: { ...formData.bride, fullName: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Wedding Day
                  </label>
                  <input
                    type="text"
                    value={formData.date.day}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: { ...formData.date, day: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Month
                  </label>
                  <input
                    type="text"
                    value={formData.date.month}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: { ...formData.date, month: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.date.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: { ...formData.date, year: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    Wedding Time
                  </label>
                  <input
                    type="text"
                    value={formData.date.time || '6:00 PM'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: { ...formData.date, time: e.target.value },
                      })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] text-[#B8A27A] uppercase mb-1">
                    RSVP Deadline
                  </label>
                  <input
                    type="text"
                    value={formData.rsvpDeadline}
                    onChange={(e) =>
                      setFormData({ ...formData, rsvpDeadline: e.target.value })
                    }
                    className="w-full border border-[#D8D0C5] bg-transparent p-2 text-sm font-serif outline-none focus:border-[#B8A27A]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rsvps' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-[#E8DED0]/30 border border-[#E8DED0]">
                <div>
                  <p className="text-xs font-sans text-[#252320]">
                    <span className="font-medium">Total Responses:</span> {rsvps.length} · <span className="font-medium">Confirmed Guests:</span> {attendingCount}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportRsvpsToCsv}
                  className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#252320] hover:text-[#B8A27A] border border-[#252320] px-3 py-1.5 uppercase font-medium cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>EXPORT TO CSV</span>
                </button>
              </div>

              {rsvps.length === 0 ? (
                <p className="text-center py-8 text-xs font-serif italic text-[#252320]/50">
                  No RSVP responses received yet.
                </p>
              ) : (
                <div className="divide-y divide-[#E8DED0] border border-[#E8DED0]">
                  {rsvps.map((entry) => (
                    <div key={entry.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-serif text-sm font-medium text-[#252320]">
                          {entry.guestName}
                        </p>
                        <p className="text-[11px] font-sans text-[#252320]/60">
                          {entry.attending ? `Attending (${entry.guestsCount} ${entry.guestsCount > 1 ? 'guests' : 'guest'})` : 'Declined'}
                          {entry.notes && ` — “${entry.notes}”`}
                        </p>
                      </div>
                      <span className="text-[10px] font-sans text-[#252320]/40">
                        {new Date(entry.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E8DED0] bg-[#FAF8F3]">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] text-[#252320]/50 hover:text-[#252320] uppercase cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[10px] font-sans tracking-[0.2em] text-[#252320]/60 hover:text-[#252320] uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-[#252320] hover:bg-[#B8A27A] text-[#FAF8F3] text-[10px] font-sans tracking-[0.25em] uppercase font-medium transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savedSuccess ? 'SAVED' : 'SAVE CHANGES'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
