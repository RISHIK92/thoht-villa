"use client";
import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

/* ── One page panel ─────────────────────────────────────────────────────── */
function Page({ src, number, total, side }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: "#111",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={`Page ${number}`}
          fill
          sizes="(max-width:520px) 48vw, 450px"
          priority={number <= 2}
          loading={number <= 2 ? "eager" : "lazy"}
          quality={100}
          unoptimized={true}
          placeholder="empty"
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      ) : (
        /* blank back-cover */
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
          }}
        />
      )}
    </div>
  );
}

/* ── FlipBook wrapper ────────────────────────────────────────────────────── */
export default function FlipBook({ images = [] }) {
  if (!images.length) return null;

  const bookRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(null); // null = not yet mounted
  const total = images.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onFlip = (e) => setPage(e.data);

  // Don't render until we know the viewport size (avoids SSR mismatch)
  if (isMobile === null) return null;

  const pages = [...images];
  if (pages.length % 2 !== 0) pages.push(null); // blank last page

  const totalPages = pages.length;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 40,
        paddingBottom: 64,
        boxSizing: "border-box",
        animation: "fbSceneIn 0.9s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <style>{`
        @keyframes fbSceneIn {
          from { opacity:0; transform: scale(0.97); }
          to   { opacity:1; transform: scale(1);    }
        }
        .fb-wrap {
          border-radius: 4px 8px 8px 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }
        /* react-pageflip injects .stf__parent */
        .stf__parent { background: transparent !important; }
        .stf__parent * { cursor: pointer; }

        /* Controls — fixed bar at bottom */
        .fb-controls {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 14px 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
          z-index: 999;
        }
        .fb-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          padding: 10px 34px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
        }
        .fb-btn::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .fb-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.42);
          transform: translateY(-2px);
        }
        .fb-btn:hover:not(:disabled)::before { opacity: 1; }
        .fb-btn:active:not(:disabled) { transform: translateY(0); }
        .fb-btn:disabled { opacity: 0.2; cursor: default; }
        .fb-counter {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          min-width: 80px;
          text-align: center;
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
        }
        @media (max-width: 768px) {
          .fb-btn { padding: 9px 20px; font-size: 12px; border-radius: 7px; }
          .fb-controls { gap: 12px; padding: 10px 12px; }
          .fb-counter { min-width: 60px; font-size: 11px; }
        }
        @media (max-width: 520px) {
          .fb-btn { padding: 8px 14px; font-size: 11px; border-radius: 6px; }
          .fb-controls { gap: 8px; }
        }
      `}</style>

      {/* Book wrapper — responsive */}
      <div
        className="fb-wrap"
        style={{
          width: isMobile ? "96vw" : "78vw",
          height: isMobile ? "70vh" : "80vh",
          transform: isMobile ? "none" : "scale(0.9)",
          transformOrigin: "center center",
        }}
      >
        <HTMLFlipBook
          key={isMobile ? "mobile" : "desktop"}
          ref={bookRef}
          width={isMobile ? 340 : 620}
          height={isMobile ? 480 : 840}
          size="stretch"
          minWidth={isMobile ? 160 : 300}
          maxWidth={isMobile ? 480 : 1400}
          minHeight={isMobile ? 300 : 600}
          maxHeight={isMobile ? 700 : 1100}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          flippingTime={isMobile ? 1600 : 1100}
          usePortrait={isMobile}
          startPage={0}
          autoSize={true}
          swipeDistance={20}
          clickEventForward={true}
          useMouseEvents={true}
          style={{ margin: "0 auto" }}
          className="flipbook"
        >
          {pages.map((src, idx) => (
            <div key={idx}>
              <Page
                src={src}
                number={src ? idx + 1 : null}
                total={total}
                side={idx % 2 === 0 ? "right" : "left"}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls — fixed bottom bar */}
      <div className="fb-controls">
        <button
          className="fb-btn"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={page === 0}
          aria-label="Previous page"
        >
          ← Prev
        </button>
        <span className="fb-counter">
          {page === 0 ? "Cover" : `${page} – ${Math.min(page + 1, total)}`}
          &nbsp;/&nbsp;{total}
        </span>
        <button
          className="fb-btn"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={page >= totalPages - 2}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
