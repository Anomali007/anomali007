import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { BlogCard } from "@/components/blog-card";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CommandBridgeHero } from "@/components/heroes/command-bridge-hero";
import { HexagonGrid } from "@/components/atmosphere";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";

const featured = projects.filter((p) =>
  [
    "MASS Lead Connect",
    "Beat The Odds",
    "yachttransport.ai",
    "Token Holder",
  ].includes(p.title),
);

const CURRENTLY = [
  {
    emoji: "🎙️",
    line: (
      <>
        Building <span className="text-amber-200">MASS Lead Connect</span> -
        AI voice receptionist SaaS, and the Operations Map engagement on top
        of it
      </>
    ),
  },
  {
    emoji: "🎰",
    line: (
      <>
        Running architecture and delivery at{" "}
        <span className="text-amber-200">Beat The Odds</span> - live in
        production since June
      </>
    ),
  },
  {
    emoji: "🔐",
    line: (
      <>
        Shipping <span className="text-amber-200">Token Holder</span> - identity
        &amp; audit fabric for AI agents
      </>
    ),
  },
  {
    emoji: "📚",
    line: (
      <>
        Building <span className="text-amber-200">KnowMessenger</span> -
        opinionated personal-knowledge workspace
      </>
    ),
  },
  {
    emoji: "🎓",
    line: "Studying Cybersecurity & Information Assurance at WGU",
  },
  {
    emoji: "🦀",
    line: "Exploring Rust and native desktop development",
  },
  {
    emoji: "✍️",
    line: "Writing about AI-native development workflows",
  },
];

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
    <header className="mb-8">
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

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero - Command Bridge */}
      <CommandBridgeHero />

      {/* Everything below the hero lives inside the same bridge atmosphere */}
      <div className="bridge-atmosphere relative">
        <HexagonGrid opacity={0.035} className="z-0" />

        {/* GitHub Contribution Graph */}
        <Section>
          <AnimateOnScroll>
            <SectionHeader
              kicker="SIGNAL"
              title="Shipping Velocity"
              subtitle="GitHub activity over the last year."
            />
            <div className="overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between border-b border-amber-500/15 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
                  GH · @Anomali007
                </span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>
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
                  className="mx-auto w-full max-w-3xl opacity-80 transition-opacity hover:opacity-100"
                />
              </a>
            </div>
          </AnimateOnScroll>
        </Section>

        {/* Featured Projects */}
        <Section>
          <AnimateOnScroll>
            <SectionHeader
              kicker="SPECIMEN WALL"
              title="What I've Built"
              subtitle="A few highlights from the portfolio."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/projects"
                className="font-mono text-xs uppercase tracking-[0.25em] text-amber-500/85 transition-colors hover:text-amber-300"
              >
                View all projects →
              </Link>
            </div>
          </AnimateOnScroll>
        </Section>

        {/* Currently */}
        <Section>
          <AnimateOnScroll>
            <SectionHeader kicker="STATUS" title="Currently" />
            <div
              className="relative overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-6 backdrop-blur-sm sm:p-8"
              style={{
                boxShadow:
                  "0 0 24px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-3 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
                  ACTIVE THREADS
                </span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-amber-200/75 sm:grid-cols-2">
                {CURRENTLY.map((row, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-base">
                      {row.emoji}
                    </span>
                    <span className="leading-relaxed">{row.line}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </div>
          </AnimateOnScroll>
        </Section>

        {/* Latest Writing */}
        {posts.length > 0 && (
          <Section>
            <AnimateOnScroll>
              <SectionHeader
                kicker="LIVE WIRE"
                title="Latest Writing"
                subtitle="Notes on building, shipping, and the AI-native workflow."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="font-mono text-xs uppercase tracking-[0.25em] text-amber-500/85 transition-colors hover:text-amber-300"
                >
                  All posts →
                </Link>
              </div>
            </AnimateOnScroll>
          </Section>
        )}

        {/* Quick Bio */}
        <Section>
          <AnimateOnScroll>
            <SectionHeader kicker="OPERATOR" title="About Me" />
            <div
              className="relative overflow-hidden border border-amber-500/25 bg-[#050505]/85 backdrop-blur-sm"
              style={{
                boxShadow:
                  "0 0 24px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
              }}
            >
              {/* Panel chrome */}
              <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
                  OPERATOR · 001
                </span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-10">
                {/* Framed portrait */}
                <div
                  className="relative h-32 w-32 shrink-0 overflow-hidden border border-amber-500/35 sm:h-40 sm:w-40"
                  style={{
                    boxShadow:
                      "0 0 18px rgba(245,158,11,0.08), inset 0 0 12px rgba(0,0,0,0.6)",
                  }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Mali Franzese"
                    fill
                    sizes="(max-width: 640px) 128px, 160px"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.18) 50%)",
                      backgroundSize: "100% 4px",
                      opacity: 0.4,
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-500/20" />
                </div>

                <div>
                  <p className="mb-6 max-w-2xl text-sm leading-relaxed text-amber-200/75 sm:text-base">
                    I&apos;m Mali Franzese - Founder-Engineer at{" "}
                    <a
                      href="https://themasslab.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 transition-colors hover:text-amber-300"
                    >
                      The MASS Lab
                    </a>
                    , based in Central Texas. I ship full-stack production
                    platforms at a pace most teams can&apos;t match, using
                    AI-native development workflows I&apos;ve been refining
                    for years.
                  </p>
                  <Link
                    href="/about"
                    className="font-mono text-xs uppercase tracking-[0.25em] text-amber-500/85 transition-colors hover:text-amber-300"
                  >
                    Read more →
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </div>
          </AnimateOnScroll>
        </Section>
      </div>
    </>
  );
}
