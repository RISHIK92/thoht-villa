"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

/* ── One page panel ─────────────────────────────────────────────────────── */
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

/* ── FlipBook wrapper ────────────────────────────────────────────────────── */
export default function FlipBook({ images = [] }) {
  if (!images.length) return null;

  const bookRef      = useRef(null);
  const wrapRef      = useRef(null);
  const containerRef = useRef(null);

  const [page, setPage]           = useState(0);
  const [isMobile, setIsMobile]   = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom]           = useState({ scale: 1, tx: 0, ty: 0 });

  /*
   * zoomRef — synchronous mirror of zoom state. Touch handlers MUST read from
   * this ref so they always see the latest value without waiting for re-render.
   */
  const zoomRef      = useRef({ scale: 1, tx: 0, ty: 0 });
  const pinchRef     = useRef({ active: false });
  const isPinchingRef = useRef(false);   // true while ≥2 fingers are down
  const dragRef       = useRef({ active: false, lastX: 0, lastY: 0 }); // 1-finger pan

  const total      = images.length;
  const pages      = [...images];
  if (pages.length % 2 !== 0) pages.push(null);
  const totalPages = pages.length;

  /* Keep zoomRef in sync with state (state change → ref update before next render) */
  const applyZoom = useCallback((nz) => {
    zoomRef.current = nz;
    setZoom({ ...nz });
  }, []);

  /* ── Responsive breakpoint ────────────────────────────────────────────── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Fullscreen listener ─────────────────────────────────────────────── */
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* ── Ctrl+wheel / fullscreen-wheel zoom (desktop) ────────────────────── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (!e.ctrlKey && !document.fullscreenElement) return;
      e.preventDefault();
      const rect  = el.getBoundingClientRect();
      const cx    = e.clientX - rect.left  - rect.width  / 2;
      const cy    = e.clientY - rect.top   - rect.height / 2;
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const { scale: s0, tx, ty } = zoomRef.current;
      const s = Math.min(4, Math.max(0.5, +(s0 + delta).toFixed(2)));
      const r = s / s0;
      applyZoom({ scale: s, tx: cx - (cx - tx) * r, ty: cy - (cy - ty) * r });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile, applyZoom]);

  /* ── Touch: pinch-zoom + 2-finger pan  ───────────────────────────────── *
   *
   * DESIGN:
   *   1 finger  → do nothing (native page scroll + react-pageflip flip work)
   *   2 fingers → intercept in capture phase, scale + pan canvas
   *
   * MATH (pinch-zoom from arbitrary anchor):
   *   When two fingers are placed, record:
   *     • anchorCanvas  = midpoint converted to canvas (element-relative) coords
   *     • startScale, startTx, startTy from zoomRef
   *     • startDist     = finger distance
   *     • lastScreenMid = screen midpoint (for 2-finger pan delta)
   *
   *   Each move frame:
   *     newScale = clamp(startScale * (currentDist / startDist))
   *     scaleRatio = newScale / startScale
   *     // Scale from anchor: the anchor point stays fixed in canvas space
   *     newTx = anchorCanvas.x - (anchorCanvas.x - startTx) * scaleRatio
   *     // Add pan: midpoint moved Δscreen → canvas is not scaled by css yet,
   *     // so Δcanvas = Δscreen (since we apply transform externally)
   *     newTx += (currentScreenMid.x - lastScreenMid.x) * PAN_FACTOR
   *     newTy = same
   *
   *   PAN_FACTOR < 1 → feels slower, more controlled (0.45 is a good value)
   *   Lerp on scale (factor 0.25) → prevents jittery zoom jumps
   * ─────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const PAN_FACTOR  = 0.45;   // 2-finger pan damping  (0..1, lower = slower)
    const LERP_SCALE  = 0.28;   // zoom damping per frame (0..1, lower = slower)

    const getMid = (t) => ({
      x: (t[0].clientX + t[1].clientX) / 2,
      y: (t[0].clientY + t[1].clientY) / 2,
    });
    const getDist = (t) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    /* ── touchstart ───────────────────────────────────────────────────── *
     * ALL touch events are intercepted — react-pageflip never sees them.
     * • 1 finger → pan the canvas (drag)
     * • 2 fingers → pinch-zoom + pan
     * ─────────────────────────────────────────────────────────────────── */
    const onStart = (e) => {
      e.stopPropagation(); // always block react-pageflip
      e.preventDefault();  // stop browser scroll/zoom in all cases

      if (e.touches.length === 1) {
        // ── 1-finger: start canvas drag ──────────────────────────────────
        dragRef.current = {
          active: true,
          lastX:  e.touches[0].clientX,
          lastY:  e.touches[0].clientY,
        };
        // Cancel any in-progress pinch
        isPinchingRef.current = false;
        pinchRef.current.active = false;
        return;
      }

      // ── 2-finger: pinch-zoom + pan ──────────────────────────────────────
      dragRef.current.active = false; // cancel any drag

      const t    = e.touches;
      const mid  = getMid(t);
      const d    = getDist(t);
      const rect = el.getBoundingClientRect();
      const { scale, tx, ty } = zoomRef.current;

      const anchorX = mid.x - rect.left - rect.width  / 2;
      const anchorY = mid.y - rect.top  - rect.height / 2;

      pinchRef.current = {
        active:     true,
        startDist:  d,
        startScale: scale,
        startTx:    tx,
        startTy:    ty,
        anchorX,
        anchorY,
        lastMidX:   mid.x,
        lastMidY:   mid.y,
      };
      isPinchingRef.current = true;
    };

    /* ── touchmove ────────────────────────────────────────────────────── */
    const onMove = (e) => {
      e.stopPropagation(); // always block react-pageflip swipe
      e.preventDefault();  // prevent page scroll / browser zoom

      if (e.touches.length === 1 && dragRef.current.active) {
        // ── 1-finger canvas pan ────────────────────────────────────────────
        const dx = (e.touches[0].clientX - dragRef.current.lastX) * PAN_FACTOR;
        const dy = (e.touches[0].clientY - dragRef.current.lastY) * PAN_FACTOR;
        dragRef.current.lastX = e.touches[0].clientX;
        dragRef.current.lastY = e.touches[0].clientY;
        const { scale, tx, ty } = zoomRef.current;
        applyZoom({ scale, tx: tx + dx, ty: ty + dy });
        return;
      }

      if (!isPinchingRef.current || e.touches.length < 2) return;

      // ── 2-finger pinch-zoom + pan ──────────────────────────────────────
      const t   = e.touches;
      const p   = pinchRef.current;
      const mid = getMid(t);
      const d   = getDist(t);

      // Scale (lerped toward target for smooth, slow feel)
      const targetScale = p.startScale * (d / p.startDist);
      const prevScale   = zoomRef.current.scale;
      const newScale    = Math.min(4, Math.max(0.5,
        prevScale + (targetScale - prevScale) * LERP_SCALE,
      ));
      const scaleRatio  = newScale / p.startScale;

      // Pan delta (damped — feels slow and controlled)
      const panDx = (mid.x - p.lastMidX) * PAN_FACTOR;
      const panDy = (mid.y - p.lastMidY) * PAN_FACTOR;
      p.lastMidX  = mid.x;
      p.lastMidY  = mid.y;

      // Translation: scale from anchor + pan offset
      const newTx = p.anchorX - (p.anchorX - p.startTx) * scaleRatio + panDx;
      const newTy = p.anchorY - (p.anchorY - p.startTy) * scaleRatio + panDy;

      applyZoom({ scale: newScale, tx: newTx, ty: newTy });
    };

    /* ── touchend / touchcancel ────────────────────────────────────────── */
    const onEnd = (e) => {
      e.stopPropagation(); // always block react-pageflip

      if (e.touches.length === 0) {
        // All fingers lifted
        dragRef.current.active  = false;
        pinchRef.current.active = false;
        isPinchingRef.current   = false;
      } else if (e.touches.length === 1) {
        // One finger lifted from a 2-finger gesture → resume 1-finger drag
        pinchRef.current.active = false;
        isPinchingRef.current   = false;
        dragRef.current = {
          active: true,
          lastX:  e.touches[0].clientX,
          lastY:  e.touches[0].clientY,
        };
      }
    };

    el.addEventListener("touchstart",  onStart, { capture: true, passive: false });
    el.addEventListener("touchmove",   onMove,  { capture: true, passive: false });
    el.addEventListener("touchend",    onEnd,   { capture: true, passive: false });
    el.addEventListener("touchcancel", onEnd,   { capture: true, passive: false });
    return () => {
      el.removeEventListener("touchstart",  onStart, { capture: true });
      el.removeEventListener("touchmove",   onMove,  { capture: true });
      el.removeEventListener("touchend",    onEnd,   { capture: true });
      el.removeEventListener("touchcancel", onEnd,   { capture: true });
    };
  }, [isMobile, applyZoom]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
    else document.exitFullscreen();
  };

  const onFlip = (e) => setPage(e.data);

  if (isMobile === null) return null;

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
        // All touch is intercepted by the inner wrapRef; outer container needs none.
        touchAction: "none",
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
          /* "none" here lets our capture-phase JS handlers preventDefault()
             on 2-finger gestures while the outer container still passes
             1-finger scroll to the browser. */
          touch-action: none;
          will-change: transform;
        }
        .stf__parent { background: transparent !important; }
        /* Cursor default — clicks do nothing on book pages */
        .stf__parent * { cursor: default; user-select: none; }
        /* Arrow nav buttons */
        .fb-arrow {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fff;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .fb-arrow:hover:not(:disabled) {
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.45);
          transform: scale(1.1);
        }
        .fb-arrow:active:not(:disabled) { transform: scale(0.93); }
        .fb-arrow:disabled { opacity: 0.2; cursor: default; }
        @media (max-width: 520px) {
          .fb-arrow { width: 42px; height: 42px; }
        }

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

      {/* Zoom level pill — shown when not at 100% */}
      {zoom.scale !== 1 && (
        <div className="fb-zoom-pill">{Math.round(zoom.scale * 100)}%</div>
      )}

      {/* Book wrapper */}
      <div
        ref={wrapRef}
        className="fb-wrap"
        style={{
          width:  isMobile ? "96vw" : "78vw",
          height: isMobile ? "70vh" : "80vh",
          transform: `translate(${zoom.tx}px,${zoom.ty}px) scale(${isMobile ? zoom.scale : 0.9 * zoom.scale})`,
          transformOrigin: "center center",
          /*
           * transition: "none" while pinching keeps the canvas glued to fingers.
           * After releasing, ease-out gives a smooth settle animation.
           */
          transition: isPinchingRef.current ? "none" : "transform 0.18s ease-out",
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
          swipeDistance={99999}         /* effectively disables swipe-to-flip */
          clickEventForward={false}     /* no click-to-flip */
          useMouseEvents={false}        /* no mouse drag-to-flip */
          style={{ margin: "0 auto" }}
          className="flipbook"
        >
          {pages.map((src, idx) => (
            <div key={idx}>
              <Page src={src} number={src ? idx + 1 : null} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls — fixed bottom bar */}
      <div className="fb-controls">
        {/* ← Previous */}
        <button
          className="fb-arrow"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={page === 0}
          aria-label="Previous page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span className="fb-counter">
          {page === 0 ? "Cover" : `${page} – ${Math.min(page + 1, total)}`}
          &nbsp;/&nbsp;{total}
        </span>

        {/* Next → */}
        <button
          className="fb-arrow"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={page >= totalPages - 2}
          aria-label="Next page"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <button
          className="fb-fs-btn"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
