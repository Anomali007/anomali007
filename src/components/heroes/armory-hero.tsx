import {
  HexagonGrid,
  AnomaliMark,
  AlienWatermark,
} from "@/components/atmosphere";

type Slot = {
  num: string;
  name: string;
  caption: string;
  emoji: string;
};

const slots: Slot[] = [
  { num: "01", name: "Machine", caption: "MacBook · Apple Silicon", emoji: "💻" },
  { num: "02", name: "Claude Code", caption: "Daily driver", emoji: "🤖" },
  { num: "03", name: "Cursor", caption: "AI-native editor", emoji: "✦" },
  { num: "04", name: "1Password", caption: "Vault & secrets", emoji: "🔐" },
  { num: "05", name: "Postgres", caption: "Primary database", emoji: "🐘" },
  { num: "06", name: "Three.js", caption: "WebGL & 3D scenes", emoji: "🎲" },
  { num: "07", name: "SST v3", caption: "Infra as code", emoji: "⚡" },
  { num: "08", name: "Tauri · Rust", caption: "Native desktop", emoji: "🦀" },
  { num: "09", name: "Vapi · Telnyx", caption: "Voice & telephony", emoji: "📞" },
  { num: "10", name: "Obsidian", caption: "Vault & PARA", emoji: "📓" },
  { num: "11", name: "Kettlebell", caption: "Friday reset", emoji: "🏋️" },
  { num: "12", name: "Coffee", caption: "No specific brand", emoji: "☕" },
];

export function ArmoryHero() {
  return (
    <section className="bridge-atmosphere relative overflow-hidden border-b border-amber-500/20">
      <HexagonGrid opacity={0.045} />
      <AlienWatermark side="left" size={500} opacity={0.13} />

      <div className="relative mx-auto max-w-5xl px-6 pt-8 pb-14 sm:pt-10 sm:pb-20">
        <div className="mb-6 flex items-center justify-between">
          <AnomaliMark />
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/80 sm:block">
            ARMORY · v2026.05
          </div>
        </div>

        <div className="mb-8 max-w-2xl animate-fade-in-up">
          <h1 className="mb-3 font-display text-3xl font-bold uppercase tracking-[0.05em] text-[#fff5eb] sm:text-5xl">
            Uses
          </h1>
          <div className="mb-4 h-px w-1/3 bg-gradient-to-r from-amber-500/60 via-amber-500/30 to-transparent" />
          <p className="text-sm text-amber-200/65 sm:text-base">
            The tools, stack, and AI-native development setup behind the work.
          </p>
        </div>

        {/* Armory grid — same shape as Projects */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {slots.map((slot, i) => (
            <div
              key={slot.num}
              className="group relative overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-5 backdrop-blur-sm transition-all hover:border-amber-500/55"
              style={{
                boxShadow:
                  "0 0 18px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-2 py-1">
                <span className="font-mono text-[8px] tracking-[0.25em] text-amber-500/80">
                  SLOT · {slot.num}
                </span>
                <span className="flex gap-0.5">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>

              <div
                className="pointer-events-none absolute inset-x-3 top-7 h-28"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(245,158,11,0.16) 0%, rgba(2,2,2,0) 65%)",
                  boxShadow: "inset 0 6px 24px rgba(0,0,0,0.6)",
                }}
              />

              <div className="relative mt-3 mb-4 flex h-24 w-full items-center justify-center">
                <span
                  className={`vitrine-icon vitrine-icon-d${i} text-6xl sm:text-[4.25rem]`}
                >
                  {slot.emoji}
                </span>
              </div>

              <div className="brass-plate px-2.5 py-1.5">
                <div className="truncate font-display text-xs font-medium normal-case tracking-normal text-amber-100/95">
                  {slot.name}
                </div>
                <div className="mt-1 font-mono text-[9px] tracking-[0.2em] text-amber-700">
                  {slot.caption}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
