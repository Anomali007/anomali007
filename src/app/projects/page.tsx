import type { Metadata } from "next";
import { Section } from "@/components/section";
import { GalleryHero } from "@/components/heroes/gallery-hero";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "SaaS platforms, developer tools, and open source projects built by Mali Franzese - Founder-Engineer at The MASS Lab, shipping production software end-to-end.",
};

const categories = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS Platforms" },
  { key: "tools", label: "Developer Tools" },
  { key: "client", label: "Client Work" },
  { key: "game", label: "Games" },
  { key: "opensource", label: "Open Source" },
] as const;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category || "all";
  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      <GalleryHero />
      <Section>
      <div className="animate-fade-in-up">
        {/* Category filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(({ key, label }) => (
            <a
              key={key}
              href={key === "all" ? "/projects" : `/projects?category=${key}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === key
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-text-secondary hover:border-border-light hover:text-text"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </Section>
    </>
  );
}
