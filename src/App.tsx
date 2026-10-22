/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { UnifiedHero } from './components/UnifiedHero';
import { WaterBackground } from './components/WaterBackground';
import { IslamicSlidesSection } from './components/IslamicSlidesSection';
import { IslamicSlideDetailPage } from './components/IslamicSlideDetailPage';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [openedSlideId, setOpenedSlideId] = useState<number | null>(null);

  // Sync with URL hash for seamless browser navigation (Back button on mobile/desktop)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#slide-')) {
        const num = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(num) && num >= 1 && num <= 4) {
          setOpenedSlideId(num - 1);
          return;
        }
      }
      setOpenedSlideId(null);
    };

    // Initial check
    handleHashCheck();

    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('popstate', handleHashCheck);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('popstate', handleHashCheck);
    };
  }, []);

  const handleOpenSlide = (id: number) => {
    setOpenedSlideId(id);
    window.location.hash = `slide-${id + 1}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToWebsite = () => {
    setOpenedSlideId(null);
    // Remove hash without adding unwanted history entry
    if (window.location.hash) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    // Scroll smoothly to the slide cards section
    setTimeout(() => {
      const el = document.getElementById('islamic-slides-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  // If a slide is opened, render the dedicated full-page reader with Back icon
  if (openedSlideId !== null) {
    return (
      <IslamicSlideDetailPage
        slideId={openedSlideId}
        onBack={handleBackToWebsite}
        onSelectSlide={(id) => handleOpenSlide(id)}
        language={language}
      />
    );
  }

  // Standard Website Home View: 4 slide cards without content underneath
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* Minimal clean header with 4px liquid water line */}
      <Navbar
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main Content: Starts immediately below the liquid line */}
      <main className="flex-1 flex flex-col">
        <UnifiedHero language={language} />
        
        {/* Animated Gradient Water Section starting 3 strokes after payment info */}
        <WaterBackground>
          <IslamicSlidesSection
            language={language}
            onOpenSlide={handleOpenSlide}
          />
          {/* Footer matching the water section */}
          <Footer language={language} />
        </WaterBackground>
      </main>
    </div>
  );
}
