import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        {/* Brand title restored back to original clean bold style */}
        <div className="relative flex flex-col">
          <a
            href="#"
            className="font-display text-lg font-bold tracking-tight text-zinc-950 transition-opacity hover:opacity-80"
          >
            Sumaiyah Binta
          </a>
        </div>

        {/* Language Switcher */}
        <button
          type="button"
          onClick={onToggleLanguage}
          className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-100"
          title="Toggle Language"
          aria-label="Toggle Bengali / English"
        >
          <Globe className="h-3.5 w-3.5 text-rose-600" />
          <span className="tabular-nums uppercase font-semibold">
            {language === 'bn' ? 'বাংলা' : 'EN'}
          </span>
        </button>
      </div>

      {/* 4px Liquid Glass Water Line */}
      <div className="relative w-full h-[4px] overflow-hidden bg-gradient-to-r from-sky-100/40 via-cyan-100/70 via-sky-200/80 via-white/95 via-sky-200/80 to-sky-100/40 shadow-[0_2px_8px_rgba(56,189,248,0.35),0_1px_3px_rgba(186,230,253,0.5)]">
        {/* Water Surface Tension Glassy Specular Highlight (Top 1.5px reflection) */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white via-cyan-100 to-transparent opacity-95 shadow-[0_1px_2px_rgba(255,255,255,0.9)]" />

        {/* Water Depth Tint (Bottom 1.5px refraction) */}
        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/30 via-cyan-400/35 to-transparent" />

        {/* Dynamic moving liquid glint reflection */}
        <div className="pointer-events-none absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/85 to-transparent blur-[0.5px] animate-liquid-glint" />
      </div>
    </header>
  );
};
