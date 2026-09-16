import { useState, useEffect } from 'react';

export const DESKTOP_DESIGN_WIDTH = 1707;
export const MIN_DESKTOP_WIDTH = 1024;
export const MAX_DESKTOP_WIDTH = 2560;

/**
 * 桌面统一缩放公式:
 * scale = clamp(1024 / 1707, window.innerWidth / 1707, 2560 / 1707)
 * 即下限约 0.599883，上限约 1.499707。
 * 当 window.innerWidth === 1707 时 scale 严格等于 1。
 * 1024px 以下返回 1（取消缩放）。
 */
export function calculateDesktopScale(width: number): number {
  if (width < MIN_DESKTOP_WIDTH) {
    return 1;
  }
  const minScale = MIN_DESKTOP_WIDTH / DESKTOP_DESIGN_WIDTH; // 1024 / 1707 ≈ 0.5998828353837141
  const maxScale = MAX_DESKTOP_WIDTH / DESKTOP_DESIGN_WIDTH; // 2560 / 1707 ≈ 1.4997070884592854
  const currentRatio = width / DESKTOP_DESIGN_WIDTH;
  return Math.min(Math.max(minScale, currentRatio), maxScale);
}

export function useDesktopScale() {
  const [scale, setScale] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return calculateDesktopScale(window.innerWidth);
    }
    return 1;
  });

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= MIN_DESKTOP_WIDTH;
    }
    return false;
  });

  useEffect(() => {
    let rafId: number | null = null;

    const applyScale = () => {
      const width = window.innerWidth;
      const desktop = width >= MIN_DESKTOP_WIDTH;
      const newScale = calculateDesktopScale(width);

      setIsDesktop(desktop);
      setScale(newScale);

      // 写入 CSS 变量，供 CSS transform 统一调用
      document.documentElement.style.setProperty('--desktop-design-width', `${DESKTOP_DESIGN_WIDTH}px`);
      document.documentElement.style.setProperty('--desktop-page-scale', `${newScale}`);

      // 缩放前坐标补偿量：确保视口水平居中视觉坐标 (window.innerWidth - visualWidth) / 2
      const visualWidth = DESKTOP_DESIGN_WIDTH * newScale;
      const visualLeft = (width - visualWidth) / 2;
      const unscaledOffsetX = desktop ? visualLeft / newScale : 0;
      document.documentElement.style.setProperty('--desktop-canvas-offset-x', `${unscaledOffsetX}px`);
    };

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(applyScale);
    };

    // 初次挂载时执行
    applyScale();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return { scale, isDesktop, designWidth: DESKTOP_DESIGN_WIDTH };
}
