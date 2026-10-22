
import React, { useState } from 'react';
import { Language } from '../types';
import { ArrowUp, Heart, Copy, Check, MessageCircle } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '01916027243';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <footer className="border-t border-zinc-800 bg-black py-8 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Payment Methods & Contact Row */}
        <div className="flex flex-col gap-6 mb-8">
           {/* Payment Methods */}
           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
               <span className="font-bold text-white">
                  <span className="text-[#F26522]">{language === 'bn' ? 'নগদ' : 'Nagad'}</span>{' '}
                  <span className="text-[#E2136E]">{language === 'bn' ? 'বিকাশ' : 'bKash'}</span>{' '}
                  <span className="text-[#0072bc]">{language === 'bn' ? 'রকেট' : 'Rocket'}</span>
                  {' '}{phoneNumber}
                </span>
                <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
           </div>

           {/* Contact */}
           <div className="flex justify-end items-center gap-1">
             <span className="text-sm">{language === 'bn' ? 'যোগাযোগ মাধ্যম:' : 'Contact Method:'}</span>
             <a href={`https://wa.me/88${phoneNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-emerald-500 font-bold">
               <MessageCircle className="w-5 h-5" /> WhatsApp
             </a>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row pt-8 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span className="font-display text-sm font-bold text-white tracking-tight">
              Sumaiyah Binta
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>© {new Date().getFullYear()} Sumaiyah Binta. All rights reserved.</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs hover:bg-zinc-800 transition-colors"
            >
              <span>{language === 'bn' ? 'শীর্ষে' : 'Top'}</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
