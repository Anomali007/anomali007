import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { Section } from "@/components/section";
import { HexagonGrid } from "@/components/atmosphere";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { siteConfig } from "@/lib/constants";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: siteConfig.name }],
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
      tags: post.tags,
      images: [
        {
          url: siteConfig.ogImage,
          width: 460,
          height: 460,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
      images: [siteConfig.ogImage],
      creator: `@${siteConfig.handle}`,
    },
  };
}

function ArticleJsonLd({
  title,
  excerpt,
  date,
  slug,
}: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    datePublished: date,
    dateModified: date,
    url: `${siteConfig.url}/blog/${slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        excerpt={post.excerpt}
        date={post.date}
        slug={slug}
      />
      <div className="bridge-atmosphere relative">
        <HexagonGrid opacity={0.035} className="z-0" />

        <Section>
          <div className="animate-fade-in-up">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-amber-500/85 transition-colors hover:text-amber-300"
            >
              ← Back to all posts
            </Link>

            {/* Article frontmatter - bridge-style panel */}
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
                  ESSAY · {slug}
                </span>
                <span className="flex gap-1">
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 rounded-full bg-amber-500/20" />
                  <span className="h-1 w-1 animate-pulse rounded-full bg-amber-500/60" />
                </span>
              </div>

              <div className="p-6 sm:p-8">
                {/* Date + reading-time strip */}
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.22em] text-amber-600">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  <span>·</span>
                  <span className="text-amber-500/85">FIELD NOTE</span>
                </div>

                <h1 className="mb-4 font-display text-3xl font-bold leading-tight tracking-tight text-[#fff5eb] sm:text-4xl">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="mb-5 max-w-2xl text-sm leading-relaxed text-amber-200/75 sm:text-base">
                    {post.excerpt}
                  </p>
                )}

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-amber-500/25 bg-amber-500/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            </header>

            <article className="prose">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    rehypePlugins: [
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark-dimmed",
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </article>
          </div>
        </Section>
      </div>
    </>
  );
}
