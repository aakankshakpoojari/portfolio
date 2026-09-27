"use client";

import React from "react";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

const SKILL_ITEMS: WorksWheelItem[] = [
  {
    title: "Languages",
    image: "/skill-card-languages.svg",
  },
  {
    title: "Frontend",
    image: "/skill-card-frontend.svg",
  },
  {
    title: "Backend",
    image: "/skill-card-backend.svg",
  },
  {
    title: "Databases",
    image: "/skill-card-databases.svg",
  },
  {
    title: "Tools",
    image: "/skill-card-tools.svg",
  },
  {
    title: "Core Concepts",
    image: "/skill-card-concepts.svg",
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full min-h-screen bg-striped-pattern-dark text-[#e5f1e8] flex flex-col relative z-20 pt-14 pb-28 px-4 sm:px-6 md:px-12 overflow-visible"
    >
      {/* Section heading */}
      <div className="w-full max-w-7xl mx-auto mb-6 text-center">
        <div className="w-full border-t border-[#e5f1e8]/20 mb-8" />
        <h2 className="hero-name-font text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#f2f8f4] tracking-tight">
          Skills
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#86efac]/80 font-medium font-sans">
          Scroll or drag the wheel to explore technologies
        </p>
      </div>

      {/* 21st.dev WorksWheel — full stage height with overflow-visible */}
      <div className="w-full h-[88vh] min-h-[660px] relative overflow-visible">
        <WorksWheel
          items={SKILL_ITEMS}
          label="Skills '26"
          action="View"
          className="h-full w-full bg-transparent text-[#f2f8f4]"
        />
      </div>
    </section>
  );
}

export default SkillsSection;
