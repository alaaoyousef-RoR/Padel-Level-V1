import React from 'react';
import { MessageSquare, Clock, Phone, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 text-right space-y-10">
      
      {/* Header */}
      <div className="card-dark p-8 sm:p-10 rounded-xl border border-[rgba(248,249,250,0.12)] space-y-3 text-center sm:text-right">
        <span className="label-mono">[ DIRECT CHANNELS & PARTNERSHIPS ]</span>
        <h1 className="font-alexandria font-black text-3xl sm:text-4xl text-white tracking-tight uppercase">
          تواصل مع الفريق <span className="text-[#d4ff00]">والشراكات</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f8f9fa]/70 leading-relaxed max-w-xl">
          تواصل معنا مباشرة عبر قنوات الواتساب المتاحة على مدار الساعة، أو تعرف على برامج الشراكة القادمة للأندية والمدربين.
        </p>
      </div>

      {/* Direct Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Direct */}
        <div className="card-dark p-6 rounded-2xl border border-white/15 hover:border-[#b2e01e]/40 transition space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono-tag text-[10px] text-white/50 uppercase block">DIRECT WHATSAPP</span>
            <h3 className="font-bold text-white text-base mt-0.5">التواصل الفوري عبر الواتساب</h3>
            <p className="text-xs text-white/70 mt-1">تحدث مباشرة مع فريق الدعم الفني والتدريبي.</p>
          </div>
          <a
            href="https://wa.me/966500365049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-[#002255] font-black text-xs py-2.5 px-4 rounded-xl transition shadow-md"
          >
            <span>مراسلة واتساب: +966500365049</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Community Group */}
        <div className="card-dark p-6 rounded-2xl border border-white/15 hover:border-[#b2e01e]/40 transition space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-[#b2e01e]/15 text-[#b2e01e] border border-[#b2e01e]/30 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="font-mono-tag text-[10px] text-white/50 uppercase block">WHATSAPP COMMUNITY</span>
            <h3 className="font-bold text-white text-base mt-0.5">مجموعة مجتمع بادل ليفل</h3>
            <p className="text-xs text-white/70 mt-1">انضم إلى مجتمع اللاعبين لتبادل الخبرات وتحديات الملاعب.</p>
          </div>
          <a
            href="https://chat.whatsapp.com/DoB1lDmCQxXKmM49qJEdYg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-neon py-2.5 px-4 text-xs font-bold"
          >
            <span>الانضمام لمجموعة الواتساب</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Availability / Hours */}
      <div className="card-dark p-6 rounded-2xl border border-white/15 flex items-center gap-4 shadow-xl">
        <div className="w-10 h-10 rounded-xl theme-card-solid text-[#b2e01e] border border-white/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span className="font-mono-tag text-[10px] text-white/50 uppercase block">AVAILABILITY</span>
          <h4 className="font-bold text-white text-sm">ساعات العمل والدعم</h4>
          <p className="text-xs text-[#b2e01e] font-bold mt-0.5">متاح على مدار الساعة 24/7</p>
        </div>
      </div>

      {/* Clubs & Partnerships Card */}
      <div className="card-dark p-8 rounded-2xl border border-white/15 space-y-4 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-2.5 h-full bg-[#b2e01e]"></div>
        <span className="font-mono-tag text-xs text-[#b2e01e] uppercase tracking-wider block font-bold">
          [ CLUBS & PARTNERSHIPS - قيد التطوير ]
        </span>
        <h2 className="font-alexandria font-bold text-xl text-white">
          شراكات الأندية والمدربين
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed">
          <p className="p-3.5 theme-card-solid rounded-xl border border-white/15 text-[#b2e01e] font-bold">
            المدونة والبرامج قيد التطوير والتحسين وسنكون جاهزين قريباً.
          </p>
          <p>
            نعمل حالياً على إطلاق برامج شراكة متقدمة للأندية والمدربين لاعتماد اختبار PadelLevel Pro لتقييم مشتركي الأكاديمية وإعداد بطولات متكافئة المستويات وتتبع التقدم الاحترافي للاعبين.
          </p>
        </div>
      </div>

    </div>
  );
};
