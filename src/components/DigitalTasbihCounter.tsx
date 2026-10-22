import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  VibrateOff,
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  Info,
  ChevronRight,
  Flame,
  Minus,
  Download,
  Printer,
  X,
  Clock,
  Calendar,
  User,
  Share2,
  FileText,
  Award,
  ShieldCheck,
  Camera,
  Trash2,
  Upload,
  Mic,
  MicOff
} from 'lucide-react';
import { tasbihPresets, TasbihPreset } from '../data/islamicData';

export const DigitalTasbihCounter: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('subhanallah');
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(33);
  const [rounds, setRounds] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [vibrationEnabled, setVibrationEnabled] = useState<boolean>(true);
  // Optional: Speak Arabic Zikr aloud on every tap
  const [voiceOnTap, setVoiceOnTap] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [allTimeCount, setAllTimeCount] = useState<number>(0);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  // Time tracking: Session duration in seconds and session start time
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Certificate Modal State & Persistent User Avatar
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Photo change/delete confirmation reminder state
  const [confirmPhotoModal, setConfirmPhotoModal] = useState<'change' | 'delete' | null>(null);

  // Hidden Canvas for Photo Generation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Context Ref for synthesized subtle tick
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Selected Preset
  const currentPreset: TasbihPreset =
    tasbihPresets.find((p) => p.id === selectedPresetId) || tasbihPresets[0];

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedCount = localStorage.getItem(`tasbih_count_${selectedPresetId}`);
      const savedRounds = localStorage.getItem(`tasbih_rounds_${selectedPresetId}`);
      const savedAllTime = localStorage.getItem('tasbih_all_time_count');
      const savedSound = localStorage.getItem('tasbih_sound');
      const savedVibrate = localStorage.getItem('tasbih_vibrate');
      const savedVoiceOnTap = localStorage.getItem('tasbih_voice_on_tap');
      const savedName = localStorage.getItem('tasbih_user_name');
      const savedAvatar = localStorage.getItem('tasbih_user_avatar');

      if (savedCount !== null) setCount(parseInt(savedCount, 10) || 0);
      if (savedRounds !== null) setRounds(parseInt(savedRounds, 10) || 0);
      if (savedAllTime !== null) setAllTimeCount(parseInt(savedAllTime, 10) || 0);
      if (savedSound !== null) setSoundEnabled(savedSound === 'true');
      if (savedVibrate !== null) setVibrationEnabled(savedVibrate === 'true');
      if (savedVoiceOnTap !== null) setVoiceOnTap(savedVoiceOnTap === 'true');
      if (savedName) setUserName(savedName);
      if (savedAvatar) setUserAvatar(savedAvatar);
    } catch {
      // LocalStorage not available or blocked
    }
  }, [selectedPresetId]);

  // Handle Profile Avatar Upload and Permanent Local Storage
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create compact 240x240 center-cropped JPEG for permanent local storage
        const canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const minDim = Math.min(img.width, img.height);
          const startX = (img.width - minDim) / 2;
          const startY = (img.height - minDim) / 2;
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, 240, 240);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setUserAvatar(dataUrl);
          try {
            localStorage.setItem('tasbih_user_avatar', dataUrl);
          } catch {
            // storage limit
          }
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setUserAvatar('');
    try {
      localStorage.removeItem('tasbih_user_avatar');
    } catch {
      // ignore
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Photo Confirmation Triggers
  const handleRequestChangeAvatar = () => {
    if (userAvatar) {
      setConfirmPhotoModal('change');
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRequestDeleteAvatar = () => {
    setConfirmPhotoModal('delete');
  };

  const handleConfirmPhotoAction = () => {
    if (confirmPhotoModal === 'change') {
      setConfirmPhotoModal(null);
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);
    } else if (confirmPhotoModal === 'delete') {
      handleRemoveAvatar();
      setConfirmPhotoModal(null);
    }
  };

  // Session Timer: Run while active
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  // Sync target with current preset default
  useEffect(() => {
    setTarget(currentPreset.defaultTarget);
    try {
      const savedCount = localStorage.getItem(`tasbih_count_${selectedPresetId}`);
      const savedRounds = localStorage.getItem(`tasbih_rounds_${selectedPresetId}`);
      setCount(savedCount ? parseInt(savedCount, 10) || 0 : 0);
      setRounds(savedRounds ? parseInt(savedRounds, 10) || 0 : 0);
    } catch {
      setCount(0);
      setRounds(0);
    }
  }, [selectedPresetId]);

  // Format Session Duration to Bengali String
  const formatDurationBengali = (totalSecs: number): string => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    const toBn = (num: number) =>
      num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

    if (hours > 0) {
      return `${toBn(hours)} ঘণ্টা ${toBn(minutes)} মিনিট ${toBn(seconds)} সেকেন্ড`;
    }
    if (minutes > 0) {
      return `${toBn(minutes)} মিনিট ${toBn(seconds)} সেকেন্ড`;
    }
    return `${toBn(seconds)} সেকেন্ড`;
  };

  // Format Current Date in Bengali
  const getBengaliFormattedDate = (): string => {
    const now = new Date();
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const toBn = (num: number) =>
      num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

    const day = toBn(now.getDate());
    const month = months[now.getMonth()];
    const year = toBn(now.getFullYear());

    let hours = now.getHours();
    const ampm = hours >= 12 ? 'বিকাল/রাত' : 'সকাল';
    hours = hours % 12 || 12;
    const minutes = toBn(now.getMinutes()).padStart(2, '০');

    return `${day} ${month} ${year}, ${ampm} ${toBn(hours)}:${minutes}`;
  };

  // Format Date only in Bengali (e.g. ২১ অক্টোবর ২০২৬)
  const getBengaliDateOnly = (): string => {
    const now = new Date();
    const months = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const toBn = (num: number) =>
      num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);

    return `${toBn(now.getDate())} ${months[now.getMonth()]} ${toBn(now.getFullYear())}`;
  };

  // Format Session Time Range (e.g. সকাল ১০:১৫ হতে সকাল ১০:৩৫ পর্যন্ত)
  const formatSessionTimeRange = (start: Date, end: Date): string => {
    const toBn = (num: number) =>
      num.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
    const formatTime = (d: Date) => {
      let hours = d.getHours();
      const ampm = hours >= 12 ? 'বিকাল/রাত' : 'সকাল';
      hours = hours % 12 || 12;
      const mins = toBn(d.getMinutes()).padStart(2, '০');
      return `${ampm} ${toBn(hours)}:${mins}`;
    };
    return `${formatTime(start)} হতে ${formatTime(end)} পর্যন্ত`;
  };

  // Play subtle mechanical sound via Web Audio API
  const playClickSound = (isFinish = false) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isFinish) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio not permitted
    }
  };

  // Vibration feedback
  const triggerVibrate = (isFinish = false) => {
    if (!vibrationEnabled) return;
    try {
      if ('vibrate' in navigator) {
        if (isFinish) {
          navigator.vibrate([40, 60, 100]);
        } else {
          navigator.vibrate(20);
        }
      }
    } catch {
      // Vibrate not supported
    }
  };

  // Handle Count Increment (+1)
  const handleIncrement = () => {
    // Start active timer & capture start time if not started
    if (!isTimerActive) {
      setIsTimerActive(true);
      setSessionStartTime(new Date());
    }

    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    const nextCount = count + 1;
    const nextAllTime = allTimeCount + 1;

    setAllTimeCount(nextAllTime);

    // If voice on tap is enabled, speak the Zikr in reverent male voice
    if (voiceOnTap && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const cleanArabic = currentPreset.arabic.replace(/[۝۩۞۰-৯0-9]+/g, ' ').trim();
        const utt = new SpeechSynthesisUtterance(cleanArabic);
        utt.lang = 'ar-SA';
        utt.pitch = 0.72; // deep male voice
        utt.rate = 1.05; // brisk responsiveness for clicks
        const voices = window.speechSynthesis.getVoices();
        const maleAr =
          voices.find((v) => v.lang.startsWith('ar') && /male|hassan|tariq|maged|ahmed|omar|george|david/i.test(v.name)) ||
          voices.find((v) => v.lang.startsWith('ar'));
        if (maleAr) utt.voice = maleAr;
        window.speechSynthesis.speak(utt);
      } catch {
        // speech error ignore
      }
    }

    // Target reached check
    if (target > 0 && nextCount >= target) {
      setCount(0);
      const nextRounds = rounds + 1;
      setRounds(nextRounds);
      setShowCelebration(true);
      playClickSound(true);
      triggerVibrate(true);

      try {
        localStorage.setItem(`tasbih_count_${selectedPresetId}`, '0');
        localStorage.setItem(`tasbih_rounds_${selectedPresetId}`, nextRounds.toString());
        localStorage.setItem('tasbih_all_time_count', nextAllTime.toString());
      } catch {
        // ignore
      }
    } else {
      setCount(nextCount);
      playClickSound(false);
      triggerVibrate(false);

      try {
        localStorage.setItem(`tasbih_count_${selectedPresetId}`, nextCount.toString());
        localStorage.setItem('tasbih_all_time_count', nextAllTime.toString());
      } catch {
        // ignore
      }
    }
  };

  // Reset current count
  const handleReset = () => {
    setCount(0);
    setRounds(0);
    setSessionSeconds(0);
    setIsTimerActive(false);
    setShowCelebration(false);
    try {
      localStorage.setItem(`tasbih_count_${selectedPresetId}`, '0');
      localStorage.setItem(`tasbih_rounds_${selectedPresetId}`, '0');
    } catch {
      // ignore
    }
  };

  // Step -1
  const handleDecrement = () => {
    if (count > 0) {
      const next = count - 1;
      setCount(next);
      try {
        localStorage.setItem(`tasbih_count_${selectedPresetId}`, next.toString());
      } catch {
        // ignore
      }
    }
  };

  // Keyboard shortcut (Space / Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleIncrement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [count, target, rounds, allTimeCount, selectedPresetId, soundEnabled, vibrationEnabled, isTimerActive]);

  // Save User Name
  const handleSaveName = (name: string) => {
    setUserName(name);
    try {
      localStorage.setItem('tasbih_user_name', name);
    } catch {
      // ignore
    }
  };

  // Print Certificate Card
  const handlePrint = () => {
    window.print();
  };

  // Generate & Download Slide Certificate Image to Mobile Gallery / PC
  const handleDownloadImage = async () => {
    setIsGeneratingImage(true);
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 840;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsGeneratingImage(false);
        return;
      }

      // Background Fresh Light-Yellow / Warm Amber Gradient
      const grad = ctx.createLinearGradient(0, 0, 1200, 840);
      grad.addColorStop(0, '#fffdf5');
      grad.addColorStop(0.3, '#fef9c3'); // soft fresh yellow
      grad.addColorStop(0.7, '#fef08a'); // yellow-200
      grad.addColorStop(1, '#fde68a');   // warm amber-200
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 840);

      // Elegant Gold Outer Border
      ctx.strokeStyle = '#d97706'; // amber-600
      ctx.lineWidth = 6;
      ctx.strokeRect(32, 32, 1136, 776);

      // Inner Fine Gold Line
      ctx.strokeStyle = '#f59e0b'; // amber-500
      ctx.lineWidth = 1.5;
      ctx.strokeRect(44, 44, 1112, 752);

      // Gold Corner Accents
      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = '#b45309';
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCorner(44, 44);
      drawCorner(1156, 44);
      drawCorner(44, 796);
      drawCorner(1156, 796);

      // Bismillah
      ctx.fillStyle = '#78350f'; // amber-900
      ctx.font = 'bold 28px "Traditional Arabic", "Amiri", serif';
      ctx.textAlign = 'center';
      ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 600, 85);

      // Title & Subtitle
      ctx.fillStyle = '#1c1917'; // stone-900
      ctx.font = '900 34px sans-serif';
      ctx.fillText('দৈনন্দিন জিকির ও তাসবীহ আমলনামা সনদ', 600, 130);

      ctx.fillStyle = '#92400e'; // amber-800
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('সহিহ সুন্নাহ মোতাবেক ইবাদত ও আমলের প্রত্যয়নপত্র', 600, 158);

      // Separator Line
      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(180, 180);
      ctx.lineTo(1020, 180);
      ctx.stroke();

      // Top Row: নাম: on left, Small circular photo on right
      ctx.textAlign = 'left';
      ctx.fillStyle = '#44403c';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('নাম:', 80, 235);

      ctx.fillStyle = '#1c1917';
      ctx.font = '900 32px sans-serif';
      ctx.fillText(userName.trim() ? userName : 'আল্লাহর এক মুখাপেক্ষী বান্দা', 145, 235);

      // Small Circular Photo on the right (x: 1070, y: 225, radius: 40)
      const avatarX = 1070;
      const avatarY = 225;
      const avatarRadius = 40;

      if (userAvatar) {
        try {
          const avatarImg = new Image();
          avatarImg.src = userAvatar;
          await new Promise<void>((resolve) => {
            if (avatarImg.complete) {
              resolve();
            } else {
              avatarImg.onload = () => resolve();
              avatarImg.onerror = () => resolve();
            }
          });
          ctx.save();
          ctx.beginPath();
          ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(avatarImg, avatarX - avatarRadius, avatarY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
          ctx.restore();
        } catch {
          // fallback
        }
      } else {
        // Fallback Circular Monogram
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('আমল', avatarX, avatarY + 7);
      }

      // Avatar Ring
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Divider below Name & Photo
      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(80, 280);
      ctx.lineTo(1120, 280);
      ctx.stroke();

      // Item 1: কত সময় ব্যয় করলো
      ctx.textAlign = 'left';
      ctx.fillStyle = '#57534e';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('ব্যয়িত সময়:', 80, 325);

      ctx.fillStyle = '#065f46'; // dark emerald
      ctx.font = '900 28px sans-serif';
      ctx.fillText(formatDurationBengali(sessionSeconds), 235, 325);

      // Item 2: কোন জিকির
      ctx.fillStyle = '#57534e';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('পঠিত জিকির:', 80, 385);

      // Large Arabic Zikr
      ctx.fillStyle = '#022c22';
      ctx.font = 'bold 44px "Traditional Arabic", "Amiri", serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentPreset.arabic, 600, 440);

      // Bengali Title & Meaning
      ctx.fillStyle = '#1c1917';
      ctx.font = '900 26px sans-serif';
      ctx.fillText(currentPreset.title, 600, 485);

      ctx.fillStyle = '#44403c';
      ctx.font = 'italic 20px sans-serif';
      ctx.fillText(`“${currentPreset.meaning}”`, 600, 520);

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText(`দলিল: ${currentPreset.hadithRef}`, 600, 552);

      // Item 3: কত তারিখে কয়টা থেকে কয়টা পর্যন্ত জিকির করলো (Realtime)
      ctx.textAlign = 'left';
      ctx.fillStyle = '#57534e';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('তারিখ ও সময়কাল:', 80, 615);

      ctx.fillStyle = '#1c1917';
      ctx.font = 'bold 22px sans-serif';
      const timeRangeString = `${getBengaliDateOnly()} • ${formatSessionTimeRange(sessionStartTime, new Date())}`;
      ctx.fillText(timeRangeString, 280, 615);

      // Item 4: কতবার জিকির করলো
      ctx.fillStyle = '#57534e';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('মোট জিকির সংখ্যা:', 80, 675);

      ctx.fillStyle = '#065f46';
      ctx.font = '900 34px monospace';
      ctx.fillText(`${count} বার`, 280, 675);

      ctx.fillStyle = '#92400e';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`(${rounds} চক্র সম্পন্ন)`, 460, 675);

      // Bottom Blessing & Dua
      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(80, 715);
      ctx.lineTo(1120, 715);
      ctx.stroke();

      ctx.fillStyle = '#78350f';
      ctx.font = 'bold 19px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('আল্লাহ তাআলা আমাদের সকল জিকির ও আমল কবুল ও মঞ্জুর করুন — আমিন।', 600, 755);
      // Trigger Download to Gallery
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `zikr-sanad-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsGeneratingImage(false);
    } catch (err) {
      console.error(err);
      setIsGeneratingImage(false);
    }
  };

  // Target progress percentage
  const progressPercent = target > 0 ? Math.min(100, Math.round((count / target) * 100)) : 100;
  const strokeDashoffset = 440 - (440 * progressPercent) / 100;

  return (
    <div className="space-y-6">
      
      {/* Embedded Print CSS for Clean A4 / Slide PDF Export */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-amalnama-card, #printable-amalnama-card * {
            visibility: visible !important;
          }
          #printable-amalnama-card {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 32px !important;
            background: linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #fde68a 100%) !important;
            color: #1e293b !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            border: 4px solid #d97706 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
        }
      `}</style>

      {/* Main Grid: Left Counter Device | Right Zikr Presets & Authentic Virtues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Precision Tactile Digital Counter Device (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-stone-200 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06)] p-5 sm:p-7 flex flex-col items-center justify-between">
          
          {/* Top Control Bar: Target Selector + Sound, Vibrate, Reset */}
          <div className="w-full flex items-center justify-between pb-4 border-b border-stone-150 gap-2 flex-wrap">
            {/* Target Select Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[11px] font-bold text-stone-500 mr-1 hidden sm:inline">টার্গেট:</span>
              {[33, 100, 300, 0].map((t) => (
                <button
                  key={t}
                  onClick={() => setTarget(t)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    target === t
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {t === 0 ? 'মুক্ত' : t}
                </button>
              ))}
            </div>

            {/* Toggle Buttons (Sound, Vibrate, Reset) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  const n = !soundEnabled;
                  setSoundEnabled(n);
                  try { localStorage.setItem('tasbih_sound', n.toString()); } catch {}
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  soundEnabled
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-150'
                }`}
                title={soundEnabled ? 'শব্দ চালু আছে (বন্ধ করুন)' : 'শব্দ বন্ধ আছে (চালু করুন)'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  const n = !vibrationEnabled;
                  setVibrationEnabled(n);
                  try { localStorage.setItem('tasbih_vibrate', n.toString()); } catch {}
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  vibrationEnabled
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-150'
                }`}
                title={vibrationEnabled ? 'ভাইব্রেশন চালু আছে' : 'ভাইব্রেশন বন্ধ আছে'}
              >
                {vibrationEnabled ? <Vibrate className="w-4 h-4" /> : <VibrateOff className="w-4 h-4" />}
              </button>

              {/* Optional: Voice recitation on every tap */}
              <button
                onClick={() => {
                  const n = !voiceOnTap;
                  setVoiceOnTap(n);
                  try { localStorage.setItem('tasbih_voice_on_tap', n.toString()); } catch {}
                }}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1 ${
                  voiceOnTap
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                    : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-150'
                }`}
                title={voiceOnTap ? 'ট্যাপে জিকির আওয়াজ চালু আছে (বন্ধ করুন)' : 'ট্যাপে জিকির শুনুন (ঐচ্ছিক চালু করুন)'}
              >
                {voiceOnTap ? <Mic className="w-4 h-4 text-amber-700" /> : <MicOff className="w-4 h-4" />}
                <span className="text-[10px] font-bold hidden sm:inline">{voiceOnTap ? 'জিকির ভয়েস' : 'ভয়েস'}</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-200 hover:border-rose-200 transition-all cursor-pointer"
                title="কাউন্টার রিসেট করুন"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Zikr Preview Banner */}
          <div className="w-full text-center py-4 my-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 tracking-wide dir-rtl">
              {currentPreset.arabic}
            </h2>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">
              {currentPreset.bangla}
            </p>
            <p className="text-[11px] sm:text-xs text-stone-500 italic mt-0.5 max-w-md mx-auto line-clamp-1">
              {currentPreset.meaning}
            </p>
          </div>

          {/* Slim Horizontal Options Row (ব্যয়িত সময়, মোট জিকির, চক্র, সনদপত্র ও PDF) Directly Above Clicker */}
          <div className="w-full bg-stone-50/90 border border-stone-200/90 rounded-2xl p-2 sm:p-2.5 my-2 flex items-center justify-between gap-1.5 sm:gap-2 flex-wrap shadow-2xs">
            {/* Time Active */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span className="text-[11px] font-bold text-stone-500 hidden sm:inline">ব্যয়িত সময়:</span>
              <span className="text-xs font-mono font-black text-stone-900">
                {formatDurationBengali(sessionSeconds)}
              </span>
            </div>

            {/* Total Dhikr */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-[11px] font-bold text-stone-500 hidden sm:inline">মোট জিকির:</span>
              <span className="text-xs font-mono font-black text-stone-900">
                {allTimeCount}
              </span>
            </div>

            {/* Completed Rounds */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-stone-500 hidden sm:inline">চক্র:</span>
              <span className="text-xs font-mono font-black text-stone-900">
                {rounds}
              </span>
            </div>

            {/* Certificate & PDF Download Action */}
            <button
              onClick={() => setShowCertificateModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer border border-amber-400/30 ml-auto"
              title="আমলনামা সনদ ও PDF ডাউনলোড"
            >
              <Award className="w-3.5 h-3.5 text-amber-100" />
              <span>সনদপত্র / PDF</span>
            </button>
          </div>

          {/* Precision Digital Tactile Tap Counter Sphere */}
          <div className="relative my-3 flex items-center justify-center">
            {/* SVG Ring Progress */}
            <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="70"
                className="stroke-stone-150"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="70"
                className="stroke-emerald-500 transition-all duration-300 ease-out"
                strokeWidth="10"
                strokeDasharray="440"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Tap Button Center (Modern Luxury OLED Dial) */}
            <button
              onClick={handleIncrement}
              className={`absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full flex flex-col items-center justify-center shadow-[0_15px_40px_rgba(16,185,129,0.22)] select-none transition-all duration-150 cursor-pointer active:scale-95 ${
                isPressing
                  ? 'bg-gradient-to-b from-emerald-700 to-teal-800 scale-95 shadow-inner'
                  : 'bg-gradient-to-b from-stone-900 via-stone-900 to-black hover:from-stone-850 hover:to-zinc-950 text-white'
              }`}
            >
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-mono font-bold text-emerald-400 mb-1">
                {target > 0 ? `টার্গেট: ${target}` : 'মুক্ত গণনা'}
              </span>

              {/* Glowing LED Number */}
              <span className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]">
                {count}
              </span>

              <span className="text-[11px] sm:text-xs font-bold text-stone-400 mt-2 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ট্যাপ করুন বা স্পেস চাপুন
              </span>
            </button>
          </div>

          {/* Celebration Toast if Target Reached */}
          {showCelebration && (
            <div className="w-full bg-emerald-50 border border-emerald-300 rounded-xl p-3 my-2 text-center animate-fade-in flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-emerald-900 text-xs sm:text-sm font-bold text-left">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>আলহামদুলিল্লাহ! আপনার ১ চক্র ({target} বার) সম্পন্ন হয়েছে।</span>
              </div>
              <button
                onClick={() => setShowCelebration(false)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shrink-0"
              >
                পরবর্তী চক্র
              </button>
            </div>
          )}

          {/* Bottom Dock: -1, Progress, and High-Status PDF Download CTA */}
          <div className="w-full pt-4 border-t border-stone-150 flex items-center justify-between text-xs text-stone-500 font-bold gap-2 flex-wrap">
            <button
              onClick={handleDecrement}
              disabled={count === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
              <span>-১ কম</span>
            </button>

            <span className="text-xs font-mono text-stone-600 text-center">
              রাউন্ড {rounds} • প্রগ্রেস {progressPercent}%
            </span>

            {/* High-Status Professional PDF & Certificate Button */}
            <button
              onClick={() => setShowCertificateModal(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer border border-emerald-400/30"
              title="আমলনামা সনদ ও PDF ডাউনলোড করুন"
            >
              <FileText className="w-4 h-4 text-emerald-200" />
              <span>পিডিএফ সনদ ডাউনলোড</span>
            </button>
          </div>

        </div>

        {/* Right Column: 12 Presets & Hadith Reference Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Zikr Authentic Detail Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>হাদিসের সহিহ রেফারেন্স ও ফজিলত</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2">
              {currentPreset.title}
            </h3>

            <div className="space-y-2.5 text-xs sm:text-sm text-stone-700">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-150">
                <strong className="block text-stone-900 font-bold mb-1">অর্থ:</strong>
                {currentPreset.meaning}
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-emerald-950">
                <strong className="block text-emerald-900 font-bold mb-1">ফজিলত ও বরকত:</strong>
                {currentPreset.virtue}
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-amber-950 font-sans">
                <strong className="block text-amber-900 font-bold mb-0.5">সহিহ দলিল:</strong>
                {currentPreset.hadithRef}
              </div>
            </div>
          </div>

          {/* Quick Presets Picker List */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>নির্বাচিত ১২টি মাসনূন জিকির তালিকা</span>
            </h3>

            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
              {tasbihPresets.map((preset) => {
                const isActive = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm truncate">
                        {preset.title}
                      </div>
                      <div className={`text-[11px] font-serif truncate ${isActive ? 'text-emerald-100' : 'text-stone-500'}`}>
                        {preset.arabic}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {preset.defaultTarget}x
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* =======================================================================
          FRESH LIGHT-YELLOW GRADIENT CERTIFICATE & GALLERY DOWNLOAD MODAL
      ======================================================================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
          {/* Single, pristine fresh yellow page with gold trim - No extra nested shapes */}
          <div
            id="printable-amalnama-card"
            className="relative w-full max-w-xl bg-gradient-to-br from-[#fffdf5] via-[#fef9c3] to-[#fde68a] border-4 border-amber-500 rounded-3xl p-5 sm:p-7 text-stone-900 shadow-2xl my-auto space-y-4 overflow-hidden"
          >
            {/* Top Close Button (hidden when printed) */}
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-amber-200/60 hover:bg-amber-300 text-stone-700 hover:text-stone-900 transition-colors cursor-pointer print:hidden z-10"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Bismillah & Title */}
            <div className="text-center space-y-0.5 pt-1">
              <div className="text-amber-900 text-lg sm:text-2xl font-serif font-bold tracking-wide">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">
                দৈনন্দিন জিকির ও তাসবীহ আমলনামা সনদ
              </h3>
              <p className="text-[11px] sm:text-xs text-amber-800 font-bold">
                সহিহ সুন্নাহ মোতাবেক দৈনন্দিন ইবাদতের সত্যায়িত প্রত্যয়নপত্র
              </p>
            </div>

            <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1" />

            {/* Header Line: নাম: on left | Small circular Photo on right */}
            <div className="flex items-center justify-between border-b border-amber-300/80 pb-3 pt-1">
              <div className="flex items-center gap-2 flex-1 min-w-0 pr-2">
                <span className="font-black text-sm sm:text-base text-stone-800 shrink-0">নাম:</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => handleSaveName(e.target.value)}
                  placeholder="আপনার নাম লিখুন..."
                  className="bg-transparent border-b-2 border-amber-400 focus:border-amber-600 font-black text-sm sm:text-base text-stone-900 focus:outline-none flex-1 max-w-xs"
                />
              </div>

              {/* Right: Small Photo with Change/Delete & Reminder */}
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                <div
                  onClick={handleRequestChangeAvatar}
                  className="relative w-12 h-12 rounded-full border-2 border-amber-500 overflow-hidden bg-white shadow-xs cursor-pointer group flex items-center justify-center shrink-0"
                  title="ছবি যোগ বা পরিবর্তন করতে ক্লিক করুন"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt="আমলকারী" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-amber-700">
                      <Camera className="w-4 h-4" />
                      <span className="text-[8px] font-bold">ছবি</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 print:hidden">
                  <button
                    type="button"
                    onClick={handleRequestChangeAvatar}
                    className="px-2 py-0.5 rounded-md bg-amber-500 hover:bg-amber-600 text-stone-950 text-[10px] font-bold cursor-pointer transition-all"
                  >
                    {userAvatar ? 'পরিবর্তন' : 'ছবি যোগ'}
                  </button>
                  {userAvatar && (
                    <button
                      type="button"
                      onClick={handleRequestDeleteAvatar}
                      className="p-1 rounded-md bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] cursor-pointer transition-all flex items-center justify-center"
                      title="ছবি ডিলিট করুন"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Direct Lines on the Fresh Yellow Page - Clean, spacious, unboxed */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-stone-800">
              
              {/* কত সময় ব্যয় করলো */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-700 shrink-0">ব্যয়িত সময়:</span>
                <span className="font-black text-emerald-800 text-sm sm:text-base">
                  {formatDurationBengali(sessionSeconds)}
                </span>
              </div>

              {/* কোন জিকির */}
              <div className="space-y-1">
                <span className="font-bold text-stone-700 block">পঠিত জিকির:</span>
                <div className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 dir-rtl">
                  {currentPreset.arabic}
                </div>
                <div className="font-black text-stone-900 text-sm sm:text-base">
                  {currentPreset.title}
                </div>
                <div className="text-stone-700 italic text-xs">
                  &ldquo;{currentPreset.meaning}&rdquo;
                </div>
                <div className="text-[11px] text-amber-900 font-bold">
                  দলিল: {currentPreset.hadithRef}
                </div>
              </div>

              {/* কত তারিখে কয়টা থেকে কয়টা পর্যন্ত জিকির করলো */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="font-bold text-stone-700 shrink-0">তারিখ ও সময়কাল:</span>
                <span className="font-black text-stone-900">
                  {getBengaliDateOnly()} • {formatSessionTimeRange(sessionStartTime, new Date())}
                </span>
              </div>

              {/* কতবার জিকির করলো */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-700 shrink-0">মোট জিকির:</span>
                <span className="font-black font-mono text-emerald-800 text-base sm:text-lg">
                  {count} বার
                </span>
                <span className="text-xs text-amber-900 font-black">
                  ({rounds} চক্র সম্পন্ন)
                </span>
              </div>

            </div>

            {/* Official Seal / Dua */}
            <div className="text-center text-[11px] sm:text-xs font-black text-amber-950 pt-2 border-t border-amber-300/80">
              আল্লাহ তাআলা আমাদের সকল জিকির ও আমল কবুল ও মঞ্জুর করুন — আমিন।
            </div>

            {/* Action Toolbar: Download PNG to Gallery, Print / PDF */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 print:hidden">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-stone-800 text-xs font-bold border border-amber-300 shadow-2xs transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>সনদ প্রিন্ট / PDF</span>
              </button>

              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 border border-amber-400"
                title="গ্যালারিতে সরাসরি ফটো সেভ করুন"
              >
                <Download className="w-4 h-4 text-stone-950" />
                <span>
                  {isGeneratingImage ? 'ছবি তৈরি হচ্ছে...' : 'গ্যালারিতে ডাউনলোড (PNG)'}
                </span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Dialog when Changing or Deleting Photo: আর ইউ শিওর? */}
      {confirmPhotoModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full text-center shadow-2xl border-2 border-amber-400 space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Info className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-stone-900">
              আপনি কি নিশ্চিত? (Are you sure?)
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {confirmPhotoModal === 'delete'
                ? 'আপনি কি প্রোফাইল ছবিটি মুছে ফেলতে চান?'
                : 'আপনি কি বর্তমান প্রোফাইল ছবিটি পরিবর্তন করতে চান?'}
            </p>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setConfirmPhotoModal(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold cursor-pointer transition-all"
              >
                না, বাতিল
              </button>
              <button
                onClick={handleConfirmPhotoAction}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs font-black shadow-xs cursor-pointer transition-all"
              >
                হ্যাঁ, নিশ্চিত
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for High-Res Image Generation */}
      <canvas ref={canvasRef} className="hidden" />

    </div>
  );
};
