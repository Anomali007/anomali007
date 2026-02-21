import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/section";
import { TechBadge } from "@/components/tech-badge";
import { ProjectEmbed } from "@/components/project-embed";
import { projects } from "@/content/projects";

const statusLabel: Record<string, string> = {
  live: "Live",
  beta: "Private Beta",
  completed: "Completed",
  building: "In Development",
};

const statusColor: Record<string, string> = {
  live: "bg-emerald-500/20 text-emerald-400",
  beta: "bg-amber-500/20 text-amber-400",
  completed: "bg-blue-500/20 text-blue-400",
  building: "bg-purple-500/20 text-purple-400",
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
    <Section>
      <div className="animate-fade-in-up max-w-4xl">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-accent"
        >
          &larr; All Projects
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{project.emoji}</span>
              <h1 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                {project.title}
              </h1>
            </div>
            <span
              className={`mt-1 shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusColor[project.status]}`}
            >
              {statusLabel[project.status]}
            </span>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="mb-8 space-y-4 text-text-secondary leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Metrics callout */}
        {project.metrics && (
          <div className="mb-8 rounded-lg border border-accent/20 bg-accent/5 px-5 py-3">
            <p className="text-sm font-medium text-accent">
              {project.metrics}
            </p>
          </div>
        )}

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 font-display text-xl font-semibold text-text">
              Highlights
            </h2>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Embed section */}
        {project.embed && (
          <div className="mb-10">
            <ProjectEmbed
              title={project.title}
              src={project.embed.src}
              url={project.url}
            />
            {/* Mobile fallback */}
            {project.url && (
              <div className="sm:hidden">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
                >
                  Visit Live Site &rarr;
                </a>
              </div>
            )}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Visit Live Site &rarr;
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-border-light hover:bg-surface"
            >
              View Source &rarr;
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
