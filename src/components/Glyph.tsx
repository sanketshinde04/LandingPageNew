/**
 * One line-art system, drawn on a 48x48 grid at a single stroke weight, so the
 * cards read as diagrams of the same machine rather than a bag of stock icons.
 * Every glyph inherits `currentColor`.
 */

export type GlyphName =
  | "signal"
  | "approval"
  | "ledger"
  | "onboard"
  | "release"
  | "evidence";

const paths: Record<GlyphName, React.ReactNode> = {
  // intent detected, rising out of noise
  signal: (
    <>
      <path d="M7 34l7-9 6 5 7-13 6 9 8-14" />
      <circle cx="34" cy="12" r="3.2" />
      <path d="M7 40h34" />
    </>
  ),
  // a queue stopping at a human check
  approval: (
    <>
      <rect x="7" y="10" width="16" height="12" rx="2" />
      <rect x="7" y="26" width="16" height="12" rx="2" />
      <path d="M23 16h7M23 32h7" />
      <circle cx="37" cy="24" r="7" />
      <path d="M34 24.5l2.2 2.2 4.2-4.6" />
    </>
  ),
  // invoices sorted by what to chase first
  ledger: (
    <>
      <rect x="8" y="8" width="24" height="32" rx="2" />
      <path d="M14 17h12M14 24h12M14 31h7" />
      <path d="M36 14v20M31 29l5 5 5-5" />
    </>
  ),
  // access provisioned before day one
  onboard: (
    <>
      <circle cx="17" cy="14" r="5.5" />
      <path d="M8 34c0-5 4-8.5 9-8.5s9 3.5 9 8.5" />
      <path d="M30 24h11M36 19l5 5-5 5" />
      <rect x="30" y="8" width="11" height="8" rx="1.6" />
    </>
  ),
  // checks passing before a release goes out
  release: (
    <>
      <path d="M10 12h6M10 20h6M10 28h6M10 36h6" />
      <path d="M20 12h4M20 20h4M20 28h4M20 36h4" />
      <path d="M30 24h10" />
      <circle cx="28" cy="24" r="9" />
      <path d="M24.5 24.5l2.4 2.4 4.6-5" />
    </>
  ),
  // evidence collected into a reviewable pack
  evidence: (
    <>
      <path d="M24 6l14 5v11c0 8.5-5.6 15-14 18-8.4-3-14-9.5-14-18V11Z" />
      <path d="M18 23.5l4 4 9-9.5" />
    </>
  ),
};

interface GlyphProps {
  name: GlyphName;
  className?: string;
}

export default function Glyph({ name, className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
