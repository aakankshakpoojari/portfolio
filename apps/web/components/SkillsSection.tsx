"use client";

import { WorksWheel } from "@/components/ui/works-wheel";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    image: "/skill-languages.jpg",
  },
  {
    title: "Frontend",
    image: "/skill-frontend.jpg",
  },
  {
    title: "Backend",
    image: "/skill-backend.jpg",
  },
  {
    title: "Databases",
    image: "/skill-databases.jpg",
  },
  {
    title: "Tools",
    image: "/skill-tools.jpg",
  },
  {
    title: "Core Concepts",
    image: "/skill-concepts.jpg",
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full min-h-screen bg-striped-pattern flex flex-col relative z-10"
    >
      {/* Section heading */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-10 pt-16 pb-4">
        <div className="w-full border-t border-[#032306]/20 mb-8" />
        <h2 className="hero-name-font text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#032306] tracking-tight">
          Skills
        </h2>
        <p className="mt-3 text-base sm:text-lg text-[#163e27]/80 font-medium">
          Scroll or drag the wheel to explore
        </p>
      </div>

      {/* Wheel — takes remaining height */}
      <div className="flex-1 w-full" style={{ minHeight: "520px" }}>
        <WorksWheel
          items={SKILL_CATEGORIES}
          label="skills"
          className="h-full w-full bg-transparent text-[#032306]"
          style={
            {
              "--background": "#f2f8f4",
              "--foreground": "#032306",
              "--muted": "#e5f1e8",
              "--muted-foreground": "#4a7a5e",
            } as React.CSSProperties
          }
        />
      </div>
    </section>
  );
}
