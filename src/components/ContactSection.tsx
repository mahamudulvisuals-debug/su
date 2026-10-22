import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Copy, Check, ExternalLink, Heart } from 'lucide-react';

interface ContactSectionProps {
  language: Language;
  prefilledMessage: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  prefilledMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'all-in-one',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({
        ...prev,
        details: prefilledMessage,
      }));
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'SB-' + Math.floor(100000 + Math.random() * 900000);
    setSubmissionId(id);
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mahamudul.visuals@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const creatorEmail = 'mahamudul.visuals@gmail.com';

  return (
    <section id="contact" className="border-t border-cyan-500/10 bg-transparent py-14 sm:py-20 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Direct Contact Details & Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-400">
              <Heart className="h-4 w-4 fill-rose-400" />
              <span>{language === 'bn' ? 'যোগাযোগ ও সহায়তা' : 'Support & Contact'}</span>
            </div>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl text-balance">
              {language === 'bn' ? 'সুমাইয়ার সাথে যোগাযোগ' : 'Connect with Sumaiyah'}
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {language === 'bn'
                ? 'স্লাইডগুলো সংগ্রহ করতে, আম্মুর চিকিৎসায় পাশে দাঁড়াতে বা যেকোনো উৎসাহব্যঞ্জক বার্তা দিতে নিচে ফর্মটি পূরণ করুন কিংবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।'
                : 'To purchase slides, assist with my mother’s medical treatment, or send a heartfelt message, please fill the form or connect via WhatsApp.'}
            </p>

            {/* Direct Cards */}
            <div className="mt-8 space-y-4">
              {/* Email Card */}
              <div className="flex items-center justify-between rounded-2xl border border-cyan-500/20 bg-[#021d33]/65 backdrop-blur-md p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-cyan-200/70">
                      {language === 'bn' ? 'অফিসিয়াল যোগাযোগ ইমেইল' : 'Direct Email'}
                    </span>
                    <a
                      href={`mailto:${creatorEmail}`}
                      className="block text-xs font-semibold text-white hover:text-cyan-300 sm:text-sm"
                    >
                      {creatorEmail}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="rounded-lg p-2 text-cyan-200/70 transition-colors hover:bg-cyan-900/40 hover:text-white"
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/8801916027243?text=${encodeURIComponent('আসসালামু আলাইকুম সুমাইয়া। আমি আপনার তৈরি স্লাইড বান্ডেলটি কিনে আপনার আম্মুর চিকিৎসা ও পড়াশোনায় সাহায্য করতে চাই।')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-[#022b33]/60 backdrop-blur-md p-4 transition-colors hover:border-emerald-400/50 hover:bg-[#023842]/70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/50 text-emerald-400 border border-emerald-500/30">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-emerald-200/70">
                      {language === 'bn' ? 'সরাসরি হোয়াটসঅ্যাপ মেসেজ' : 'Instant WhatsApp'}
                    </span>
                    <span className="block text-xs font-semibold text-white group-hover:text-emerald-300 sm:text-sm">
                      {language === 'bn' ? 'হোয়াটসঅ্যাপে কথা বলুন' : 'Chat on WhatsApp'}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-emerald-300/70 group-hover:text-emerald-300" />
              </a>
            </div>

            {/* Reassurance */}
            <div className="mt-8 border-t border-cyan-500/15 pt-6 text-xs text-cyan-200/70 space-y-1.5">
              <p>
                <strong className="text-zinc-200">{language === 'bn' ? 'ডেলিভারি মাধ্যম:' : 'Delivery Method:'}</strong> {language === 'bn' ? 'গুগল ড্রাইভ ও ক্যানভা এডিটেবল লিংক তাৎক্ষণিক পাঠানো হবে' : 'Google Drive & Canva editable links sent immediately'}
              </p>
              <p>
                <strong className="text-zinc-200">{language === 'bn' ? 'পেমেন্ট মাধ্যম:' : 'Payment:'}</strong> bKash / Nagad / Rocket / Bank Transfer / Card
              </p>
            </div>
          </div>

          {/* Right Column: Order & Support Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-cyan-500/20 bg-[#021d33]/65 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-cyan-950/40">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-white">
                    {language === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Received!'}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-300 max-w-md mx-auto">
                    {language === 'bn'
                      ? 'সুমাইয়ার পাশে দাঁড়ানোর জন্য আপনার প্রতি অশেষ কৃতজ্ঞতা। আপনার রেফারেন্স আইডি:'
                      : 'Thank you deeply for your kindness and support. Your reference ticket ID:'}
                  </p>
                  <p className="mt-2 font-mono text-base font-bold text-rose-400">{submissionId}</p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {language === 'bn'
                      ? 'আমরা অবিলম্বে আপনার ইমেইল বা হোয়াটসঅ্যাপে স্লাইড লিংক ও বিস্তারিত পাঠিয়ে দেব।'
                      : 'We will share the slide download details with you shortly via email/phone.'}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        category: 'all-in-one',
                        details: '',
                      });
                    }}
                    className="mt-6 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-xs font-semibold text-zinc-200 hover:text-white"
                  >
                    {language === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        {language === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'bn' ? 'যেমন: আরিফুল ইসলাম' : 'e.g. John Doe'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#011424]/85 px-3.5 py-2.5 text-xs text-white placeholder-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        {language === 'bn' ? 'ইমেইল এড্রেস (যেখানে স্লাইড পাঠানো হবে) *' : 'Email Address (for slide link) *'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#011424]/85 px-3.5 py-2.5 text-xs text-white placeholder-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        {language === 'bn' ? 'ফোন / হোয়াটসঅ্যাপ নম্বর *' : 'Phone / WhatsApp *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+880 1..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#011424]/85 px-3.5 py-2.5 text-xs text-white placeholder-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        {language === 'bn' ? 'উদ্দেশ্য / স্লাইড প্যাকেজ' : 'Purpose / Package'}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-xl border border-cyan-500/20 bg-[#011424]/90 px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="all-in-one">{language === 'bn' ? 'অল-ইন-ওয়ান মেগা মাস্টার বান্ডেল (৳৪৯০)' : 'All-in-One Mega Master Bundle ($8 / ৳490)'}</option>
                        <option value="academic">{language === 'bn' ? 'একাডেমিক ও বিশ্ববিদ্যালয় স্লাইড প্যাক (৳১৯০)' : 'Academic & Thesis Pack ($3 / ৳190)'}</option>
                        <option value="business">{language === 'bn' ? 'বিজনেস ও পিচডেক স্লাইড প্যাক (৳২৯০)' : 'Business Pitch Deck Pack ($5 / ৳290)'}</option>
                        <option value="direct-support">{language === 'bn' ? 'আম্মুর চিকিৎসায় সরাসরি আর্থিক সাহায্য' : 'Direct Support for Mother’s Treatment'}</option>
                        <option value="other">{language === 'bn' ? 'অন্যান্য বার্তা / পরামর্শ' : 'Other Message'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      {language === 'bn' ? 'আপনার বার্তা বা শুভেচ্ছা' : 'Your Message or Note'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={language === 'bn' ? 'সুমাইয়ার উদ্দেশ্যে কিছু লিখতে চাইলে এখানে লিখুন...' : 'Write any message or encouragement for Sumaiyah...'}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full rounded-xl border border-cyan-500/20 bg-[#011424]/85 px-3.5 py-2.5 text-xs text-white placeholder-cyan-200/40 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 text-xs font-semibold text-white transition-all hover:bg-rose-500 active:scale-95 shadow-lg shadow-rose-600/25"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    <span>{language === 'bn' ? 'স্লাইড সংগ্রহ করুন ও পাশে দাঁড়ান' : 'Submit & Purchase Slides'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
