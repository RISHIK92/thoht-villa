"use client";

import { useEffect, useState } from "react";

export default function RotatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if prompt has already been shown in this session
    const hasShownPrompt = sessionStorage.getItem("rotatePromptShown");

    if (hasShownPrompt) {
      return; // Don't show again in this session
    }

    const checkOrientation = () => {
      // Check if device is mobile (width < 768px) and in portrait mode
      const isMobile = window.innerWidth < 768;
      const isPortrait = window.innerHeight > window.innerWidth;

      if (isMobile && isPortrait) {
        setShowPrompt(true);

        // Mark as shown in sessionStorage
        sessionStorage.setItem("rotatePromptShown", "true");

        // Hide after 2 seconds
        const timer = setTimeout(() => {
          setShowPrompt(false);
        }, 2000);

        return () => clearTimeout(timer);
      }
    };

    // Initial check
    checkOrientation();

    // Listen for orientation and resize changes
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center">
      <div className="text-center px-8">
        {/* Rotating Phone Animation */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Phone Icon */}
            <svg
              className="w-24 h-24 text-white animate-[rotate_2s_ease-in-out_infinite]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
            {/* Rotation Arrow */}
            <svg
              className="w-12 h-12 text-amber-500 absolute -right-6 top-1/2 -translate-y-1/2 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 tracking-wide">
          For Best Experience
        </h1>
        <p className="text-gray-300 text-lg mb-2">Please rotate your device</p>
        <p className="text-gray-400 text-sm">to landscape orientation</p>

        {/* Decorative Line */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-amber-500"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <div className="h-[1px] w-12 bg-amber-500"></div>
        </div>
      </div>
    </div>
  );
}
