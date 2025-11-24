"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useEffect } from "react";

export default function ImageZoomModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[10000] text-white hover:text-amber-500 transition-colors p-2 bg-black/50 rounded-full"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Zoom Controls */}
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit
          wheel={{ step: 0.1 }}
          doubleClick={{ mode: "zoomIn" }}
          pinch={{ step: 5 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Control Buttons */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[10000] flex gap-3 bg-black/50 rounded-full p-2">
                <button
                  onClick={() => zoomIn()}
                  className="text-white hover:text-amber-500 transition-colors p-3 rounded-full hover:bg-white/10"
                  aria-label="Zoom in"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => resetTransform()}
                  className="text-white hover:text-amber-500 transition-colors p-3 rounded-full hover:bg-white/10"
                  aria-label="Reset zoom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => zoomOut()}
                  className="text-white hover:text-amber-500 transition-colors p-3 rounded-full hover:bg-white/10"
                  aria-label="Zoom out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
              </div>

              {/* Image Container */}
              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="max-w-full max-h-full object-contain select-none"
                  draggable={false}
                />
              </TransformComponent>

              {/* Instructions */}
              <div className="absolute top-4 left-4 z-[10000] bg-black/50 text-white text-sm px-4 py-2 rounded-lg hidden md:block">
                <p className="mb-1">🖱️ Scroll to zoom</p>
                <p className="mb-1">🖐️ Drag to pan</p>
                <p>🖱️ Double-click to zoom in</p>
              </div>
              <div className="absolute top-4 left-4 z-[10000] bg-black/50 text-white text-sm px-4 py-2 rounded-lg md:hidden">
                <p className="mb-1">🤏 Pinch to zoom</p>
                <p>🖐️ Drag to pan</p>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
