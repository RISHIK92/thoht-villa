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
            backgroundImage: "url(/villa-left.png)",
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-white font-bold tracking-widest"
              style={{
                fontSize: phase === "navbar" ? "18px" : "48px",
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                transition: phase === "navbar" ? "none" : "all 0.5s",
              }}
            >
              EXPLORE
            </h1>
          </div>
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
            backgroundImage: "url(/villa-right.png)",
            backgroundSize: "cover",
            backgroundPosition: "right center",
          }}
        >
          <div className={`absolute inset-0 transition-all duration-500`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-white font-bold tracking-widest"
              style={{
                fontSize: phase === "navbar" ? "18px" : "48px",
                textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                transition: phase === "navbar" ? "none" : "all 0.5s",
              }}
            >
              DISCOVER
            </h1>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-0 right-0 z-40 transition-all duration-500 bg-transparent"
        style={{
          height: phase === "navbar" ? "70px" : "0px",
        }}
      />
    </div>
  );
}
