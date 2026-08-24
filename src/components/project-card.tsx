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
  live: "text-emerald-400",
  beta: "text-amber-400",
  completed: "text-amber-600",
  building: "text-amber-500",
};

function CardContent({ project }: { project: Project }) {
  return (
    <>
      {/* Panel-chrome top bar */}
      <div className="pointer-events-none -mx-6 -mt-6 mb-4 flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-3 py-1.5">
        <span className="font-mono text-[9px] tracking-[0.25em] text-amber-500/80 uppercase">
          {project.category}
        </span>
        <span className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
        </span>
      </div>

      <div className="mb-3 flex items-start justify-between">
        <span className="vitrine-icon text-4xl">{project.emoji}</span>
        <span
          className={`font-mono text-[10px] tracking-[0.25em] uppercase ${statusColor[project.status]}`}
        >
          {statusLabel[project.status]}
        </span>
      </div>

      <h3 className="mb-2 font-display text-lg font-semibold text-amber-100/95 transition-colors group-hover:text-amber-300">
        {project.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-amber-200/65">
        {project.description}
      </p>

      {project.metrics && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-500/85">
          {project.metrics}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 5).map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
        {project.techStack.length > 5 && (
          <span className="inline-block border border-amber-500/25 bg-amber-500/5 px-2.5 py-0.5 font-mono text-[10px] text-amber-600">
            +{project.techStack.length - 5}
          </span>
        )}
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </>
  );
}

const cardClass =
  "group relative flex flex-col overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/55 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)]";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className={cardClass}>
      <CardContent project={project} />
    </Link>
  );
}
