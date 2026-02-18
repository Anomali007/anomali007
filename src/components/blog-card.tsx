import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-light hover:bg-surface-2 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(45,212,191,0.08)]"
    >
      <div className="mb-3 flex items-center gap-3 text-xs text-text-secondary">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>&middot;</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mb-2 font-display text-lg font-semibold text-text group-hover:text-accent transition-colors">
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
    </Link>
  );
}
