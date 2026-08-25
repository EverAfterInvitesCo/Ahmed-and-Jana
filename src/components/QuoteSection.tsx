import { motion } from 'motion/react';
import { WeddingData } from '../types';

interface QuoteSectionProps {
  data: WeddingData;
  onUpdateQuote?: (quoteId: string) => void;
}

export const QuoteSection = ({ data }: QuoteSectionProps) => {
  const currentQuote =
    data.quotes.find((q) => q.id === 'quran-30-21') || data.quotes[0] || {
      arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
      text: '“And among His signs is that He created for you from yourselves spouses that you may find tranquility in them; and He placed between you affection and mercy.”',
      source: 'Surat Ar-Rum (30:21)',
    };

  return (
    <section 
      id="quote"
      className="py-24 sm:py-32 md:py-40 px-6 bg-[#FAF8F3] paper-grain relative overflow-hidden"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Quote Content Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 sm:space-y-10"
        >
          {/* Elegant subtle top ornament line */}
          <div className="flex items-center justify-center gap-3 opacity-40 mb-4">
            <span className="h-[1px] w-8 bg-[#B8A27A]" />
            <span className="text-[10px] tracking-[0.3em] font-serif italic text-[#B8A27A]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="h-[1px] w-8 bg-[#B8A27A]" />
          </div>

          {/* Arabic Calligraphy Typography */}
          {currentQuote.arabic && (
            <div className="px-4 sm:px-8">
              <p 
                dir="rtl"
                className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#252320]/90 leading-loose sm:leading-[2.4] tracking-wide select-none"
              >
                {currentQuote.arabic}
              </p>
            </div>
          )}

          {/* English Translation */}
          <div className="px-2 max-w-2xl mx-auto">
            <blockquote className="font-serif italic text-base sm:text-xl md:text-2xl text-[#252320]/85 leading-relaxed font-light">
              {currentQuote.text}
            </blockquote>
          </div>

          {/* Source Attribution */}
          <div className="pt-2">
            <span className="text-[10px] sm:text-xs font-sans tracking-[0.35em] text-[#B8A27A] uppercase font-medium">
              {currentQuote.source}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

