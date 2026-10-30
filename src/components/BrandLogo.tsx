import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  lightText = true,
}) => {
  const dimensions = {
    sm: { box: 'w-10 h-10', textD: 'text-lg', crest: 'w-7 h-7' },
    md: { box: 'w-13 h-13', textD: 'text-2xl', crest: 'w-9 h-9' },
    lg: { box: 'w-20 h-20', textD: 'text-4xl', crest: 'w-14 h-14' },
  }[size];

  return (
    <div className="flex items-center gap-3.5 select-none group cursor-pointer">
      {/* Regal Royal Crest Logo Icon */}
      <div className="relative">
        {/* Soft gold ambient glow behind shield */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#DFBE59]/30 via-[#D4AF37]/50 to-[#997A15]/30 blur-xs opacity-80 group-hover:opacity-100 transition duration-500" />

        {/* Heraldic Shield / Diamond Medallion Frame */}
        <div
          className={`relative ${dimensions.box} rounded-2xl border-2 border-[#D4AF37] bg-gradient-to-b from-[#2F1A10] via-[#20110B] to-[#120804] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#FFF5C0]`}
        >
          {/* Subtle inner gold rim */}
          <div className="absolute inset-[3px] rounded-xl border border-[#D4AF37]/40 pointer-events-none" />

          {/* Luxury Crown & Monogram Emblem SVG */}
          <svg
            className={`${dimensions.crest} text-[#D4AF37] drop-shadow-md`}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Royal Crown atop monogram */}
            <path
              d="M11 13L15 17L20 10L25 17L29 13L28 20H12L11 13Z"
              fill="url(#goldCrownGrad)"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />
            <circle cx="11" cy="12.5" r="1" fill="#FFF5C0" />
            <circle cx="20" cy="9.5" r="1.2" fill="#FFF5C0" />
            <circle cx="29" cy="12.5" r="1" fill="#FFF5C0" />

            {/* Regal Monogram 'D' */}
            <text
              x="20"
              y="32"
              textAnchor="middle"
              className="font-cinzel"
              fontSize="16"
              fontWeight="bold"
              fill="url(#goldTextGrad)"
              letterSpacing="0"
            >
              D
            </text>

            {/* Laurel sprigs left & right */}
            <path
              d="M8 22C7 26 10 31 14 33"
              stroke="url(#goldCrownGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M32 22C33 26 30 31 26 33"
              stroke="url(#goldCrownGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* SVG Gradients */}
            <defs>
              <linearGradient id="goldCrownGrad" x1="10" y1="9" x2="30" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF5C0" />
                <stop offset="0.5" stopColor="#D4AF37" />
                <stop offset="1" stopColor="#997A15" />
              </linearGradient>
              <linearGradient id="goldTextGrad" x1="12" y1="18" x2="28" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="0.3" stopColor="#FFF5C0" />
                <stop offset="0.7" stopColor="#E5C365" />
                <stop offset="1" stopColor="#AA7C11" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-cinzel text-xl sm:text-2xl font-black tracking-wider transition-colors ${
                lightText
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#FFF5C0] to-[#E5C365]'
                  : 'text-[#2A1810]'
              }`}
            >
              DAR&apos;S
            </span>
            <span className="text-[#D4AF37] font-playfair text-sm italic font-medium tracking-wide">
              Treats
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9.5px] uppercase font-cinzel tracking-[0.28em] text-[#D4AF37] font-bold">
              Pure Homemade
            </span>
            <span className="text-[#D4AF37]/50 text-[9px]">•</span>
            <span className="text-[9.5px] uppercase font-sans tracking-[0.15em] text-[#FAF7F2]/70">
              Desi Ghee
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
