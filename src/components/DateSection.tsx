import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Check } from 'lucide-react';
import { WeddingData } from '../types';

interface DateSectionProps {
  data: WeddingData;
}

export const DateSection = ({ data }: DateSectionProps) => {
  const [calendarAdded, setCalendarAdded] = useState(false);

  const handleAddToCalendar = () => {
    const now = new Date();

    // Generate current timestamp for the iCalendar file
    const dtStamp = now
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');

    const groomName = `${data.groom.firstName} ${
      data.groom.lastName || ''
    }`.trim();

    const brideName = `${data.bride.firstName} ${
      data.bride.lastName || ''
    }`.trim();

    // Generate RFC 5545 compliant iCalendar (.ics) file
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//EverAfterInvites//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',

      'BEGIN:VEVENT',

      `UID:wedding-${data.groom.firstName.toLowerCase()}-${data.bride.firstName.toLowerCase()}-20270121@everafterinvites.com`,

      `DTSTAMP:${dtStamp}`,

      // Wedding date and time — Cairo local time
      'DTSTART;TZID=Africa/Cairo:20270121T180000',
      'DTEND;TZID=Africa/Cairo:20270122T000000',

      `SUMMARY:Wedding of ${data.groom.firstName} & ${data.bride.firstName}`,

      `DESCRIPTION:Join ${groomName} & ${brideName} in celebrating their wedding day.`,

      'LOCATION:Cairo, Egypt',

      'STATUS:CONFIRMED',
      'SEQUENCE:0',

      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    // Create the .ics file
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.groom.firstName}_and_${data.bride.firstName}_Wedding.ics`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

    // Show confirmation
    setCalendarAdded(true);

    setTimeout(() => {
      setCalendarAdded(false);
    }, 4000);
  };

  return (
    <section
      id="date-highlight"
      className="min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center text-center px-6 py-28 sm:py-36 md:py-44 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">

        {/* Enormous Serif Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 1.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="space-y-2 sm:space-y-4 select-none"
        >

          {/* Day number */}
          <div className="leading-none">
            <span className="text-8xl sm:text-9xl md:text-[13rem] lg:text-[15rem] font-serif font-light text-[#252320] tracking-tight block">
              {data.date.day}
            </span>
          </div>

          {/* Month */}
          <div className="leading-tight py-1">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-[0.25em] text-[#252320] uppercase block">
              {data.date.month}
            </span>
          </div>

          {/* Year */}
          <div className="leading-none pt-2">
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-[0.15em] text-[#B8A27A] block">
              {data.date.year}
            </span>
          </div>

          {/* Time Display */}
          <div className="pt-6 sm:pt-8">
            <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.35em] text-[#252320]/75 uppercase font-medium">
              {data.date.dayOfWeek} · {data.date.time || '6:00 PM'}
            </p>
          </div>
        </motion.div>

        {/* Calendar Add Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.3,
          }}
          className="mt-16 sm:mt-20 flex flex-col items-center"
        >
          <button
            type="button"
            onClick={handleAddToCalendar}
            className="group flex items-center gap-2.5 px-6 py-3 border border-[#E8DED0] hover:border-[#B8A27A] bg-[#FAF8F3] hover:bg-[#E8DED0]/30 transition-all duration-300 rounded-none cursor-pointer"
          >
            {calendarAdded ? (
              <Check className="w-3.5 h-3.5 text-[#B8A27A]" />
            ) : (
              <Calendar className="w-3.5 h-3.5 text-[#252320]/60 group-hover:text-[#B8A27A] transition-colors stroke-1" />
            )}

            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#252320] uppercase font-medium">
              {calendarAdded
                ? 'ADDED TO CALENDAR'
                : 'SAVE THE DATE'}
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};