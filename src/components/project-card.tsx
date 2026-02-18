import Link from "next/link";
import { TechBadge } from "./tech-badge";
import type { Project } from "@/content/projects";

const statusLabel: Record<Project["status"], string> = {
  live: "Live",
  beta: "Private Beta",
  completed: "Completed",
  building: "In Development",
};

const statusColor: Record<Project["status"], string> = {
  live: "bg-emerald-500/20 text-emerald-400",
  beta: "bg-amber-500/20 text-amber-400",
  completed: "bg-blue-500/20 text-blue-400",
  building: "bg-purple-500/20 text-purple-400",
};

function CardContent({ project }: { project: Project }) {
  return (
    <>
      <div className="mb-3 flex items-start justify-between">
        <span className="text-2xl">{project.emoji}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <h3 className="mb-2 font-display text-lg font-semibold text-text group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>

      {project.metrics && (
        <p className="mb-3 text-xs font-medium text-accent">
          {project.metrics}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 5).map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
        {project.techStack.length > 5 && (
          <span className="inline-block rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text-secondary">
            +{project.techStack.length - 5}
          </span>
        )}
      </div>
    </>
  );
}

const cardClass =
  "group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all hover:border-border-light hover:bg-surface-2";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.url || project.repoUrl;

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
      >
        <CardContent project={project} />
      </Link>
    );
  }

  return (
    <div className={cardClass}>
      <CardContent project={project} />
    </div>
  );
}
