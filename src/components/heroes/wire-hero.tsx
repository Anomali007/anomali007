import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import {
  HexagonGrid,
  AnomaliMark,
  AlienWatermark,
} from "@/components/atmosphere";

const FALLBACK = [
  { slug: "", title: "On giving AI deep autonomy" },
  { slug: "", title: "Field notes: shipping discipline" },
  { slug: "", title: "What the operator-monk does at 2am" },
  { slug: "", title: "From Copilot to Claude Code" },
];

export function WireHero() {
  const posts = getAllPosts();
  const latest = posts[0];
  const items =
    posts.length > 0
      ? posts.map((p) => ({ slug: p.slug, title: p.title }))
      : FALLBACK;
  const ribbon = [...items, ...items, ...items, ...items];

  return (
    <section className="bridge-atmosphere relative overflow-hidden border-b border-amber-500/20">
      <HexagonGrid opacity={0.04} />
      <AlienWatermark side="right" size={520} opacity={0.13} />

      <div className="relative mx-auto max-w-5xl px-6 pt-8 pb-14 sm:pt-10 sm:pb-20">
        <div className="mb-6 flex items-center justify-between">
          <AnomaliMark />
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/80 sm:block">
            WIRE · v2026
          </div>
        </div>

        {/* Scrolling wire ribbon — panel-chrome style */}
        <div
          className="wire-ribbon-track relative mb-10 overflow-hidden border border-amber-500/30 bg-[#050505]/85 backdrop-blur-md"
          style={{
            boxShadow:
              "0 0 24px rgba(245,158,11,0.05), inset 0 0 18px rgba(0,0,0,0.7)",
          }}
        >
          <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-3 py-1.5">
            <span className="font-mono text-[10px] tracking-[0.25em] text-amber-500">
              LIVE WIRE
            </span>
            <span className="flex gap-1">
              <span className="h-1 w-1 rounded-full bg-amber-500/20" />
              <span className="h-1 w-1 rounded-full bg-amber-500/20" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
            </span>
          </div>
          <div className="relative py-3">
            <div className="wire-marquee flex whitespace-nowrap gap-10 font-mono text-sm tracking-wider text-amber-500/70">
              {ribbon.map((item, i) => {
                const Tag = item.slug ? Link : "span";
                const href = item.slug ? `/blog/${item.slug}` : "/blog";
                return (
                  <span key={i} className="flex shrink-0 items-center gap-10">
                    <Tag
                      href={href}
                      className="wire-item inline-flex items-center gap-2 uppercase transition-colors hover:text-amber-300"
                    >
                      {item.title}
                    </Tag>
                    <span
                      className="inline-block h-1 w-1 rounded-full bg-emerald-400"
                      style={{ boxShadow: "0 0 6px rgba(16,185,129,0.6)" }}
                    />
                  </span>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050505] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050505] to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="animate-fade-in-up">
            <h1 className="mb-3 font-display text-3xl font-bold uppercase tracking-[0.05em] text-[#fff5eb] sm:text-5xl">
              Blog
            </h1>
            <div className="mb-4 h-px w-1/3 bg-gradient-to-r from-amber-500/60 via-amber-500/30 to-transparent" />
            <p className="max-w-md text-sm text-amber-200/65">
              Notes on building, shipping, and the AI-native workflow. Filed
              under{" "}
              <span className="font-mono text-xs uppercase tracking-wider text-amber-300">
                operator-monk · field-notes · ai-native
              </span>
              .
            </p>
          </div>

          {latest && (
            <Link
              href={`/blog/${latest.slug}`}
              className="group block w-full max-w-md overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-5 backdrop-blur-sm transition-all hover:border-amber-500/55"
              style={{
                boxShadow:
                  "0 0 18px rgba(245,158,11,0.04), inset 0 0 18px rgba(0,0,0,0.65)",
              }}
            >
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-amber-500/90">Now reading</span>
                <time className="text-amber-700">{latest.date}</time>
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-amber-100/95">
                {latest.title}
              </h3>
              {latest.excerpt && (
                <p className="line-clamp-3 text-sm leading-relaxed text-amber-200/65">
                  {latest.excerpt}
                </p>
              )}
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </Link>
          )}
        </div>
      </div>

      <style>{`
        .wire-marquee {
          animation: wire-scroll 80s linear infinite;
        }
        .wire-ribbon-track:hover .wire-marquee {
          animation-play-state: paused;
        }
        .wire-item:hover {
          color: #fbbf24;
          text-shadow: 0 0 14px rgba(245,158,11,0.45);
        }
        @keyframes wire-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wire-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
