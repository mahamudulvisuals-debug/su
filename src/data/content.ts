import { Project, Service, Testimonial } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_cinematic_creator_1791477146525.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'bengal-river-documentary',
    title: {
      bn: 'নদীর গান: বাংলার নদী ও জীবনবৃত্তান্ত',
      en: 'Songs of the River: Bengal Documentary',
    },
    category: 'documentary',
    categoryLabel: { bn: 'ডকুমেন্টারি ফিল্ম', en: 'Documentary Film' },
    client: 'National Heritage Trust & Bengal Films',
    year: '2025',
    duration: '24 min',
    image: '/src/assets/images/project_documentary_film_1791477167675.jpg',
    description: {
      bn: 'মেঘনা এবং সুরমা অববাহিকার নদীমাতৃক জীবনযাত্রার ওপর তৈরি আন্তর্জাতিক মানের ৪কে সিনেমাটিক ডকুমেন্টারি। এতে ব্যবহৃত হয়েছে অ্যানামরফিক সিনেমা লেন্স এবং অর্গানিক ফিল্ম ইমুলেশন।',
      en: 'An international-grade 4K cinematic documentary charting riverside settlements and generational heritage across the Surma and Meghna basins.',
    },
    challenge: {
      bn: 'কুয়াশাচ্ছন্ন ভোরে প্রাকৃতিক আলোর ওঠানামা এবং হাই ডায়নামিক রেঞ্জের ফ্ল্যাট লগ ফুটেজ থেকে ন্যাচারাল স্কিনটোন ও গোল্ডেন আওয়ারের প্রাণবন্ত রং ফুটিয়ে তোলা।',
      en: 'Balancing fluctuating morning mist exposure and preserving delicate skintones while maintaining highlight roll-off across flat log footage.',
    },
    solution: {
      bn: 'DaVinci Resolve-এ ACES কালার ম্যানেজমেন্ট এবং কাস্টম নোড ট্রি তৈরি করে ৩টি ভিন্ন ক্যামেরার কালার ম্যাচ এবং কোডাক ফিল্ম প্রিন্ট ইমুলেশন অ্যাপ্লাই করা হয়েছে।',
      en: 'Built custom ACES pipeline in DaVinci Resolve with Kodak print film emulation nodes and camera color-matching across 3 distinct rigs.',
    },
    tools: ['DaVinci Resolve Studio', 'Sony FX6', 'Anamorphic 35mm', 'Dehancer Pro'],
    metrics: {
      label: { bn: 'ভিউয়ার রিচ', en: 'Audience Reach' },
      value: '2.4M+ Views',
    },
    hasGradeComparison: true,
  },
  {
    id: 'cyber-kinetic-identity',
    title: {
      bn: 'জিওমেট্রিয়া ফিউচুরা: থ্রিডি অডিও-ভিজ্যুয়াল আইডেন্টিটি',
      en: 'Geometria Futura: 3D Kinetic Motion',
    },
    category: 'motion',
    categoryLabel: { bn: 'মোশন ও থ্রিডি', en: 'Motion & 3D CGI' },
    client: 'Nexar Tech Summit',
    year: '2025',
    duration: '1 min 45s',
    image: '/src/assets/images/project_cyber_motion_1791477178149.jpg',
    description: {
      bn: 'ফিউচারিস্টিক টেক সামিটের জন্য তৈরি কাইনেটিক থ্রিডি টাইপোগ্রাফি, ক্রোম ও অবসিডিয়ান মেটাল রিফ্লেকশন সম্বলিত কনফারেন্স ওপেনার ও ব্র্যান্ড আইডেন্টিটি।',
      en: 'High-impact conference title sequence blending kinetic typography, iridescent holographic chrome rendering, and bass-heavy audio sync.',
    },
    challenge: {
      bn: 'মাত্র ৩ সপ্তাহের মধ্যে সম্পূর্ণ থ্রিডি অ্যানিমেশন, লাইটিং রিগ এবং সাউন্ড ডিজাইনের পারফেক্ট ফ্রেম-টু-ফ্রেম সিঙ্ক্রোনাইজেশন সম্পন্ন করা।',
      en: 'Complex ray-traced geometric fluid simulations with frame-perfect beat-matching across a strict 3-week production sprint.',
    },
    solution: {
      bn: 'Cinema 4D ও Redshift-এ অপ্টিমাইজড জ্যামিতি এবং After Effects-এ মোশন ব্লার ও গ্লো কম্পোজিটিং করে রেন্ডার টাইম ৪০% কমিয়ে ডেলিভারি সম্পন্ন হয়েছে।',
      en: 'Streamlined shader network in Redshift and multi-pass compositing in After Effects, delivering seamless 60fps keynote playback.',
    },
    tools: ['Cinema 4D', 'Redshift', 'After Effects', 'Ableton Sound Sync'],
    metrics: {
      label: { bn: 'লাইভ দর্শক', en: 'Live Audience' },
      value: '18,000+ Attendees',
    },
  },
  {
    id: 'avant-garde-fashion-campaign',
    title: {
      bn: 'মনোক্রোম: হাই-ফ্যাশন কমার্শিয়াল ফিল্ম ও ফটো সিরিজ',
      en: 'Monochrome: Editorial Fashion Film',
    },
    category: 'commercial',
    categoryLabel: { bn: 'কমার্শিয়াল ফিল্ম', en: 'Commercial Film' },
    client: 'AURA Luxury Studio',
    year: '2024',
    duration: '45s Reel',
    image: '/src/assets/images/project_fashion_commercial_1791477188621.jpg',
    description: {
      bn: 'আধুনিক স্থাপত্যের সাথে হাই-এন্ড ফ্যাশন পোশাকের জ্যামিতিক সম্পর্কের ওপর নির্মিত টিভি কমার্শিয়াল এবং হাই-রেজোলিউশন বিলবোর্ড ক্যাম্পেইন।',
      en: 'Sleek architectural fashion editorial with sharp chiaroscuro shadows, sculpted silhouettes, and hypnotic rhythmic pacing for social & broadcast.',
    },
    challenge: {
      bn: 'কংক্রিটের হাইলাইট যাতে ওভারএক্সপোজড না হয় এবং কাপড়ের সুক্ষ্ম টেক্সচার যাতে নিখুঁতভাবে স্পষ্ট থাকে তা নিশ্চিত করা।',
      en: 'Maintaining micro-textures in deep black wool coats while preventing clipping on sunlit raw concrete surfaces.',
    },
    solution: {
      bn: 'স্প্লিট-টোন গ্রেডিং এবং প্রিসিশন মাস্কিংয়ের মাধ্যমে আল্ট্রা-শার্প হাই-কনট্রাস্ট লুক তৈরি করা হয়েছে, যা আন্তর্জাতিক ফ্যাশন ম্যাগাজিনের মানসম্মত।',
      en: 'Precision zone-masking and grain structuring in DaVinci Resolve, creating an iconic high-contrast editorial look.',
    },
    tools: ['DaVinci Resolve Studio', 'ARRI Alexa Mini LF', 'Premiere Pro'],
    metrics: {
      label: { bn: 'ক্যাম্পেইন কনভার্সন', en: 'Sales Uplift' },
      value: '+142% Brand Engagement',
    },
    hasGradeComparison: true,
  },
  {
    id: 'director-cut-soundtrack',
    title: {
      bn: 'কালার গ্রেডিং স্টুডিও শোকেস: ফিচার ফিল্ম মাস্টার',
      en: 'Color Grading Suite Showcase: Feature Master',
    },
    category: 'grading',
    categoryLabel: { bn: 'কালার গ্রেডিং', en: 'Color Grading' },
    client: 'CineVerse Pictures',
    year: '2024',
    duration: 'Full Master',
    image: '/src/assets/images/hero_cinematic_creator_1791477146525.jpg',
    description: {
      bn: 'ফুল-লেংথ ফিচার ফিল্মের প্রফেশনাল কালার গ্রেডিং। ডলবি ভিশন এইচডিআর এবং ডিসিপি থিয়েট্রিকাল রিলিজের জন্য কালার ক্যালিব্রেটেড মাস্টার ডেলিভারি।',
      en: 'Feature film master color grade in dedicated grading suite with calibrated Flanders Scientific reference displays and Dolby Vision HDR.',
    },
    challenge: {
      bn: 'ইনডোর নাইট সিন এবং হাই-কনট্রাস্ট ডেলাইটের মধ্যে ধারাবাহিক ভিজ্যুয়াল টোন রক্ষা করা।',
      en: 'Unifying disparate night-interior tungsten lighting and exterior daytime sequences into a cohesive narrative mood.',
    },
    solution: {
      bn: 'কাস্টম ৩ডি এলইউটি আর্কিটেকচার এবং শট-বাই-শট ব্যালেন্সিংয়ের মাধ্যমে নিখুঁত থিয়েটার গ্রেড নিশ্চিত করা।',
      en: 'Designed proprietary show LUT with gentle highlight roll-off and faithful skintone reproduction across 140 scenes.',
    },
    tools: ['DaVinci Resolve Mini Panel', 'ACES 1.3', 'Dolby Vision', 'Dehancer'],
    metrics: {
      label: { bn: 'থিয়েটার রিলিজ', en: 'Festivals & Theaters' },
      value: '12 Film Festivals',
    },
    hasGradeComparison: true,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'video-editing',
    number: '01',
    title: {
      bn: 'সিনেমাটিক ভিডিও এডিটিং ও পোস্ট-প্রোডাকশন',
      en: 'Cinematic Video Post-Production',
    },
    tagline: {
      bn: 'গল্পের ছন্দ, রিদম এবং আবেগকে স্ক্রিনে জীবন্ত করে তোলা',
      en: 'Rhythm, pace, and emotional resonance crafted frame by frame',
    },
    description: {
      bn: 'ডকুমেন্টারি, ইউটিউব প্রিমিয়াম কনটেন্ট, মিউজিক ভিডিও এবং কমার্শিয়ালের পূর্ণাঙ্গ এডিটিং। স্টোরিবোর্ড থেকে ফাইনাল এক্সপোর্ট পর্যন্ত নিখুঁত মনোযোগ।',
      en: 'Full post-production suite for documentaries, high-retention YouTube films, music videos, and TVCs with meticulous narrative pacing.',
    },
    deliverables: {
      bn: ['৪কে ও ৬কে মাস্টার এক্সপোর্ট', 'মাল্টি-ক্যামেরা সিংকিং', 'অডিও ক্লিনআপ ও ডায়ালগ ব্যালেন্স', 'সোশ্যাল মিডিয়া কাটডাউন (৯:১৬ ও ১:১)'],
      en: ['4K/6K Master Deliverables', 'Multi-camera Synchronization', 'Dialog Cleanup & Noise Reduction', 'Vertical Social Cuts (9:16 & 1:1)'],
    },
    software: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Final Cut Pro'],
    turnaround: { bn: '৩-৭ কার্যদিবস', en: '3–7 Business Days' },
  },
  {
    id: 'color-grading',
    number: '02',
    title: {
      bn: 'প্রফেশনাল কালার গ্রেডিং (DaVinci Resolve)',
      en: 'Master Color Grading & Film Emulation',
    },
    tagline: {
      bn: 'ফুটেজে দিন সিনেমাটিক ডেপথ এবং হলিউড মানের কালার সাইন্স',
      en: 'Breathtaking visual depth with industry-standard color science',
    },
    description: {
      bn: 'ফ্ল্যাট লগ ফুটেজকে রূপান্তর করুন জীবন্ত সিনেমাটিক মেজাজে। ন্যাচারাল স্কিনটোন প্রোটেকশন, ফিল্ম গ্রেইন, কাস্টম শো এলইউটি এবং পারফেক্ট শট ম্যাচিং।',
      en: 'Transform raw Log footage into filmic masterpieces. Accurate skintone preservation, film stock emulation, and custom LUT generation.',
    },
    deliverables: {
      bn: ['কাস্টম শো এলইউটি ফাইল (.cube)', 'ACES কালার পাইপলাইন ডেলিভারি', 'এইচডিআর ও এসডিআর মাস্টার', 'শট-টু-শট কালার কনসিস্টেন্সি'],
      en: ['Proprietary Show LUTs (.cube)', 'ACES Color Pipeline Delivery', 'HDR10 & SDR Rec.709 Masters', 'Scene-to-Scene Continuity Match'],
    },
    software: ['DaVinci Resolve Studio', 'ACES 1.3', 'FilmConvert Nitrate', 'Dehancer Pro'],
    turnaround: { bn: '২-৫ কার্যদিবস', en: '2–5 Business Days' },
  },
  {
    id: 'motion-graphics',
    number: '03',
    title: {
      bn: 'মোশন গ্রাফিক্স ও কাইনেটিক থ্রিডি ডিজাইন',
      en: 'Motion Graphics & Kinetic 3D Design',
    },
    tagline: {
      bn: 'তথ্য ও ব্র্যান্ডিংকে আকর্ষণীয় ভিজ্যুয়াল অ্যানিমেশনে রূপান্তর',
      en: 'Dynamic visual identities and kinetic typography in motion',
    },
    description: {
      bn: 'ভিডিওর জন্য ইন্ট্রো/আউট্রো, কাস্টম লোয়ার থার্ডস, লোগো অ্যানিমেশন, ইনফোগ্রাফিক ডেটা ভিজ্যুয়ালাইজেশন এবং থ্রিডি প্রোডাক্ট রেন্ডারিং।',
      en: 'High-end title openers, lower thirds, 3D product visualization, kinetic typography, and motion graphic packaging for modern brands.',
    },
    deliverables: {
      bn: ['আলফা চ্যানেল সম্বলিত ওভারলে (ProRes 4444)', 'টাইটেল ও গ্রাফিক্স প্যাকেজ', 'স্ক্র্যাচ থেকে তৈরি কাস্টম থ্রিডি অ্যাসেট'],
      en: ['Transparent Alpha Overlays (ProRes 4444)', 'Title & Lower Third Package', 'Custom 3D Scene Assets & Renders'],
    },
    software: ['After Effects', 'Cinema 4D', 'Redshift', 'Illustrator'],
    turnaround: { bn: '৪-১০ কার্যদিবস', en: '4–10 Business Days' },
  },
  {
    id: 'sound-design',
    number: '04',
    title: {
      bn: 'সাউন্ড ডিজাইন ও সিনেমাটিক অডিও মিক্সিং',
      en: 'Sound Design & Audio Mastering',
    },
    tagline: {
      bn: 'অর্ধেক ভিজ্যুয়াল প্রভাব আসে শক্তিশালী সাউন্ড থেকে',
      en: 'Elevate visual impact with immersive auditory depth',
    },
    description: {
      bn: 'ফলি এফেক্টস, অ্যাম্বিয়েন্স লেয়ারিং, ইম্প্যাক্ট ড্রপস, ভয়েসওভার এনহ্যান্সমেন্ট এবং ব্রডকাস্ট কমপ্লায়েন্ট লাউডনেস স্ট্যান্ডার্ড মিক্সিং।',
      en: 'Foley layering, cinematic whooshes, custom risers, environmental atmosphere, and dialogue enhancement mastered to broadcast standards (-14 LUFS).',
    },
    deliverables: {
      bn: ['স্টেম ফাইল (Music, SFX, Dialogue)', '২৪-বিট ওয়াভ মাস্টার অডিও', 'ইউটিউব/স্পটিফাই কমপ্লায়েন্ট লাউডনেস'],
      en: ['Stem Audio Files (Music, SFX, VO)', '24-bit 48kHz WAV Masters', 'YouTube/Streaming Standard Mastering'],
    },
    software: ['Adobe Audition', 'DaVinci Fairlight', 'iZotope RX 10'],
    turnaround: { bn: '২-৪ কার্যদিবস', en: '2–4 Business Days' },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: {
      bn: 'মাহমুদুলের কালার সেন্স এবং স্টোরিটেলিং এডিটিং আমাদের ইউটিউব ডকুমেন্টারির দর্শক রিটেনশন এক লাফে ৫০% বাড়িয়ে দিয়েছে। তাঁর কাজের গতি ও পেশাদারিত্ব অতুলনীয়।',
      en: 'Mahamudul’s color precision and narrative pacing skyrocketed our YouTube documentary audience retention by over 50%. A true master craftsman.',
    },
    author: 'Tanvir Hossain',
    role: { bn: 'ক্রিয়েটিভ ডিরেক্টর', en: 'Creative Director' },
    company: 'StoryCraft Media Dhaka',
    impact: { bn: '+৫০% রিটেনশন বৃদ্ধি', en: '+50% Viewer Retention' },
  },
  {
    id: 'test-2',
    quote: {
      bn: 'আমাদের লাক্সারি ব্র্যান্ডের কমার্শিয়াল শুট থেকে যে ভিজ্যুয়াল আউটপুট মাহমুদুলের গ্রেডিংয়ে তৈরি হয়েছে, তা আন্তর্জাতিক মানের যেকোনো ক্যাম্পেইনের সাথে প্রতিযোগিতা করার মতো।',
      en: 'The commercial color grading Mahamudul delivered for our luxury campaign stood shoulder-to-shoulder with top global fashion broadcasts.',
    },
    author: 'Samira Rahman',
    role: { bn: 'হেড অব ব্র্যান্ড মার্কেটিং', en: 'Head of Brand Marketing' },
    company: 'AURA Lifestyle',
    impact: { bn: '১.৮M+ অরগানিক ভিউজ', en: '1.8M+ Organic Reach' },
  },
  {
    id: 'test-3',
    quote: {
      bn: 'যেকোনো ডেডলাইনে তিনি নিখুঁত মানের কাজ ডেলিভারি দেন। DaVinci Resolve-এ তাঁর কালার ম্যানেজমেন্ট ও ফাইল হ্যান্ডলিং একদম পাইপলাইন ফ্রেন্ডলি।',
      en: 'Consistently beats turnaround deadlines while maintaining pristine color pipelines in DaVinci. An indispensable creative partner.',
    },
    author: 'Farhan Kabir',
    role: { bn: 'প্রযোজক ও সিনেমাটোগ্রাফার', en: 'Producer & Cinematographer' },
    company: 'FrameLight Studios',
    impact: { bn: '১২টি আন্তর্জাতিক ফেস্টিভ্যালে নির্বাচিত', en: 'Selected in 12 Global Festivals' },
  },
];

export const STATS = [
  { number: '150+', label: { bn: 'সফলভাবে সম্পন্ন প্রজেক্ট', en: 'Projects Delivered' } },
  { number: '12M+', label: { bn: 'দর্শক এনগেজমেন্ট ভিউ', en: 'Audience Impressions' } },
  { number: '6+', label: { bn: 'বছরের পেশাদার অভিজ্ঞতা', en: 'Years Experience' } },
  { number: '99%', label: { bn: 'ক্লায়েন্ট সন্তুষ্টি রেটিং', en: 'Client Satisfaction' } },
];
