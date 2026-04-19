"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

/* ── One page panel (desktop) ────────────────────────────────────────────── */
function Page({ src, number }) {
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

/* ── Mobile single-page flip ─────────────────────────────────────────────── */
function MobileFlipBook({ images }) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const total = images.length;

  // Touch swipe
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (idx, dir) => {
      if (animating || idx < 0 || idx >= total) return;
      setDirection(dir);
      setFlipping(true);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(idx);
        setFlipping(false);
        setTimeout(() => setAnimating(false), 50);
      }, 380); // half of flip duration
    },
    [animating, total]
  );

  const next = () => goTo(current + 1, "next");
  const prev = () => goTo(current - 1, "prev");

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  const src = images[current];

  // animation class name based on direction + phase
  // We use two keyframes: flip-out-next, flip-in-next, flip-out-prev, flip-in-prev
  let animClass = "";
  if (animating && flipping) {
    animClass = direction === "next" ? "mfb-flip-out-next" : "mfb-flip-out-prev";
  } else if (animating && !flipping) {
    animClass = direction === "next" ? "mfb-flip-in-next" : "mfb-flip-in-prev";
  }

  return (
    <>
      <style>{`
        .mfb-scene {
          width: 100vw;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: 64px;
          box-sizing: border-box;
          animation: fbSceneIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fbSceneIn {
          from { opacity:0; transform: scale(0.97); }
          to   { opacity:1; transform: scale(1);    }
        }
        .mfb-stage {
          perspective: 1400px;
          width: 88vw;
          max-width: 420px;
          height: 72vh;
          max-height: 620px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mfb-card {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          box-shadow:
            0 32px 80px rgba(0,0,0,0.7),
            0 0 0 1px rgba(255,255,255,0.07),
            inset 0 1px 0 rgba(255,255,255,0.08);
          transform-style: preserve-3d;
          transform-origin: center center;
          will-change: transform, opacity;
          background: #111;
        }
        /* Page number badge */
        .mfb-badge {
          position: absolute;
          bottom: 10px;
          right: 12px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          pointer-events: none;
          z-index: 10;
          backdrop-filter: blur(6px);
        }
        /* Edge highlight simulating a page body */
        .mfb-card::after {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to left, rgba(255,255,255,0.12), transparent);
          pointer-events: none;
          z-index: 5;
        }

        /* ── Forward flip (next page) ────────── */
        @keyframes flipOutNext {
          0%   { transform: rotateY(0deg);    opacity: 1; }
          100% { transform: rotateY(-90deg);  opacity: 0.3; }
        }
        @keyframes flipInNext {
          0%   { transform: rotateY(90deg);   opacity: 0.3; }
          100% { transform: rotateY(0deg);    opacity: 1; }
        }
        /* ── Backward flip (prev page) ───────── */
        @keyframes flipOutPrev {
          0%   { transform: rotateY(0deg);   opacity: 1; }
          100% { transform: rotateY(90deg);  opacity: 0.3; }
        }
        @keyframes flipInPrev {
          0%   { transform: rotateY(-90deg); opacity: 0.3; }
          100% { transform: rotateY(0deg);  opacity: 1; }
        }

        .mfb-flip-out-next { animation: flipOutNext 0.38s cubic-bezier(0.4,0,0.2,1) forwards; }
        .mfb-flip-in-next  { animation: flipInNext  0.38s cubic-bezier(0.4,0,0.2,1) forwards; }
        .mfb-flip-out-prev { animation: flipOutPrev 0.38s cubic-bezier(0.4,0,0.2,1) forwards; }
        .mfb-flip-in-prev  { animation: flipInPrev  0.38s cubic-bezier(0.4,0,0.2,1) forwards; }

        /* Shine overlay during flip */
        .mfb-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          border-radius: 6px;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.13) 60%, transparent 70%);
          opacity: 0;
          transition: opacity 0.38s ease;
        }
        .mfb-flip-out-next .mfb-shine,
        .mfb-flip-out-prev .mfb-shine,
        .mfb-flip-in-next .mfb-shine,
        .mfb-flip-in-prev .mfb-shine {
          opacity: 1;
        }

        /* Controls */
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
        .fb-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.42);
          transform: translateY(-2px);
        }
        .fb-btn:active:not(:disabled) { transform: translateY(0); }
        .fb-btn:disabled { opacity: 0.2; cursor: default; }
        .fb-counter {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          min-width: 70px;
          text-align: center;
          letter-spacing: 0.06em;
          font-variant-numeric: tabular-nums;
        }

        /* Dot indicators */
        .mfb-dots {
          display: flex;
          gap: 6px;
          margin-top: 18px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 88vw;
        }
        .mfb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          transition: background 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .mfb-dot.active {
          background: rgba(255,255,255,0.85);
          transform: scale(1.25);
        }
        @media (max-width: 520px) {
          .fb-btn { padding: 8px 18px; font-size: 11px; }
          .fb-controls { gap: 10px; }
        }
      `}</style>

      <div
        className="mfb-scene"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="mfb-stage">
          <div className={`mfb-card ${animClass}`}>
            <div className="mfb-shine" />
            {src ? (
              <Image
                src={src}
                alt={`Page ${current + 1}`}
                fill
                sizes="88vw"
                priority={current <= 1}
                loading={current <= 1 ? "eager" : "lazy"}
                quality={100}
                unoptimized={true}
                placeholder="empty"
                style={{ objectFit: "cover" }}
                draggable={false}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg,#1a1a2e 0%,#16213e 55%,#0f3460 100%)",
                }}
              />
            )}
            <div className="mfb-badge">
              {current + 1} / {total}
            </div>
          </div>
        </div>

        {/* Dot row — only show up to 20 dots to avoid overflow */}
        {total <= 20 && (
          <div className="mfb-dots">
            {images.map((_, i) => (
              <div
                key={i}
                className={`mfb-dot${i === current ? " active" : ""}`}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
              />
            ))}
          </div>
        )}
      </div>

      <div className="fb-controls">
        <button
          className="fb-btn"
          onClick={prev}
          disabled={current === 0 || animating}
          aria-label="Previous page"
        >
          ← Prev
        </button>
        <span className="fb-counter">
          {current + 1} / {total}
        </span>
        <button
          className="fb-btn"
          onClick={next}
          disabled={current === total - 1 || animating}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>
    </>
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

  const zoomRef = useRef({ scale: 1, tx: 0, ty: 0 });
  const pinchRef = useRef({ active: false });
  const blockFlip = useRef(false);

  const total = images.length;

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

  // Wheel zoom (desktop only)
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  // Pinch zoom (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const el = wrapRef.current;
    if (!el) return;

    const onStart = (e) => {
      if (e.touches.length < 2) return;
      e.stopPropagation();
      e.preventDefault();
      const t0 = e.touches[0], t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const rect = el.getBoundingClientRect();
      const midX = (t0.clientX + t1.clientX) / 2 - rect.left - rect.width / 2;
      const midY = (t0.clientY + t1.clientY) / 2 - rect.top - rect.height / 2;
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
      const t0 = e.touches[0], t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const rect = el.getBoundingClientRect();
      const midX = (t0.clientX + t1.clientX) / 2 - rect.left - rect.width / 2;
      const midY = (t0.clientY + t1.clientY) / 2 - rect.top - rect.height / 2;
      const newScale = Math.min(3, Math.max(0.4, +(p.startScale * (dist / p.startDist)).toFixed(3)));
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
      if (e.touches.length < 2) pinchRef.current.active = false;
      if (blockFlip.current) {
        e.stopPropagation();
        const blk = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
        el.addEventListener("click", blk, { capture: true, once: true });
        el.addEventListener("touchend", blk, { capture: true, once: true });
        setTimeout(() => { blockFlip.current = false; }, 450);
      }
    };

    el.addEventListener("touchstart", onStart, { capture: true, passive: false });
    el.addEventListener("touchmove", onMove, { capture: true, passive: false });
    el.addEventListener("touchend", onEnd, { capture: true, passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart, { capture: true });
      el.removeEventListener("touchmove", onMove, { capture: true });
      el.removeEventListener("touchend", onEnd, { capture: true });
    };
  }, [isMobile]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const onFlip = (e) => setPage(e.data);

  if (isMobile === null) return null;

  /* ── Mobile: dedicated single-page flip UI ── */
  if (isMobile) {
    return <MobileFlipBook images={images} />;
  }

  /* ── Desktop: react-pageflip double-spread ── */
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
        .stf__parent { background: transparent !important; }
        .stf__parent * { cursor: pointer; }
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
          width: 38px; height: 38px;
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
          top: 16px; right: 16px;
          background: rgba(0,0,0,0.55);
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.05em;
          pointer-events: none;
          z-index: 1000;
        }
      `}</style>

      {zoom.scale !== 1 && (
        <div className="fb-zoom-pill">{Math.round(zoom.scale * 100)}%</div>
      )}

      <div
        ref={wrapRef}
        className="fb-wrap"
        style={{
          width: "78vw",
          height: "80vh",
          transform: `translate(${zoom.tx}px,${zoom.ty}px) scale(${0.9 * zoom.scale})`,
          transformOrigin: "center center",
          touchAction: "none",
        }}
      >
        <HTMLFlipBook
          key="desktop"
          ref={bookRef}
          width={620}
          height={840}
          size="stretch"
          minWidth={300}
          maxWidth={1400}
          minHeight={600}
          maxHeight={1100}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onFlip}
          flippingTime={1100}
          usePortrait={false}
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
              <Page src={src} number={src ? idx + 1 : null} total={total} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
