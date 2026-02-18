import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about AI-native development, project breakdowns, and lessons from shipping solo.",
};

const comingSoonPosts = [
  {
    title: "How I Ship: My AI-Native Development Pipeline",
    excerpt:
      "A breakdown of the Claude Code workflow, custom slash commands, and safety hooks that let one engineer ship like a team.",
    tags: ["workflow", "ai", "tooling"],
  },
  {
    title: "Zero to Rust: Building a macOS App with No Experience",
    excerpt:
      "What happens when you point Claude Code at a language you've never written and ship a native app anyway.",
    tags: ["rust", "native", "experiment"],
  },
  {
    title: "960 Commits in 7 Months: Solo AI-Assisted Development",
    excerpt:
      "The numbers, the patterns, and the lessons from seven months of building full-stack SaaS platforms with AI pair programming.",
    tags: ["retrospective", "ai", "velocity"],
  },
];

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section>
      <div className="animate-fade-in-up">
        <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Blog
        </h1>
        <p className="mb-8 text-text-secondary">
          Notes on building, shipping, and the AI-native workflow.
        </p>

        {posts.length === 0 ? (
          <p className="text-text-secondary">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Coming Soon */}
        <div className={posts.length > 0 ? "mt-8" : ""}>
          <h2 className="mb-4 font-display text-lg font-semibold text-text-secondary">
            Coming Soon
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonPosts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col rounded-xl border border-border bg-surface p-6 opacity-50"
              >
                <div className="mb-3">
                  <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                    Coming Soon
                  </span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-text">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
