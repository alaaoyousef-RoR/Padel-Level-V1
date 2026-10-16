import React from 'react';
import { MessageSquare, Clock, Phone, ExternalLink } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-4 text-right space-y-5 sm:space-y-6 font-alexandria min-w-0">
      
      {/* Header */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <span className="label-mono mb-0" style={{ color: '#b2e01e' }}>[ DIRECT CHANNELS & PARTNERSHIPS ]</span>
        <h1 className="font-alexandria font-black text-xl sm:text-3xl md:text-4xl text-white tracking-tight break-words leading-tight">
          تواصل مع الفريق <span className="text-[#b2e01e]">والشراكات</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed max-w-xl font-medium break-words">
          تواصل معنا مباشرة عبر قنوات الواتساب المتاحة على مدار الساعة، أو تعرف على برامج الشراكة القادمة للأندية والمدربين.
        </p>
      </div>

      {/* Direct Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 min-w-0">
        
        {/* WhatsApp Direct */}
        <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] transition-colors space-y-4 flex flex-col justify-between min-w-0">
          <div className="space-y-3 min-w-0">
            <div className="w-10 h-10 rounded bg-[#25D366] text-[#0b0b0d] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono-tag text-[10px] text-[#b2e01e] uppercase block font-bold truncate">DIRECT WHATSAPP</span>
              <h3 className="font-bold text-white text-base mt-0.5 break-words">التواصل الفوري عبر الواتساب</h3>
              <p className="text-xs text-[#f2f7ff]/75 mt-1 leading-relaxed break-words font-medium">تحدث مباشرة مع فريق الدعم الفني والتدريبي والاستشارات الرياضية.</p>
            </div>
          </div>
          <div className="pt-2 min-w-0">
            <a
              href="https://wa.me/966500365049"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon w-full py-2.5 px-3 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="truncate">مراسلة واتساب: +966500365049</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Community Group */}
        <div className="card-dark p-4 sm:p-6 rounded border border-[var(--card-border)] bg-[#16161a] hover:border-[#b2e01e] transition-colors space-y-4 flex flex-col justify-between min-w-0">
          <div className="space-y-3 min-w-0">
            <div className="w-10 h-10 rounded bg-[#b2e01e] text-[#0b0b0d] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono-tag text-[10px] text-[#b2e01e] uppercase block font-bold truncate">WHATSAPP COMMUNITY</span>
              <h3 className="font-bold text-white text-base mt-0.5 break-words">مجموعة مجتمع بادل ليفل</h3>
              <p className="text-xs text-[#f2f7ff]/75 mt-1 leading-relaxed break-words font-medium">انضم إلى مجتمع اللاعبين لتبادل الخبرات وتحديات الملاعب والبطولات.</p>
            </div>
          </div>
          <div className="pt-2 min-w-0">
            <a
              href="https://chat.whatsapp.com/DoB1lDmCQxXKmM49qJEdYg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-ink w-full py-2.5 px-3 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="truncate">الانضمام لمجموعة الواتساب</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

      </div>

      {/* Availability / Hours */}
      <div className="card-dark p-4 sm:p-5 rounded border border-[var(--card-border)] bg-[#16161a] flex items-center gap-3.5 min-w-0">
        <div className="w-9 h-9 rounded bg-[#0b0b0d] text-[#b2e01e] border border-[var(--card-border)] flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <span className="font-mono-tag text-[10px] text-white/50 uppercase block truncate">AVAILABILITY</span>
          <h4 className="font-bold text-white text-xs sm:text-sm truncate">ساعات العمل والدعم</h4>
          <p className="text-xs text-[#b2e01e] font-bold mt-0.5 font-mono-tag">متاح على مدار الساعة 24/7</p>
        </div>
      </div>

      {/* Clubs & Partnerships Card */}
      <div className="card-dark p-4 sm:p-6 md:p-8 rounded border border-[var(--card-border)] bg-[#16161a] space-y-3.5 relative overflow-hidden min-w-0">
        <div className="absolute top-0 right-0 w-2 h-full bg-[#b2e01e]"></div>
        <span className="font-mono-tag text-xs text-[#b2e01e] uppercase tracking-wider block font-bold truncate">
          [ CLUBS & PARTNERSHIPS - قيد التطوير ]
        </span>
        <h2 className="font-alexandria font-bold text-base sm:text-xl text-white break-words">
          شراكات الأندية والمدربين
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-[#f2f7ff]/80 leading-relaxed font-medium min-w-0">
          <p className="p-3 bg-[#0b0b0d] rounded border border-[var(--card-border)] text-[#b2e01e] font-bold break-words">
            المدونة والبرامج قيد التطوير والتحسين وسنكون جاهزين قريباً.
          </p>
          <p className="break-words">
            نعمل حالياً على إطلاق برامج شراكة متقدمة للأندية والمدربين لاعتماد اختبار PadelLevel Pro لتقييم مشتركي الأكاديمية وإعداد بطولات متكافئة المستويات وتتبع التقدم الاحترافي للاعبين.
          </p>
        </div>
      </div>

    </div>
  );
};
