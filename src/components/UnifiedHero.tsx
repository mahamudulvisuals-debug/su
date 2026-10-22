import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface UnifiedHeroProps {
  language: Language;
}

export const UnifiedHero: React.FC<UnifiedHeroProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '01916027243';

  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phoneNumber);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section className="bg-white text-zinc-900 pt-[4px] pb-3">
      <div className="mx-auto w-full max-w-2xl px-3 sm:px-6">
        <div className="w-full text-left mt-0">
          
          {/* Top Row: Exactly 3 lines on the left, Image on the right - flush start and end */}
          <div className="flex flex-row items-stretch gap-2.5 sm:gap-3.5 w-full">
            {/* The 3 lines of text */}
            <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              {language === 'bn' ? (
                <>
                  {/* Line 1: Flush left to right */}
                  <div className="flex justify-between items-baseline w-full font-display text-[14px] min-[380px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span>আমি</span>
                    <span>সুমাইয়া।</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">আমার</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">আব্বু</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">মারা</span>
                  </div>

                  {/* Line 2: Flush left to right */}
                  <div className="flex justify-between items-baseline w-full font-display text-[14px] min-[380px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">গেছেন,</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">আম্মু</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">অসুস্থ।</span>
                    <span>অর্থের</span>
                    <span>অভাবে</span>
                  </div>

                  {/* Line 3: Flush left to right */}
                  <div className="flex justify-between items-baseline w-full font-display text-[14px] min-[380px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span>আম্মুর</span>
                    <span>চিকিৎসা</span>
                    <span>ও</span>
                    <span>আমার</span>
                    <span>পড়াশোনা</span>
                  </div>
                </>
              ) : (
                <>
                  {/* English Line 1 */}
                  <div className="flex justify-between items-baseline w-full font-display text-[13.5px] min-[380px]:text-[14px] sm:text-[16px] md:text-[18px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span>I</span>
                    <span>am</span>
                    <span>Sumaiyah.</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">My</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">father</span>
                  </div>

                  {/* English Line 2 */}
                  <div className="flex justify-between items-baseline w-full font-display text-[13.5px] min-[380px]:text-[14px] sm:text-[16px] md:text-[18px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">has</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">passed</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">away,</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">and</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">my</span>
                  </div>

                  {/* English Line 3 */}
                  <div className="flex justify-between items-baseline w-full font-display text-[13.5px] min-[380px]:text-[14px] sm:text-[16px] md:text-[18px] font-bold sm:font-extrabold text-zinc-950 leading-snug">
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">mother</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">is</span>
                    <span className="text-rose-700 underline decoration-rose-300 decoration-2 underline-offset-2">ill.</span>
                    <span>Due</span>
                    <span>to</span>
                  </div>
                </>
              )}
            </div>

            {/* Image placed directly beside the first 3 lines, matched height */}
            <div className="w-[112px] min-[390px]:w-[124px] min-[410px]:w-[136px] sm:w-[160px] md:w-[190px] shrink-0 overflow-hidden rounded-xl border border-zinc-200/90 shadow-sm bg-zinc-100 self-stretch flex items-center">
              <img
                src="/assets/aistudio/image_c616f8cd.png"
                alt="স্মৃতি"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl block"
              />
            </div>
          </div>

          {/* Bottom section: Spans 100% full width directly under the image and top lines without any gaps */}
          <div className="mt-1 sm:mt-1.5 w-full [text-shadow:0_1px_2px_rgba(0,0,0,0.15)]">
            <p
              className="font-display text-[14px] min-[380px]:text-[14.5px] sm:text-[16.5px] md:text-[18.5px] font-bold sm:font-extrabold leading-[1.62] sm:leading-[1.68] text-zinc-950 text-justify"
              style={{
                textJustify: 'inter-word',
                textAlignLast: 'left',
              }}
            >
              {language === 'bn' ? (
                <>
                  চালিয়ে যেতে পারছি না। অনেক স্বপ্ন আর কষ্ট করে স্লাইডগুলো তৈরি করেছি।{' '}
                  <span className="text-rose-700 font-bold sm:font-extrabold">
                    আপনি স্লাইডগুলো কিনলে আম্মুর চিকিৎসা আর আমার পড়াশোনা চালিয়ে যেতে অনেক সাহায্য হবে। 🥺💝
                  </span>
                </>
              ) : (
                <>
                  financial hardship, I cannot continue her medical treatment and my studies. I created these slides with dreams and dedication.{' '}
                  <span className="text-rose-700 font-bold sm:font-extrabold">
                    Purchasing them will support my mother's treatment and my studies. 🥺💝
                  </span>
                </>
              )}
            </p>
          </div>

          {/* bKash, Clickable Number with Copy Icon, Nagad - Clean row without outer large card */}
          <div className="mt-2.5 w-full flex items-center justify-between gap-1.5 sm:gap-2">
            
            {/* Left Side: বিকাশ in official bKash account color */}
            <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-[#E2136E] text-white font-bold text-xs sm:text-sm shadow-xs shrink-0 select-none">
              <span>{language === 'bn' ? 'বিকাশ' : 'bKash'}</span>
            </div>

            {/* Center: Number (clickable to copy) + Small Copy Icon button (no 'কপি' text) */}
            <div className="relative flex items-center justify-center">
              <button
                type="button"
                onClick={handleCopy}
                className="group inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg hover:bg-zinc-100 active:scale-95 transition-all cursor-pointer select-none"
                title={language === 'bn' ? 'কপি করতে নাম্বারে বা আইকনে ক্লিক করুন' : 'Click number or icon to copy'}
                aria-label={`Copy phone number ${phoneNumber}`}
              >
                {/* Clickable Number */}
                <span className="font-mono text-[16px] min-[380px]:text-[17.5px] sm:text-lg md:text-xl font-black tracking-wider text-zinc-950 group-hover:text-rose-600 transition-colors">
                  {phoneNumber}
                </span>

                {/* Small Copy Icon only (no text) */}
                <span
                  className={`inline-flex items-center justify-center p-1 sm:p-1.5 rounded-md border transition-all ${
                    copied
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-zinc-100 group-hover:bg-rose-50 text-zinc-700 group-hover:text-rose-600 border-zinc-200'
                  }`}
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600 group-hover:text-rose-600 stroke-[2]" />
                  )}
                </span>
              </button>

              {/* Floating notification badge upon copying */}
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-md whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-90 duration-150">
                  {language === 'bn' ? '✓ কপি হয়েছে' : '✓ Copied'}
                </span>
              )}
            </div>

            {/* Right Side: নগদ in official Nagad account color */}
            <div className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg bg-[#F26522] text-white font-bold text-xs sm:text-sm shadow-xs shrink-0 select-none">
              <span>{language === 'bn' ? 'নগদ' : 'Nagad'}</span>
            </div>

          </div>

          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
};
