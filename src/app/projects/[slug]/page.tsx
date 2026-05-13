import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { HexagonGrid } from "@/components/atmosphere";
import { TechBadge } from "@/components/tech-badge";
import { ProjectEmbed } from "@/components/project-embed";
import { projects } from "@/content/projects";

const statusLabel: Record<string, string> = {
  live: "LIVE",
  beta: "PRIVATE BETA",
  completed: "COMPLETED",
  building: "BUILDING",
};

const statusColor: Record<string, string> = {
  live: "text-emerald-400",
  beta: "text-amber-400",
  completed: "text-amber-700",
  building: "text-amber-500",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const paragraphs = project.longDescription.split("\n\n");

  return (
    <div className="bridge-atmosphere relative">
      <HexagonGrid opacity={0.035} className="z-0" />

      <Section>
        <div className="animate-fade-in-up max-w-4xl">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500/85 transition-colors hover:text-amber-300"
          >
            ← All Projects
          </Link>

          {/* Specimen header - bridge-style panel */}
          <header
            className="relative mb-10 overflow-hidden border border-amber-500/25 bg-[#050505]/85 backdrop-blur-sm"
            style={{
              boxShadow:
                "0 0 24px rgba(245,158,11,0.04), inset 0 0 24px rgba(0,0,0,0.7)",
            }}
          >
            {/* Panel chrome */}
            <div className="flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-4 py-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-500/85">
                SPECIMEN · {project.slug}
              </span>
              <span className="flex gap-1">
                <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
              </span>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8">
              {/* Floating artifact */}
              <div className="relative flex h-32 w-32 shrink-0 items-center justify-center self-start">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, rgba(2,2,2,0) 65%)",
                  }}
                />
                <span className="vitrine-icon relative text-7xl">
                  {project.emoji}
                </span>
              </div>

              {/* Title + meta */}
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                  <span className={statusColor[project.status]}>
                    {statusLabel[project.status]}
                  </span>
                  <span className="text-amber-700">·</span>
                  <span className="text-amber-700">{project.category}</span>
                  {project.metrics && (
                    <>
                      <span className="text-amber-700">·</span>
                      <span className="text-amber-500/85">
                        {project.metrics}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="mb-3 font-display text-3xl font-bold leading-tight text-[#fff5eb] sm:text-4xl">
                  {project.title}
                </h1>
                <p className="mb-4 text-sm leading-relaxed text-amber-200/75 sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          </header>

          {/* Body */}
          <div className="mb-10 max-w-3xl space-y-4 text-sm leading-relaxed text-amber-200/75 sm:text-base">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Highlights */}
          {project.highlights.length > 0 && (
            <div className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="alien-dots" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-500/85">
                  HIGHLIGHTS
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-amber-500/40 via-amber-500/15 to-transparent" />
              </div>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-amber-200/75"
                  >
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Embed */}
          {project.embed && (
            <div className="mb-10">
              <ProjectEmbed
                title={project.title}
                src={project.embed.src}
                url={project.url}
              />
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber-500/45 bg-amber-500/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-300 transition-all hover:bg-amber-500/20 hover:text-amber-200"
              >
                Visit Live Site →
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-amber-500/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500/85 transition-all hover:border-amber-500/55 hover:text-amber-300"
              >
                View Source →
              </a>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
