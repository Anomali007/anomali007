import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/content/projects";

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
