import React, { useState } from 'react';
import { QrCode, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SecondaryNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface SecondaryNavProps {
  ariaLabel?: string;
  leftElement?: React.ReactNode;
  items?: SecondaryNavItem[];
  actionButton?: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    type?: 'button' | 'wechat';
  };
  rightElement?: React.ReactNode;
  className?: string;
}

export const SecondaryNav: React.FC<SecondaryNavProps> = ({
  ariaLabel = '页面二级导航',
  leftElement,
  items = [],
  actionButton,
  rightElement,
  className = '',
}) => {
  const [showWeChatQR, setShowWeChatQR] = useState(false);

  // Smooth scroll handler for anchor links with dynamic header offset
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    const targetId = href.slice(1);
    const targetEl = document.getElementById(targetId);
    
    if (targetEl) {
      // Calculate current header and secondary nav heights
      const siteHeader = document.querySelector('.site-header') as HTMLElement;
      const isHeaderHidden = siteHeader?.classList.contains('is-hidden');
      const headerHeight = siteHeader && !isHeaderHidden ? siteHeader.offsetHeight : 0;
      const secondaryNavHeight = 50;
      const totalOffset = headerHeight + secondaryNavHeight + 16; // extra 16px buffer
      
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - totalOffset;
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth'
      });
      
      // Update hash in URL cleanly
      try {
        window.history.pushState(null, '', href);
      } catch {
        // ignore state push in iframe
      }
    }
  };

  const hasLeft = Boolean(leftElement);
  const hasItems = items.length > 0;
  const hasRight = Boolean(rightElement || actionButton);

  // Layout distribution:
  // If 3 parts: Left, Center (items), Right
  // If 2 parts: Left & Right (e.g. Left + Items on Right, or Items on Left + Right button)
  const isTwoPartsLeftAndItems = hasLeft && hasItems && !hasRight;
  const isTwoPartsItemsAndRight = !hasLeft && hasItems && hasRight;
  const isThreeParts = hasLeft && hasItems && hasRight;

  return (
    <nav
      aria-label={ariaLabel}
      className={`secondary-nav-sticky z-40 w-full py-2 sm:py-2.5 transition-all duration-300 select-none ${className}`}
    >
      {/* Floating Capsule Container (Apple Accessory Card Style) */}
      <div className="max-w-[min(95%,1720px)] w-full mx-auto px-12 md:px-10 lg:px-24 2xl:px-12 bg-white/95 backdrop-blur-xl border border-[#E5E5E5] hover:border-neutral-300/80 rounded-2xl sm:rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-4 sm:px-6 h-[46px] relative flex items-center justify-between gap-4 transition-all">
        
        {/* Left Section */}
        {hasLeft ? (
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 min-w-0 text-xs sm:text-sm text-[#1D1D1F] z-10">
            {leftElement}
          </div>
        ) : (
          <div className="w-1 shrink-0"></div>
        )}

        {/* Center Items Section - Horizontally Centered in Capsule Container */}
        {hasItems && (
          <div
            className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-3.5 sm:gap-5 lg:gap-6 text-xs text-[#1D1D1F] overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth py-1 max-w-[calc(100%-140px)] mx-auto"
          >
            {items.map((item, idx) => {
              if (item.href) {
                return (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick();
                      }
                      handleAnchorClick(e, item.href);
                    }}
                    className={`transition-colors py-1 cursor-pointer font-medium tracking-tight ${
                      item.isActive
                        ? 'text-[#007BC7] font-semibold'
                        : 'text-[#1D1D1F] hover:text-[#007BC7]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={item.onClick}
                  className={`transition-colors py-1 cursor-pointer bg-transparent border-none font-medium tracking-tight p-0 ${
                    item.isActive
                      ? 'text-[#007BC7] font-semibold'
                      : 'text-[#1D1D1F] hover:text-[#007BC7]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Right Section */}
        {hasRight ? (
          <div className="flex items-center gap-2.5 shrink-0 ml-auto z-10">
            {rightElement ? (
              rightElement
            ) : actionButton?.type === 'wechat' ? (
              <div 
                className="relative"
                onMouseEnter={() => setShowWeChatQR(true)}
                onMouseLeave={() => setShowWeChatQR(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowWeChatQR(!showWeChatQR);
                    if (actionButton.onClick) actionButton.onClick();
                  }}
                  className="bg-[#007BC7] hover:bg-[#005F96] active:scale-95 text-white px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <QrCode className="w-3 h-3 text-white/90" />
                  <span>{actionButton.label || '企业微信'}</span>
                </button>

                <AnimatePresence>
                  {showWeChatQR && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 top-full mt-2 z-50 p-3.5 bg-white rounded-2xl shadow-xl border border-neutral-200/90 text-center w-48"
                    >
                      <div className="w-40 h-40 bg-neutral-50 rounded-xl border border-neutral-200/60 p-2 flex items-center justify-center mb-2 overflow-hidden mx-auto">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://work.weixin.qq.com" 
                          alt="企业微信二维码" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-xs font-semibold text-[#1D1D1F]">扫码添加资深战略顾问</p>
                      <p className="text-xs text-[#86868B] mt-0.5 font-mono">1对1 专家需求评估</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : actionButton ? (
              <button
                type="button"
                onClick={actionButton.onClick}
                className="bg-[#007BC7] hover:bg-[#005F96] active:scale-95 text-white px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all shadow-xs cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                {actionButton.icon}
                <span>{actionButton.label}</span>
              </button>
            ) : null}
          </div>
        ) : (
          <div className="w-1 shrink-0"></div>
        )}
      </div>
    </nav>
  );
};

