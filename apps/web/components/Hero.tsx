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

  // Ensure the longer tagline is displayed in the hero section and role is concise
  const isLongTagline = (text?: string | null) =>
    (text && text.length > 25) || text?.includes("\n") || text?.toLowerCase().includes("frontend");

  const heroTagline = isLongTagline(headline)
    ? headline
    : isLongTagline(bio)
    ? bio
    : "Building the frontend you see\nand the backend you don't.";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-8 sm:py-16 lg:py-24 flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Name, Tagline */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 sm:space-y-12">
          {/* Name Header */}
          <div>
            <h1 className="hero-name-font text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-extrabold text-slate-900 leading-[1.04] tracking-tight">
              {name || "Aakanksha K Poojari"}
            </h1>
          </div>

          {/* Tagline / Headline */}
          <div className="max-w-xl">
            <p className="text-2xl sm:text-3xl md:text-[2.2rem] font-medium text-slate-800 leading-snug whitespace-pre-line tracking-tight">
              {heroTagline}
            </p>
          </div>
        </div>

        {/* Right Column: Profile Picture with Animated Walking & Sleeping Cat */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end pt-8 lg:pt-0">
          <div className="relative w-full max-w-[340px] sm:max-w-[390px]">
            {/* Animated Cat walking, sitting, and sleeping on top of frame */}
            <CatOnFrame />

            {/* Profile Image Frame */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border-2 border-slate-900/15 shadow-xl bg-slate-100 transition-all duration-300">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={name || "Aakanksha K Poojari"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 390px"
                  className="object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-200 text-slate-500 p-6 text-center">
                  <svg
                    className="w-16 h-16 mb-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Profile photo</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
