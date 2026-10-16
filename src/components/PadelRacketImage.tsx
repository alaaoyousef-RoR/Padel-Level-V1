import React, { useState } from 'react';
import { PadelRacket } from '../data/racketsData';

interface PadelRacketImageProps {
  racket: PadelRacket;
  className?: string;
  containerClassName?: string;
}

export const PadelRacketImage: React.FC<PadelRacketImageProps> = ({
  racket,
  className = 'w-full h-40 max-h-40 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] z-10 relative group-hover:scale-108 transition-transform duration-300 pointer-events-none',
  containerClassName = 'relative flex-1 flex items-center justify-center my-1 w-full h-44 overflow-hidden'
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {/* Subtle Backdrop Ambient Glow */}
      <div 
        className="absolute w-36 h-36 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-45 pointer-events-none"
        style={{ backgroundColor: racket.colorAccent || '#b2e01e' }}
      />

      {!hasError ? (
        <img
          src={racket.imageUrl}
          alt={`${racket.brand} ${racket.modelName}`}
          className={className}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Graceful Default Padel Racket Graphic Fallback */
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-2 select-none">
          <svg
            viewBox="0 0 100 160"
            className="h-36 max-h-36 w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`grad-${racket.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id={`accent-grad-${racket.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={racket.colorAccent || '#b2e01e'} />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Racket Head Frame */}
            {racket.shape === 'round' ? (
              <circle cx="50" cy="50" r="38" stroke={racket.colorAccent || '#b2e01e'} strokeWidth="3" fill={`url(#grad-${racket.id})`} />
            ) : racket.shape === 'diamond' ? (
              <path
                d="M50 12 C68 12 86 28 86 52 C86 72 68 88 50 88 C32 88 14 72 14 52 C14 28 32 12 50 12 Z"
                stroke={racket.colorAccent || '#b2e01e'}
                strokeWidth="3"
                fill={`url(#grad-${racket.id})`}
              />
            ) : (
              /* Teardrop default */
              <path
                d="M50 14 C70 14 86 32 86 56 C86 74 66 88 50 88 C34 88 14 74 14 56 C14 32 30 14 50 14 Z"
                stroke={racket.colorAccent || '#b2e01e'}
                strokeWidth="3"
                fill={`url(#grad-${racket.id})`}
              />
            )}

            {/* Perforated Padel Holes Grid */}
            <g fill={racket.colorAccent || '#b2e01e'} opacity="0.75">
              <circle cx="50" cy="36" r="2" />
              <circle cx="42" cy="38" r="2" />
              <circle cx="58" cy="38" r="2" />
              
              <circle cx="34" cy="46" r="2" />
              <circle cx="42" cy="46" r="2" />
              <circle cx="50" cy="46" r="2" />
              <circle cx="58" cy="46" r="2" />
              <circle cx="66" cy="46" r="2" />
              
              <circle cx="34" cy="54" r="2" />
              <circle cx="42" cy="54" r="2" />
              <circle cx="50" cy="54" r="2" />
              <circle cx="58" cy="54" r="2" />
              <circle cx="66" cy="54" r="2" />
              
              <circle cx="38" cy="62" r="2" />
              <circle cx="46" cy="62" r="2" />
              <circle cx="54" cy="62" r="2" />
              <circle cx="62" cy="62" r="2" />

              <circle cx="44" cy="70" r="2" />
              <circle cx="50" cy="70" r="2" />
              <circle cx="56" cy="70" r="2" />
            </g>

            {/* Throat / Bridge */}
            <path
              d="M38 86 L44 104 L56 104 L62 86 Z"
              fill="#0f172a"
              stroke={racket.colorAccent || '#b2e01e'}
              strokeWidth="1.5"
            />
            {/* Throat Cutout */}
            <polygon points="46,92 54,92 50,100" fill="#000000" opacity="0.6" />

            {/* Handle / Grip */}
            <rect x="44" y="104" width="12" height="44" rx="2" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            
            {/* Grip Wrap Lines */}
            <line x1="44" y1="112" x2="56" y2="114" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <line x1="44" y1="120" x2="56" y2="122" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <line x1="44" y1="128" x2="56" y2="130" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
            <line x1="44" y1="136" x2="56" y2="138" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />

            {/* Butt Cap */}
            <rect x="42.5" y="148" width="15" height="4" rx="1.5" fill={racket.colorAccent || '#b2e01e'} />

            {/* Safety Wrist Cord */}
            <path d="M50 152 Q50 158 46 160" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.6" />
          </svg>

          <span className="text-[10px] font-mono-tag font-bold text-white/70 mt-1 uppercase tracking-wider">
            {racket.brand} • {racket.shapeAr.split(' ')[0]}
          </span>
        </div>
      )}
    </div>
  );
};
