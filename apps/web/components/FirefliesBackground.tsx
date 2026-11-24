'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { RisingParticles } from '@/components/ui/rising-particles';

export function FirefliesBackground() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // If not on home page, show immediately
    if (pathname !== '/') {
      setVisible(true);
      return;
    }

    // On home page: Wait until the welcome page rises from bottom to top
    const handleScreenCleared = () => {
      setVisible(true);
    };

    window.addEventListener('portfolio-screen-cleared', handleScreenCleared);

    // Fallback if loading screen is not present on DOM
    const loadingScreen = typeof document !== 'undefined' ? document.querySelector('[aria-label="Loading portfolio"]') : null;
    let fallbackTimer: NodeJS.Timeout | null = null;

    if (!loadingScreen) {
      setVisible(true);
    } else {
      fallbackTimer = setTimeout(() => {
        setVisible(true);
      }, 3700);
    }

    return () => {
      window.removeEventListener('portfolio-screen-cleared', handleScreenCleared);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[2] transition-opacity duration-1000 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <RisingParticles
        className="w-full h-full"
        particleCount={50}
        speed={0.65}
        minSize={1.8}
        maxSize={4.2}
        particleColors={[
          '#facc15', // Bright firefly yellow
          '#eab308', // Golden yellow
          '#f59e0b', // Warm amber
          '#fbbf24', // Amber gold
          '#f97316', // Warm firefly orange
          '#ea580c', // Sunset orange
        ]}
        glow={true}
        glowBlur={2.0}
        haloOpacity={0.18}
        swayAmplitude={22}
        twinkle={true}
        moveParticlesOnHover={true}
        hoverRadius={140}
      />
    </div>
  );
}

export default FirefliesBackground;
