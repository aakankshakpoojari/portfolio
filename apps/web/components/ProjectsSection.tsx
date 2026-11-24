"use client";

import { type Project } from "@portfolio/db";
import { ConcaveCarousel, type ConcaveCarouselItem } from "@/components/ui/concave-carousel";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const carouselItems: ConcaveCarouselItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.shortDescription || p.scope || undefined,
    slug: p.slug,
    imageUrl: p.imageUrl || "/myimage.jpeg",
    href: `/projects/${p.slug}`,
    tags: p.scope ? p.scope.split(/[·,]/).map((t) => t.trim()).filter(Boolean) : [],
  }));

  return (
    <section
      id="projects"
      className="w-full min-h-screen py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-striped-pattern-dark text-[#e5f1e8] relative z-20 flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-6 sm:mb-10 select-none">
          <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-emerald-400/80 mb-2.5 block">
            Featured Works
          </span>
          <h2 className="hero-name-font text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
            See What I’ve Built
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-emerald-100/60 font-mono tracking-wider">
            Scroll or drag to explore · Click a card for project details
          </p>
        </div>

        {/* Concave Curved Gallery Wall */}
        <ConcaveCarousel
          items={carouselItems}
          curvature={0.78}
          radius={16}
          reflection={0.08}
          dim={0.38}
          className="w-full"
        />
      </div>
    </section>
  );
}

export default ProjectsSection;
