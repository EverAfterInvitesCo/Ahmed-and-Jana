import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface CountdownSectionProps {
  data: WeddingData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection = ({ data }: CountdownSectionProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Default to 21 Jan 2027 18:00
      const targetDate = new Date(data.date.iso).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [data.date.iso]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section 
      id="countdown"
      className="py-24 sm:py-32 md:py-40 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-14 sm:mb-20"
        >
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
            UNTIL WE SAY “I DO”
          </span>
        </motion.div>

        {/* 4 Elegant Columns */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 items-center justify-center max-w-3xl mx-auto"
        >
          {units.map((unit, index) => (
            <div key={unit.label} className="flex flex-col items-center relative">
              {/* Optional divider for desktop between columns */}
              {index < units.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-[#E8DED0]" />
              )}
              
              <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#252320] tracking-tight tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-[#252320]/60 uppercase mt-2 sm:mt-3 font-normal">
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Quiet Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-xs sm:text-sm font-sans tracking-[0.2em] text-[#252320]/45 uppercase mt-16 sm:mt-20 font-light"
        >
          {data.date.dayOfWeek}, {data.date.fullDateDisplay} · {data.date.time || '6:00 PM'}
        </motion.p>
      </div>
    </section>
  );
};
