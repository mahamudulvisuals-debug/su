import React, { useState } from 'react';
import { Language } from '../types';
import { Sparkles, Check, Download, Heart, ExternalLink, ArrowRight, Eye } from 'lucide-react';

interface AboutSectionProps {
  language: Language;
  onSelectBundle: (bundleName: string, price: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  language,
  onSelectBundle,
}) => {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  const bundles = [
    {
      id: 'academic',
      name: {
        bn: 'একাডেমিক ও বিশ্ববিদ্যালয় প্রেজেন্টেশন প্যাক',
        en: 'Academic & Thesis Presentation Pack',
      },
      tagline: {
        bn: 'ক্লাস প্রেজেন্টেশন, থিসিস ডিফেন্স ও সেমিনারের জন্য',
        en: 'Designed for university thesis defense & assignments',
      },
      slidesCount: '৫০+ কাস্টম স্লাইড',
      priceBDT: '৳১৯০',
      priceUSD: '$3',
      features: {
        bn: [
          'পাওয়ারপয়েন্ট (.pptx) ও গুগল স্লাইডস ফরম্যাট',
          'সহজেই টেক্সট, ছবি ও রং পরিবর্তনযোগ্য',
          'চার্ট, ইনফোগ্রাফিক ও রেফারেন্স লেআউট অন্তর্ভুক্ত',
        ],
        en: [
          'PowerPoint (.pptx) & Google Slides compatible',
          'Fully editable text, colors & layout placeholders',
          'Academic citation & data charts included',
        ],
      },
      isPopular: false,
    },
    {
      id: 'master',
      name: {
        bn: 'অল-ইন-ওয়ান মেগা মাস্টার বান্ডেল (সেরা পছন্দ)',
        en: 'All-in-One Mega Master Bundle',
      },
      tagline: {
        bn: 'সব ধরণের প্রেজেন্টেশন, রিপোর্ট ও প্রজেক্টের সমাধান',
        en: 'Complete suite for all presentations, pitch & business',
      },
      slidesCount: '১২০+ প্রিমিয়াম স্লাইড',
      priceBDT: '৳৪৯০',
      priceUSD: '$8',
      features: {
        bn: [
          'পাওয়ারপয়েন্ট, গুগল স্লাইডস ও ক্যানভা (Canva) সাপোর্ট',
          'মডার্ন মিনিমালিস্ট ও সিনেমাটিক ড্রিম থিম',
          'ইনফোগ্রাফিক্স, আইকন প্যাক ও অ্যানিমেশন রেডি',
          'লাইফটাইম এক্সেস ও ফ্রি আপডেট',
        ],
        en: [
          'PowerPoint, Google Slides & Canva editable templates',
          'Modern minimal & creative aesthetic themes',
          'Over 200+ vector icons & custom infographic nodes',
          'Lifetime access with direct download link',
        ],
      },
      isPopular: true,
    },
    {
      id: 'business',
      name: {
        bn: 'বিজনেস ও স্টার্টআপ পিচডেক প্যাক',
        en: 'Business & Pitch Deck Presentation Pack',
      },
      tagline: {
        bn: 'কর্পোরেট মিটিং, প্রস্তাব ও ক্লায়েন্ট প্রেজেন্টেশন',
        en: 'Professional corporate proposals & portfolio decks',
      },
      slidesCount: '৪৫+ মডার্ন স্লাইড',
      priceBDT: '৳২৯০',
      priceUSD: '$5',
      features: {
        bn: [
          'ইনভেস্টর পিচডেক ও প্রপোজাল ফ্রেমওয়ার্ক',
          'ফাইন্যান্সিয়াল চার্ট ও টাইমলাইন লেআউট',
          'হাই-রেজোলিউশন প্রফেশনাল ফন্ট ও ভেক্টর',
        ],
        en: [
          'Investor pitch deck & business proposal architecture',
          'Financial roadmaps, timeline & milestone graphics',
          'High-resolution vector assets & export ready',
        ],
      },
      isPopular: false,
    },
  ];

  return (
    <section id="slides" className="bg-transparent py-14 sm:py-20 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
            <Heart className="h-3.5 w-3.5 fill-rose-400" />
            <span>{language === 'bn' ? 'সুমাইয়ার তৈরি স্লাইড কালেকশন' : 'Sumaiyah’s Handcrafted Slide Packs'}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-4xl text-balance">
            {language === 'bn'
              ? 'স্বপ্ন ও পরিশ্রমে তৈরি প্রিমিয়াম স্লাইডগুলো'
              : 'Handcrafted Presentation Slide Bundles'}
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-zinc-300 sm:text-sm">
            {language === 'bn'
              ? 'আপনার প্রেজেন্টেশনকে দিন আকর্ষণীয় ও পেশাদার রূপ। প্রতিটি স্লাইড কেনার অর্থ সরাসরি একজন অসহায় মায়ের চিকিৎসা ও একটি স্বপ্নময় পড়াশোনার পেছনে দাঁড়ানো।'
              : 'Every purchase provides direct financial relief for my mother’s urgent medication and allows me to continue my studies.'}
          </p>
        </div>

        {/* 3 Slide Bundles Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all ${
                bundle.isPopular
                  ? 'border-cyan-400/60 bg-gradient-to-b from-[#063a5e]/75 via-[#032640]/85 to-[#02182b]/90 backdrop-blur-md shadow-2xl shadow-cyan-950/60 ring-1 ring-cyan-400/30'
                  : 'border-cyan-500/20 bg-[#021d33]/65 backdrop-blur-md hover:border-cyan-400/40 hover:bg-[#032745]/75 shadow-lg shadow-cyan-950/30'
              }`}
            >
              {bundle.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rose-600 px-3.5 py-0.5 text-[11px] font-bold text-white shadow-md">
                  {language === 'bn' ? 'সর্বোচ্চ সাহায্যকারী বান্ডেল' : 'Most Impactful Bundle'}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-rose-400">
                    {bundle.slidesCount}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-bold text-white sm:text-3xl tabular-nums">
                      {bundle.priceBDT}
                    </span>
                    <span className="text-xs text-zinc-400">/ {bundle.priceUSD}</span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white sm:text-xl">
                  {bundle.name[language]}
                </h3>

                <p className="mt-2 text-xs text-zinc-400">
                  {bundle.tagline[language]}
                </p>

                {/* Features List */}
                <div className="mt-6 border-t border-cyan-500/15 pt-5 space-y-2.5">
                  {bundle.features[language].map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-cyan-500/15">
                <button
                  type="button"
                  onClick={() => onSelectBundle(bundle.name[language], bundle.priceBDT)}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all active:scale-95 shadow-md ${
                    bundle.isPopular
                      ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/30'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-white/10'
                  }`}
                >
                  <Heart className="h-3.5 w-3.5 fill-current" />
                  <span>{language === 'bn' ? 'স্লাইডটি কিনুন ও পাশে দাঁড়ান' : 'Purchase & Support'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Note */}
        <div className="mt-12 rounded-2xl border border-cyan-500/20 bg-[#021d33]/50 backdrop-blur-md p-4 sm:p-6 text-center text-xs text-cyan-200/70 max-w-2xl mx-auto">
          <p>
            {language === 'bn'
              ? '💡 স্লাইড কেনার পর আপনি অবিলম্বে গুগল ড্রাইভের মাধ্যমে হাই-কোয়ালিটি ফাইল ও ক্যানভা এডিটেবল লিংক পেয়ে যাবেন। কোনো সমস্যা হলে সার্বক্ষণিক সহায়তা দেওয়া হবে।'
              : '💡 Instant Google Drive download & Canva template link provided immediately upon purchase with full support.'}
          </p>
        </div>
      </div>
    </section>
  );
};
