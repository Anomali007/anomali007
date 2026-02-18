# ANOMALI007.COM — Personal Site Build Spec

## Context for Claude Code

You are transforming the `anomali007/anomali007` GitHub repo from an abandoned SST monorepo template into a personal portfolio + blog site for Mali Franzese (aka "Anomali"). This repo doubles as Mali's GitHub profile README (the `README.md` in root renders on github.com/Anomali007), so we keep the existing README.md intact and build the site alongside it.

**Owner:** Mali Franzese — Principal Engineer, Fractional CTO, Founder of The MASS Lab (Austin, TX)
**Domain:** anomali007.com (will be connected via Vercel)
**Hosting:** Vercel (free hobby tier)
**Brand identity:** "The builder who ships real products at AI speed with engineering discipline"

---

## 1. Project Setup

### Stack
- **Next.js 15** (App Router, TypeScript, `src/` directory)
- **Tailwind CSS v4** with a custom dark theme
- **MDX** for blog posts (use `next-mdx-remote` or `@next/mdx` — whichever is more stable with Next 15)
- **Geist Mono** as a secondary/code font (available via `next/font`)
- **One distinctive display font** from Google Fonts for headings — something with character, not Inter/Roboto/Arial. Suggestions: JetBrains Mono, Space Mono, or something edgier. Choose one that feels technical but not generic.
- **A clean sans-serif body font** — Satoshi, General Sans, or similar. Not Inter.

### Initialize
1. Delete all existing SST monorepo files (everything except `README.md` and `.git/`)
2. Initialize a fresh Next.js 15 project in the repo root with TypeScript, Tailwind, App Router, `src/` directory
3. Keep the existing `README.md` in the repo root — it's the GitHub profile README and must not be modified
4. Set up path aliases (`@/` → `src/`)
5. Configure MDX support for the `/blog` route

### Project Structure
```
anomali007/
├── README.md                    # GitHub profile README (DO NOT MODIFY)
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.ico              # Three-eyed alien icon (placeholder for now)
│   ├── images/
│   │   └── projects/            # Project screenshots (placeholder images for now)
│   └── og-image.png             # OpenGraph default image
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with dark theme, fonts, nav, footer
│   │   ├── page.tsx             # Homepage
│   │   ├── projects/
│   │   │   └── page.tsx         # Projects showcase
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Individual blog post
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   └── uses/
│   │       └── page.tsx         # Tools & stack page
│   ├── components/
│   │   ├── nav.tsx              # Top navigation
│   │   ├── footer.tsx           # Footer with subtle alien icon
│   │   ├── project-card.tsx     # Reusable project card
│   │   ├── blog-card.tsx        # Blog post preview card
│   │   ├── tech-badge.tsx       # Small tech stack pill/badge
│   │   └── section.tsx          # Reusable page section wrapper
│   ├── content/
│   │   ├── projects.ts          # Project data (typed array of objects)
│   │   └── posts/               # MDX blog posts go here
│   │       └── hello-world.mdx  # First placeholder post
│   ├── lib/
│   │   ├── mdx.ts               # MDX utilities (get posts, parse frontmatter)
│   │   └── constants.ts         # Site metadata, social links, etc.
│   └── styles/
│       └── globals.css          # Tailwind base + custom CSS variables
```

---

## 2. Design Direction

### Theme: Dark, Technical, Professional
- **Background:** Near-black (`#0a0a0b` or similar), not pure black
- **Surface/cards:** Subtle elevation with very dark grays (`#141417`, `#1a1a1f`)
- **Text:** Off-white primary (`#e4e4e7`), muted secondary (`#71717a`)
- **Accent color:** Choose ONE bold accent — electric teal, bright green, or a signature color. Use it sparingly: links, hover states, active indicators, the occasional highlight. Not everywhere.
- **Borders:** Very subtle, `#27272a` or similar. Use for card edges and section dividers.

### Design Principles
- **NOT a template.** This should feel intentionally designed, not "Next.js starter with dark mode."
- **Generous whitespace.** Let the content breathe. Large padding between sections.
- **Subtle motion.** Fade-in on scroll for sections/cards. Smooth hover states on project cards and nav links. Nothing flashy — just polished.
- **The alien is a whisper, not a shout.** Use it as: the favicon, a small icon in the footer, maybe a subtle watermark or easter egg. It should feel like a signature, not a mascot.
- **Typography hierarchy matters.** Big, confident headings. Comfortable reading size for body text. Monospace for code/technical details.

### Navigation
- Fixed/sticky top nav, minimal
- Logo/name on the left: "anomali" in the display font, or "mali franzese" — keep it clean
- Nav links on the right: Home, Projects, Blog, About, Uses
- Mobile: hamburger menu or slide-out
- Current page indicator using accent color

### Footer
- Simple: name, social links (GitHub, LinkedIn, X/Twitter if applicable), small alien icon
- "Built with Next.js, Tailwind, and too much coffee" or similar — keep personality

---

## 3. Page Specifications

### Homepage (`/`)

**Hero Section**
- Large heading: "I build things." or "Builder. Engineer. Anomali." — something short and confident
- Subtext (1-2 sentences): "Principal engineer shipping production SaaS platforms solo at AI speed. 960+ commits across 22 repos in 7 months."
- Two CTA buttons: "See my work" → /projects, "Read the blog" → /blog
- Subtle background element — could be a gradient mesh, noise texture, or faint grid pattern. Not a stock hero image.

**Featured Projects Section**
- Heading: "What I've Built"
- 3-4 project cards in a grid (pull from the top entries in projects data)
- Each card: project name, one-line description, tech badges, link
- "View all projects →" link to /projects

**Latest Blog Posts Section**
- Heading: "Latest Writing"
- 2-3 blog post preview cards
- Each card: title, date, short excerpt, read time
- "All posts →" link to /blog

**Quick Bio/CTA Section**
- Brief personal intro (2-3 sentences about who you are and what you do)
- Link to /about for the full story

### Projects Page (`/projects`)

**Layout:**
- Page title: "Projects"
- Optional filter tabs or tags: "SaaS Platforms", "Developer Tools", "Client Work", "Open Source"
- Grid of project cards, each with:
  - Project name + emoji
  - Description (2-3 sentences)
  - Tech stack as small badges
  - Outcome/metric if applicable (e.g., "reduced call handling ~50%")
  - Link to live site or repo (if public)
  - Status indicator: "Live", "Private Beta", "In Development", "Completed"

**Project Data** (populate `src/content/projects.ts` with these):

```typescript
type Project = {
  title: string;
  emoji: string;
  description: string;
  techStack: string[];
  status: "live" | "beta" | "completed" | "building";
  category: "saas" | "tools" | "client" | "opensource";
  url?: string;
  repoUrl?: string;
  metrics?: string;
};
```

**Projects to include:**

1. **MASS Lead Connect** (🎙️) — saas, building
   - "Multi-tenant AI voice receptionist SaaS. Three Next.js apps, SST v3 on AWS, DynamoDB, Cognito, Telnyx voice, Stripe billing, WebRTC browser calling, and an autonomous agent runtime with human-in-the-loop approvals."
   - Tech: Next.js, TypeScript, SST v3, AWS, DynamoDB, Cognito, Telnyx, Stripe, WebRTC
   - Metrics: "523 commits"

2. **Beat The Odds** (🎰) — saas, building
   - "Real-time fantasy sports platform with web + kiosk experiences, merchandise rewards, responsible gambling handlers, Stripe payments, and admin dashboards."
   - Tech: Next.js, TypeScript, SST v3, AWS, Stripe, PostgreSQL
   - Metrics: "100+ commits"
   - URL: https://github.com/Beat-The-Odds-LLC

3. **yachttransport.ai** (⛵) — saas, completed
   - "End-to-end quoting and booking platform for global yacht shipping. Role-based dashboards, booking workflows, and Postgres-backed pricing logic. Started with a voice AI MVP demo that landed the full contract."
   - Tech: Next.js, TypeScript, PostgreSQL, tRPC, Vapi, AWS

4. **Milestorm.io** (🏔️) — saas, completed
   - "Supply-chain niche project management app. Multi-tenant auth, milestone tracking, and reporting views. Launched into private beta."
   - Tech: Next.js, TypeScript, PostgreSQL, Drizzle ORM

5. **Home Team Education** (🎓) — saas, live
   - "501(c)(3) nonprofit building an AI-powered animated money mentor that teaches teens financial literacy. Interactive quizzes, AI coach, and donation flows."
   - Tech: Next.js, TypeScript, AI/LLM integration
   - URL: https://hometeameducation.org

6. **Mecca Gateway** (🕌) — saas, building
   - "Full-stack platform with SST v3, Cognito branded auth, 22 React Email templates, RBAC with tiered SUPER_ADMIN access, investor dashboard."
   - Tech: Next.js, TypeScript, SST v3, AWS, Cognito, React Email, SES
   - Metrics: "74 commits"

7. **blah3** (🗣️) — opensource, completed
   - "Native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. Built in Rust with zero prior experience — AI gave me the confidence to ship a systems-language product in days."
   - Tech: Rust, Tauri, CoreML, Whisper, macOS
   - Repo: https://github.com/Anomali007/blah3

8. **MergeReel** (🔀) — tools, building
   - "GitHub app that generates video summaries of Pull Requests using Remotion. Stripe billing, org-level repo fetching, subscription management."
   - Tech: TypeScript, Remotion, GitHub API, Stripe

9. **tml-cli** (🔧) — tools, completed
   - "Custom org CLI with security hardening, multi-user profile access control, and provisioning commands."
   - Tech: TypeScript, Node.js

10. **git-tracker** (📊) — opensource, live
    - "GitHub Activity Dashboard — tracks commits, PRs, issues, and language stats across repos."
    - Tech: TypeScript, GitHub API
    - Repo: https://github.com/Anomali007/git-tracker

11. **THE Wallet** (🔐) — tools, building
    - "Modular data sovereignty platform with Tauri desktop app, plugin architecture, encryption, and RBAC."
    - Tech: Tauri, Rust, TypeScript

12. **AI Voice Receptionist** (🦷) — client, completed
    - "Vapi + LLM orchestration for a service business. Handles inbound calls, qualifies leads, routes appointments."
    - Tech: Vapi, LLM orchestration, webhooks
    - Metrics: "Reduced live call handling ~50%, increased bookings ~30%"

### Blog Page (`/blog`)

**Layout:**
- Page title: "Blog"
- List or grid of blog post cards, sorted by date (newest first)
- Each card: title, date, estimated read time, short excerpt, tags
- Clicking goes to `/blog/[slug]`

**Blog Post Page (`/blog/[slug]`):**
- Full MDX rendering with:
  - Proper code syntax highlighting (use `rehype-pretty-code` or `shiki`)
  - Headings with anchor links
  - Images
  - Callout/note components
- Post metadata at top: title, date, read time, tags
- "Back to all posts" link
- Optional: prev/next post navigation

**MDX Frontmatter Format:**
```yaml
---
title: "Hello World"
date: "2026-02-17"
excerpt: "First post on the new site."
tags: ["meta", "launch"]
---
```

**Placeholder first post** (`hello-world.mdx`):
Write a short intro post (150-200 words) announcing the site. Tone: casual, confident, builder energy. Mention that you'll be writing about AI-native development workflows, project breakdowns, and lessons from shipping solo. Don't be cheesy.

### About Page (`/about`)

**Content sections:**
1. **Intro** — Who you are in 2-3 sentences. Principal engineer, fractional CTO, founder of The MASS Lab. Based in Austin.

2. **The Story** — Your path: started in electrical engineering at ASU, pivoted to software through Hack Reactor in LA, built your own practice (The MASS Lab), worked at Inter-Con building Python APIs on AWS, became lead engineer at Beat The Odds, and evolved into an AI-native builder shipping entire platforms solo. Currently pursuing B.S. Cybersecurity at WGU.

3. **How I Work** — Your AI-native workflow: Claude Code with 11 custom slash commands, 6 specialized agents, 4 safety hooks. The `/ship` pipeline. You give AI deep autonomy but every line gets senior review. Tests, types, security passes are non-negotiable.

4. **What I'm Looking For** — Open to full-time senior/principal engineering roles, applied AI positions, and fractional CTO engagements. Interested in teams where AI-assisted development is a core competency.

5. **Outside Work** — Brief personal touch. Keep it to 1-2 sentences. Whatever feels right — hobbies, interests, Austin life.

### Uses Page (`/uses`)

Developers love `/uses` pages. This showcases your AI-native workflow and doubles as a trust signal for hiring managers.

**Sections:**

1. **Editor & AI Tools**
   - Claude Code (primary — 6+ months, high weekly volume)
   - Cursor
   - VS Code
   - GitHub Copilot (used since early 2023)

2. **AI Development Platform** (your custom Claude Code setup)
   - 11 slash commands (`/ship`, `/security-review`, `/performance-review`, `/next-issue`, etc.)
   - 6 specialized agents
   - 4 safety hooks (pre_bash_guard, post_write_secret_scan, auto-format, stop_summary)
   - Repo playbooks for standardization across projects

3. **Stack**
   - Frontend: React, Next.js, TypeScript, Tailwind, shadcn/ui
   - Backend: Node.js, tRPC, Python, FastAPI, Serverless
   - Cloud: AWS (Lambda, API Gateway, RDS, S3, Cognito, SES), SST v3, Vercel
   - Data: PostgreSQL, DynamoDB, Prisma, Drizzle ORM
   - Auth: Cognito, OAuth2/OIDC, RBAC patterns

4. **Infrastructure & DevOps**
   - SST v3 (Pulumi-based IaC)
   - GitHub Actions CI/CD
   - Multi-account AWS (dev/qa/prod)
   - OIDC keyless auth in CI
   - Docker

5. **Hardware / Setup** — Optional, add if you want. Desk setup, machine specs, etc.

---

## 4. Site Metadata & SEO

```typescript
// src/lib/constants.ts
export const siteConfig = {
  name: "Mali Franzese",
  handle: "Anomali007",
  title: "Mali Franzese — Builder, Engineer, Anomali",
  description: "Principal engineer shipping production SaaS platforms solo at AI speed. React, Next.js, TypeScript, AWS, AI-native workflows.",
  url: "https://anomali007.com",
  github: "https://github.com/Anomali007",
  linkedin: "https://www.linkedin.com/in/mali-franzese",
  email: "mali@themasslab.com",
  ogImage: "/og-image.png",
};
```

- Set up proper `<head>` metadata in the root layout
- OpenGraph and Twitter card meta tags on every page
- Unique titles per page: "Projects — Mali Franzese", "Blog — Mali Franzese", etc.
- Add a `sitemap.ts` and `robots.ts` in the app directory

---

## 5. Deployment

1. Push to `anomali007/anomali007` on GitHub
2. Connect to Vercel
3. Add `anomali007.com` as custom domain in Vercel
4. Vercel auto-deploys on push to main

---

## 6. Implementation Notes

- **Do NOT modify the root `README.md`** — it's the GitHub profile README
- Use placeholder images for projects for now (solid color cards or gradient placeholders with the project emoji)
- All project data lives in `src/content/projects.ts` as a typed array — easy to update later
- Blog posts are `.mdx` files in `src/content/posts/` — no CMS, just files in the repo
- Keep the site fast: no heavy client-side JS, prefer server components, lazy load images
- Add a `.gitignore` appropriate for Next.js
- Make sure the site scores well on Lighthouse (dark themes sometimes have contrast issues — check accessibility)

---

## 7. First Post Ideas (for after launch)

These are just notes for future content, not to build now:

1. "How I Ship: My AI-Native Development Pipeline" — breakdown of the /ship command, safety hooks, agent architecture
2. "Zero to Rust: How I Built a macOS Desktop App in Days" — the blah3 story
3. "960 Commits in 7 Months: What Solo AI-Assisted Development Actually Looks Like" — honest retrospective
4. "How a Voice AI Demo Turned Into a Full SaaS Contract" — the yachttransport.ai origin story
5. "Building in Public: MASS Lead Connect Architecture" — technical deep-dive

---

## Summary

Transform `anomali007/anomali007` from an SST template into a professional personal site. Dark theme, technical but not cold, confident builder energy. The alien identity is a subtle signature, not the centerpiece. Ship it clean, ship it fast — this site should be proof of concept for everything it claims about how Mali works.
