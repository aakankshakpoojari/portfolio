"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CatState = "walking" | "sitting" | "sleeping";

export function CatOnFrame() {
  const [isReady, setIsReady] = useState(false);
  const [catState, setCatState] = useState<CatState>("walking");
  const [stepCycle, setStepCycle] = useState(0);

  useEffect(() => {
    const handleLoaded = () => {
      // Small grace delay while the curtain slides up
      setTimeout(() => {
        setIsReady(true);
      }, 200);
    };

    window.addEventListener("portfolio-loaded", handleLoaded);

    // Fallback: If page was already loaded or event missed, start after 3s
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 3200);

    return () => {
      window.removeEventListener("portfolio-loaded", handleLoaded);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Walking leg cycle
    const walkInterval = setInterval(() => {
      setStepCycle((prev) => (prev === 0 ? 1 : 0));
    }, 180);

    // After 3.5s of walking to halfway, sit down
    const sitTimeout = setTimeout(() => {
      setCatState("sitting");
      clearInterval(walkInterval);
    }, 3500);

    // After 5 seconds of sitting (total 8.5s), go to sleep with hanging tail
    const sleepTimeout = setTimeout(() => {
      setCatState("sleeping");
    }, 8500);

    return () => {
      clearInterval(walkInterval);
      clearTimeout(sitTimeout);
      clearTimeout(sleepTimeout);
    };
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <div className="absolute -top-[44px] sm:-top-[50px] left-0 right-0 h-[60px] pointer-events-none z-20 overflow-visible">
      <motion.div
        className="relative pointer-events-auto cursor-pointer"
        initial={{ x: 0 }}
        animate={
          catState === "walking"
            ? { x: ["0%", "42%"] }
            : { x: "42%" }
        }
        transition={
          catState === "walking"
            ? { duration: 3.5, ease: "linear" }
            : { duration: 0.3 }
        }
        onClick={() => {
          // Playful interaction: click to wake or purr
          if (catState === "sleeping") {
            setCatState("sitting");
            setTimeout(() => setCatState("sleeping"), 4000);
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* ================= WALKING CAT ================= */}
          {catState === "walking" && (
            <motion.div
              key="walking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-20 h-14 sm:w-24 sm:h-16 relative"
            >
              <svg
                viewBox="0 0 100 70"
                className="w-full h-full filter drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cat Body */}
                <ellipse
                  cx="48"
                  cy="42"
                  rx="24"
                  ry="14"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                />

                {/* Doodle Stripes on Body */}
                <path
                  d="M40 30 C42 36, 40 40, 42 46 M48 30 C50 36, 48 40, 50 46 M56 30 C58 36, 56 40, 58 46"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Head */}
                <circle
                  cx="72"
                  cy="34"
                  r="14"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                />

                {/* Ears */}
                <path
                  d="M65 24 L69 12 L75 22 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M74 22 L80 13 L84 25 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Pink Inner Ears */}
                <path d="M68 21 L70 16 L73 21 Z" fill="#fda4af" />
                <path d="M77 21 L80 16 L82 23 Z" fill="#fda4af" />

                {/* Eyes (Happy open) */}
                <circle cx="75" cy="32" r="2.2" fill="#0f172a" />
                <circle cx="82" cy="32" r="2.2" fill="#0f172a" />
                {/* Nose & Mouth */}
                <path d="M79 36 L77 39 Q79 41 81 39 Z" fill="#f43f5e" />
                <path
                  d="M77 39 Q75 42 73 40 M77 39 Q79 42 81 40"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Whiskers */}
                <path
                  d="M84 35 L92 34 M84 38 L92 39 M70 35 L62 34 M70 38 L62 39"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                {/* Animated Walking Legs */}
                {stepCycle === 0 ? (
                  <>
                    {/* Leg 1 front forward */}
                    <path
                      d="M66 52 L70 65 L74 65"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 2 back */}
                    <path
                      d="M60 52 L56 64 L52 64"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 3 rear forward */}
                    <path
                      d="M38 52 L42 65 L46 65"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 4 rear back */}
                    <path
                      d="M30 52 L26 64 L22 64"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  <>
                    {/* Leg 1 front back */}
                    <path
                      d="M66 52 L62 64 L58 64"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 2 forward */}
                    <path
                      d="M60 52 L64 65 L68 65"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 3 rear back */}
                    <path
                      d="M38 52 L34 64 L30 64"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Leg 4 rear forward */}
                    <path
                      d="M30 52 L34 65 L38 65"
                      stroke="#0f172a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}

                {/* Upright walking tail */}
                <path
                  d="M26 40 C18 36, 12 24, 16 16 C18 12, 22 14, 20 18 C17 23, 21 32, 26 38"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}

          {/* ================= SITTING CAT ================= */}
          {catState === "sitting" && (
            <motion.div
              key="sitting"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-18 h-16 sm:w-20 sm:h-18 relative"
            >
              <svg
                viewBox="0 0 90 80"
                className="w-full h-full filter drop-shadow-sm"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cat Tail curled around front */}
                <motion.path
                  d="M25 68 C15 68, 12 55, 18 50 C24 45, 30 62, 45 68"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  animate={{ d: [
                    "M25 68 C15 68, 12 55, 18 50 C24 45, 30 62, 45 68",
                    "M25 68 C12 66, 10 52, 16 46 C22 40, 32 60, 45 68",
                    "M25 68 C15 68, 12 55, 18 50 C24 45, 30 62, 45 68"
                  ]}}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />

                {/* Cat Sitting Body */}
                <path
                  d="M32 70 C28 50, 34 38, 45 38 C56 38, 62 50, 58 70 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Orange Stripes on Back */}
                <path
                  d="M36 48 C42 50, 48 50, 54 48 M35 56 C42 58, 48 58, 55 56"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Cat Sitting Paws on top border */}
                <ellipse cx="40" cy="71" rx="5" ry="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
                <ellipse cx="50" cy="71" rx="5" ry="3" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />

                {/* Cat Head */}
                <circle
                  cx="45"
                  cy="26"
                  r="16"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                />

                {/* Ears */}
                <path
                  d="M34 16 L38 3 L45 13 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path
                  d="M45 13 L52 3 L56 16 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path d="M37 14 L39 7 L43 14 Z" fill="#fda4af" />
                <path d="M47 14 L51 7 L53 14 Z" fill="#fda4af" />

                {/* Curious blinking eyes */}
                <circle cx="39" cy="25" r="2.5" fill="#0f172a" />
                <circle cx="51" cy="25" r="2.5" fill="#0f172a" />
                <circle cx="40" cy="24" r="0.8" fill="#ffffff" />
                <circle cx="52" cy="24" r="0.8" fill="#ffffff" />

                {/* Nose & Mouth */}
                <polygon points="45,29 43,32 47,32" fill="#f43f5e" />
                <path
                  d="M43 32 Q40 35 37 33 M47 32 Q50 35 53 33"
                  stroke="#0f172a"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Whiskers */}
                <path
                  d="M33 26 L23 24 M33 29 L23 29 M57 26 L67 24 M57 29 L67 29"
                  stroke="#0f172a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          )}

          {/* ================= SLEEPING CAT WITH HANGING TAIL ================= */}
          {catState === "sleeping" && (
            <motion.div
              key="sleeping"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-20 sm:w-28 sm:h-24 relative"
            >
              {/* Floating "z Z z" */}
              <div className="absolute -top-3 right-3 flex flex-col items-center">
                <motion.span
                  className="text-xs font-bold text-slate-500 select-none"
                  animate={{ y: [-2, -8, -2], opacity: [0.3, 1, 0.3], x: [0, 4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  z
                </motion.span>
                <motion.span
                  className="text-sm font-bold text-slate-600 select-none -mt-1"
                  animate={{ y: [-4, -12, -4], opacity: [0.2, 0.9, 0.2], x: [0, 6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                >
                  Z
                </motion.span>
              </div>

              <svg
                viewBox="0 0 110 95"
                className="w-full h-full filter drop-shadow-sm overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Tail Hanging Down over picture border */}
                <motion.path
                  d="M32 50 C24 50, 20 58, 20 68 C20 78, 24 88, 28 92 C31 95, 33 93, 31 89 C28 84, 25 76, 26 68 C27 60, 30 55, 36 53 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  animate={{
                    d: [
                      "M32 50 C24 50, 20 58, 20 68 C20 78, 24 88, 28 92 C31 95, 33 93, 31 89 C28 84, 25 76, 26 68 C27 60, 30 55, 36 53 Z",
                      "M32 50 C23 50, 18 58, 18 68 C18 80, 22 90, 25 94 C28 97, 30 95, 28 91 C25 86, 23 77, 24 68 C25 60, 28 55, 36 53 Z",
                      "M32 50 C24 50, 20 58, 20 68 C20 78, 24 88, 28 92 C31 95, 33 93, 31 89 C28 84, 25 76, 26 68 C27 60, 30 55, 36 53 Z",
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Orange Tip on Tail */}
                <path
                  d="M23 82 C25 86, 28 90, 29 91 C30 90, 30 87, 29 84"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Sleeping Body (Breathing rise & fall) */}
                <motion.g
                  animate={{ scaleY: [1, 1.04, 1], y: [0, -1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {/* Body Loaf resting directly on border */}
                  <ellipse
                    cx="55"
                    cy="44"
                    rx="26"
                    ry="15"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="3.5"
                  />

                  {/* Cute Orange Tabby Back Stripes */}
                  <path
                    d="M46 32 C48 37, 47 42, 48 46 M55 31 C57 36, 56 41, 57 46 M64 32 C66 37, 65 41, 66 46"
                    stroke="#f97316"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Tucked Paw resting on border edge */}
                  <ellipse cx="76" cy="51" rx="5" ry="3.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />

                  {/* Sleeping Head tucked against body */}
                  <circle
                    cx="76"
                    cy="38"
                    r="13"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="3.5"
                  />

                  {/* Folded Sleeping Ears */}
                  <path
                    d="M70 28 L74 19 L79 26 Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M80 26 L86 20 L88 29 Z"
                    fill="#ffffff"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path d="M73 26 L75 22 L77 26 Z" fill="#fda4af" />
                  <path d="M82 26 L85 22 L86 28 Z" fill="#fda4af" />

                  {/* Peaceful Sleeping Eyes (curved lines ^ ^ or - -) */}
                  <path
                    d="M72 38 Q74 41 76 38"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M80 38 Q82 41 84 38"
                    stroke="#0f172a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Cute Nose */}
                  <polygon points="78,41 77,43 79,43" fill="#f43f5e" />

                  {/* Whiskers */}
                  <path
                    d="M71 42 L63 42 M71 44 L64 46 M84 42 L91 42 M84 44 L90 46"
                    stroke="#0f172a"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </motion.g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
