import Link from "next/link";
import { Section } from "@/components/section";
import { HexagonGrid, AnomaliMark, AlienWatermark } from "@/components/atmosphere";

export default function NotFound() {
  return (
    <div className="bridge-atmosphere relative min-h-[70vh]">
      <HexagonGrid opacity={0.045} className="z-0" />
      <AlienWatermark side="right" size={520} opacity={0.15} />

      <Section>
        <div className="relative mx-auto max-w-2xl pt-8 sm:pt-12">
          <div className="mb-6 flex items-center gap-3">
            <AnomaliMark />
          </div>

          <div
            className="relative overflow-hidden border border-amber-500/25 bg-[#050505]/85 backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 24px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
            }}
          >
            <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
                SIGNAL LOST · 404
              </span>
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
              </span>
            </div>

            <div className="p-8 sm:p-10">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-700">
                STATUS · NO MATCH
              </p>
              <h1 className="mb-4 font-display text-3xl font-bold uppercase tracking-[0.04em] text-[#fff5eb] sm:text-5xl">
                Out of range.
              </h1>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-amber-200/75 sm:text-base">
                The path you tried doesn&apos;t resolve to anything in the
                workshop. Either the file moved, the signal dropped, or the
                URL was never minted.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="border border-amber-500/45 bg-amber-500/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300 transition-all hover:bg-amber-500/20 hover:text-amber-200"
                >
                  ← Return to home
                </Link>
                <Link
                  href="/projects"
                  className="border border-amber-500/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500/85 transition-all hover:border-amber-500/55 hover:text-amber-300"
                >
                  Browse projects →
                </Link>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </div>
        </div>
      </Section>
    </div>
  );
}
