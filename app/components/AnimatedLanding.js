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
      {/* Center reveal image */}
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

      {/* Left panel - hidden when navbar phase */}
      {phase !== "navbar" && (
        <div
          className="absolute z-50 overflow-hidden"
          style={{
            top: 0,
            left: 0,
            transform: phase === "initial" ? "none" : "translateX(-100%)",
            width: "50%",
            height: "100%",
            transition: "transform 2s ease-in-out",
            borderRight: "2px solid #D4AF37",
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
            <div className="absolute inset-0 transition-all duration-500" />
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
      )}

      {/* Right panel - hidden when navbar phase */}
      {phase !== "navbar" && (
        <div
          className="absolute z-50 overflow-hidden"
          style={{
            top: 0,
            right: 0,
            transform: phase === "initial" ? "none" : "translateX(100%)",
            width: "50%",
            height: "100%",
            transition: "transform 2s ease-in-out",
            borderLeft: "2px solid #D4AF37",
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
            <div className="absolute inset-0 transition-all duration-500" />
            <div
              className="absolute inset-0 z-10"
              style={{
                backgroundImage: "url(/right.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right calc(50% - 45px)",
              }}
            />
          </div>
        </div>
      )}

      {/* Header/Navbar with left-white.png and right-white.png */}
      <div
        className="absolute top-0 left-0 right-0 z-40 transition-all duration-500 flex items-center justify-center gap-8 px-8"
        style={{
          height: phase === "navbar" ? "90px" : "0px",
          opacity: phase === "navbar" ? 1 : 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <img
          src="/left-white.png"
          alt="Left Logo"
          className="h-16 w-auto object-contain"
        />
        <img
          src="/right-white.png"
          alt="Right Logo"
          className="h-16 w-auto object-contain mb-3"
        />
      </div>

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
