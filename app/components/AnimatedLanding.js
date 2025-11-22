"use client";

import { useState, useEffect } from "react";

export default function AnimatedLanding() {
  const [phase, setPhase] = useState("initial");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("opening"), 2000);
    const timer2 = setTimeout(() => setPhase("navbar"), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Disable scrolling during animation
  useEffect(() => {
    if (phase !== "navbar") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Center reveal image - starts showing during shrinking */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: phase === "initial" ? 0 : phase === "shrinking" ? 0.6 : 1,
          backgroundImage: "url(/Master_Layout_triplex.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" />
      </div>

      {/* Left panel */}
      <div
        className="absolute z-50 overflow-hidden"
        style={{
          top: 0,
          left: phase === "navbar" ? "50%" : 0,
          transform:
            phase === "initial"
              ? "none"
              : phase === "opening"
              ? "translateX(-100%)"
              : "translateX(-210px)",
          width: phase === "navbar" ? "200px" : "50%",
          height: phase === "navbar" ? "70px" : "100%",
          transition: phase === "navbar" ? "none" : "transform 2s ease-in-out",
          borderRight: phase === "navbar" ? "none" : "2px solid #D4AF37",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: "url(/bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500`} />
          {/* Overlay left.png */}
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: "url(/left.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left center",
            }}
          />
        </div>
      </div>

      {/* Right panel */}
      <div
        className="absolute z-50 overflow-hidden"
        style={{
          top: 0,
          left: phase === "navbar" ? "50%" : "auto",
          right: phase === "navbar" ? "auto" : 0,
          transform:
            phase === "initial"
              ? "none"
              : phase === "opening"
              ? "translateX(100%)"
              : "translateX(10px)",
          width: phase === "navbar" ? "200px" : "50%",
          height: phase === "navbar" ? "70px" : "100%",
          transition: phase === "navbar" ? "none" : "transform 2s ease-in-out",
          borderLeft: phase === "navbar" ? "none" : "2px solid #D4AF37",
        }}
      >
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: "url(/bg.png)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500`} />
          {/* Overlay right.png */}
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: "url(/right.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          />
        </div>
      </div>

      <div
        className="absolute top-0 left-0 right-0 z-40 transition-all duration-500 bg-transparent"
        style={{
          height: phase === "navbar" ? "70px" : "0px",
        }}
      />

      {/* Scroll Down Indicator */}
      {phase === "navbar" && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center animate-bounce cursor-pointer"
          onClick={() => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <span className="text-white text-sm tracking-widest mb-2 uppercase">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
