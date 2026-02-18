import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { BlogCard } from "@/components/blog-card";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/mdx";

const featured = projects.filter((p) =>
  ["MASS Lead Connect", "Beat The Odds", "yachttransport.ai", "blah3"].includes(
    p.title
  )
);

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute right-0 top-1/2 h-[300px] w-[400px] rounded-full bg-accent/3 blur-[100px]" />
        </div>

        <div className="animate-fade-in-up py-8 sm:py-16">
          <Image
            src="/images/avatar.jpg"
            alt="Mali Franzese"
            width={96}
            height={96}
            className="mb-8 rounded-full border-2 border-border"
            priority
          />
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-text sm:text-5xl lg:text-6xl">
            I build things.
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Principal engineer shipping production SaaS platforms solo at AI
            speed.{" "}
            <span className="text-text">
              960+ commits across 22 repos in 7 months.
            </span>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              See my work
            </Link>
            <Link
              href="/blog"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-border-light hover:bg-surface"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </Section>

      {/* Featured Projects */}
      <Section>
        <div className="animate-fade-in-up">
          <h2 className="mb-2 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
            What I&apos;ve Built
          </h2>
          <p className="mb-8 text-text-secondary">
            A few highlights from the portfolio.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/projects"
              className="text-sm text-accent transition-colors hover:text-accent-hover"
            >
              View all projects &rarr;
            </Link>
          </div>
        </div>
      </Section>

      {/* Latest Blog Posts */}
      {posts.length > 0 && (
        <Section>
          <div className="animate-fade-in-up">
            <h2 className="mb-2 font-display text-2xl font-bold tracking-tight text-text sm:text-3xl">
              Latest Writing
            </h2>
            <p className="mb-8 text-text-secondary">
              Notes on building, shipping, and the AI-native workflow.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/blog"
                className="text-sm text-accent transition-colors hover:text-accent-hover"
              >
                All posts &rarr;
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* Quick Bio */}
      <Section>
        <div className="animate-fade-in-up rounded-xl border border-border bg-surface p-8 sm:p-12">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight text-text">
            About Me
          </h2>
          <p className="mb-6 max-w-2xl text-text-secondary leading-relaxed">
            I&apos;m Mali Franzese — principal engineer, fractional CTO, and
            founder of The MASS Lab in Austin, TX. I ship full-stack production
            platforms at a pace most teams can&apos;t match, using AI-native
            development workflows I&apos;ve been refining for years.
          </p>
          <Link
            href="/about"
            className="text-sm text-accent transition-colors hover:text-accent-hover"
          >
            Read more &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
