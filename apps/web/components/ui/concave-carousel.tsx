'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ConcaveCarouselItem {
  id: string | number;
  title: string;
  subtitle?: string;
  slug?: string;
  imageUrl?: string;
  href?: string;
  tags?: string[];
}

export interface ConcaveCarouselProps {
  items: ConcaveCarouselItem[];
  startIndex?: number;
  aspect?: number; // e.g. 1.35
  gap?: number; // gap between cards in px (default 24)
  curvature?: number; // 0 to 1
  radius?: number; // border radius in px
  reflection?: number; // 0 to 1
  dim?: number; // 0 to 1
  autoplay?: 'drift' | 'step' | 'off';
  speed?: number;
  className?: string;
}

export function ConcaveCarousel({
  items,
  startIndex = 0,
  aspect = 1.35,
  gap = 26,
  curvature = 0.72,
  radius = 16,
  reflection = 0.08,
  dim = 0.4,
  autoplay = 'off',
  speed = 0.16,
  className = '',
}: ConcaveCarouselProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // Track container width dynamically for responsive 3D geometry
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerWidth(el.clientWidth || window.innerWidth);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Compute exact layout metrics so cards NEVER overlap and always maintain a clear gap
  const layout = useMemo(() => {
    let cardW = 380;
    let cardGap = gap;

    if (containerWidth < 640) {
      cardW = Math.min(270, Math.round(containerWidth * 0.72));
      cardGap = 16;
    } else if (containerWidth < 1024) {
      cardW = Math.min(320, Math.round(containerWidth * 0.42));
      cardGap = 20;
    } else {
      cardW = 380;
      cardGap = 26;
    }

    const cardH = Math.round(cardW / aspect);
    const stepDist = cardW + cardGap;

    // Radius of cylinder: large enough for gentle concave curve
    const cylinderRadius = Math.max(880, Math.round(stepDist / 0.38));

    // Exact angular step per card so center-to-center distance matches cardW + cardGap
    const stepAngleDeg = (stepDist / cylinderRadius) * (180 / Math.PI);

    return {
      cardW,
      cardH,
      cardGap,
      cylinderRadius,
      stepAngleDeg,
    };
  }, [containerWidth, aspect, gap]);

  // If items length < 6, duplicate them smoothly so the 3D drum always has flanking cards
  const virtualItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (items.length >= 6) return items.map((item, originalIndex) => ({ ...item, originalIndex }));

    // Duplicate to at least 8 panels for a continuous circular gallery wall
    const multiplier = Math.ceil(8 / items.length);
    const result: (ConcaveCarouselItem & { originalIndex: number })[] = [];
    for (let m = 0; m < multiplier; m++) {
      items.forEach((item, originalIndex) => {
        result.push({ ...item, originalIndex });
      });
    }
    return result;
  }, [items]);

  const totalVirtual = virtualItems.length;

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [targetIndex, setTargetIndex] = useState(startIndex);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const dragDistance = useRef(0);
  const snapTimer = useRef<NodeJS.Timeout | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Spring animation state for continuous smooth rotation
  const currentPos = useRef(startIndex);
  const targetPos = useRef(startIndex);

  // Smooth lerp / spring loop
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const diff = targetPos.current - currentPos.current;
      if (Math.abs(diff) > 0.0002) {
        currentPos.current += diff * 0.14;
        setCurrentIndex(currentPos.current);
      } else if (currentPos.current !== targetPos.current) {
        currentPos.current = targetPos.current;
        setCurrentIndex(currentPos.current);
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (newIndex: number) => {
      targetPos.current = newIndex;
      setTargetIndex(newIndex);
    },
    []
  );

  const prev = useCallback(() => {
    goTo(Math.round(targetPos.current) - 1);
  }, [goTo]);

  const next = useCallback(() => {
    goTo(Math.round(targetPos.current) + 1);
  }, [goTo]);

  // Non-passive wheel event listener: continuous fluid momentum scrolling without window scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 24;
      else if (e.deltaMode === 2) delta *= 500;

      const impulse = delta * 0.0018;
      targetPos.current += impulse;

      if (snapTimer.current) clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        const snapped = Math.round(targetPos.current);
        targetPos.current = snapped;
        setTargetIndex(snapped);
      }, 150);
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
    dragDistance.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragCurrentX.current;
    dragCurrentX.current = e.clientX;
    dragDistance.current += Math.abs(delta);

    // Normalized drag sensitivity based on card width
    const sensitivity = 1 / (layout.cardW * 1.05);
    targetPos.current -= delta * sensitivity;
    currentPos.current = targetPos.current;
    setCurrentIndex(currentPos.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest integer panel
    const snapped = Math.round(targetPos.current);
    targetPos.current = snapped;
    setTargetIndex(snapped);
  };

  // Autoplay support
  useEffect(() => {
    if (autoplay === 'off' || isDragging) return;
    const timer = setInterval(() => {
      next();
    }, 4500);
    return () => clearInterval(timer);
  }, [autoplay, isDragging, next]);

  // Real active item calculation (normalized to items length)
  const normalizedIndex = useMemo(() => {
    if (!items || items.length === 0) return 0;
    const raw = Math.round(targetPos.current) % items.length;
    return raw < 0 ? raw + items.length : raw;
  }, [items, targetIndex]);

  const activeItem = items[normalizedIndex] || items[0];

  // Render 5 visible panels (-2 to +2) relative to currentPos
  const visiblePanels = useMemo(() => {
    if (totalVirtual === 0) return [];

    const panels: {
      virtualIdx: number;
      offset: number;
      item: ConcaveCarouselItem & { originalIndex: number };
    }[] = [];

    const center = Math.round(currentIndex);
    const range = 2; // 5 panels total (-2 to +2) matching the exact reference layout

    for (let offset = -range; offset <= range; offset++) {
      const virtualIdx = ((center + offset) % totalVirtual + totalVirtual) % totalVirtual;
      const item = virtualItems[virtualIdx];
      if (item) {
        panels.push({
          virtualIdx: center + offset,
          offset: center + offset - currentIndex,
          item,
        });
      }
    }
    return panels;
  }, [currentIndex, totalVirtual, virtualItems]);

  const handleCardClick = (item: ConcaveCarouselItem, offset: number) => {
    // If it was a drag, don't trigger navigation
    if (dragDistance.current > 8) return;

    // If clicked on a side panel, center it first
    if (Math.abs(offset) > 0.35) {
      goTo(Math.round(targetPos.current + offset));
      return;
    }

    // Centered card clicked: navigate to details
    const targetUrl = item.href || (item.slug ? `/projects/${item.slug}` : null);
    if (targetUrl) {
      router.push(targetUrl);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full select-none overflow-hidden py-4 sm:py-8 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Curved Stage */}
      <div
        className="relative w-full h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {visiblePanels.map(({ virtualIdx, offset, item }) => {
            const angleDeg = offset * layout.stepAngleDeg;
            const angleRad = (angleDeg * Math.PI) / 180;

            // Concave cylindrical projection with non-collapsing guaranteed gap
            const x = layout.cylinderRadius * Math.sin(angleRad);
            const z = (1 - Math.cos(angleRad)) * layout.cylinderRadius * 0.52;
            const rotateY = -angleDeg;

            const isCenter = Math.abs(offset) < 0.35;

            return (
              <div
                key={virtualIdx}
                onClick={() => handleCardClick(item, offset)}
                className="absolute flex items-center justify-center group cursor-pointer"
                style={{
                  width: `${layout.cardW}px`,
                  height: `${layout.cardH}px`,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                  opacity: 1, // 100% solid opacity on all cards
                  zIndex: Math.round(100 - Math.abs(offset) * 10),
                  willChange: 'transform',
                  transition: 'none',
                }}
              >
                {/* Panel Card - 100% Solid Opacity with Floor Reflection */}
                <div
                  className={`relative w-full h-full overflow-hidden bg-[#021309] border border-white/15 shadow-2xl transition-all duration-300 ${
                    isCenter
                      ? 'ring-2 ring-emerald-400/50 shadow-emerald-950/60'
                      : 'hover:border-white/40'
                  }`}
                  style={{
                    borderRadius: `${radius}px`,
                    WebkitBoxReflect: `below 6px linear-gradient(to bottom, transparent 65%, rgba(0,0,0,${reflection * 3.5}))`,
                  }}
                >
                  <Image
                    src={item.imageUrl || '/myimage.jpeg'}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Subtle bottom shadow vignette on center card only */}
                  {isCenter && (
                    <div
                      className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)',
                      }}
                    />
                  )}

                  {/* "View Project" pill badge on center card hover */}
                  {isCenter && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-wider uppercase text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Project ↗
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient floor gloss reflection glow beneath center card */}
        <div
          className="absolute bottom-1 w-72 sm:w-96 h-10 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
          style={{ transform: 'rotateX(80deg)' }}
        />
      </div>

      {/* Caption & Controls (Centered below the curved wall, exactly matching design) */}
      <div className="relative z-20 flex flex-col items-center text-center mt-6 sm:mt-8 max-w-xl px-4">
        {/* Title */}
        <h3
          onClick={() => {
            const targetUrl = activeItem.href || (activeItem.slug ? `/projects/${activeItem.slug}` : null);
            if (targetUrl) router.push(targetUrl);
          }}
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight cursor-pointer hover:text-emerald-300 transition-colors"
        >
          {activeItem.title}
        </h3>

        {/* Subtitle / Short Description */}
        <p className="text-sm sm:text-base text-emerald-100/75 mt-1.5 line-clamp-2 max-w-lg font-normal">
          {activeItem.subtitle ||
            (activeItem as any).shortDescription ||
            (activeItem as any).description ||
            'Explore this full-stack project architecture and live demo.'}
        </p>

        {/* Navigation Bar: (<) 01 / 04 (>) */}
        <div className="flex items-center space-x-6 mt-5">
          {/* Left Arrow Button */}
          <button
            onClick={prev}
            aria-label="Previous project"
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 text-white/90 flex items-center justify-center transition-all duration-200 hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Counter: e.g. 01 / 04 */}
          <span className="text-sm font-mono tracking-widest text-emerald-200/80 font-medium select-none">
            {String(normalizedIndex + 1).padStart(2, '0')}{' '}
            <span className="text-white/30">/</span>{' '}
            {String(items.length).padStart(2, '0')}
          </span>

          {/* Right Arrow Button */}
          <button
            onClick={next}
            aria-label="Next project"
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 active:scale-95 text-white/90 flex items-center justify-center transition-all duration-200 hover:border-emerald-400/50 hover:text-emerald-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConcaveCarousel;
