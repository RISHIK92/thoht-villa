"use client";

import { useEffect, useRef } from "react";

export default function EastSection() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left side - Editorial Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-24 relative z-10 east-special">
        <div className="space-y-6 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-amber-500"></div>
            <span className="text-amber-600 tracking-[0.3em] text-sm font-medium uppercase">
              The Sunrise Collection
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-sans font-bold text-gray-900 leading-none tracking-tight">
            EAST
            <span className="block text-2xl md:text-3xl font-sans font-light text-gray-400 mt-2 tracking-normal residence">
              Residence
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md font-light desc">
            Awaken to the gentle embrace of the morning sun. The East Residences
            capture the essence of new beginnings, offering panoramic views of
            the horizon where light meets luxury.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("east-layout")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 text-gray-900 font-medium tracking-widest uppercase text-sm hover:text-amber-600 transition-colors mt-8"
          >
            Discover Residence
            <span className="w-8 h-[1px] bg-gray-900 group-hover:bg-amber-600 transition-all group-hover:w-12"></span>
          </button>
        </div>
      </div>

      {/* Right side - Immersive Image */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden section-image-custom">
        <div className="absolute inset-0 animate-reveal-image z-20 origin-left"></div>
        <div
          className="absolute inset-0 transition-transform duration-[2s] hover:scale-105 ease-out"
          style={{
            backgroundImage: "url(/East_Day.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
