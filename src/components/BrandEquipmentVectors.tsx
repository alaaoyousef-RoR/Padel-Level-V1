import React from 'react';

// 1. Athletic Lime Sports Water Bottle Vector (icons-01.svg)
export const WaterBottleVector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <g transform="rotate(-30 50 50) translate(8, -2)">
        {/* Navy/Drop shadow */}
        <ellipse cx="50" cy="88" rx="16" ry="5" fill="#001F5C" opacity="0.4" />

        {/* Bite Valve / Drinking Spout */}
        <rect x="46" y="8" width="8" height="6" rx="2" fill="#B2E01E" />

        {/* Bottle Lid / White Cap */}
        <path
          d="M42 14 L58 14 L60 22 C60 24 58 25 56 25 L44 25 C42 25 40 24 40 22 Z"
          fill="#F2F7FF"
          stroke="#002661"
          strokeWidth="1.5"
        />
        {/* Cap ridges / Collar */}
        <rect x="41" y="22" width="18" height="4" rx="1" fill="#D3D7FA" />

        {/* Bottle Body Upper Shoulder */}
        <path
          d="M40 26 C36 26 34 30 34 34 L34 40 C34 42 36 44 38 45 L38 47 C36 48 34 50 34 53 L34 76 C34 81 38 84 43 84 L57 84 C62 84 66 81 66 76 L66 53 C66 50 64 48 62 47 L62 45 C64 44 66 42 66 40 L66 34 C66 30 64 26 60 26 Z"
          fill="#B2E01E"
          stroke="#002661"
          strokeWidth="2"
        />

        {/* Ergonomic grip indentation lines */}
        <path d="M34 46 C37 46 38 47 38 49 C38 51 37 52 34 52" stroke="#002661" strokeWidth="2" fill="none" />
        <path d="M66 46 C63 46 62 47 62 49 C62 51 63 52 66 52" stroke="#002661" strokeWidth="2" fill="none" />

        {/* Gloss / Specular Highlights */}
        <path
          d="M40 33 L40 76"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M46 33 L46 76"
          stroke="#C8F33B"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
    </svg>
  );
};

// 2. Official White Perforated Padel Racket Illustration (icons-03.svg)
export const PadelRacketOfficialVector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* 3D Beveled Rim / Lavender & Deep Navy Shadow */}
      <path
        d="M52 5 C30 5 16 19 16 38 C16 54 26 67 38 72 L38 82 C38 85 41 87 45 87 L55 87 C59 87 62 85 62 82 L62 72 C74 67 84 54 84 38 C84 19 70 5 52 5 Z"
        fill="#002661"
      />
      <path
        d="M50 4 C31 4 18 18 18 36 C18 52 28 65 40 70 L40 82 C40 84 43 86 46 86 L54 86 C57 86 60 84 60 82 L60 70 C72 65 82 52 82 36 C82 18 69 4 50 4 Z"
        fill="#D3D7FA"
      />

      {/* Main Racket Surface: Pure Crisp Court White */}
      <path
        d="M50 6 C32 6 20 19 20 36 C20 50 30 63 41 68 L41 71 C41 73 43 74 45 74 L55 74 C57 74 59 73 59 71 L59 68 C70 63 80 50 80 36 C80 19 68 6 50 6 Z"
        fill="#F2F7FF"
        stroke="#003882"
        strokeWidth="1.5"
      />

      {/* Aerodynamic bridge / throat cutout */}
      <polygon points="46,62 54,62 50,55" fill="#002661" />

      {/* Perforated Court Holes in Vibrant Court Blue (#005CD7) */}
      {/* Row 1 */}
      <circle cx="44" cy="20" r="2" fill="#005CD7" />
      <circle cx="50" cy="19" r="2" fill="#005CD7" />
      <circle cx="56" cy="20" r="2" fill="#005CD7" />
      {/* Row 2 */}
      <circle cx="38" cy="26" r="2.2" fill="#005CD7" />
      <circle cx="44" cy="26" r="2.2" fill="#005CD7" />
      <circle cx="50" cy="25" r="2.2" fill="#005CD7" />
      <circle cx="56" cy="26" r="2.2" fill="#005CD7" />
      <circle cx="62" cy="26" r="2.2" fill="#005CD7" />
      {/* Row 3 */}
      <circle cx="33" cy="33" r="2.3" fill="#005CD7" />
      <circle cx="39" cy="33" r="2.3" fill="#005CD7" />
      <circle cx="45" cy="32" r="2.3" fill="#005CD7" />
      <circle cx="50" cy="32" r="2.3" fill="#005CD7" />
      <circle cx="55" cy="32" r="2.3" fill="#005CD7" />
      <circle cx="61" cy="33" r="2.3" fill="#005CD7" />
      <circle cx="67" cy="33" r="2.3" fill="#005CD7" />
      {/* Row 4 */}
      <circle cx="33" cy="40" r="2.3" fill="#005CD7" />
      <circle cx="39" cy="40" r="2.3" fill="#005CD7" />
      <circle cx="45" cy="40" r="2.3" fill="#005CD7" />
      <circle cx="50" cy="39" r="2.3" fill="#005CD7" />
      <circle cx="55" cy="40" r="2.3" fill="#005CD7" />
      <circle cx="61" cy="40" r="2.3" fill="#005CD7" />
      <circle cx="67" cy="40" r="2.3" fill="#005CD7" />
      {/* Row 5 */}
      <circle cx="36" cy="47" r="2.2" fill="#005CD7" />
      <circle cx="43" cy="47" r="2.2" fill="#005CD7" />
      <circle cx="50" cy="46" r="2.2" fill="#005CD7" />
      <circle cx="57" cy="47" r="2.2" fill="#005CD7" />
      <circle cx="64" cy="47" r="2.2" fill="#005CD7" />
      {/* Row 6 */}
      <circle cx="42" cy="53" r="2" fill="#005CD7" />
      <circle cx="50" cy="52" r="2" fill="#005CD7" />
      <circle cx="58" cy="53" r="2" fill="#005CD7" />

      {/* Grip Handle in Electric Lime Green (#B2E01E) with wrapping lines */}
      <rect x="46" y="73" width="8" height="20" rx="1.5" fill="#B2E01E" stroke="#002661" strokeWidth="1.5" />
      <line x1="46" y1="77" x2="54" y2="79" stroke="#002661" strokeWidth="1" />
      <line x1="46" y1="81" x2="54" y2="83" stroke="#002661" strokeWidth="1" />
      <line x1="46" y1="85" x2="54" y2="87" stroke="#002661" strokeWidth="1" />
      <line x1="46" y1="89" x2="54" y2="91" stroke="#002661" strokeWidth="1" />

      {/* Butt Cap */}
      <rect x="44.5" y="93" width="11" height="3.5" rx="1.5" fill="#002661" />
    </svg>
  );
};

// 3. Signature Electric Lime Padel Ball Vector (icons-04.svg - icons-07.svg)
export const PadelBallVector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Subtle Drop Shadow */}
      <ellipse cx="50" cy="90" rx="30" ry="7" fill="#001F5C" opacity="0.35" />

      {/* Main Ball Spherical Core */}
      <circle cx="50" cy="48" r="40" fill="#B2E01E" stroke="#002661" strokeWidth="2" />

      {/* Curved White Seam Lines */}
      <path
        d="M26 24 C40 38 40 58 26 72"
        stroke="#F2F7FF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 24 C60 38 60 58 74 72"
        stroke="#F2F7FF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Athletic 3D sheen */}
      <circle cx="38" cy="34" r="7" fill="#FFFFFF" opacity="0.4" filter="blur(1px)" />
    </svg>
  );
};

// 4. Angled Padel Racket with Soft Lavender Court Mesh Bevels (icons-08.svg)
export const AngledRacketIllustration: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-14 h-14", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <g transform="rotate(-28 60 60) translate(6, 0)">
        {/* Navy/Drop Shadow Rim */}
        <path
          d="M62 8 C40 8 26 22 26 42 C26 60 38 73 52 78 L52 94 C52 97 55 99 59 99 L69 99 C73 99 76 97 76 94 L76 78 C90 73 102 60 102 42 C102 22 88 8 66 8 Z"
          fill="#002255"
        />
        {/* Soft Lavender Court Mesh Bevel */}
        <path
          d="M60 6 C38 6 24 20 24 40 C24 58 36 71 50 76 L50 92 C50 95 53 97 57 97 L67 97 C71 97 74 95 74 92 L74 76 C88 71 100 58 100 40 C100 20 86 6 64 6 Z"
          fill="#D3D7FA"
        />
        {/* Crisp Court White Racket Head */}
        <path
          d="M60 9 C41 9 29 22 29 39 C29 55 39 67 52 72 L52 77 C52 78 54 79 56 79 L68 79 C70 79 72 78 72 77 L72 72 C85 67 95 55 95 39 C95 22 83 9 64 9 Z"
          fill="#F2F7FF"
          stroke="#003882"
          strokeWidth="1.5"
        />

        {/* Perforations */}
        <circle cx="52" cy="24" r="2.2" fill="#005CD7" />
        <circle cx="60" cy="23" r="2.2" fill="#005CD7" />
        <circle cx="68" cy="24" r="2.2" fill="#005CD7" />

        <circle cx="44" cy="32" r="2.5" fill="#005CD7" />
        <circle cx="52" cy="31" r="2.5" fill="#005CD7" />
        <circle cx="60" cy="30" r="2.5" fill="#005CD7" />
        <circle cx="68" cy="31" r="2.5" fill="#005CD7" />
        <circle cx="76" cy="32" r="2.5" fill="#005CD7" />

        <circle cx="40" cy="40" r="2.5" fill="#005CD7" />
        <circle cx="48" cy="39" r="2.5" fill="#005CD7" />
        <circle cx="56" cy="39" r="2.5" fill="#005CD7" />
        <circle cx="64" cy="39" r="2.5" fill="#005CD7" />
        <circle cx="72" cy="39" r="2.5" fill="#005CD7" />
        <circle cx="80" cy="40" r="2.5" fill="#005CD7" />

        <circle cx="44" cy="48" r="2.5" fill="#005CD7" />
        <circle cx="52" cy="47" r="2.5" fill="#005CD7" />
        <circle cx="60" cy="47" r="2.5" fill="#005CD7" />
        <circle cx="68" cy="47" r="2.5" fill="#005CD7" />
        <circle cx="76" cy="48" r="2.5" fill="#005CD7" />

        <circle cx="52" cy="56" r="2.2" fill="#005CD7" />
        <circle cx="60" cy="55" r="2.2" fill="#005CD7" />
        <circle cx="68" cy="56" r="2.2" fill="#005CD7" />

        {/* Throat triangular gap */}
        <polygon points="56,66 66,66 61,59" fill="#002255" />

        {/* Lime handle */}
        <rect x="56" y="78" width="10" height="24" rx="2" fill="#B2E01E" stroke="#002255" strokeWidth="1.5" />
        <line x1="56" y1="84" x2="66" y2="86" stroke="#002255" strokeWidth="1.2" />
        <line x1="56" y1="90" x2="66" y2="92" stroke="#002255" strokeWidth="1.2" />
        <line x1="56" y1="96" x2="66" y2="98" stroke="#002255" strokeWidth="1.2" />
        {/* End Butt */}
        <rect x="54" y="102" width="14" height="4" rx="2" fill="#002255" />
      </g>
    </svg>
  );
};

// 5. Official Padel Level Brand Emblem
// Official brand vector logo mark featuring bold white PADEL, electric lime LEVEL, angled padel racket & dual balls
export const OfficialPadelLevelEmblem: React.FC<{ 
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}> = ({ 
  showText = true, 
  size = 'md',
  className = "" 
}) => {
  const defaultClass = size === 'sm' 
    ? 'h-9 w-auto' 
    : size === 'lg' 
    ? 'h-12 sm:h-14 w-auto' 
    : size === 'xl' 
    ? 'h-14 sm:h-16 w-auto' 
    : 'h-9 sm:h-10 lg:h-12 w-auto';

  const appliedClass = className || defaultClass;

  if (!showText) {
    return (
      <svg 
        viewBox="0 0 100 76" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-lg overflow-visible select-none shrink-0 ${appliedClass}`}
        aria-label="Padel Level Official Emblem"
      >
        {/* Ball 1 Shadow */}
        <ellipse cx="26" cy="62" rx="13" ry="4" fill="#001F5C" opacity="0.6" />
        {/* Ball 1 Body */}
        <circle cx="26" cy="48" r="13" fill="#B2E01E" stroke="#002661" strokeWidth="2" />
        <path d="M18 38 C25 45 25 52 18 58" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M34 38 C27 45 27 52 34 58" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Ball 2 Shadow */}
        <ellipse cx="48" cy="68" rx="13" ry="4" fill="#001F5C" opacity="0.6" />
        {/* Ball 2 Body */}
        <circle cx="48" cy="54" r="13" fill="#B2E01E" stroke="#002661" strokeWidth="2" />
        <path d="M40 44 C47 51 47 58 40 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M56 44 C49 51 49 58 56 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Angled Official White Padel Racket */}
        <g transform="rotate(20 68 34) translate(-4, -6)">
          <path
            d="M68 5 C52 5 40 17 40 33 C40 47 48 58 58 62 L58 75 C58 77 60 79 63 79 L71 79 C74 79 76 77 76 75 L76 62 C86 58 94 47 94 33 C94 17 82 5 68 5 Z"
            fill="#002255"
          />
          <path
            d="M67 3 C51 3 39 15 39 31 C39 45 47 56 57 60 L57 74 C57 76 59 78 62 78 L70 78 C73 78 75 76 75 74 L75 60 C85 56 93 45 93 31 C93 15 81 3 67 3 Z"
            fill="#D3D7FA"
          />
          <path
            d="M67 5 C53 5 42 16 42 30 C42 42 49 52 58 56 L58 61 L72 61 L72 56 C81 52 88 42 88 30 C88 16 77 5 67 5 Z"
            fill="#F2F7FF"
            stroke="#003882"
            strokeWidth="1.2"
          />
          <circle cx="60" cy="19" r="1.8" fill="#005CD7" />
          <circle cx="67" cy="18" r="1.8" fill="#005CD7" />
          <circle cx="74" cy="19" r="1.8" fill="#005CD7" />
          <circle cx="54" cy="26" r="2" fill="#005CD7" />
          <circle cx="61" cy="25" r="2" fill="#005CD7" />
          <circle cx="67" cy="25" r="2" fill="#005CD7" />
          <circle cx="73" cy="25" r="2" fill="#005CD7" />
          <circle cx="80" cy="26" r="2" fill="#005CD7" />
          <circle cx="52" cy="33" r="2" fill="#005CD7" />
          <circle cx="59" cy="32" r="2" fill="#005CD7" />
          <circle cx="67" cy="32" r="2" fill="#005CD7" />
          <circle cx="75" cy="32" r="2" fill="#005CD7" />
          <circle cx="82" cy="33" r="2" fill="#005CD7" />
          <circle cx="56" cy="40" r="2" fill="#005CD7" />
          <circle cx="63" cy="39" r="2" fill="#005CD7" />
          <circle cx="71" cy="39" r="2" fill="#005CD7" />
          <circle cx="78" cy="40" r="2" fill="#005CD7" />
          <polygon points="61,52 69,52 65,46" fill="#002255" />
          <rect x="61" y="60" width="8" height="17" rx="1.5" fill="#B2E01E" stroke="#002255" strokeWidth="1.2" />
          <line x1="61" y1="65" x2="69" y2="67" stroke="#002255" strokeWidth="1" />
          <line x1="61" y1="70" x2="69" y2="72" stroke="#002255" strokeWidth="1" />
          <rect x="60" y="77" width="10" height="3" rx="1" fill="#002255" />
        </g>
      </svg>
    );
  }

  return (
    <svg 
      viewBox="0 0 315 76" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-lg overflow-visible select-none shrink-0 ${appliedClass}`}
      aria-label="Padel Level Logo"
    >
      {/* Icon cluster: Signature Angled Racket + Dual Padel Balls */}
      <g className="brand-equipment-mark">
        {/* Ball 1 Shadow */}
        <ellipse cx="26" cy="62" rx="13" ry="4" fill="#001F5C" opacity="0.6" />
        {/* Ball 1 Body */}
        <circle cx="26" cy="48" r="13" fill="#B2E01E" stroke="#002661" strokeWidth="2" />
        <path d="M18 38 C25 45 25 52 18 58" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M34 38 C27 45 27 52 34 58" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Ball 2 Shadow */}
        <ellipse cx="48" cy="68" rx="13" ry="4" fill="#001F5C" opacity="0.6" />
        {/* Ball 2 Body */}
        <circle cx="48" cy="54" r="13" fill="#B2E01E" stroke="#002661" strokeWidth="2" />
        <path d="M40 44 C47 51 47 58 40 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M56 44 C49 51 49 58 56 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />

        {/* Angled Official White Padel Racket */}
        <g transform="rotate(20 68 34) translate(-4, -6)">
          {/* Lavender Bevel / Navy rim */}
          <path
            d="M68 5 C52 5 40 17 40 33 C40 47 48 58 58 62 L58 75 C58 77 60 79 63 79 L71 79 C74 79 76 77 76 75 L76 62 C86 58 94 47 94 33 C94 17 82 5 68 5 Z"
            fill="#002255"
          />
          <path
            d="M67 3 C51 3 39 15 39 31 C39 45 47 56 57 60 L57 74 C57 76 59 78 62 78 L70 78 C73 78 75 76 75 74 L75 60 C85 56 93 45 93 31 C93 15 81 3 67 3 Z"
            fill="#D3D7FA"
          />
          {/* White face */}
          <path
            d="M67 5 C53 5 42 16 42 30 C42 42 49 52 58 56 L58 61 L72 61 L72 56 C81 52 88 42 88 30 C88 16 77 5 67 5 Z"
            fill="#F2F7FF"
            stroke="#003882"
            strokeWidth="1.2"
          />
          {/* Perforations */}
          <circle cx="60" cy="19" r="1.8" fill="#005CD7" />
          <circle cx="67" cy="18" r="1.8" fill="#005CD7" />
          <circle cx="74" cy="19" r="1.8" fill="#005CD7" />

          <circle cx="54" cy="26" r="2" fill="#005CD7" />
          <circle cx="61" cy="25" r="2" fill="#005CD7" />
          <circle cx="67" cy="25" r="2" fill="#005CD7" />
          <circle cx="73" cy="25" r="2" fill="#005CD7" />
          <circle cx="80" cy="26" r="2" fill="#005CD7" />

          <circle cx="52" cy="33" r="2" fill="#005CD7" />
          <circle cx="59" cy="32" r="2" fill="#005CD7" />
          <circle cx="67" cy="32" r="2" fill="#005CD7" />
          <circle cx="75" cy="32" r="2" fill="#005CD7" />
          <circle cx="82" cy="33" r="2" fill="#005CD7" />

          <circle cx="56" cy="40" r="2" fill="#005CD7" />
          <circle cx="63" cy="39" r="2" fill="#005CD7" />
          <circle cx="71" cy="39" r="2" fill="#005CD7" />
          <circle cx="78" cy="40" r="2" fill="#005CD7" />

          {/* Throat bridge */}
          <polygon points="61,52 69,52 65,46" fill="#002255" />

          {/* Lime Grip Handle */}
          <rect x="61" y="60" width="8" height="17" rx="1.5" fill="#B2E01E" stroke="#002255" strokeWidth="1.2" />
          <line x1="61" y1="65" x2="69" y2="67" stroke="#002255" strokeWidth="1" />
          <line x1="61" y1="70" x2="69" y2="72" stroke="#002255" strokeWidth="1" />
          <rect x="60" y="77" width="10" height="3" rx="1" fill="#002255" />
        </g>
      </g>

      {/* Official Typography: Bold White PADEL + Electric Lime LEVEL */}
      <g className="brand-typography">
        <text 
          x="102" 
          y="49" 
          fill="#FFFFFF" 
          fontFamily="'Alexandria', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontWeight="900" 
          fontSize="35" 
          letterSpacing="0.8"
        >
          PADEL
        </text>
        <text 
          x="218" 
          y="49" 
          fill="#B2E01E" 
          fontFamily="'Alexandria', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontWeight="900" 
          fontSize="35" 
          letterSpacing="0.8"
        >
          LEVEL
        </text>
        {/* Subtle athletic court baseline */}
        <rect x="103" y="57" width="202" height="2.5" rx="1.25" fill="#B2E01E" opacity="0.9" />
      </g>
    </svg>
  );
};

// 6. Clean Official WhatsApp SVG Vector
export const WhatsAppVector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-4 h-4", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.414z"/>
    </svg>
  );
};

// 7. Sleek Code / Developer SVG Vector
export const DeveloperVector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-4 h-4", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  );
};

// 8. Icons-02 Vector (Uploaded icons-02.svg)
export const Icons02Vector: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-10 h-10", 
  size 
}) => {
  return (
    <svg
      viewBox="0 0 1080 1080"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M846.011,536.431c57.428-114.138,9.905-229-85.237-304.436-97.898-77.572-225.417-104.116-327.093-15.369-156.868,136.878-106.763,525.121-106.763,525.121l37.042,28.73s388.501-48.057,482.051-234.046ZM356.115,623.777c.079-24.982,2.711-51.269,10.406-73.629,2.522,17.659,9.686,35.019,20.52,51.223l-30.926,22.406ZM381.051,726.87l-16.15-12.526s-6.385-30.407-8.252-68.496l41.366-29.91c8.514,10.196,18.387,19.701,29.487,28.413,12.911,10.219,26.673,18.943,40.758,25.659l-18.813,47.812c-37.356,7.668-68.396,9.048-68.396,9.048ZM470.957,712.849l14.142-35.834c18.226,6.541,36.802,9.453,54.533,7.502-19.693,12.952-44.498,22.041-68.676,28.333Z" fill="#f2f7ff"/>
      <path d="M366.181,767.612l-37.042-28.73s-43.574-337.842,77.925-494.323c-124.275,155.19-80.146,497.187-80.146,497.187l37.042,28.73s342.223-42.34,461.618-201.315c-121.335,156.609-459.397,198.452-459.397,198.452Z" fill="#d3d1fb"/>
      <rect x="230.24" y="859.911" width="20.194" height="63.421" transform="translate(-611.503 535.083) rotate(-52.203)" fill="#9ec71b"/>
      <polygon points="271.582 903.077 221.468 864.209 237.548 856.973 326.918 741.746 363.961 770.476 274.59 885.703 271.582 903.077" fill="#b2e01e"/>
      <polygon points="274.59 885.703 363.961 770.476 354.827 763.392 263.969 880.536 260.962 897.91 253.557 907.459 212.576 875.674 209.092 880.165 259.206 919.034 271.583 903.076 274.59 885.703" fill="#9ec71b"/>
      <circle cx="433.361" cy="535.559" r="10" fill="#005cd7"/>
      <circle cx="475.211" cy="568.019" r="10" fill="#005cd7"/>
      <circle cx="517.062" cy="600.478" r="10" fill="#005cd7"/>
      <circle cx="558.912" cy="632.938" r="10" fill="#005cd7"/>
      <circle cx="422.993" cy="462.563" r="10" fill="#005cd7"/>
      <circle cx="464.843" cy="495.022" r="10" fill="#005cd7"/>
      <circle cx="506.694" cy="527.481" r="10" fill="#005cd7"/>
      <circle cx="548.544" cy="559.941" r="10" fill="#005cd7"/>
      <circle cx="590.394" cy="592.4" r="10" fill="#005cd7"/>
      <circle cx="632.245" cy="624.86" r="10" fill="#005cd7"/>
      <circle cx="412.624" cy="389.566" r="10" fill="#005cd7"/>
      <circle cx="454.475" cy="422.026" r="10" fill="#005cd7"/>
      <circle cx="496.325" cy="454.485" r="10" fill="#005cd7"/>
      <circle cx="538.176" cy="486.944" r="10" fill="#005cd7"/>
      <circle cx="580.026" cy="519.404" r="10" fill="#005cd7"/>
      <circle cx="621.876" cy="551.863" r="10" fill="#005cd7"/>
      <circle cx="663.727" cy="584.322" r="10" fill="#005cd7"/>
      <circle cx="705.577" cy="616.781" r="10" fill="#005cd7"/>
      <circle cx="444.107" cy="349.029" r="10" fill="#005cd7"/>
      <circle cx="485.957" cy="381.489" r="10" fill="#005cd7"/>
      <circle cx="527.807" cy="413.948" r="10" fill="#005cd7"/>
      <circle cx="569.658" cy="446.407" r="10" fill="#005cd7"/>
      <circle cx="611.508" cy="478.867" r="10" fill="#005cd7"/>
      <circle cx="653.358" cy="511.326" r="10" fill="#005cd7"/>
      <circle cx="695.209" cy="543.785" r="10" fill="#005cd7"/>
      <circle cx="737.059" cy="576.245" r="10" fill="#005cd7"/>
      <circle cx="475.589" cy="308.492" r="10" fill="#005cd7"/>
      <circle cx="517.439" cy="340.951" r="10" fill="#005cd7"/>
      <circle cx="559.289" cy="373.411" r="10" fill="#005cd7"/>
      <circle cx="601.14" cy="405.87" r="10" fill="#005cd7"/>
      <circle cx="642.99" cy="438.329" r="10" fill="#005cd7"/>
      <circle cx="684.84" cy="470.788" r="10" fill="#005cd7"/>
      <circle cx="726.691" cy="503.248" r="10" fill="#005cd7"/>
      <circle cx="768.541" cy="535.707" r="10" fill="#005cd7"/>
      <circle cx="507.071" cy="267.955" r="10" fill="#005cd7"/>
      <circle cx="548.921" cy="300.414" r="10" fill="#005cd7"/>
      <circle cx="590.772" cy="332.873" r="10" fill="#005cd7"/>
      <circle cx="632.622" cy="365.333" r="10" fill="#005cd7"/>
      <circle cx="674.472" cy="397.792" r="10" fill="#005cd7"/>
      <circle cx="716.322" cy="430.251" r="10" fill="#005cd7"/>
      <circle cx="758.173" cy="462.711" r="10" fill="#005cd7"/>
      <circle cx="800.023" cy="495.17" r="10" fill="#005cd7"/>
    </svg>
  );
};

