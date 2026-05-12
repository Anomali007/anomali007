import { HexagonGrid, AnomaliMark } from "@/components/atmosphere";

/**
 * Bridge-style loading screen. Drop into any `loading.tsx` route segment
 * to stream a Severance-terminal load state while the underlying page
 * resolves. Animated scan + dots match the command-bridge atmosphere.
 */
export function BridgeLoader({
  label = "ACQUIRING SIGNAL",
}: {
  label?: string;
}) {
  return (
    <div className="bridge-atmosphere relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <HexagonGrid opacity={0.05} className="z-0" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <AnomaliMark />

        <div
          className="relative w-full max-w-md overflow-hidden border border-amber-500/30 bg-[#050505]/90 backdrop-blur-sm"
          style={{
            boxShadow:
              "0 0 24px rgba(245,158,11,0.06), inset 0 0 18px rgba(0,0,0,0.7)",
          }}
        >
          {/* Panel chrome */}
          <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/90">
              {label}
            </span>
            <span className="flex gap-1">
              <span className="h-1 w-1 rounded-full bg-amber-500/20" />
              <span className="h-1 w-1 rounded-full bg-amber-500/20" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
            </span>
          </div>

          {/* Scan-bar progress */}
          <div className="relative h-1.5 w-full overflow-hidden bg-amber-950/40">
            <div className="bridge-scan absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <div className="p-6">
            {/* Animated typewriter-style dots */}
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-amber-300">
              <span>SYNC</span>
              <span className="bridge-dots inline-flex gap-1">
                <span />
                <span />
                <span />
              </span>
            </div>

            <p className="font-mono text-[10px] leading-relaxed uppercase tracking-[0.2em] text-amber-200/65">
              <span className="text-amber-500/80">$&gt;</span> resolving page ·
              hydrating components · streaming data
            </p>
          </div>

          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>
      </div>

      <style>{`
        @keyframes bridge-scan {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(150%); }
          100% { transform: translateX(-100%); }
        }
        .bridge-scan { animation: bridge-scan 1.8s ease-in-out infinite; }

        @keyframes bridge-dot-pulse {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50%      { opacity: 1; transform: translateY(-2px); }
        }
        .bridge-dots > span {
          display: inline-block;
          width: 4px;
          height: 4px;
          background: #f59e0b;
          border-radius: 999px;
          animation: bridge-dot-pulse 1.2s ease-in-out infinite;
        }
        .bridge-dots > span:nth-child(2) { animation-delay: 0.15s; }
        .bridge-dots > span:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
