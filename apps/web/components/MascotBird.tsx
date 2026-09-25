"use client";

import { motion } from "framer-motion";

export function MascotBird() {
  return (
    <motion.div
      className="relative inline-block w-24 h-24 sm:w-28 sm:h-28 select-none"
      initial={{ y: 0 }}
      animate={{ y: [-3, 4, -3] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm filter"
      >
        <defs>
          {/* Red diagonal stripe pattern for head */}
          <pattern
            id="red-stripes"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#ef4444"
              strokeWidth="2.5"
            />
          </pattern>

          {/* Yellow diagonal stripe pattern for belly/body */}
          <pattern
            id="yellow-stripes"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#eab308"
              strokeWidth="2.5"
            />
          </pattern>
        </defs>

        {/* Bird Body Base (white fill) */}
        <path
          d="M50 45 C40 25, 75 15, 90 35 C100 45, 125 55, 130 65 C120 70, 125 78, 115 82 C105 84, 110 90, 100 95 C90 100, 95 118, 75 125 C55 130, 40 115, 42 95 C38 80, 42 60, 50 45 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Head Red Pattern Fill */}
        <path
          d="M52 48 C44 32, 72 20, 88 36 C92 42, 85 52, 70 55 C58 56, 54 52, 52 48 Z"
          fill="url(#red-stripes)"
          stroke="#111827"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Eye */}
        <circle cx="68" cy="44" r="5.5" fill="#111827" />
        <circle cx="66" cy="42" r="1.8" fill="#ffffff" />

        {/* Cheek Smile Line */}
        <path
          d="M62 56 Q70 62 76 56"
          stroke="#111827"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Beak */}
        <path
          d="M86 42 Q102 46 92 56 Q84 54 82 50 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Yellow Striped Belly */}
        <path
          d="M48 85 C46 100, 55 120, 75 120 C88 116, 92 102, 90 92 C80 82, 60 78, 48 85 Z"
          fill="url(#yellow-stripes)"
          stroke="#111827"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Pointing Wing Gesturing Right */}
        <path
          d="M85 68 C105 60, 128 62, 134 68 C124 73, 130 80, 118 84 C106 86, 94 80, 85 76 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Wing Feather Accents */}
        <path
          d="M100 70 L122 70 M102 77 L114 77"
          stroke="#111827"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Little Claws/Feet at bottom */}
        <path
          d="M58 123 L54 133 M66 125 L64 135 M74 123 L76 133"
          stroke="#111827"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
