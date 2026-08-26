import React, { useRef, useState, useEffect, useCallback } from 'react';

export default function ScrollMask({
  children,
  direction = 'vertical', // 'vertical' or 'horizontal'
  fadeSize = 40,
  className = '',
  contentClassName = '',
  showIndicator = false,
  ...props
}) {
  const containerRef = useRef(null);
  const [maskStyle, setMaskStyle] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollStart, setCanScrollStart] = useState(false);
  const [canScrollEnd, setCanScrollEnd] = useState(false);

  const updateMask = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    if (direction === 'vertical') {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const maxScroll = scrollHeight - clientHeight;
      const isScrollable = maxScroll > 2;

      const hasTopFade = isScrollable && scrollTop > 5;
      const hasBottomFade = isScrollable && scrollTop < maxScroll - 5;

      setCanScrollStart(hasTopFade);
      setCanScrollEnd(hasBottomFade);
      setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);

      if (!isScrollable) {
        setMaskStyle({});
        return;
      }

      let gradient = '';
      if (hasTopFade && hasBottomFade) {
        gradient = `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`;
      } else if (hasTopFade) {
        gradient = `linear-gradient(to bottom, transparent 0px, black ${fadeSize}px, black 100%)`;
      } else if (hasBottomFade) {
        gradient = `linear-gradient(to bottom, black 0%, black calc(100% - ${fadeSize}px), transparent 100%)`;
      } else {
        gradient = 'none';
      }

      setMaskStyle({
        WebkitMaskImage: gradient,
        maskImage: gradient,
      });
    } else {
      // Horizontal
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const isScrollable = maxScroll > 2;

      const hasLeftFade = isScrollable && scrollLeft > 5;
      const hasRightFade = isScrollable && scrollLeft < maxScroll - 5;

      setCanScrollStart(hasLeftFade);
      setCanScrollEnd(hasRightFade);
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);

      if (!isScrollable) {
        setMaskStyle({});
        return;
      }

      let gradient = '';
      if (hasLeftFade && hasRightFade) {
        gradient = `linear-gradient(to right, transparent 0px, black ${fadeSize}px, black calc(100% - ${fadeSize}px), transparent 100%)`;
      } else if (hasLeftFade) {
        gradient = `linear-gradient(to right, transparent 0px, black ${fadeSize}px, black 100%)`;
      } else if (hasRightFade) {
        gradient = `linear-gradient(to right, black 0%, black calc(100% - ${fadeSize}px), transparent 100%)`;
      } else {
        gradient = 'none';
      }

      setMaskStyle({
        WebkitMaskImage: gradient,
        maskImage: gradient,
      });
    }
  }, [direction, fadeSize]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    updateMask();
    el.addEventListener('scroll', updateMask, { passive: true });
    window.addEventListener('resize', updateMask);

    // Initial delay to handle dynamic content loads
    const timeout = setTimeout(updateMask, 150);

    return () => {
      el.removeEventListener('scroll', updateMask);
      window.removeEventListener('resize', updateMask);
      clearTimeout(timeout);
    };
  }, [updateMask, children]);

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Scrollable Container with Dynamic Gradient Mask */}
      <div
        ref={containerRef}
        style={maskStyle}
        className={`w-full overflow-auto transition-[mask-image] duration-200 scrollbar-none ${contentClassName}`}
      >
        {children}
      </div>

      {/* Optional Progress / Scroll Indicator */}
      {showIndicator && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-indigo-500 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
