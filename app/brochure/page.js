import FlipBookBrochure from "../components/FlipBookBrochure";

export const metadata = {
  title: "Brochure | Lakeview Homes",
  description: "Browse the Lakeview Homes digital brochure.",
};

// ── Auto-generated from public/Lakeview Homes_WEBP (00–25) ─────────────────
const BROCHURE_PAGES = Array.from(
  { length: 26 },
  (_, i) => `/Lakeview Homes_WEBP/${String(i).padStart(2, "0")}.webp`,
);

export default function BrochurePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #0d1117 0%, #1a2436 60%, #0d1117 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <FlipBookBrochure images={BROCHURE_PAGES} />
    </main>
  );
}
