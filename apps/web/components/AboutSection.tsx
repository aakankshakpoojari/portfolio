"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Education, Experience } from "@portfolio/db";

interface AboutSectionProps {
  name?: string;
  profileImageUrl?: string | null;
  resumeUrl?: string | null;
  educationList: Education[];
  experienceList: Experience[];
}

type DetailModalItem =
  | { type: "experience"; data: Experience }
  | { type: "education"; data: Education }
  | null;

export function AboutSection({
  name = "Aakanksha",
  profileImageUrl,
  resumeUrl,
  educationList = [],
  experienceList = [],
}: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDetail, setActiveDetail] = useState<DetailModalItem>(null);

  // Short bio matching the requested preview
  const shortBio =
    "Computer Science undergraduate skilled in DSA and full-stack development, experienced in building RESTful APIs, scalable applications, and database-driven systems using Java, Python, JavaScript, React, Node.js, and PostgreSQL.";

  // Expanded bio
  const expandedBio1 =
    "I’m a Computer Science undergraduate with a strong foundation in DSA and full-stack development, experienced in building RESTful APIs, scalable applications, and database-driven systems using Java, Python, JavaScript, React, Node.js, and PostgreSQL.";

  const expandedBio2 =
    "I love turning complex computational challenges into elegant, efficient, and resilient software. When I'm not coding or participating in hackathons, you can find me exploring new web frameworks, practicing algorithmic problem solving, or experimenting with creative design interactions.";

  return (
    <section
      id="about"
      className="w-full min-h-screen flex flex-col justify-center relative z-10"
    >
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-10 py-16 sm:py-20">
      {/* Top clean divider line */}
      <div className="w-full border-t border-[#032306]/20 mb-8 sm:mb-10" />

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* =========================================================
             STATE 1: COMPACT "ABOUT AAKANKSHA" VIEW (Picture 1)
             ========================================================= */
          <motion.div
            key="compact-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="flex flex-col space-y-8"
          >
            {/* Heading */}
            <h2 className="hero-name-font text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#032306] tracking-tight">
              About Aakanksha
            </h2>

            {/* Thumbnail + Short paragraph + READ MORE */}
            <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
              {/* Left: Thumbnail Image */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border border-[#032306]/15 shadow-md bg-[#e5f1e8] shrink-0">
                <Image
                  src="/myimage.jpeg"
                  alt={name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover object-center"
                />
              </div>

              {/* Right: Short bio & Read more button */}
              <div className="flex flex-col justify-between space-y-6 max-w-3xl">
                <p className="text-lg sm:text-xl md:text-[1.28rem] font-medium text-[#0c311c]/90 leading-relaxed tracking-tight">
                  {shortBio}
                </p>

                <div>
                  <button
                    onClick={() => setIsExpanded(true)}
                    type="button"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#032306] font-bold hover:text-[#185c34] transition-all group py-1"
                  >
                    <span className="border-b-2 border-[#032306] group-hover:border-[#185c34] pb-0.5">
                      READ MORE
                    </span>
                    <span className="transform group-hover:translate-x-1.5 transition-transform">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =========================================================
             STATE 2: EXPANDED FULL ABOUT VIEW (Picture 2)
             ========================================================= */
          <motion.div
            key="expanded-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left Column: Larger Image + Social Links */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#032306]/15 shadow-xl bg-[#e5f1e8]">
                <Image
                  src="/myimage.jpeg"
                  alt={name}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover object-center"
                />
              </div>

              {/* Bottom Left Links */}
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#032306] font-bold pt-2">
                <a
                  href="https://linkedin.com/in/aakanksha-k-poojari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#185c34] hover:underline underline-offset-4 transition-colors"
                >
                  LINKEDIN ↗
                </a>
                <a
                  href="https://github.com/aakankshakpoojari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#185c34] hover:underline underline-offset-4 transition-colors"
                >
                  GITHUB ↗
                </a>
                <a
                  href="https://leetcode.com/aakankshakpoojari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#185c34] hover:underline underline-offset-4 transition-colors"
                >
                  LEETCODE ↗
                </a>
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#185c34] hover:underline underline-offset-4 transition-colors"
                  >
                    RESUME ↗
                  </a>
                ) : null}
              </div>

              {/* Collapse button */}
              <button
                onClick={() => setIsExpanded(false)}
                type="button"
                className="mt-4 inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#032306] font-semibold hover:text-[#185c34] transition-colors py-2 px-3 rounded-lg border border-[#032306]/20 hover:border-[#032306] bg-white/60"
              >
                ← SHOW LESS
              </button>
            </div>

            {/* Right Column: Heading, Bio, Experience & Education Tables */}
            <div className="lg:col-span-8 flex flex-col space-y-12">
              {/* Header Title */}
              <div>
                <h2 className="hero-name-font text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#032306] tracking-tight mb-6">
                  Hey, I&apos;m Aakanksha.
                </h2>
                <div className="space-y-4 text-base sm:text-lg md:text-[1.125rem] text-[#0c311c]/90 leading-relaxed">
                  <p>{expandedBio1}</p>
                  <p>{expandedBio2}</p>
                </div>
              </div>

              {/* ================= EXPERIENCE SECTION ================= */}
              <div className="flex flex-col space-y-4">
                <div className="border-b-2 border-[#032306] pb-2">
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#032306] font-bold">
                    / EXPERIENCE
                  </h3>
                </div>

                <div className="divide-y divide-[#032306]/15">
                  {experienceList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:bg-white/40 px-2 rounded-xl transition-all"
                    >
                      <div className="md:w-5/12 font-mono uppercase text-sm sm:text-base font-bold text-[#032306] tracking-wide">
                        {item.company}
                      </div>
                      
                      <div className="md:w-3/12 flex items-center justify-between md:justify-end gap-4">
                        <span className="font-mono text-xs sm:text-sm text-[#26633f] font-semibold whitespace-nowrap">
                          {item.startDate} {item.isCurrent ? "– Present" : item.endDate ? `– ${item.endDate}` : ""}
                        </span>
                        <button
                          onClick={() => setActiveDetail({ type: "experience", data: item })}
                          type="button"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-[#032306] hover:text-[#185c34] hover:underline underline-offset-4 shrink-0"
                        >
                          READ MORE →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= EDUCATION SECTION ================= */}
              <div className="flex flex-col space-y-4 pt-4">
                <div className="border-b-2 border-[#032306] pb-2">
                  <h3 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#032306] font-bold">
                    / EDUCATION
                  </h3>
                </div>

                <div className="divide-y divide-[#032306]/15">
                  {educationList.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="py-4 sm:py-5 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:bg-white/40 px-2 rounded-xl transition-all"
                    >
                      <div className="md:w-5/12 font-mono uppercase text-sm sm:text-base font-bold text-[#032306] tracking-wide">
                        {item.institution}
                      </div>
                      
                      <div className="md:w-3/12 flex items-center justify-between md:justify-end gap-4">
                        <span className="font-mono text-xs sm:text-sm text-[#26633f] font-semibold whitespace-nowrap">
                          {item.startDate} {item.endDate ? `– ${item.endDate}` : ""}
                        </span>
                        <button
                          onClick={() => setActiveDetail({ type: "education", data: item })}
                          type="button"
                          className="text-xs font-mono font-bold uppercase tracking-wider text-[#032306] hover:text-[#185c34] hover:underline underline-offset-4 shrink-0"
                        >
                          READ MORE →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
         DETAIL CARD MODAL (Opened on row "READ MORE" click)
         ========================================================= */}
      <AnimatePresence>
        {activeDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-[#f2f8f4] border-2 border-[#032306] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetail(null)}
                type="button"
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#032306]/10 hover:bg-[#032306] text-[#032306] hover:text-white flex items-center justify-center transition-colors font-bold text-lg"
                aria-label="Close detail modal"
              >
                ✕
              </button>

              {activeDetail.type === "experience" ? (
                /* Experience Detail Card */
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 text-xs font-mono uppercase font-bold tracking-wider rounded-full bg-[#032306] text-white">
                      Experience
                    </span>
                    <h3 className="hero-name-font text-3xl sm:text-4xl font-extrabold text-[#032306] mt-4">
                      {activeDetail.data.company}
                    </h3>
                    <p className="text-xl font-bold text-[#154a2a] mt-1">
                      {activeDetail.data.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-[#25633e] pb-4 border-b border-[#032306]/15">
                    <span className="font-semibold">
                      🗓 {activeDetail.data.startDate} – {activeDetail.data.isCurrent ? "Present" : activeDetail.data.endDate || "Present"}
                    </span>
                    {activeDetail.data.location && (
                      <span className="font-semibold">
                        at {activeDetail.data.location}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#032306] font-bold mb-3">
                      Overview & Responsibilities
                    </h4>
                    <p className="text-base sm:text-lg text-[#0c311c] leading-relaxed whitespace-pre-line bg-white/70 p-5 rounded-2xl border border-[#c4decb]">
                      {activeDetail.data.description || "Active contributor to core engineering workflows and full stack features."}
                    </p>
                  </div>
                </div>
              ) : (
                /* Education Detail Card */
                <div className="space-y-6">
                  <div>
                    <span className="px-3 py-1 text-xs font-mono uppercase font-bold tracking-wider rounded-full bg-[#032306] text-white">
                      Education
                    </span>
                    <h3 className="hero-name-font text-3xl sm:text-4xl font-extrabold text-[#032306] mt-4">
                      {activeDetail.data.institution}
                    </h3>
                    <p className="text-xl font-bold text-[#154a2a] mt-1">
                      {activeDetail.data.degree}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-[#25633e] pb-4 border-b border-[#032306]/15">
                    <span className="font-semibold">
                      🗓 {activeDetail.data.startDate} {activeDetail.data.endDate ? `– ${activeDetail.data.endDate}` : ""}
                    </span>
                    {activeDetail.data.field && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#daf0dd] font-semibold text-[#185c34]">
                        {activeDetail.data.field}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-[#032306] font-bold mb-3">
                      Academic Highlights & Coursework
                    </h4>
                    <p className="text-base sm:text-lg text-[#0c311c] leading-relaxed whitespace-pre-line bg-white/70 p-5 rounded-2xl border border-[#c4decb]">
                      {activeDetail.data.description || "Core computational foundations and practical project execution."}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
}
