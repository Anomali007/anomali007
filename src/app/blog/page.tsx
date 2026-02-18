import type { Metadata } from "next";
import { Section } from "@/components/section";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about AI-native development, project breakdowns, and lessons from shipping solo.",
};

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
      </div>
    </Section>
  );
}
