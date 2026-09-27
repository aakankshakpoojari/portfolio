"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@portfolio/db";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const displayProjects = projects.slice(0, 4);
  const hasMore = projects.length > 4;

  return (
    <section id="projects" className="w-full min-h-screen py-20 px-4 sm:px-6 md:px-12 bg-striped-pattern-dark text-[#e5f1e8] relative z-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="hero-name-font text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-16 text-center">
          See What I’ve Built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index + 1} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 rounded-full border-2 border-[#e5f1e8]/30 hover:border-[#e5f1e8] text-sm font-mono tracking-widest uppercase transition-colors">
              View More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const tags = project.scope
    ? project.scope.split(/[·,]/).map((t) => t.trim()).filter(Boolean)
    : [];

  const mascotConfig: Record<number, { src: string; alt: string; className: string }> = {
    0: { src: "/butterfly.png", alt: "Butterfly", className: "absolute -top-26 left-38 w-20 h-20 sm:w-28 sm:h-28 z-30 object-contain drop-shadow-lg group-hover:rotate-12 transition-transform duration-500 pointer-events-none" },
    1: { src: "/f1.png", alt: "White Flower", className: "absolute -top-12 -right-8 w-24 h-24 sm:w-32 sm:h-32 z-30 object-contain drop-shadow-lg group-hover:-rotate-12 transition-transform duration-500 pointer-events-none" },
    2: { src: "/f2.png", alt: "Blue Flower", className: "absolute top-6 -left-22 w-24 h-24 sm:w-36 sm:h-36 z-30 object-contain drop-shadow-lg group-hover:-rotate-6 transition-transform duration-500 pointer-events-none" },
    3: { src: "/f3.png", alt: "Pink Flower", className: "absolute -bottom-0 -left-20 w-24 h-24 sm:w-32 sm:h-32 z-30 object-contain drop-shadow-lg group-hover:-rotate-12 transition-transform duration-500 pointer-events-none" },
  };

  const mascot = mascotConfig[(index - 1) % 4];

  return (
    <div className="relative group block">
      {mascot && (
        <Image
          src={mascot.src}
          alt={mascot.alt}
          width={200}
          height={200}
          unoptimized
          className={mascot.className}
        />
      )}
      <Link href={`/projects/${project.slug}`} className="block relative z-10">
      <div 
        className="flex flex-col space-y-4 relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header: Number / Title */}
        <div className="flex items-center text-xs sm:text-sm font-mono tracking-widest uppercase text-[#e5f1e8]">
          <span>{index}</span>
          <span className="mx-2">/</span>
          <span className="transition-all duration-300">
            {isHovered ? "VIEW PROJECT" : project.title}
          </span>
        </div>

        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-[#e5f1e8]/5">
          <Image
            src={project.imageUrl || "/myimage.jpeg"}
            alt={project.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] sm:text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-[#e5f1e8]/30 text-[#e5f1e8]/80 group-hover:border-[#e5f1e8]/60 group-hover:text-[#e5f1e8] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
    </div>
  );
}
