# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm run dev      # Start dev server (Next.js 16 + Turbopack)
pnpm run build    # Production build — validates types, generates static pages
pnpm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

No test runner is configured. Use `pnpm run build` as the primary verification step — it runs TypeScript checking and static generation for all routes.

## Architecture

Next.js 16 App Router portfolio site. Pure static — no database, no API routes, no middleware. All content lives in source.

### Content Model

- **Projects** are defined as a typed array in `src/content/projects.ts`. Each entry has a `slug` used for `/projects/[slug]` detail pages. To add a project, add an entry to the array — `generateStaticParams` picks it up automatically.
- **Blog posts** are `.mdx` files in `src/content/posts/`. Frontmatter fields: `title`, `date`, `excerpt`, `tags`. Parsed by `src/lib/mdx.ts` using gray-matter + reading-time. Rendered server-side via `next-mdx-remote/rsc` with `rehype-pretty-code` (github-dark-dimmed theme).

### Routing

| Route | Source | Type |
|---|---|---|
| `/` | `app/page.tsx` | Static — hero, featured projects, blog preview, about |
| `/projects` | `app/projects/page.tsx` | Dynamic (searchParams for category filter) |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | SSG via `generateStaticParams` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | SSG via `generateStaticParams` |

### Design System

Dark theme defined via CSS custom properties in `globals.css` using Tailwind v4 `@theme` syntax:
- `--accent` / `--accent-hover`: teal (#2dd4bf / #14b8a6)
- `--bg` / `--surface` / `--surface-2`: layered dark backgrounds
- `--text` / `--text-secondary`: zinc scale
- `--border` / `--border-light`: zinc borders

Fonts: Space Grotesk (display/body via `font-display`), Geist Mono (code via `font-mono`). Path alias: `@/*` → `./src/*`.

### Component Patterns

- Server components by default. `"use client"` only for interactivity (`Nav`, `AnimateOnScroll`, `ProjectEmbed`).
- `<Section>` wraps all page sections (padding + max-w-5xl container).
- `<AnimateOnScroll>` provides IntersectionObserver-based fade-in.
- `<ProjectEmbed>` renders iframe previews in a browser-chrome frame with loading/error states; hidden on mobile.

### SEO

Every page has `generateMetadata`. Root layout includes Schema.org Person JSON-LD. `sitemap.ts` and `robots.ts` auto-generate. Site config (name, URLs, social links) lives in `src/lib/constants.ts`.
