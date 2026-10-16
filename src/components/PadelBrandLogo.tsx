import React from 'react';
import logoSvg from '../assets/icons/LOGO.svg';
import { PadelRacketOfficialVector } from './BrandEquipmentVectors';

export const PadelBrandLogo: React.FC<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  showText?: boolean;
  className?: string;
}> = ({ 
  size = 'md', 
  showText = false, 
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-2 select-none shrink-0 ${className}`}>
      <img 
        src={logoSvg} 
        alt="PadelLevel Pro Logo" 
        style={{ width: '115px', height: '85px' }}
        className="object-contain shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      {showText && (
        <div className="flex items-center gap-1.5 font-alexandria font-extrabold tracking-tight leading-none text-sm sm:text-base md:text-lg whitespace-nowrap min-w-0">
          <span className="text-white">PADEL</span>
          <span className="text-[#B2E01E]">LEVEL</span>
        </div>
      )}
    </div>
  );
};
