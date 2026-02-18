import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mali Franzese — principal engineer, fractional CTO, and founder of The MASS Lab. The story, the workflow, and what comes next.",
};

export default function AboutPage() {
  return (
    <Section>
      <div className="animate-fade-in-up max-w-3xl">
        <div className="mb-8 flex items-center gap-6">
          <Image
            src="/images/avatar.jpg"
            alt="Mali Franzese"
            width={80}
            height={80}
            className="rounded-full border-2 border-border"
          />
          <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
            About
          </h1>
        </div>

        {/* Intro */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed text-text-secondary">
            I&apos;m Mali Franzese — principal engineer, fractional CTO, and
            founder of{" "}
            <span className="text-text">The MASS Lab</span> in Austin, TX. I
            build and ship production SaaS platforms, developer tools, and
            AI-powered systems — usually solo, always at pace.
          </p>
        </div>

        {/* The Story */}
        <div className="mb-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-text">
            The Story
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              I started in electrical engineering at ASU, then pivoted to
              software through Hack Reactor in LA. After that I built my own
              practice — The MASS Lab — taking on client projects and building
              internal products.
            </p>
            <p>
              Along the way I worked at Inter-Con building Python APIs on AWS,
              became lead engineer at Beat The Odds building a real-time fantasy
              sports platform, and shipped platforms for clients ranging from
              yacht transport logistics to nonprofit financial literacy.
            </p>
            <p>
              The shift to AI-native development changed everything. Starting in
              early 2023 with GitHub Copilot and evolving to Claude Code as my
              primary tool, I went from building features to shipping entire
              multi-tenant SaaS platforms solo. 960+ commits across 22 repos in
              7 months — not by cutting corners, but by giving AI deep autonomy
              while maintaining senior-level review on every line.
            </p>
            <p>
              Currently pursuing a B.S. in Cybersecurity at WGU while
              continuing to ship.
            </p>
          </div>
        </div>

        {/* How I Work */}
        <div className="mb-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-text">
            How I Work
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              My workflow is built around Claude Code with a custom
              configuration I&apos;ve refined over months: 11 slash commands, 6
              specialized agents, and 4 safety hooks. The{" "}
              <code className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-sm text-accent">
                /ship
              </code>{" "}
              pipeline handles everything from code generation to security
              review to deployment.
            </p>
            <p>
              I give AI deep autonomy — but every line gets senior review.
              Tests, types, and security passes are non-negotiable. The result
              is a development pace that lets one engineer do what typically
              requires a team, without sacrificing quality.
            </p>
          </div>
        </div>

        {/* What I'm Looking For */}
        <div className="mb-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-text">
            What I&apos;m Looking For
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Open to full-time senior or principal engineering roles, applied
              AI positions, and fractional CTO engagements. I&apos;m interested
              in teams where AI-assisted development is a core competency —
              not a novelty.
            </p>
          </div>
        </div>

        {/* Outside Work */}
        <div>
          <h2 className="mb-4 font-display text-xl font-semibold text-text">
            Outside Work
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Based in Austin. When I&apos;m not building, I&apos;m probably
            exploring the city, tinkering with hardware projects, or finding
            the next great coffee spot.
          </p>
        </div>
      </div>
    </Section>
  );
}
