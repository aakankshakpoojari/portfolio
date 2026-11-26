"use client";

import React, { useMemo } from "react";
import type { Skill } from "@portfolio/db";
import { AlbumRail, type AlbumRailItem } from "@/components/ui/album-rail";

interface SkillsSectionProps {
  skills?: Skill[];
}

function getSkillBrandIcon(name: string): string | undefined {
  const normalized = name.toLowerCase().replace(/[\s\.\-_]/g, "");

  if (normalized.includes("html")) return "/skills/html5.png";
  if (normalized.includes("css")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
  if (normalized.includes("javascript") || normalized === "js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  if (normalized.includes("typescript") || normalized === "ts") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (normalized.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (normalized.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (normalized.includes("node")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
  if (normalized.includes("express")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg";
  if (normalized.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (normalized.includes("java") && !normalized.includes("script")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
  if (normalized.includes("cplusplus") || normalized === "cpp") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
  if (normalized === "c") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg";
  if (normalized.includes("postgres")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (normalized.includes("mongo")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg";
  if (normalized.includes("supabase")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg";
  if (normalized.includes("firebase")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg";
  if (normalized === "git") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg";
  if (normalized.includes("github")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
  if (normalized.includes("linux")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg";
  if (normalized.includes("docker")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";
  if (normalized.includes("sql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg";

  return undefined;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Format items from backend skills
  const albumItems = useMemo<AlbumRailItem[]>(() => {
    if (!skills || skills.length === 0) return [];

    return skills.map((skill) => {
      // Prioritize image URL from backend (Supabase icon column)
      const iconUrl = skill.icon && skill.icon.trim().length > 0
        ? skill.icon
        : getSkillBrandIcon(skill.name);

      return {
        id: skill.id,
        title: skill.name,
        subtitle: skill.category,
        imageUrl: iconUrl,
      };
    });
  }, [skills]);

  return (
    <section
      id="skills"
      className="w-full min-h-screen py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-striped-pattern-dark text-[#e5f1e8] relative z-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-10 select-none">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-400/80 mb-2.5 block">
            Technical Stack
          </span>
          <h2 className="hero-name-font text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100/60 font-mono tracking-wider">
            Scroll or drag to flip through the skill cards
          </p>
        </div>

        {/* Album Rail Component */}
        <AlbumRail
          items={albumItems}
          startIndex={0}
          className="w-full"
        />
      </div>
    </section>
  );
}

export default SkillsSection;
