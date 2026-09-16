import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { calculateDesktopScale } from '../hooks/useDesktopScale';

export interface DesktopScaleContainerHandle {
  remeasure: () => void;
  getShell: () => HTMLDivElement | null;
  getCanvas: () => HTMLDivElement | null;
}

export interface DesktopScaleContainerProps {
  children: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  id?: string;
  style?: React.CSSProperties;
  canvasStyle?: React.CSSProperties;
}

export const DesktopScaleContainer = forwardRef<DesktopScaleContainerHandle, DesktopScaleContainerProps>(
  ({ children, className = '', canvasClassName = '', id, style, canvasStyle }, ref) => {
    const shellRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const updateHeight = () => {
      const shell = shellRef.current;
      const canvas = canvasRef.current;
      if (!shell || !canvas) return;

      if (window.innerWidth >= 1024) {
        const currentScale = calculateDesktopScale(window.innerWidth);
        // Measure the unscaled natural height of the canvas content
        const unscaledHeight = Math.max(canvas.offsetHeight, canvas.scrollHeight);
        shell.style.height = `${unscaledHeight * currentScale}px`;
      } else {
        shell.style.height = '';
      }
    };

    useImperativeHandle(ref, () => ({
      remeasure: updateHeight,
      getShell: () => shellRef.current,
      getCanvas: () => canvasRef.current,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      updateHeight();

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateHeight);
      });
      resizeObserver.observe(canvas);

      const onResize = () => {
        requestAnimationFrame(updateHeight);
      };

      const onRemeasureEvent = () => {
        requestAnimationFrame(updateHeight);
      };

      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('orientationchange', onResize, { passive: true });
      window.addEventListener('desktop-scale-remeasure', onRemeasureEvent);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(updateHeight);
      }

      // Attach load listener to uncompleted images
      const images = canvas.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', updateHeight, { once: true });
        }
      });

      // Periodic check for animations or dynamic updates
      const timer1 = setTimeout(updateHeight, 150);
      const timer2 = setTimeout(updateHeight, 400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        resizeObserver.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('orientationchange', onResize);
        window.removeEventListener('desktop-scale-remeasure', onRemeasureEvent);
      };
    }, []);

    return (
      <div
        ref={shellRef}
        id={id}
        className={`desktop-scale-shell w-full ${className}`}
        style={style}
      >
        <div
          ref={canvasRef}
          className={`desktop-scale-canvas w-full ${canvasClassName}`}
          style={canvasStyle}
        >
          {children}
        </div>
      </div>
    );
  }
);

DesktopScaleContainer.displayName = 'DesktopScaleContainer';

// Public alias exports for unified page scaling architecture across the app
export const PageScaleShell = DesktopScaleContainer;
export type PageScaleShellProps = DesktopScaleContainerProps;
export type PageScaleShellHandle = DesktopScaleContainerHandle;
