import { projects } from "@/content/projects";
import {
  HexagonGrid,
  AnomaliMark,
  AlienWatermark,
} from "@/components/atmosphere";

const STATUS_META: Record<string, { label: string; color: string }> = {
  building: { label: "BUILDING", color: "#f59e0b" },
  live: { label: "LIVE", color: "#10b981" },
  completed: { label: "COMPLETED", color: "#71717a" },
  beta: { label: "BETA", color: "#f59e0b" },
};

// Curated 12 for the specimen-wall teaser - flagship + current focus first,
// then paid client work, then public OSS. /projects shows the full list below.
const TEASER_ORDER = [
  "mass-lead-connect",
  "beat-the-odds",
  "token-holder",
  "knowmessenger",
  "clawnoly",
  "home-team-education",
  "yachttransport-ai",
  "blah3",
  "git-tracker",
  "mergereel",
  "tml-cli",
  "milestorm",
];

export function GalleryHero() {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const vitrines = TEASER_ORDER.map((slug) => bySlug.get(slug)).filter(
    (p): p is (typeof projects)[number] => Boolean(p),
  );

  return (
    <section className="bridge-atmosphere relative overflow-hidden border-b border-amber-500/20">
      <HexagonGrid opacity={0.045} />
      <AlienWatermark side="right" size={500} opacity={0.14} />

      <div className="relative mx-auto max-w-5xl px-6 pt-8 pb-14 sm:pt-10 sm:pb-20">
        <div className="mb-6 flex items-center justify-between">
          <AnomaliMark />
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/80 sm:block">
            SPECIMEN WALL · 12/{projects.length}
          </div>
        </div>

        <div className="mb-8 max-w-2xl animate-fade-in-up">
          <h1 className="mb-3 font-display text-3xl font-bold uppercase tracking-[0.05em] text-[#fff5eb] sm:text-5xl">
            Projects
          </h1>
          <div className="mb-4 h-px w-1/3 bg-gradient-to-r from-amber-500/60 via-amber-500/30 to-transparent" />
          <p className="text-sm text-amber-200/65 sm:text-base">
            Full-stack platforms, tools, and experiments. Most built solo with
            AI-native workflows.
          </p>
        </div>

        {/* Vitrine wall - same rhythm as the command bridge panels */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {vitrines.map((p, i) => {
            const status = STATUS_META[p.status] ?? STATUS_META.building;
            return (
              <a
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative block overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-5 backdrop-blur-sm transition-all hover:border-amber-500/55"
                style={{
                  boxShadow:
                    "0 0 18px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
                }}
              >
                {/* Panel-chrome top bar - micro version */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-2 py-1">
                  <span className="font-mono text-[8px] tracking-[0.25em] text-amber-500/80">
                    SPEC · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                    <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                    <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                  </span>
                </div>

                {/* Recessed shadow well */}
                <div
                  className="pointer-events-none absolute inset-x-3 top-7 h-28"
                  style={{
                    background:
                      "radial-gradient(ellipse at center top, rgba(245,158,11,0.16) 0%, rgba(2,2,2,0) 65%)",
                    boxShadow: "inset 0 6px 24px rgba(0,0,0,0.6)",
                  }}
                />

                {/* Floating artifact */}
                <div className="relative mt-3 mb-4 flex h-24 w-full items-center justify-center">
                  <span
                    className={`vitrine-icon vitrine-icon-d${i} text-6xl sm:text-[4.25rem]`}
                  >
                    {p.emoji}
                  </span>
                </div>

                {/* Brass plate */}
                <div className="brass-plate px-2.5 py-1.5">
                  <div className="truncate font-display text-xs font-medium normal-case tracking-normal text-amber-100/95">
                    {p.title}
                  </div>
                  <div className="mt-1 flex items-center justify-between font-mono text-[9px] tracking-[0.2em]">
                    <span style={{ color: status.color }}>{status.label}</span>
                    <span className="text-amber-700">{p.category}</span>
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
