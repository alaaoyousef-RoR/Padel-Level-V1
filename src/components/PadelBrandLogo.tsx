import React from 'react';
import { PadelRacketOfficialVector } from './BrandEquipmentVectors';

export const PadelBrandLogo: React.FC<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl'; 
  showText?: boolean;
  className?: string;
}> = ({ 
  size = 'md', 
  showText = true, 
  className = "" 
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : size === 'xl' ? 44 : 28;

  return (
    <div className={`flex items-center gap-2 select-none shrink-0 ${className}`}>
      <div className="flex-shrink-0 flex items-center justify-center">
        <PadelRacketOfficialVector 
          size={iconSize} 
          className={
            size === 'sm' 
              ? 'w-5 h-5 sm:w-6 sm:h-6' 
              : size === 'lg' 
              ? 'w-8 h-8 sm:w-9 sm:h-9' 
              : 'w-6 h-6 sm:w-7 sm:h-7'
          } 
        />
      </div>
      {showText && (
        <div className="flex items-center gap-1.5 font-alexandria font-extrabold tracking-tight leading-none text-sm sm:text-base md:text-lg whitespace-nowrap">
          <span className="text-white">PADEL</span>
          <span className="text-[#B2E01E]">LEVEL</span>
        </div>
      )}
    </div>
  );
};
