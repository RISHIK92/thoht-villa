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
  const wrapRef = useRef(null);
  const containerRef = useRef(null);

  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState({ scale: 1, tx: 0, ty: 0 });

  // Mirror of zoom for synchronous access inside touch handlers
  const zoomRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pinchRef = useRef({ active: false });
  const blockFlip = useRef(false);

  const total = images.length;

  // Keep zoomRef in sync whenever zoom state changes
  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Wheel zoom (Ctrl+scroll or any scroll in fullscreen)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (!e.ctrlKey && !document.fullscreenElement) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => {
        const s = Math.min(3, Math.max(0.4, +(z.scale + delta).toFixed(2)));
        const r = s / z.scale;
        const nz = {
          scale: s,
          tx: cx - (cx - z.tx) * r,
          ty: cy - (cy - z.ty) * r,
        };
        zoomRef.current = nz;
        return nz;
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile]); // re-run once wrapRef is populated after isMobile resolves

  // Capture-phase touch handlers — intercept BEFORE react-pageflip sees them
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onStart = (e) => {
      if (e.touches.length < 2) return;
      // Block react-pageflip from seeing this gesture
      e.stopPropagation();
      e.preventDefault();

      const t0 = e.touches[0],
        t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const rect = el.getBoundingClientRect();
      const midX = (t0.clientX + t1.clientX) / 2 - rect.left - rect.width / 2;
      const midY = (t0.clientY + t1.clientY) / 2 - rect.top - rect.height / 2;

      // Read zoom state synchronously from ref — no async setZoom needed
      const { scale, tx, ty } = zoomRef.current;
      pinchRef.current = {
        active: true,
        startDist: dist,
        startScale: scale,
        startTx: tx,
        startTy: ty,
        originX: midX,
        originY: midY,
        lastMidX: midX,
        lastMidY: midY,
      };
      blockFlip.current = true;
    };

    const onMove = (e) => {
      const p = pinchRef.current;
      if (!p.active || e.touches.length < 2) return;
      e.stopPropagation();
      e.preventDefault();

      const t0 = e.touches[0],
        t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const rect = el.getBoundingClientRect();
      const midX = (t0.clientX + t1.clientX) / 2 - rect.left - rect.width / 2;
      const midY = (t0.clientY + t1.clientY) / 2 - rect.top - rect.height / 2;

      const newScale = Math.min(
        3,
        Math.max(0.4, +(p.startScale * (dist / p.startDist)).toFixed(3)),
      );
      const sRatio = newScale / p.startScale;
      const panDx = midX - p.lastMidX;
      const panDy = midY - p.lastMidY;
      p.lastMidX = midX;
      p.lastMidY = midY;

      const nz = {
        scale: newScale,
        tx: p.originX - (p.originX - p.startTx) * sRatio + panDx,
        ty: p.originY - (p.originY - p.startTy) * sRatio + panDy,
      };
      zoomRef.current = nz;
      setZoom(nz);
    };

    const onEnd = (e) => {
      if (e.touches.length < 2) {
        pinchRef.current.active = false;
      }
      if (blockFlip.current) {
        e.stopPropagation();
        // Swallow next click so react-pageflip can't flip
        const blk = (ev) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        el.addEventListener("click", blk, { capture: true, once: true });
        el.addEventListener("touchend", blk, { capture: true, once: true });
        setTimeout(() => {
          blockFlip.current = false;
        }, 450);
      }
    };

    el.addEventListener("touchstart", onStart, {
      capture: true,
      passive: false,
    });
    el.addEventListener("touchmove", onMove, { capture: true, passive: false });
    el.addEventListener("touchend", onEnd, { capture: true, passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart, { capture: true });
      el.removeEventListener("touchmove", onMove, { capture: true });
      el.removeEventListener("touchend", onEnd, { capture: true });
    };
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps — re-run once wrapRef is populated

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const onFlip = (e) => setPage(e.data);

  if (isMobile === null) return null;

  const pages = [...images];
  if (pages.length % 2 !== 0) pages.push(null);
  const totalPages = pages.length;

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 0,
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
        .fb-fs-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .fb-fs-btn:hover { background: rgba(255,255,255,0.22); transform: scale(1.08); }
        .fb-fs-btn:active { transform: scale(0.95); }
        .fb-zoom-pill {
          position: fixed;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          pointer-events: none;
          z-index: 1000;
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

      {/* Zoom level indicator — shown when not at 100% */}
      {zoom.scale !== 1 && (
        <div className="fb-zoom-pill">{Math.round(zoom.scale * 100)}%</div>
      )}

      {/* Book wrapper — responsive */}
      <div
        ref={wrapRef}
        className="fb-wrap"
        style={{
          width: isMobile ? "96vw" : "78vw",
          height: isMobile ? "70vh" : "80vh",
          transform: `translate(${zoom.tx}px,${zoom.ty}px) scale(${isMobile ? zoom.scale : 0.9 * zoom.scale})`,
          transformOrigin: "center center",
          touchAction: "none",
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
          mobileScrollSupport={false}
          onFlip={onFlip}
          flippingTime={isMobile ? 1600 : 1100}
          usePortrait={isMobile}
          startPage={0}
          autoSize={true}
          swipeDistance={50}
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
        <button
          className="fb-fs-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
