import Image from "next/image";

/**
 * Shared command-bridge atmosphere primitives.
 *
 * Drop into any page hero to inherit the Severance / Daedalus aesthetic from
 * the home command-bridge - hexagon grid background, AnomaliMark header,
 * AlienWatermark, brass plate utilities. Pair with `.bridge-atmosphere` (CSS)
 * on a wrapper for scan lines + radial vignette.
 */

/**
 * Half-cropped alien mascot, brass-amber tinted, used as a side watermark
 * on inner-page heroes. Positioned with the alien's body bleeding off the
 * edge so it reads as a presence, not an icon.
 */
export function AlienWatermark({
  side = "right",
  size = 520,
  opacity = 0.18,
  className = "",
}: {
  side?: "right" | "left";
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
        side === "right"
          ? "-right-32 sm:-right-28 lg:-right-24"
          : "-left-32 sm:-left-28 lg:-left-24 -scale-x-100"
      } z-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/alien.jpg"
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        className="h-full w-full"
        style={{
          opacity,
          // grayscale collapses the pink/green/red split, then sepia + hue-rotate
          // pushes everything to amber. Radial mask softens the rectangular edge
          // so the image background fades into the page instead of cutting hard.
          filter:
            "grayscale(1) sepia(1) saturate(4) hue-rotate(-15deg) brightness(0.95) contrast(1.15)",
          maskImage:
            "radial-gradient(circle at center, black 38%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 38%, transparent 78%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

export function HexagonGrid({
  opacity = 0.04,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id="atmosphere-hexagons"
          width="60"
          height="103.923"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          <path
            d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <path
            d="M30 103.923 L60 86.6 L60 51.96 L30 69.28 L0 51.96 L0 86.6 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#atmosphere-hexagons)" />
    </svg>
  );
}

export function AnomaliMark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-6 font-mono text-xs tracking-[0.3em] text-amber-500/80 ${className}`}
    >
      <span>ANOMALI</span>
      <div className="relative flex h-8 w-12 items-center justify-center">
        <svg
          viewBox="0 0 100 60"
          className="h-full w-full drop-shadow-[0_0_6px_rgba(245,158,11,0.55)]"
          aria-hidden
        >
          <path
            d="M 10 30 Q 50 -10 90 30 Q 50 70 10 30 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <circle cx="50" cy="30" r="5" fill="currentColor" />
          <circle cx="70" cy="30" r="4" fill="currentColor" />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="45"
            y1="60"
            x2="55"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <span>0 0 7</span>
    </div>
  );
}

export function PanelChrome({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden border border-amber-500/30 bg-[#050505]/90 backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "0 0 30px rgba(245,158,11,0.05), inset 0 0 24px rgba(0,0,0,0.85)",
      }}
    >
      <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/5 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-amber-500">
            {title}
          </span>
          {subtitle && (
            <>
              <span className="text-xs text-amber-700/50">•</span>
              <span className="font-mono text-xs tracking-wider text-amber-600">
                {subtitle}
              </span>
            </>
          )}
        </div>
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/20" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500/60" />
        </div>
      </div>
      <div className="flex-grow overflow-hidden p-4">{children}</div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}
