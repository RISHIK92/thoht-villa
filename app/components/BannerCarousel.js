"use client";

import { useState, useEffect } from "react";

export default function BannerCarousel() {
  const slides = [
    {
      url: "/Arch.jpg",
      title: "ARCHITECTURAL MARVEL",
      subtitle: "Design Without Compromise",
    },
    {
      url: "/East_Day.jpg",
      title: "EAST RESIDENCE",
      subtitle: "Morning Light & Serenity",
    },
    {
      url: "/East_Night.jpg",
      title: "EVENING AMBIANCE",
      subtitle: "Where Night Comes Alive",
    },
    {
      url: "/West_Day.jpg",
      title: "WEST Residences",
      subtitle: "Breathtaking Sunsets",
    },
    {
      url: "/West_Night.jpg",
      title: "NOCTURNAL ELEGANCE",
      subtitle: "Peaceful Retreat",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative mx-2 my-2 md:mx-12 md:my-12 h-[30vh] md:h-screen overflow-hidden bg-white group rounded-3xl md:rounded-[2.5rem] shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={slide.url}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image with Ken Burns effect */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out ${
              currentIndex === index ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />

          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /> */}

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
            <div
              className={`transform transition-all duration-1000 delay-300 ${
                currentIndex === index
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            ></div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors p-4 opacity-0 group-hover:opacity-100 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors p-4 opacity-0 group-hover:opacity-100 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
            className={`h-[2px] transition-all duration-500 ${
              currentIndex === index
                ? "w-12 bg-amber-400"
                : "w-6 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
