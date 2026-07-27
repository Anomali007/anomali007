import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/content/projects";

// Without this the sitemap is fully static and every `new Date()` below freezes
// at the build timestamp, which is how `lastmod` ended up stuck at 2026-05-13.
// Revalidating daily keeps `lastmod` moving without a rebuild.
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectPages = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const routes = ["", "/projects", "/blog", "/about", "/uses"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date(),
    }),
  );

  return [...routes, ...projectPages, ...posts];
}
