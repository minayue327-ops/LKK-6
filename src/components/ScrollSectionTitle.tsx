import React, { useEffect, useRef, useState } from 'react';

interface ScrollSectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: React.ReactNode;
  dark?: boolean;
  align?: 'left' | 'center' | 'between';
  className?: string;
  rightElement?: React.ReactNode;
}

export const ScrollSectionTitle: React.FC<ScrollSectionTitleProps> = ({
  badge,
  title,
  subtitle,
  dark = false,
  align = 'between',
  className = '',
  rightElement
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // In focus when title enters viewport
      const isInFocus = rect.top < viewportHeight * 0.90 && rect.bottom > viewportHeight * 0.08;
      setIsRevealed(isInFocus);
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    checkVisibility();

    const timer = setTimeout(checkVisibility, 100);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      clearTimeout(timer);
    };
  }, []);

  const chars = title.split('');

  if (align === 'center') {
    return (
      <div 
        ref={containerRef} 
        className={`scroll-section-header scroll-section-header-center text-center max-w-2xl mx-auto mb-12 md:mb-16 flex flex-col items-center ${className}`}
      >
        {badge && (
          <span 
            className={`text-xs font-semibold uppercase tracking-widest font-mono block mb-2 transition-colors duration-700 ${
              dark ? 'text-[#4FA8E8]' : 'text-[#007BC7]'
            }`}
          >
            {badge}
          </span>
        )}
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display select-none">
          {chars.map((char, idx) => (
            <span
              key={idx}
              className="scroll-title-char inline-block"
              style={{
                color: isRevealed 
                  ? (dark ? '#FFFFFF' : '#1D1D1F')
                  : (dark ? 'rgba(255, 255, 255, 0.25)' : '#C2C2C2'),
                opacity: isRevealed ? 1 : 0.35,
                transform: isRevealed ? 'translateY(0)' : 'translateY(4px)',
                transition: `color 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s`,
                filter: isRevealed ? 'blur(0px)' : 'blur(0.5px)'
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {subtitle && (
          <p 
            className={`text-sm md:text-base leading-relaxed transition-all duration-700 font-normal mt-2.5 max-w-xl ${
              dark ? 'text-neutral-400' : 'text-[#86868B]'
            } ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
          >
            {subtitle}
          </p>
        )}

        {rightElement && (
          <div className="mt-4">
            {rightElement}
          </div>
        )}
      </div>
    );
  }

  if (align === 'left') {
    return (
      <div 
        ref={containerRef} 
        className={`scroll-section-header scroll-section-header-left text-left max-w-2xl mb-12 md:mb-16 flex flex-col items-start ${className}`}
      >
        {badge && (
          <span 
            className={`text-xs font-semibold uppercase tracking-widest font-mono block mb-2 transition-colors duration-700 ${
              dark ? 'text-[#4FA8E8]' : 'text-[#007BC7]'
            }`}
          >
            {badge}
          </span>
        )}
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display select-none block w-full text-left">
          {chars.map((char, idx) => (
            <span
              key={idx}
              className="scroll-title-char inline-block"
              style={{
                color: isRevealed 
                  ? (dark ? '#FFFFFF' : '#1D1D1F')
                  : (dark ? 'rgba(255, 255, 255, 0.25)' : '#C2C2C2'),
                opacity: isRevealed ? 1 : 0.35,
                transform: isRevealed ? 'translateY(0)' : 'translateY(4px)',
                transition: `color 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s`,
                filter: isRevealed ? 'blur(0px)' : 'blur(0.5px)'
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {subtitle && (
          <p 
            className={`text-sm md:text-base leading-relaxed transition-all duration-700 font-normal mt-3 max-w-xl w-full text-left ${
              dark ? 'text-neutral-400' : 'text-[#86868B]'
            } ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
          >
            {subtitle}
          </p>
        )}

        {rightElement && (
          <div className="mt-4">
            {rightElement}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`scroll-section-header scroll-section-header-between mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}
    >
      <div className="max-w-2xl text-left">
        {badge && (
          <span 
            className={`text-xs font-semibold uppercase tracking-widest font-mono block mb-2 transition-colors duration-700 ${
              dark ? 'text-[#4FA8E8]' : 'text-[#007BC7]'
            }`}
          >
            {badge}
          </span>
        )}
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-display select-none">
          {chars.map((char, idx) => (
            <span
              key={idx}
              className="scroll-title-char inline-block"
              style={{
                color: isRevealed 
                  ? (dark ? '#FFFFFF' : '#1D1D1F')
                  : (dark ? 'rgba(255, 255, 255, 0.25)' : '#C2C2C2'),
                opacity: isRevealed ? 1 : 0.35,
                transform: isRevealed ? 'translateY(0)' : 'translateY(4px)',
                transition: `color 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.03}s`,
                filter: isRevealed ? 'blur(0px)' : 'blur(0.5px)'
              }}
            >
              {char}
            </span>
          ))}
        </h2>

        {rightElement && subtitle && (
          <p 
            className={`text-sm md:text-base leading-relaxed transition-all duration-700 font-normal mt-3 max-w-xl ${
              dark ? 'text-neutral-400' : 'text-[#86868B]'
            } ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {rightElement ? (
        <div className="shrink-0">
          {rightElement}
        </div>
      ) : (
        subtitle && (
          <div className="max-w-md lg:max-w-lg shrink-0 md:mb-1">
            <p 
              className={`text-sm md:text-base leading-relaxed transition-all duration-700 font-normal ${
                dark ? 'text-neutral-400' : 'text-[#86868B]'
              } ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-1'}`}
            >
              {subtitle}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ScrollSectionTitle;
