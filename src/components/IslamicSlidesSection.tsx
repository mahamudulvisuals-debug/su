import React from 'react';
import {
  BookOpen,
  Sparkles,
  Compass,
  ScrollText,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface IslamicSlidesSectionProps {
  language?: Language;
  onOpenSlide: (slideId: number) => void;
}

export const IslamicSlidesSection: React.FC<IslamicSlidesSectionProps> = ({
  onOpenSlide
}) => {
  // 4 concise slide cards in a 2x2 grid
  // Elevated, chunky 3D drop shadow style with rich professional colors
  const slideTabs = [
    {
      id: 0,
      title: 'নবীজীর (সাঃ) সীরাত',
      icon: Compass,
      cardGradient:
        'bg-gradient-to-br from-[#064e3b] via-[#022c22] to-[#01140e] border-2 border-emerald-400/90 border-b-[6px] border-b-emerald-400 shadow-[0_16px_32px_-4px_rgba(16,185,129,0.35),0_8px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_38px_-4px_rgba(16,185,129,0.5),0_10px_20px_rgba(0,0,0,0.7)]',
      iconStyle: 'bg-emerald-500/30 text-emerald-200 border-2 border-emerald-400/70 shadow-sm',
      openBtnStyle: 'bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black shadow-md border border-emerald-200'
    },
    {
      id: 1,
      title: '২০+ ইসলামিক উপন্যাস',
      icon: BookOpen,
      cardGradient:
        'bg-gradient-to-br from-[#78350f] via-[#451a03] to-[#1a0800] border-2 border-amber-400/90 border-b-[6px] border-b-amber-400 shadow-[0_16px_32px_-4px_rgba(245,158,11,0.35),0_8px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_38px_-4px_rgba(245,158,11,0.5),0_10px_20px_rgba(0,0,0,0.7)]',
      iconStyle: 'bg-amber-500/30 text-amber-200 border-2 border-amber-400/70 shadow-sm',
      openBtnStyle: 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-black shadow-md border border-amber-200'
    },
    {
      id: 2,
      title: '১০০টি মাসনূন দোয়া ও সূরা',
      icon: ScrollText,
      cardGradient:
        'bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617] border-2 border-indigo-400/90 border-b-[6px] border-b-indigo-400 shadow-[0_16px_32px_-4px_rgba(99,102,241,0.35),0_8px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_38px_-4px_rgba(99,102,241,0.5),0_10px_20px_rgba(0,0,0,0.7)]',
      iconStyle: 'bg-indigo-500/30 text-indigo-200 border-2 border-indigo-400/70 shadow-sm',
      openBtnStyle: 'bg-indigo-400 hover:bg-indigo-300 text-stone-950 font-black shadow-md border border-indigo-200'
    },
    {
      id: 3,
      title: 'ডিজিটাল জিকির গণনা',
      icon: Sparkles,
      cardGradient:
        'bg-gradient-to-br from-[#0e7490] via-[#083344] to-[#02181f] border-2 border-cyan-400/90 border-b-[6px] border-b-cyan-400 shadow-[0_16px_32px_-4px_rgba(6,182,212,0.35),0_8px_16px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_38px_-4px_rgba(6,182,212,0.5),0_10px_20px_rgba(0,0,0,0.7)]',
      iconStyle: 'bg-cyan-500/30 text-cyan-200 border-2 border-cyan-400/70 shadow-sm',
      openBtnStyle: 'bg-cyan-400 hover:bg-cyan-300 text-stone-950 font-black shadow-md border border-cyan-200'
    }
  ];

  return (
    <section id="islamic-slides-section" className="relative pt-2 pb-6 text-zinc-100">
      <div className="mx-auto max-w-2xl px-3 sm:px-6">
        
        {/* Compact, refined header from user's image with smaller elegant typography */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs font-serif tracking-wider shadow-md mb-1.5">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <h2 className="text-sm min-[380px]:text-base sm:text-lg font-black text-white tracking-wide leading-snug">
            ইসলামিক জ্ঞান ও ইতিহাস মহাকাব্য সম্ভার
          </h2>
          <p className="text-[11px] sm:text-xs text-cyan-200/80 font-medium max-w-md mx-auto leading-relaxed mt-0.5">
            ওয়েবসাইটে বসেই প্রতিটি স্লাইড ও ২০+ উপন্যাস সুন্দরভাবে সম্পূর্ণ পড়ার বিশেষ প্রিমিয়াম সংস্করণ
          </p>
        </div>

        {/* 2x2 Grid: Elevated thick tactile 3D cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {slideTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <div
                key={tab.id}
                onClick={() => onOpenSlide(tab.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenSlide(tab.id);
                  }
                }}
                className={`group relative text-left p-3 sm:p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1 active:translate-y-0.5 ${tab.cardGradient}`}
              >
                {/* Top: Small Icon + Topic Name */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span
                    className={`inline-flex items-center justify-center p-1.5 sm:p-2 rounded-xl transition-transform duration-200 group-hover:scale-110 shrink-0 ${tab.iconStyle}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>

                  <h3 className="font-black text-xs sm:text-sm text-white group-hover:text-amber-200 transition-colors leading-tight line-clamp-1 drop-shadow-sm">
                    {tab.title}
                  </h3>
                </div>

                {/* Bottom Line: ৳১ on left, 'ওপেন' with entry arrow on right */}
                <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
                  {/* Price */}
                  <span className="font-mono text-xs sm:text-sm font-black text-amber-300 tracking-wide drop-shadow-sm">
                    ৳১
                  </span>

                  {/* Open button */}
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl text-[11px] sm:text-xs transition-transform duration-150 group-hover:scale-105 active:scale-95 cursor-pointer ${tab.openBtnStyle}`}
                  >
                    <span>ওপেন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
