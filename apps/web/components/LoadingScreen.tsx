"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export function LoadingScreen({ onLoaded }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Disable scrolling during initial load
    document.body.style.overflow = "hidden";

    const duration = 2400; // 2.4 seconds loading animation
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          // Trigger exit animation after reaching 100%
          setTimeout(() => {
            setIsExiting(true);
            // Notify other components (like the Cat animation) that loading has finished
            window.dispatchEvent(new CustomEvent("portfolio-loaded"));
            if (onLoaded) onLoaded();

            // Re-enable scrolling after slide-up transition completes
            setTimeout(() => {
              setIsRemoved(true);
              document.body.style.overflow = "unset";
            }, 850);
          }, 250);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "unset";
    };
  }, [onLoaded]);

  if (isRemoved) return null;

  // Reduced spinning speed by half (360 degrees for full cycle instead of 720)
  const rotationAngle = (progress / 100) * 360;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#021309] text-white transition-transform duration-800 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      style={{
        boxShadow: isExiting ? "0 25px 50px -12px rgba(0,0,0,0.5)" : "none",
      }}
      aria-label="Loading portfolio"
    >
      {/* Top Loading Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] sm:h-[4px] bg-white/10 overflow-hidden">
        <div
          className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-[width] duration-75 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Center Content: Rotating Sunflower & Welcome Text */}
      <div className="flex flex-col items-center justify-center select-none px-6 text-center">
        {/* Sunflower Container */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-8 flex items-center justify-center">
          <div
            className="relative w-full h-full transition-transform duration-200 ease-out"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
            }}
          >
            <Image
              src="/sunflower.png?v=custom"
              alt="Sunflower"
              fill
              priority
              unoptimized
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-white/95 animate-pulse">
          Welcome to my portfolio!
        </h2>
        
        {/* Subtle percentage indicator */}
        <span className="mt-3 text-xs tracking-widest uppercase font-mono text-emerald-300/70">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
