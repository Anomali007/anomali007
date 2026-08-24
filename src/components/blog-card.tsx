import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

export function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden border border-amber-500/25 bg-[#050505]/85 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/55 hover:shadow-[0_0_24px_rgba(245,158,11,0.08)]"
    >
      {/* Panel-chrome top bar */}
      <div className="pointer-events-none -mx-6 -mt-6 mb-4 flex items-center justify-between border-b border-amber-500/15 bg-amber-500/5 px-3 py-1.5">
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-amber-500/80">
          ESSAY
        </span>
        <span className="flex gap-1">
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 rounded-full bg-amber-500/20" />
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
        </span>
      </div>

      <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-amber-100/95 transition-colors group-hover:text-amber-300">
        {post.title}
      </h3>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-amber-200/65">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="border border-amber-500/25 bg-amber-500/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
    </Link>
  );
}
