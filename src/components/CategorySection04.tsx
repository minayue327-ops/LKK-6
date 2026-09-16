import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollSectionTitle } from './ScrollSectionTitle';

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export interface LeftCardData {
  badgeTag: string;
  badgeText: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export interface CategorySection04Props {
  sectionId?: string;
  badge?: string;
  title: string;
  description: string;
  leftCard: LeftCardData;
  rightServices: ServiceItem[];
}

export default function CategorySection04({
  sectionId = 'section-service-definition',
  badge = 'SERVICE DEFINITION / 04',
  title,
  description,
  leftCard,
  rightServices,
}: CategorySection04Props) {
  return (
    <section id={sectionId} className="py-16 md:py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E5E5] w-full overflow-hidden">
      <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12">
        
        {/* Section Header */}
        <ScrollSectionTitle
          badge={badge}
          title={title}
          subtitle={description}
          align="between"
        />

        {/* Dual Column Layout: Left Immersive Visual Card + Right 3 Service Cards */}
        {/* Fluid Grid with strict minmax(0, 1fr) and items-stretch to keep both cards synchronized */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch w-full">
          
          {/* Left Column: Immersive Visual Image Card (Dominant, Synchronized Fluid Ratio) */}
          <div className="lg:col-span-7 relative rounded-[24px] overflow-hidden border border-[#E5E5E5] shadow-xs flex flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-10 text-white group min-w-0 w-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] h-full">
            {/* Layer 1: Background Image */}
            <img 
              src={leftCard.image} 
              alt={leftCard.title}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transform transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Layer 2: Gradient Dark Overlay for optimal contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/10 z-10 pointer-events-none" />

            {/* Layer 3 & 4: Text Content & CTA Button */}
            <div className="relative z-20 flex flex-col justify-between h-full min-w-0 w-full">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                  <span className="inline-block bg-[#007BC7] text-white text-xs font-mono font-semibold px-2.5 sm:px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    {leftCard.badgeTag}
                  </span>
                  <span className="text-xs font-mono font-semibold text-white/90 uppercase tracking-wider whitespace-nowrap">
                    {leftCard.badgeText}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-white font-display mb-2 sm:mb-3 tracking-tight leading-tight break-words">
                  {leftCard.title}
                </h3>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg break-words font-normal">
                  {leftCard.description}
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-4 sm:pt-6 border-t border-white/20 mt-4 sm:mt-6 shrink-0">
                <button 
                  onClick={leftCard.onCtaClick}
                  className="w-full sm:w-auto bg-[#007BC7] hover:bg-[#005F96] text-white font-semibold py-2.5 sm:py-3.5 px-5 sm:px-6 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer group/btn"
                >
                  <span>{leftCard.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-200 shrink-0" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Compact Service Container with Strictly Synchronized Height & Padding */}
          <div className="lg:col-span-5 bg-[#F0F0F0] rounded-[24px] p-3.5 sm:p-5 lg:p-6 border border-[#E5E5E5] flex flex-col justify-between gap-3 sm:gap-3.5 min-w-0 w-full h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]">
            {rightServices.map((item) => (
              <div 
                key={item.num}
                className="bg-white rounded-[16px] p-3.5 sm:p-4 lg:p-5 border border-[#E5E5E5] hover:border-[#007BC7]/50 transition-colors shadow-xs flex-1 flex flex-col justify-center min-w-0 overflow-hidden"
              >
                <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 w-full">
                  <span className="font-mono text-lg sm:text-xl lg:text-2xl font-extrabold text-[#007BC7] shrink-0 w-7 sm:w-8 leading-tight">
                    {item.num}
                  </span>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h4 className="text-base lg:text-lg font-bold text-[#111827] font-display mb-1 leading-snug break-words">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#4B5563] leading-relaxed break-words font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
