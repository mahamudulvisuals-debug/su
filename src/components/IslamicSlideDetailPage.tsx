import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  ScrollText,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Search,
  RotateCcw,
  ListFilter,
  Volume2,
  VolumeX,
  Square,
  Play
} from 'lucide-react';
import {
  seeratChapters,
  islamicNovels,
  dailyDuas,
  IslamicNovel,
  DuaItem
} from '../data/islamicData';
import { DigitalTasbihCounter } from './DigitalTasbihCounter';
import { Language } from '../types';

interface IslamicSlideDetailPageProps {
  slideId: number;
  onBack: () => void;
  onSelectSlide: (id: number) => void;
  language?: Language;
}

// Bengali Text Normalizer for ultra-forgiving and precise search
const normalizeBengali = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[ূু]/g, 'ু')
    .replace(/[ীি]/g, 'ি')
    .replace(/[শষস]/g, 'স')
    .replace(/[ণন]/g, 'ন')
    .replace(/[-_—–.,;:'"()۝۩]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Robust Category Matcher
const matchesCategoryFilter = (item: DuaItem, cat: string): boolean => {
  if (cat === 'সকল') return true;

  const itemCombined = normalizeBengali(`${item.category} ${item.title} ${item.meaning}`);

  if (cat === 'কুরআন ও সূরা') {
    return (
      itemCombined.includes('কুরআন') ||
      itemCombined.includes('সুরা') ||
      itemCombined.includes('আয়াত') ||
      itemCombined.includes('ফাতিহা') ||
      itemCombined.includes('ইখলাস') ||
      itemCombined.includes('ফালাক') ||
      itemCombined.includes('নাস') ||
      itemCombined.includes('কাহাফ') ||
      itemCombined.includes('মুলক') ||
      itemCombined.includes('ওয়াক্বিয়াহ') ||
      itemCombined.includes('ইনশিরাহ') ||
      itemCombined.includes('দুহা') ||
      itemCombined.includes('আলাক্ব') ||
      itemCombined.includes('বাক্বারা') ||
      itemCombined.includes('ইমরান')
    );
  }
  if (cat === 'সালাত ও তাহাজ্জুদ') {
    return (
      itemCombined.includes('সালাত') ||
      itemCombined.includes('নামাজ') ||
      itemCombined.includes('তাহাজ্জুদ') ||
      itemCombined.includes('রুকু') ||
      itemCombined.includes('সিজদা') ||
      itemCombined.includes('তাশাহহুদ') ||
      itemCombined.includes('কুনুত') ||
      itemCombined.includes('দরূদ') ||
      itemCombined.includes('সালাম') ||
      itemCombined.includes('আজান') ||
      itemCombined.includes('অজু') ||
      itemCombined.includes('মসজিদ')
    );
  }
  if (cat === 'দৈনন্দিন আমল') {
    return (
      itemCombined.includes('দৈনন্দিন') ||
      itemCombined.includes('ঘর') ||
      itemCombined.includes('ঘুম') ||
      itemCombined.includes('খাবার') ||
      itemCombined.includes('পোশাক') ||
      itemCombined.includes('বাজার') ||
      itemCombined.includes('সফর') ||
      itemCombined.includes('মেহমান') ||
      itemCombined.includes('টয়লেট') ||
      itemCombined.includes('আয়না') ||
      itemCombined.includes('রাগ') ||
      itemCombined.includes('বৃষ্টি')
    );
  }
  if (cat === 'বিপদ ও সংকট') {
    return (
      itemCombined.includes('বিপদ') ||
      itemCombined.includes('সংকট') ||
      itemCombined.includes('দুশ্চিন্তা') ||
      itemCombined.includes('ঋণ') ||
      itemCombined.includes('শোক') ||
      itemCombined.includes('ঝড়') ||
      itemCombined.includes('বজ্রপাত') ||
      itemCombined.includes('জালেম') ||
      itemCombined.includes('শত্রু')
    );
  }
  if (cat === 'ক্ষমা ও তওবা') {
    return (
      itemCombined.includes('ক্ষমা') ||
      itemCombined.includes('তওবা') ||
      itemCombined.includes('মাগফিরাত') ||
      itemCombined.includes('ইস্তিগফার') ||
      itemCombined.includes('ক্বদর')
    );
  }
  if (cat === 'রোগ ও শেফা') {
    return (
      itemCombined.includes('রোগ') ||
      itemCombined.includes('শেফা') ||
      itemCombined.includes('শিফা') ||
      itemCombined.includes('সুস্থতা') ||
      itemCombined.includes('ব্যথা') ||
      itemCombined.includes('অসুস্থ')
    );
  }
  if (cat === 'রিজিক ও বরকত') {
    return (
      itemCombined.includes('রিজিক') ||
      itemCombined.includes('বরকত') ||
      itemCombined.includes('সচ্ছলতা') ||
      itemCombined.includes('সম্পদ') ||
      itemCombined.includes('অভাব') ||
      itemCombined.includes('দারিদ্র্য') ||
      itemCombined.includes('জ্ঞান')
    );
  }
  if (cat === 'পারিবারিক') {
    return (
      itemCombined.includes('পিতা') ||
      itemCombined.includes('মাতা') ||
      itemCombined.includes('স্ত্রী') ||
      itemCombined.includes('সন্তান') ||
      itemCombined.includes('পরিবার') ||
      itemCombined.includes('দাম্পত্য')
    );
  }
  if (cat === 'সুরক্ষা ও হিফাজত') {
    return (
      itemCombined.includes('সুরক্ষা') ||
      itemCombined.includes('হিফাজত') ||
      itemCombined.includes('অনিষ্ট') ||
      itemCombined.includes('শয়তান') ||
      itemCombined.includes('জিন') ||
      itemCombined.includes('বদনজর') ||
      itemCombined.includes('দাজ্জাল') ||
      itemCombined.includes('কুফরি')
    );
  }
  if (cat === 'পরকাল ও জান্নাত') {
    return (
      itemCombined.includes('জান্নাত') ||
      itemCombined.includes('জাহান্নাম') ||
      itemCombined.includes('কবর') ||
      itemCombined.includes('মৃত্যু') ||
      itemCombined.includes('জানাজা') ||
      itemCombined.includes('পরকাল')
    );
  }

  return itemCombined.includes(normalizeBengali(cat));
};

export const IslamicSlideDetailPage: React.FC<IslamicSlideDetailPageProps> = ({
  slideId,
  onBack,
  onSelectSlide
}) => {
  // Slide 1 (Seerat) Page/Slide index (0 to 11 for 12 chapters)
  const [seeratSlideIndex, setSeeratSlideIndex] = useState<number>(0);

  // Slide 2 (Novels) state
  const [activeNovel, setActiveNovel] = useState<IslamicNovel | null>(null);
  const [novelChapterIndex, setNovelChapterIndex] = useState<number>(0);
  const [novelSearch, setNovelSearch] = useState<string>('');

  // Slide 3 (Duas) State: active dua ID, search and category filter
  const [activeDuaId, setActiveDuaId] = useState<string>(dailyDuas[0].id);
  const [copiedDua, setCopiedDua] = useState<boolean>(false);
  const [duaSearch, setDuaSearch] = useState<string>('');
  const [selectedDuaCategory, setSelectedDuaCategory] = useState<string>('সকল');

  // Audio Playback State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioVoiceStatus, setAudioVoiceStatus] = useState<string>('');

  // Reader Font Size ('normal' | 'large')
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Stop audio helper
  const handleStopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setAudioVoiceStatus('');
  };

  // Play Audio Helper: Recites in deep, reverent male Huzur voice followed by Bengali meaning
  const handlePlayAudio = (arabicText: string, banglaMeaning: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('আপনার ডিভাইসে অডিও প্লেয়ার সাপোর্ট নেই।');
      return;
    }

    if (isPlayingAudio) {
      handleStopAudio();
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);
    setAudioVoiceStatus('হুজুর কণ্ঠে তিলাওয়াত...');

    const voices = window.speechSynthesis.getVoices();

    const isMaleVoice = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      return (
        name.includes('male') ||
        name.includes('hassan') ||
        name.includes('tariq') ||
        name.includes('maged') ||
        name.includes('ahmed') ||
        name.includes('omar') ||
        name.includes('george') ||
        name.includes('david') ||
        name.includes('guy') ||
        name.includes('daniel') ||
        name.includes('পুরুষ')
      ) && !name.includes('female');
    };

    // Prioritize male Arabic voices
    const arabicVoice =
      voices.find((v) => v.lang.startsWith('ar') && isMaleVoice(v)) ||
      voices.find((v) => v.lang.startsWith('ar')) ||
      null;

    // Prioritize male Bengali voices
    const banglaVoice =
      voices.find((v) => v.lang.startsWith('bn') && isMaleVoice(v)) ||
      voices.find((v) => v.lang.startsWith('bn')) ||
      null;

    // Clean arabic text for TTS (remove verse numbers and non-recited glyphs)
    const cleanArabic = arabicText.replace(/[۝۩۞۰-৯0-9]+/g, ' ').trim();
    const arabicUtterance = new SpeechSynthesisUtterance(cleanArabic);
    arabicUtterance.lang = 'ar-SA';
    // Deep, solemn male Huzur pitch & dignified pacing
    arabicUtterance.pitch = 0.72;
    arabicUtterance.rate = 0.80;
    if (arabicVoice) arabicUtterance.voice = arabicVoice;

    // Bangla utterance for meaning (also deep, reverent male tone)
    const banglaUtterance = new SpeechSynthesisUtterance(`অর্থ: ${banglaMeaning}`);
    banglaUtterance.lang = 'bn-BD';
    banglaUtterance.pitch = 0.75;
    banglaUtterance.rate = 0.88;
    if (banglaVoice) banglaUtterance.voice = banglaVoice;

    arabicUtterance.onend = () => {
      setAudioVoiceStatus('বাংলা অর্থ...');
      window.speechSynthesis.speak(banglaUtterance);
    };

    arabicUtterance.onerror = () => {
      setAudioVoiceStatus('বাংলা অর্থ...');
      window.speechSynthesis.speak(banglaUtterance);
    };

    banglaUtterance.onend = () => {
      setIsPlayingAudio(false);
      setAudioVoiceStatus('');
    };

    banglaUtterance.onerror = () => {
      setIsPlayingAudio(false);
      setAudioVoiceStatus('');
    };

    window.speechSynthesis.speak(arabicUtterance);
  };

  // Stop audio on slide change or dua change
  useEffect(() => {
    handleStopAudio();
  }, [slideId, activeDuaId, selectedDuaCategory]);

  // Scroll to top on slide change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slideId, seeratSlideIndex, activeNovel, novelChapterIndex, activeDuaId]);

  // Copy helper for Dua
  const handleCopy = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopiedDua(true);
      setTimeout(() => setCopiedDua(false), 2000);
    } catch {
      setCopiedDua(true);
      setTimeout(() => setCopiedDua(false), 2000);
    }
  };

  // Keyboard navigation for novel pages (Arrow Left / Right)
  useEffect(() => {
    if (!activeNovel) return;
    const handleNavKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        setNovelChapterIndex((p) => Math.min(activeNovel.chapters.length - 1, p + 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'ArrowLeft') {
        setNovelChapterIndex((p) => Math.max(0, p - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleNavKey);
    return () => window.removeEventListener('keydown', handleNavKey);
  }, [activeNovel]);

  // 4 Top Books configuration
  const books = [
    { id: 0, title: 'সীরাত সমগ্র', icon: Compass, count: `${seeratChapters.length} অধ্যায়` },
    { id: 1, title: '২০+ উপন্যাস', icon: BookOpen, count: `${islamicNovels.length}টি বই` },
    { id: 2, title: '১০০টি দোয়া ও সূরা', icon: ScrollText, count: `${dailyDuas.length}টি দোয়া` },
    { id: 3, title: 'ডিজিটাল তাসবীহ', icon: Sparkles, count: 'কাউন্টার' }
  ];

  // Current Seerat Chapter
  const currentSeerat = seeratChapters[seeratSlideIndex] || seeratChapters[0];

  // Filtered Duas based on Category and Search with robust Bengali normalization
  const filteredDuas = dailyDuas.filter((d) => {
    const matchesCat = matchesCategoryFilter(d, selectedDuaCategory);
    if (!matchesCat) return false;

    if (!duaSearch.trim()) return true;

    const searchTokens = normalizeBengali(duaSearch).split(' ').filter(Boolean);
    const searchableText = normalizeBengali(
      `${d.title} ${d.transliteration} ${d.meaning} ${d.category} ${d.arabic}`
    );

    return searchTokens.every((token) => searchableText.includes(token));
  });

  // Current Dua Item - reliably synchronized with filteredDuas
  const currentDua =
    filteredDuas.find((d) => d.id === activeDuaId) ||
    filteredDuas[0] ||
    dailyDuas[0];

  const currentFilteredIndex = Math.max(
    0,
    filteredDuas.findIndex((d) => d.id === currentDua.id)
  );

  // Filtered novels
  const filteredNovels = islamicNovels.filter((n: IslamicNovel) =>
    n.title.toLowerCase().includes(novelSearch.toLowerCase()) ||
    n.author.toLowerCase().includes(novelSearch.toLowerCase()) ||
    n.category.toLowerCase().includes(novelSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans selection:bg-amber-200">
      
      {/* =======================================================================
          TOP BAR: Back Button & Clean Book Switcher
      ======================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm py-2.5 px-3 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-2">
          
          {/* Back Button with Icon (Concise label 'ব্যাক') */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm shrink-0 cursor-pointer"
            title="ব্যাক"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>ব্যাক</span>
          </button>

          {/* 4 Topic Switcher Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 no-scrollbar">
            {books.map((b) => {
              const IconComp = b.icon;
              const isActive = slideId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    onSelectSlide(b.id);
                    if (b.id === 1) setActiveNovel(null);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span>{b.title}</span>
                </button>
              );
            })}
          </div>

          {/* Font Resizer */}
          <div className="hidden sm:flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-bold">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded-md ${fontSize === 'normal' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              title="স্বাভাবিক ফন্ট"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded-md ${fontSize === 'large' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
              title="বড় ফন্ট"
            >
              A+
            </button>
          </div>

        </div>
      </header>

      {/* =======================================================================
          MAIN SLIDE CONTAINER
      ======================================================================= */}
      <main className="flex-1 mx-auto w-full max-w-4xl px-3 sm:px-6 py-6 sm:py-8 flex flex-col justify-start">
        
        {/* =======================================================================
            BOOK 1: নবীজীর (সাঃ) সীরাত (সাদা স্লাইড রিডার)
        ======================================================================= */}
        {slideId === 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] p-6 sm:p-10 flex flex-col justify-between min-h-[580px] transition-all">
            
            {/* Slide Header */}
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    সীরাত-উন-নবী (সাঃ) • {currentSeerat.badge}
                  </span>
                </div>
                
                {/* Chapter jump select */}
                <select
                  value={seeratSlideIndex}
                  onChange={(e) => setSeeratSlideIndex(parseInt(e.target.value, 10))}
                  className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200 cursor-pointer"
                >
                  {seeratChapters.map((sc, idx) => (
                    <option key={sc.id} value={idx}>
                      অধ্যায় {idx + 1}: {sc.title.substring(0, 28)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Title & Period */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 mb-2 leading-snug">
                {currentSeerat.title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-700 font-medium mb-5">
                {currentSeerat.subtitle}
              </p>

              <div className="w-12 h-1 bg-amber-500 rounded-full mb-6" />

              {/* Pure Reading Content */}
              <div
                className={`space-y-4 text-stone-800 leading-relaxed font-serif ${
                  fontSize === 'large' ? 'text-base sm:text-lg leading-8' : 'text-sm sm:text-base leading-7'
                }`}
              >
                <p className="bg-stone-50 p-4 rounded-xl border border-stone-150 text-stone-800 font-sans font-medium">
                  {currentSeerat.summary}
                </p>

                {currentSeerat.detailedStory.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-justify indent-4">
                    {paragraph}
                  </p>
                ))}

                {/* Hadith Reference Quote */}
                {currentSeerat.quranHadithRef && (
                  <div className="my-5 p-4 rounded-xl bg-amber-50/60 border-l-4 border-amber-500 text-stone-800 text-xs sm:text-sm italic font-sans">
                    <strong className="block text-amber-900 font-bold not-italic mb-1">
                      প্রামাণ্য দলিল (কুরআন ও হাদিস):
                    </strong>
                    {currentSeerat.quranHadithRef}
                  </div>
                )}

                {/* Historical Milestones */}
                {currentSeerat.historicalMilestones && (
                  <div className="my-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-sans">
                    <strong className="block text-stone-900 font-bold mb-2">
                      ঐতিহাসিক মাইলফলকসমূহ:
                    </strong>
                    <ul className="list-disc list-inside space-y-1 text-stone-700">
                      {currentSeerat.historicalMilestones.map((m, mIdx) => (
                        <li key={mIdx}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Life Teachings */}
                {currentSeerat.keyTeachings && currentSeerat.keyTeachings.length > 0 && (
                  <div className="my-4 p-4 rounded-xl bg-emerald-50/60 border-l-4 border-emerald-600 text-stone-800 text-xs sm:text-sm font-sans">
                    <strong className="block text-emerald-900 font-bold mb-2">
                      আমাদের জীবনের জন্য শিক্ষা:
                    </strong>
                    <ul className="list-disc list-inside space-y-1">
                      {currentSeerat.keyTeachings.map((t, tIdx) => (
                        <li key={tIdx} className="text-stone-700">{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Slide Navigation Controls */}
            <div className="mt-8 pt-5 border-t border-stone-150 flex items-center justify-between">
              <button
                disabled={seeratSlideIndex === 0}
                onClick={() => setSeeratSlideIndex((p) => Math.max(0, p - 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-30 disabled:pointer-events-none text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্বের অধ্যায়</span>
              </button>

              <span className="text-xs font-mono font-bold text-stone-700">
                অধ্যায় {seeratSlideIndex + 1} / {seeratChapters.length}
              </span>

              <button
                disabled={seeratSlideIndex === seeratChapters.length - 1}
                onClick={() => setSeeratSlideIndex((p) => Math.min(seeratChapters.length - 1, p + 1))}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white disabled:opacity-30 disabled:pointer-events-none text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                <span>পরের অধ্যায়</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* =======================================================================
            BOOK 2: ২০+ ইসলামিক উপন্যাস (১০-১৫ পৃষ্ঠার সুবিস্তৃত মহাকাব্য সম্ভার)
        ======================================================================= */}
        {slideId === 1 && (
          <div>
            {!activeNovel ? (
              /* If no novel selected: Clean Book Library Catalog */
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.08)] p-6 sm:p-10 min-h-[580px] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-5 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        ২০টি ইসলামিক উপন্যাস সমগ্র
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        ১৬, ১৮ ও ২০ পৃষ্ঠার ধারাবাহিক উপন্যাস
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-stone-900">
                      ইসলামিক উপন্যাস সমগ্র
                    </h1>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">
                      প্রতিটি উপন্যাসে ১৬, ১৮ বা ২০ পৃষ্ঠার এক অবিচ্ছিন্ন ও নিখাদ ধারাবাহিক ঐতিহাসিক কাহিনী।
                    </p>
                  </div>

                  {/* Search box */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={novelSearch}
                      onChange={(e) => setNovelSearch(e.target.value)}
                      placeholder="উপন্যাস খুঁজুন..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-100 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* Novels Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNovels.map((novel: IslamicNovel) => (
                    <div
                      key={novel.id}
                      onClick={() => {
                        setActiveNovel(novel);
                        setNovelChapterIndex(0);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group p-5 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between bg-stone-50/50 hover:bg-white"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
                          <span className="text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {novel.chapters.length} পৃষ্ঠার ধারাবাহিক উপন্যাস
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2 mb-2">
                          {novel.title}
                        </h3>

                        <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                          {novel.synopsis || novel.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-amber-800">
                        <span className="text-[11px] font-mono text-stone-500">
                          পৃষ্ঠা ১ থেকে {novel.chapters.length}
                        </span>
                        <div className="flex items-center gap-1 text-amber-700">
                          <span>উপন্যাস পড়ুন</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* If novel selected: PURE FRAMELESS READER (No card box, no border, no bottom navigation) */
              <div className="w-full max-w-3xl mx-auto py-2 transition-all">
                {/* Minimal Top Control: Back button & sleek Page Switcher */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200/60">
                  <button
                    onClick={() => {
                      setActiveNovel(null);
                      setNovelChapterIndex(0);
                    }}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-950 cursor-pointer bg-stone-200/50 hover:bg-stone-200 px-3.5 py-1.5 rounded-xl transition-all"
                    title="উপন্যাস তালিকায় ফিরে যান"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>উপন্যাস তালিকা</span>
                  </button>

                  {/* Clean Page Navigation at Top */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={novelChapterIndex === 0}
                      onClick={() => {
                        setNovelChapterIndex((p) => Math.max(0, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-200 text-stone-700 disabled:opacity-25 disabled:pointer-events-none cursor-pointer transition-all"
                      title="পূর্ববর্তী পৃষ্ঠা"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-xs sm:text-sm font-mono font-bold text-stone-700 px-2 py-1 bg-stone-200/40 rounded-lg">
                      পৃষ্ঠা {novelChapterIndex + 1} / {activeNovel.chapters.length}
                    </span>

                    <button
                      disabled={novelChapterIndex === activeNovel.chapters.length - 1}
                      onClick={() => {
                        setNovelChapterIndex((p) => Math.min(activeNovel.chapters.length - 1, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-1.5 rounded-lg bg-stone-200/60 hover:bg-stone-200 text-stone-700 disabled:opacity-25 disabled:pointer-events-none cursor-pointer transition-all"
                      title="পরবর্তী পৃষ্ঠা"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* FIRST PAGE: Headline is ONLY the novel title! */}
                {novelChapterIndex === 0 && (
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
                      {activeNovel.title}
                    </h1>
                  </div>
                )}

                {/* NO SHAPES / NO BOXES: Text sits directly on the background */}
                <div
                  className={`space-y-6 text-stone-900 font-serif ${
                    fontSize === 'large'
                      ? 'text-lg sm:text-xl leading-9 sm:leading-10'
                      : 'text-base sm:text-lg leading-8 sm:leading-9'
                  }`}
                >
                  {activeNovel.chapters[novelChapterIndex]?.content.map((para, idx) => (
                    <p key={idx} className="indent-8 text-justify">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Minimal Page Indicator at the very end of content (NO buttons bar) */}
                <div className="mt-14 text-center text-xs font-mono text-stone-400">
                  — পৃষ্ঠা {novelChapterIndex + 1} / {activeNovel.chapters.length} —
                </div>
              </div>
            )}
          </div>
        )}

        {/* =======================================================================
            BOOK 3: ১০০টি সহিহ মাসনূন দোয়া ও সূরা (সাদা স্লাইড রিডার)
        ======================================================================= */}
        {slideId === 2 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] p-4 sm:p-8 flex flex-col justify-between min-h-[560px] transition-all">
            
            <div>
              {/* Top Row: Title, Category & Quick Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-stone-150 pb-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-purple-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />
                    <span>সহিহ মাসনূন দোয়া ও সূরা</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-stone-600 font-semibold">{currentDua.category}</span>
                  </div>
                  <h1 className="text-base sm:text-xl font-bold text-stone-900 mt-0.5 truncate">
                    {currentDua.title}
                  </h1>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Copy Button */}
                  <button
                    onClick={() =>
                      handleCopy(
                        `${currentDua.title}\n\nআরবি:\n${currentDua.arabic}\n\nউচ্চারণ:\n${currentDua.transliteration}\n\nঅর্থ:\n${currentDua.meaning}\n\nফজিলত:\n${currentDua.virtue}\n\nসূত্র: ${currentDua.reference}`
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-all cursor-pointer border border-stone-200"
                    title="দোয়া কপি করুন"
                  >
                    {copiedDua ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 text-[11px]">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-600" />
                        <span className="text-[11px]">কপি</span>
                      </>
                    )}
                  </button>

                  {/* Dropdown jump to any of the filtered duas */}
                  <select
                    value={currentDua.id}
                    onChange={(e) => setActiveDuaId(e.target.value)}
                    className="text-xs font-semibold text-stone-700 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200 cursor-pointer max-w-[150px] sm:max-w-[190px] truncate"
                  >
                    {filteredDuas.map((d, idx) => (
                      <option key={d.id} value={d.id}>
                        {idx + 1}. {d.title.substring(0, 22)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sub-bar: Search Input & Category Filter Chips */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={duaSearch}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDuaSearch(val);
                        // If there is any match, select the first match
                        if (val.trim()) {
                          const tokens = normalizeBengali(val).split(' ').filter(Boolean);
                          const firstMatch = dailyDuas.find((d) => {
                            const text = normalizeBengali(
                              `${d.title} ${d.transliteration} ${d.meaning} ${d.category} ${d.arabic}`
                            );
                            return tokens.every((tok) => text.includes(tok));
                          });
                          if (firstMatch) {
                            setActiveDuaId(firstMatch.id);
                          }
                        }
                      }}
                      placeholder="সূরা বা দোয়ার নাম দিয়ে খুঁজুন (যেমন: আন নাস, ফাতিহা, তাহাজ্জুদ)..."
                      className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                    />
                  </div>
                  {duaSearch && (
                    <button
                      onClick={() => setDuaSearch('')}
                      className="text-[11px] text-stone-500 hover:text-stone-900 px-2 py-1 rounded bg-stone-100 font-medium cursor-pointer"
                    >
                      ক্লিয়ার
                    </button>
                  )}
                </div>

                {/* Search Feedback Info */}
                {duaSearch && (
                  <div className="text-[11px] text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 flex items-center justify-between">
                    <span>
                      অনুসন্ধান: <strong>"{duaSearch}"</strong> — {filteredDuas.length}টি দোয়া পাওয়া গেছে
                    </span>
                    {filteredDuas.length > 0 && (
                      <span className="font-mono text-purple-700">
                        বর্তমান: {currentFilteredIndex + 1}/{filteredDuas.length}
                      </span>
                    )}
                  </div>
                )}

                {/* Compact Category Pills with precise filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                  {[
                    { label: 'সকল', key: 'সকল' },
                    { label: 'কুরআন ও সূরা', key: 'কুরআন ও সূরা' },
                    { label: 'সালাত ও তাহাজ্জুদ', key: 'সালাত ও তাহাজ্জুদ' },
                    { label: 'দৈনন্দিন আমল', key: 'দৈনন্দিন আমল' },
                    { label: 'বিপদ ও সংকট', key: 'বিপদ ও সংকট' },
                    { label: 'ক্ষমা ও তওবা', key: 'ক্ষমা ও তওবা' },
                    { label: 'রোগ ও শেফা', key: 'রোগ ও শেফা' },
                    { label: 'রিজিক ও বরকত', key: 'রিজিক ও বরকত' },
                    { label: 'পারিবারিক', key: 'পারিবারিক' },
                    { label: 'সুরক্ষা ও হিফাজত', key: 'সুরক্ষা ও হিফাজত' },
                    { label: 'পরকাল ও জান্নাত', key: 'পরকাল ও জান্নাত' }
                  ].map((cat) => {
                    const isSelected = selectedDuaCategory === cat.key;
                    // Count how many items match this category
                    const catCount = dailyDuas.filter((d) =>
                      matchesCategoryFilter(d, cat.key)
                    ).length;

                    return (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setSelectedDuaCategory(cat.key);
                          const matching = dailyDuas.filter((d) =>
                            matchesCategoryFilter(d, cat.key)
                          );
                          if (matching.length > 0) {
                            setActiveDuaId(matching[0].id);
                          }
                        }}
                        className={`px-2.5 py-0.5 rounded-full whitespace-nowrap cursor-pointer transition-all flex items-center gap-1 ${
                          isSelected
                            ? 'bg-purple-900 text-white font-bold shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-600 font-medium'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[9.5px] ${isSelected ? 'text-purple-200' : 'text-stone-400'}`}>
                          ({catCount})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* If no items match search */}
              {filteredDuas.length === 0 ? (
                <div className="py-12 text-center bg-stone-50 rounded-2xl border border-stone-200 my-4 p-6">
                  <p className="text-sm font-bold text-stone-700">
                    "{duaSearch}" এর সাথে মিলে এমন কোনো দোয়া বা সূরা পাওয়া যায়নি।
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    বানান বা অন্য কোনো শব্দ (যেমন: ফাতিহা, আয়াতুল কুরসি, তাহাজ্জুদ) দিয়ে চেষ্টা করুন।
                  </p>
                  <button
                    onClick={() => {
                      setDuaSearch('');
                      setSelectedDuaCategory('সকল');
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-lg bg-purple-900 text-white text-xs font-bold cursor-pointer hover:bg-purple-800 transition-all"
                  >
                    সকল ১০০টি দোয়া দেখুন
                  </button>
                </div>
              ) : (
                <>
                  {/* Sound / Audio Playback Controller right above Arabic Calligraphy */}
                  <div className="my-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-300/80 flex items-center justify-between gap-2 flex-wrap shadow-2xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePlayAudio(currentDua.arabic, currentDua.meaning)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                          isPlayingAudio
                            ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                        title={isPlayingAudio ? 'সাউন্ড বন্ধ করুন' : 'তেলাওয়াত ও বাংলা অর্থ শুনুন'}
                      >
                        {isPlayingAudio ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" />
                            <span>থামান</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-emerald-200" />
                            <span>তেলাওয়াত ও অর্থ শুনুন</span>
                          </>
                        )}
                      </button>

                      {isPlayingAudio && (
                        <span className="text-[11px] sm:text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                          <span>{audioVoiceStatus || 'প্লে হচ্ছে...'}</span>
                        </span>
                      )}
                    </div>

                    <span className="text-[10.5px] sm:text-[11px] text-stone-600 font-medium hidden sm:inline">
                      🔊 অডিওতে আরবি তিলাওয়াত ও বাংলা অর্থ শুনুন
                    </span>
                  </div>

                  {/* Arabic Calligraphy Display with refined typography */}
                  <div className="my-3 p-4 sm:p-5 rounded-xl bg-amber-50/40 border border-amber-200/70 text-right">
                    <p className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-stone-950 leading-loose tracking-wide dir-rtl">
                      {currentDua.arabic}
                    </p>
                  </div>

                  {/* Bangla Pronunciation & Meaning */}
                  <div className="space-y-2.5 text-stone-800 font-sans">
                    <div className="p-3 sm:p-3.5 rounded-lg bg-stone-50 border border-stone-200/70">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        উচ্চারণ
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-stone-900 leading-relaxed">
                        {currentDua.transliteration}
                      </p>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-lg bg-stone-50 border border-stone-200/70">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        অর্থ
                      </div>
                      <p className="text-xs sm:text-sm text-stone-900 leading-relaxed font-serif">
                        {currentDua.meaning}
                      </p>
                    </div>

                    {currentDua.backgroundStory && (
                      <div className="p-3 sm:p-3.5 rounded-lg bg-stone-50/70 border border-stone-200/60 text-xs text-stone-700">
                        <strong className="block text-stone-900 font-bold mb-0.5 text-[11px]">
                          প্রেক্ষাপট ও মাহাত্ম্য:
                        </strong>
                        {currentDua.backgroundStory}
                      </div>
                    )}

                    <div className="p-3 sm:p-3.5 rounded-lg bg-purple-50/50 border-l-3 border-purple-600">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-purple-900 mb-0.5">
                        ফজিলত ও বরকত
                      </div>
                      <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed">
                        {currentDua.virtue}
                      </p>
                      <div className="text-[11px] text-purple-950 font-bold mt-1.5 font-mono">
                        সহিহ সনদ ও দলিল: {currentDua.reference}
                      </div>
                      {currentDua.recitationRule && (
                        <div className="text-[11px] text-stone-600 mt-0.5">
                          পাঠের নিয়ম: {currentDua.recitationRule}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Stepper Navigation (Through Filtered Duas) */}
            {filteredDuas.length > 0 && (
              <div className="mt-5 pt-3.5 border-t border-stone-150 flex items-center justify-between">
                <button
                  disabled={currentFilteredIndex === 0}
                  onClick={() => {
                    if (currentFilteredIndex > 0) {
                      setActiveDuaId(filteredDuas[currentFilteredIndex - 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>পূর্বের দোয়া</span>
                </button>

                <span className="text-xs font-mono font-bold text-stone-600">
                  দোয়া {currentFilteredIndex + 1} / {filteredDuas.length}
                </span>

                <button
                  disabled={currentFilteredIndex === filteredDuas.length - 1}
                  onClick={() => {
                    if (currentFilteredIndex < filteredDuas.length - 1) {
                      setActiveDuaId(filteredDuas[currentFilteredIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <span>পরের দোয়া</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        )}

        {/* =======================================================================
            BOOK 4: ডিজিটাল জিকির গণনা ও তাসবীহ কাউন্টার সিস্টেম
        ======================================================================= */}
        {slideId === 3 && (
          <DigitalTasbihCounter />
        )}

      </main>

      {/* =======================================================================
          BOTTOM BAR: Minimalist & Clean with Back Option
      ======================================================================= */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-4 px-3 sm:px-6">
        <div className="mx-auto max-w-4xl flex items-center justify-between text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>প্রামাণ্য ইসলামী রেফারেন্স লাইব্রেরি ও ডিজিটাল তাসবীহ</span>
          </div>

          {/* Clean 'ব্যাক' Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-stone-700 hover:text-stone-950 font-bold transition-colors cursor-pointer"
            title="ব্যাক"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ব্যাক</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
