import Image from "next/image";
import {
  HexagonGrid,
  AnomaliMark,
  AlienWatermark,
} from "@/components/atmosphere";

type Waypoint = {
  year: string;
  city: string;
  label: string;
};

const waypoints: Waypoint[] = [
  { year: "2015", city: "Tempe, AZ", label: "ASU - 1 yr, Electrical Engineering" },
  { year: "2018", city: "Los Angeles", label: "Hack Reactor - software pivot" },
  { year: "2019", city: "-", label: "The MASS Lab founded - first clients" },
  { year: "2021", city: "Remote", label: "Inter-Con - Python APIs on AWS" },
  { year: "2022", city: "Remote", label: "Beat The Odds - Co-Founder & CTO" },
  { year: "2026", city: "Central Texas", label: "Founder-Engineer · The MASS Lab" },
];

export function OriginWallHero() {
  return (
    <section className="bridge-atmosphere relative overflow-hidden border-b border-amber-500/20">
      <HexagonGrid opacity={0.04} />
      <AlienWatermark side="right" size={520} opacity={0.13} />

      <div className="relative mx-auto max-w-5xl px-6 pt-8 pb-14 sm:pt-10 sm:pb-20">
        <div className="mb-6 flex items-center justify-between">
          <AnomaliMark />
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/80 sm:block">
            ORIGIN · 2015 → 2026
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-start">
          {/* Left column - operator specimen card with photo */}
          <div className="animate-fade-in-up">
            <div
              className="relative overflow-hidden border border-amber-500/30 bg-[#050505]/85 p-3 backdrop-blur-sm"
              style={{
                boxShadow:
                  "0 0 24px rgba(245,158,11,0.06), inset 0 0 18px rgba(0,0,0,0.7)",
                transform: "rotate(-1.2deg)",
              }}
            >
              <div className="mb-2 flex items-center justify-between border-b border-amber-500/15 px-1 pb-1.5">
                <span className="font-mono text-[9px] tracking-[0.25em] text-amber-500/85">
                  OPERATOR · 001
                </span>
                <span className="flex gap-0.5">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>
              {/* Photo */}
              <div className="relative aspect-square w-[200px] overflow-hidden sm:w-[220px]">
                <Image
                  src="/images/profile.jpg"
                  alt="Mali Franzese"
                  fill
                  sizes="(max-width: 768px) 200px, 220px"
                  className="object-cover"
                  priority
                />
                {/* CRT scan-line overlay just on the portrait */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 50%)",
                    backgroundSize: "100% 4px",
                    opacity: 0.45,
                  }}
                />
                {/* Soft amber rim */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-500/15" />
              </div>
              {/* Brass plate caption */}
              <div className="brass-plate mt-3 px-2 py-1.5 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="alien-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span style={{ letterSpacing: "0.25em" }}>Mali Franzese</span>
                </div>
                <div
                  className="mt-1 tracking-[0.2em]"
                  style={{ color: "rgba(245,158,11,0.65)" }}
                >
                  Anomali · Central Texas
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </div>
          </div>

          {/* Middle column - title + intro */}
          <div className="animate-fade-in-up">
            <h1 className="mb-3 font-display text-3xl font-bold uppercase tracking-[0.05em] text-[#fff5eb] sm:text-5xl">
              The Story
            </h1>
            <div className="mb-5 h-px w-1/3 bg-gradient-to-r from-amber-500/60 via-amber-500/30 to-transparent" />
            <p className="max-w-xl text-sm text-amber-200/70 leading-relaxed sm:text-base">
              Founder-Engineer at The MASS Lab. The story below traces the
              lineage - Phoenix to LA to Central Texas - and where the
              workshop is now.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/75">
              <span>
                <span className="text-amber-400">3,000+</span> commits · 20+
                active repos
              </span>
              <span>
                <span className="text-amber-400">Claude Code</span> daily
                driver
              </span>
              <span>
                <span className="text-amber-400">WGU BS</span> Cybersecurity
              </span>
            </div>
          </div>

          {/* Right column - vertical timeline */}
          <ol className="relative pl-8">
            <span
              aria-hidden
              className="absolute left-3 top-2 bottom-2 w-px"
              style={{
                background:
                  "linear-gradient(180deg, rgba(245,158,11,0), rgba(245,158,11,0.7) 15%, rgba(245,158,11,0.7) 85%, rgba(245,158,11,0))",
              }}
            />
            {waypoints.map((wp, i) => (
              <li key={i} className="relative mb-6 last:mb-0">
                <span
                  aria-hidden
                  className="absolute -left-[26px] top-[14px] h-2.5 w-2.5 rounded-full"
                  style={{
                    background: "#f59e0b",
                    boxShadow: "0 0 12px rgba(245,158,11,0.6)",
                  }}
                />
                <div
                  className="relative min-w-[14rem] overflow-hidden border border-amber-500/25 bg-[#050505]/85 px-4 py-3 backdrop-blur-sm"
                  style={{
                    boxShadow:
                      "0 0 18px rgba(245,158,11,0.04), inset 0 0 16px rgba(0,0,0,0.6)",
                  }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500/85">
                    {wp.year} · {wp.city}
                  </div>
                  <div className="mt-1 font-display text-sm text-amber-100/95">
                    {wp.label}
                  </div>
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
