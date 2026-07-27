import type { Metadata } from "next";
import { Section } from "@/components/section";
import { OriginWallHero } from "@/components/heroes/origin-wall-hero";
import { HexagonGrid } from "@/components/atmosphere";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mali Franzese - Founder-Engineer at The MASS Lab. The story, the workflow, and what comes next.",
};

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="alien-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/80">
          {kicker}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-amber-500/40 via-amber-500/15 to-transparent" />
      </div>
      <h2 className="font-display text-2xl font-bold uppercase tracking-[0.04em] text-[#fff5eb] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 max-w-2xl text-sm text-amber-200/65">{subtitle}</p>
      )}
    </header>
  );
}

function Panel({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden border border-amber-500/25 bg-[#050505]/85 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 0 24px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
      }}
    >
      <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
          {kicker}
        </span>
        <span className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
        </span>
      </div>
      <div className="p-6 sm:p-8">{children}</div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <OriginWallHero />

      <div className="bridge-atmosphere relative">
        <HexagonGrid opacity={0.035} className="z-0" />

        <Section>
          <SectionHeader
            kicker="LINEAGE"
            title="The Story"
            subtitle="Phoenix → LA → Central Texas. Hardware to software to AI-native."
          />
          <Panel kicker="THREAD · 001">
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-amber-200/75 sm:text-base">
              <p>
                I spent a year in electrical engineering at ASU (2015-2016),
                then pivoted to software through Hack Reactor in LA in 2018.
                After that I built my own practice - The MASS Lab - taking on
                client projects and building internal products.
              </p>
              <p>
                The MASS Lab is my engineering practice - where I take on
                fractional CTO engagements and build internal products like
                MASS Lead Connect.
              </p>
              <p>
                Along the way I worked at Inter-Con building Python APIs on
                AWS, became lead engineer at Beat The Odds building a
                real-time fantasy sports platform, and shipped platforms for
                clients ranging from yacht transport logistics to nonprofit
                financial literacy.
              </p>
              <p>
                The shift to AI-native development changed everything.
                Starting with GitHub Copilot and evolving to Claude Code as
                my daily driver, I went from building features to shipping
                entire multi-tenant SaaS platforms solo. 3,000+ commits
                across 20+ active repos - not by cutting corners, but by
                giving AI deep autonomy while maintaining senior-level
                review on every line.
              </p>
              <p>
                Currently pursuing a B.S. in Cybersecurity at WGU while
                continuing to ship.
              </p>
            </div>
          </Panel>
        </Section>

        <Section>
          <SectionHeader
            kicker="IDENTITY"
            title="The Name"
            subtitle="Who I am, and who I am not."
          />
          <Panel kicker="DISAMBIGUATION">
            <p className="max-w-3xl text-sm leading-relaxed text-amber-200/75 sm:text-base">
              A note on the name. &ldquo;Anomali007&rdquo; is a handle, a play
              on Mali, and has been mine for years. It has nothing to do with
              Anomali Incorporated, the cybersecurity company, and I am not
              affiliated with them. I am also not related to Michael Franzese
              or Sonny Franzese, who dominate search results for the surname.
            </p>
          </Panel>
        </Section>

        <Section>
          <SectionHeader
            kicker="SIGNAL"
            title="Shipping Velocity"
            subtitle="GitHub activity over the last year."
          />
          <Panel kicker="GH · @Anomali007">
            <a
              href="https://github.com/Anomali007"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ghchart.rshah.org/f59e0b/Anomali007"
                alt="Mali Franzese's GitHub contribution graph"
                className="w-full max-w-3xl opacity-80 transition-opacity hover:opacity-100"
              />
            </a>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/75">
              <span>
                <span className="text-amber-400">3,000+</span> commits ·
                20+ active repos
              </span>
              <span>
                <span className="text-amber-400">Claude Code</span> daily
                driver
              </span>
            </div>
          </Panel>
        </Section>

        <Section>
          <SectionHeader
            kicker="METHOD"
            title="How I Work"
            subtitle="Claude Code with structured discipline. AI gets deep autonomy on bounded surfaces. Review is non-negotiable."
          />
          <Panel kicker="LOOP · /ship">
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-amber-200/75 sm:text-base">
              <p>
                My workflow is built around Claude Code with a custom
                configuration I&apos;ve refined over months: 11 slash
                commands, 6 specialized agents, and 4 safety hooks. The{" "}
                <code
                  className="border px-1.5 py-0.5 font-mono text-sm"
                  style={{
                    borderColor: "rgba(245,158,11,0.35)",
                    background: "rgba(245,158,11,0.06)",
                    color: "#fbbf24",
                  }}
                >
                  /ship
                </code>{" "}
                pipeline handles everything from code generation to security
                review to deployment.
              </p>
              <p>
                I give AI deep autonomy - but every line gets senior review.
                Tests, types, and security passes are non-negotiable. The
                result is a development pace that lets one engineer do what
                typically requires a team, without sacrificing quality.
              </p>
            </div>
          </Panel>
        </Section>

        <Section>
          <SectionHeader
            kicker="OPEN ROLES"
            title="What I'm Looking For"
          />
          <Panel kicker="STATUS · OPEN">
            <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-amber-200/75 sm:text-base">
              <p>
                Open to full-time senior or principal engineering roles,
                applied AI positions, and fractional CTO engagements.
                I&apos;m interested in teams where AI-assisted development is
                a core competency - not a novelty.
              </p>
            </div>
          </Panel>
        </Section>

        <Section>
          <SectionHeader kicker="STATION" title="Outside Work" />
          <Panel kicker="CENTRAL TX">
            <p className="max-w-3xl text-sm leading-relaxed text-amber-200/75 sm:text-base">
              Based in Central Texas. When I&apos;m not building, I&apos;m
              probably exploring the region, tinkering with hardware
              projects, or finding the next great coffee spot.
            </p>
          </Panel>
        </Section>
      </div>
    </>
  );
}
