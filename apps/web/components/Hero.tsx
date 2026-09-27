"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CatOnFrame } from "./CatOnFrame";
import type { Profile } from "@portfolio/db";

interface HeroProps {
  profileData: Profile | {
    name: string;
    headline: string;
    bio?: string | null;
    profileImageUrl?: string | null;
  };
}

export function Hero({ profileData }: HeroProps) {
  const { name, headline, bio, profileImageUrl } = profileData;
  const [inkFilled, setInkFilled] = useState(false);

  useEffect(() => {
    const handleLoaded = () => {
      // Small delay so the loading screen starts sliding before the ink fills
      setTimeout(() => setInkFilled(true), 200);
    };

    window.addEventListener("portfolio-loaded", handleLoaded);
    return () => window.removeEventListener("portfolio-loaded", handleLoaded);
  }, []);

  // Ensure the longer tagline is displayed in the hero section and role is concise
  const isLongTagline = (text?: string | null) =>
    (text && text.length > 25) || text?.includes("\n") || text?.toLowerCase().includes("frontend");

  const heroTagline = isLongTagline(headline)
    ? headline
    : isLongTagline(bio)
    ? bio
    : "Building the frontend you see\nand the backend you don't.";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-16 lg:py-24 flex-1 flex flex-col justify-center relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-1 items-center px-12">
        {/* Left Column: Name, Tagline */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-1 sm:space-y-12">
          {/* Name Header — Ink Fill Animation */}
          <div>
            <h1
              className={`hero-name-font text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold leading-[1.04] tracking-tight pb-3 ink-fill-text${inkFilled ? " ink-fill-animate" : ""}`}
            >
              {name || "Aakanksha K Poojari"}
            </h1>
          </div>

          {/* Tagline / Headline - Deep Forest Green */}
          <div className="max-w-xl">
            <p className="text-2xl sm:text-3xl md:text-[2.2rem] font-medium text-[#0c311c] leading-snug whitespace-pre-line tracking-tight">
              {heroTagline}
            </p>
          </div>
        </div>

        {/* Right Column: Profile Picture with Animated Cat & Decorative Sunflowers */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end pt-8 lg:pt-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[390px]">
            {/* Top-Right Decorative Sunflowers (Pair) */}
            <div className="absolute -top-7 -right-7 sm:-top-9 sm:-right-9 w-20 h-20 sm:w-24 sm:h-24 z-30 pointer-events-none drop-shadow-md rotate-[12deg] select-none">
              <Image
                src="/sunflower.png?v=custom"
                alt="Decorative Sunflower Top"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <div className="absolute top-5 -right-8 sm:top-7 sm:-right-10 w-22 h-22 sm:w-26 sm:h-26 z-20 pointer-events-none drop-shadow-md -rotate-[24deg] select-none">
              <Image
                src="/sunflower.png?v=custom"
                alt="Decorative Sunflower Side"
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Bottom-Left Decorative Sunflower */}
            <div className="absolute -bottom-7 -left-7 sm:-bottom-9 sm:-left-9 w-22 h-22 sm:w-26 sm:h-26 z-30 pointer-events-none drop-shadow-md rotate-[36deg] select-none">
              <Image
                src="/sunflower.png?v=custom"
                alt="Decorative Sunflower Bottom"
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            {/* Animated Cat walking, sitting, and sleeping on top of frame */}
            <CatOnFrame />

            {/* Profile Image Frame */}
            <div className="relative w-full aspect-[4/5] overflow-hidden border-[#021a0d]/15 shadow-xl bg-[#e5f1e8] transition-all duration-300">
              <Image
                src={(profileImageUrl && profileImageUrl.length > 0) ? profileImageUrl : "/myimage.jpeg"}
                alt={name || "Aakanksha K Poojari"}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 390px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
