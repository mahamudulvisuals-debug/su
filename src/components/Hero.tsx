import React from 'react';
import { Language } from '../types';
import { Heart, Sparkles, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';

interface HeroProps {
  language: Language;
  onExploreSlides: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onExploreSlides,
  onContactClick,
}) => {
  const memoryImage = '/src/assets/images/sumaiyah_father_memory_1792427059045.jpg';

  return (
    <section className="relative overflow-hidden border-b border-rose-100/60 bg-gradient-to-b from-white via-rose-50/20 to-white py-12 sm:py-20 lg:py-24 text-zinc-900">
      {/* Subtle warm emotional glow in backdrop */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
        <div className="h-[550px] w-[550px] rounded-full bg-rose-200/30 blur-[150px]" />
        <div className="h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Touching Animated Art of Sumaiyah remembering her father */}
          <div className="lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-rose-200/70 bg-white p-2.5 shadow-2xl shadow-rose-900/10 transition-all duration-500 hover:shadow-rose-900/20">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={memoryImage}
                  alt="সুমাইয়া তার বাবার স্মৃতির কথা মনে করছে"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                {/* Gentle ambient gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                {/* Subtle emotional caption badge on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/60 px-3.5 py-2 text-xs text-white backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-2">
                    <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400 animate-pulse" />
                    <span className="font-medium text-[11px] sm:text-xs">
                      {language === 'bn' ? 'বাবার স্মৃতি ও মায়ের সুস্থতার প্রার্থনা' : 'In loving memory of my father'}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-200 font-semibold">সুমাইয়া</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact heartfelt message with bold, prominent typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline / Kicker */}
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{language === 'bn' ? 'একটি বিনীত আবেদন' : 'A Humble Appeal'}</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span className="text-zinc-500">{language === 'bn' ? 'সুমাইয়া বিনতা' : 'Sumaiyah Binta'}</span>
            </div>

            {/* Bold, prominent message exactly as requested */}
            <div className="rounded-2xl border border-rose-100 bg-white/90 p-6 sm:p-8 shadow-lg shadow-rose-900/5 backdrop-blur-sm">
              <p className="font-display text-lg font-bold leading-relaxed text-zinc-950 sm:text-2xl lg:text-[23px] text-balance">
                {language === 'bn' ? (
                  <>
                    "আমি সুমাইয়া। আব্বু নেই, আম্মু অসুস্থ। অর্থের অভাবে আম্মুর চিকিৎসা ও আমার পড়াশোনা চালিয়ে যেতে পারছি না। অনেক স্বপ্ন আর কষ্ট নিয়ে স্লাইডগুলো তৈরি করেছি। আপনি স্লাইডগুলো কিনলে আম্মুর চিকিৎসা আর আমার পড়াশোনা চালিয়ে যেতে অনেক সাহায্য হবে। 🥺💝"
                  </>
                ) : (
                  <>
                    "I am Sumaiyah. My father has passed away, and my mother is ill. Due to financial hardship, I am struggling to afford my mother's treatment and continue my education. I crafted these presentation slides with immense dedication and dreams. If you purchase these slides, it will help my mother's medical care and support my studies. 🥺💝"
                  </>
                )}
              </p>

              {/* Sub-points highlighting the dignified effort */}
              <div className="mt-6 grid grid-cols-1 gap-3 border-t border-rose-100 pt-5 sm:grid-cols-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="font-medium">
                    {language === 'bn' ? '১০০% প্রফেশনাল প্রেজেন্টেশন স্লাইড' : '100% Professional Slide Packs'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="font-medium">
                    {language === 'bn' ? 'সরাসরি আম্মুর চিকিৎসার তহবিলে যুক্ত' : 'Directly aids mother’s medical care'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreSlides}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-rose-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-rose-700 active:scale-95 shadow-lg shadow-rose-600/25"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>
                  {language === 'bn' ? 'স্লাইডগুলো দেখুন ও পাশে দাঁড়ান' : 'View Slide Packs & Support'}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50 active:scale-95 shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>
                  {language === 'bn' ? 'সরাসরি সুমাইয়ার সাথে যোগাযোগ' : 'Contact Directly'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
