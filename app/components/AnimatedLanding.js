"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
    <>
      <h1 className="sr-only">Lakeview Homes - Luxury Villas in Rajahmundry</h1>

      {/* Mobile version with gate animation */}
      <div className="md:hidden relative w-full h-screen overflow-hidden bg-white">
        {/* Center reveal image */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            opacity: phase === "initial" ? 0 : phase === "shrinking" ? 0.6 : 1,
          }}
        >
          <Image
            src="/Master_Layout_triplex.jpg"
            alt="Lakeview Homes Master Layout"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
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
            <div className="w-full h-full relative">
              <Image
                src="/bg.png"
                alt="Decorative Background"
                fill
                className="object-cover object-left-center"
              />
              <div className="absolute inset-0 transition-all duration-500" />
              <div className="absolute inset-0 z-10">
                <Image
                  src="/left.png"
                  alt="Left Gate Design"
                  fill
                  className="object-contain object-left-center"
                />
              </div>
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
            <div className="w-full h-full relative">
              <Image
                src="/bg.png"
                alt="Decorative Background"
                fill
                className="object-cover object-right-center"
              />
              <div className="absolute inset-0 transition-all duration-500" />
              <div className="absolute inset-0 z-10 bg-[position:right_48.6%]">
                <Image
                  src="/right.png"
                  alt="Right Gate Design"
                  fill
                  className="object-contain object-right-center"
                />
              </div>
            </div>
          </div>
        )}

        {/* Header/Navbar with two logos (mobile) */}
        <div
          className="absolute top-0 left-0 right-0 z-40 transition-all duration-500 flex items-center justify-center gap-8 px-8"
          style={{
            height: phase === "navbar" ? "90px" : "0px",
            opacity: phase === "navbar" ? 1 : 0,
            borderImage:
              "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.5), transparent) 1",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b drop-shadow-[0_4px_12px_rgba(255,255,255,0.6) from-black/80 via-black/40 to-transparent" />

          <img
            src="/left-white.png"
            alt="Left Logo"
            className="h-16 w-auto object-contain relative z-10"
          />
          <img
            src="/right-white.png"
            alt="Right Logo"
            className="h-16 w-auto object-contain mb-3 relative z-10"
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

      {/* Desktop version with simplified logos */}
      <div className="hidden md:block relative w-full h-screen overflow-hidden bg-white">
        {/* Center reveal image */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            opacity: phase === "initial" ? 0 : phase === "shrinking" ? 0.6 : 1,
          }}
        >
          <Image
            src="/Master_Layout_triplex.jpg"
            alt="Lakeview Homes Master Layout"
            fill
            className="object-cover object-center"
            priority
          />
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
            <div className="w-full h-full relative">
              <Image
                src="/left-logo.jpg"
                alt="Left Logo Panel"
                fill
                className="object-cover object-left-center"
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
            <div className="w-full h-full relative">
              <Image
                src="/right-logo.jpg"
                alt="Right Logo Panel"
                fill
                className="object-cover object-right-center"
              />
            </div>
          </div>
        )}

        {/* Header/Navbar with single center logo (desktop) */}
        <div
          className="absolute top-0 left-0 right-0 z-40 transition-all duration-500 flex items-center justify-center gap-8 px-8"
          style={{
            height: phase === "navbar" ? "90px" : "0px",
            opacity: phase === "navbar" ? 1 : 0,
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

          <img
            src="/center-logo.png"
            alt="Center Logo"
            className="h-22 w-auto mt-3 object-contain drop-shadow-[0_4px_12px_rgba(255,255,255,0.6)] relative z-10"
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
    </>
  );
}
