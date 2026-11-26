'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface AlbumRailItem {
  id: string | number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  icon?: string | null;
  href?: string;
  color?: string;
}

export interface AlbumRailProps {
  items: AlbumRailItem[];
  startIndex?: number;
  className?: string;
}

export function AlbumRail({
  items,
  startIndex = 0,
  className = '',
}: AlbumRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth || window.innerWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [isSettled, setIsSettled] = useState(true);

  // Wheel accumulation & settling timers
  const wheelAccumulator = useRef(0);
  const settleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Drag interaction refs
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  // Smaller, more compact card dimensions (clean and balanced)
  const sleeveSize = useMemo(() => {
    if (containerWidth < 480) return 200;
    if (containerWidth < 768) return 230;
    if (containerWidth < 1024) return 255;
    return 270;
  }, [containerWidth]);

  // Horizontal offset step for fanned deck of cards
  const stepOffset = useMemo(() => {
    if (containerWidth < 480) return 50;
    if (containerWidth < 768) return 58;
    return 65;
  }, [containerWidth]);

  const goTo = useCallback(
    (index: number) => {
      if (!items || items.length === 0) return;
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      setIsSettled(false);
      setActiveIndex(clamped);

      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      settleTimeout.current = setTimeout(() => {
        setIsSettled(true);
      }, 240);
    },
    [items]
  );

  const prev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [goTo, activeIndex]);

  const next = useCallback(() => {
    goTo(activeIndex + 1);
  }, [goTo, activeIndex]);

  // Intercept vertical wheel (deltaY) and horizontal trackpad swipes (deltaX)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsSettled(false);

      const rawDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      let normDelta = rawDelta;
      if (e.deltaMode === 1) normDelta *= 25;
      else if (e.deltaMode === 2) normDelta *= 500;

      wheelAccumulator.current += normDelta;

      const threshold = 55;

      if (Math.abs(wheelAccumulator.current) >= threshold) {
        const steps = Math.trunc(wheelAccumulator.current / threshold);
        wheelAccumulator.current -= steps * threshold;

        setActiveIndex((prevIdx) => {
          if (!items || items.length === 0) return 0;
          return Math.max(0, Math.min(items.length - 1, prevIdx + steps));
        });
      }

      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      settleTimeout.current = setTimeout(() => {
        wheelAccumulator.current = 0;
        setIsSettled(true);
      }, 220);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [items]);

  // Drag / swipe handling with touch and mouse
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragCurrentX.current = e.clientX;
    setIsSettled(false);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const deltaX = dragCurrentX.current - dragStartX.current;
    const threshold = 40;

    if (deltaX < -threshold) {
      next();
    } else if (deltaX > threshold) {
      prev();
    } else {
      setIsSettled(true);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prev();
      } else if (e.key === 'ArrowRight') {
        next();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prev, next]);

  const activeItem = items[activeIndex] || items[0];

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full select-none overflow-hidden py-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Rail Stage */}
      <div
        className="relative w-full h-[320px] sm:h-[370px] md:h-[410px] flex items-center justify-center"
        style={{
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {items.map((item, index) => {
            const distance = index - activeIndex;
            const absDist = Math.abs(distance);

            // Hide cards beyond 4 steps away
            if (absDist > 4.5) return null;

            const isCenter = distance === 0;

            // 1. Horizontal fanned offset matching video demo
            // Each adjacent card peeks out by stepOffset (~65px)
            const sign = Math.sign(distance);
            const x =
              distance === 0
                ? 0
                : sign * (stepOffset + (absDist - 1) * (stepOffset * 0.78));

            // 2. Vertical curve: cards arc slightly downward as they fan out
            const y = absDist * 7;

            // 3. Depth recession & scale reduction
            const z = -absDist * 40;
            const scale = Math.max(0.68, 1 - absDist * 0.08);

            // 4. Fan tilt (Z-axis): organic fan angle
            // Left cards tilt counter-clockwise (-), right cards tilt clockwise (+)
            const rotateZ = distance * 5.2;

            // 5. Inward turn (Y-axis): flanking cards angle inward toward center
            const rotateY =
              distance === 0
                ? 0
                : -sign * (14 + Math.min(2, absDist - 1) * 6);

            // 6. Strict z-index: center is highest, each outer card is behind
            const zIndex = 50 - absDist * 10;

            // 7. Progressive brightness & opacity
            const brightness = Math.max(0.48, 1 - absDist * 0.14);
            const opacity =
              absDist > 4 ? 0 : Math.max(0, 1 - Math.max(0, absDist - 2) * 0.35);

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (!isCenter) goTo(index);
                }}
                className="absolute flex items-center justify-center cursor-pointer group"
                style={{
                  width: `${sleeveSize}px`,
                  height: `${sleeveSize}px`,
                  transformStyle: 'preserve-3d',
                  zIndex,
                }}
                animate={{
                  x,
                  y,
                  z,
                  rotateY,
                  rotateZ,
                  scale,
                  opacity,
                  filter: `brightness(${brightness})`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
              >
                {/* White Album Sleeve Card (COMPLETELY NO DISK) */}
                <div
                  className={`relative w-full h-full overflow-hidden bg-white rounded-2xl shadow-[0_15px_35px_-8px_rgba(0,0,0,0.65)] border border-black/10 transition-shadow duration-300 ${
                    isCenter
                      ? 'shadow-[0_22px_45px_rgba(0,0,0,0.75)]'
                      : 'hover:shadow-xl'
                  }`}
                >
                  {/* Card Content / Skill Icon */}
                  <div className="relative w-full h-full p-6 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#f7f9f8]">
                    {item.imageUrl ? (
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-contain drop-shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-gray-800 shadow-sm">
                        {item.title.charAt(0)}
                      </div>
                    )}

                    {/* Skill Label on Sleeve */}
                    <div className="mt-4 text-center">
                      <span className="text-sm sm:text-base font-bold text-gray-900 tracking-tight block">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="mt-0.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gray-500 block">
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Album Cover Subtle Gloss Sheen Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 45%, rgba(0,0,0,0.05) 100%)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Caption Display below Active Center Card (White Text & Muted Gray, Zero Neon) */}
      <div className="relative z-20 flex flex-col items-center text-center mt-3 max-w-md px-4 min-h-[54px]">
        <div
          className={`flex flex-col items-center transition-all duration-300 transform ${
            isSettled
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95'
          }`}
        >
          {/* Title: bold white sans-serif */}
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-sans">
            {activeItem.title}
          </h3>

          {/* Subtitle: muted gray #888888 */}
          <p className="text-xs sm:text-sm font-normal text-[#888888] mt-0.5 font-sans">
            {activeItem.subtitle || 'Skill · Technology'}
          </p>
        </div>

        {/* Minimal Nav Controls - PURE WHITE (NO NEON) */}
        <div className="flex items-center space-x-4 sm:space-x-5 mt-3">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous skill"
            className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none text-white flex items-center justify-center transition-all duration-200 hover:border-white/50"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Scrubber markers - PURE WHITE (NO NEON GREEN) */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto max-w-[260px] sm:max-w-[340px] py-1 px-1">
            {items.map((it, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={it.id}
                  onClick={() => goTo(idx)}
                  aria-label={`Jump to ${it.title}`}
                  className="group py-2 px-0.5 flex items-center transition-all shrink-0"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-1.5 h-3.5 sm:h-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
                        : 'w-0.5 h-2 sm:h-2.5 bg-white/25 group-hover:bg-white/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={next}
            disabled={activeIndex === items.length - 1}
            aria-label="Next skill"
            className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 disabled:opacity-20 disabled:pointer-events-none text-white flex items-center justify-center transition-all duration-200 hover:border-white/50"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlbumRail;
