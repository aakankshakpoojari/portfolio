"use client";

import Image from "next/image";

export function SideCreepers() {
  return (
    <>
      {/* Left Edge Creeper - absolute so it stays at the top when scrolling */}
      <div
        className="absolute top-0 h-[75vh] max-h-[750px] w-16 sm:w-22 md:w-26 lg:w-30 pointer-events-none z-10 select-none"
        style={{ left: "-7px" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/sidecreeper.png"
            alt="Side creeper leaves left"
            fill
            unoptimized
            priority
            className="object-cover object-top drop-shadow-sm"
          />
        </div>
      </div>

      {/* Right Edge Creeper (Mirrored) - absolute so it stays at the top */}
      <div
        className="absolute top-0 h-[75vh] max-h-[750px] w-16 sm:w-22 md:w-26 lg:w-30 pointer-events-none z-10 select-none -scale-x-100"
        style={{ right: "-7px" }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/sidecreeper.png"
            alt="Side creeper leaves right"
            fill
            unoptimized
            priority
            className="object-cover object-top drop-shadow-sm"
          />
        </div>
      </div>
    </>
  );
}
