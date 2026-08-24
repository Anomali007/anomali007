export type Project = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  status: "live" | "beta" | "completed" | "building";
  category: "saas" | "tools" | "client" | "opensource" | "game";
  url?: string;
  repoUrl?: string;
  metrics?: string;
  /**
   * Dated, specific things that actually happened. Most of the work behind this
   * portfolio lives in private repositories, so a reader cannot click through to
   * a commit. A dated line naming the change, the PR and how it was verified is
   * the next best thing: it is concrete enough to ask about in an interview and
   * specific enough to be wrong if it were invented.
   */
  evidence?: { date: string; fact: string }[];
  /**
   * The honest ceiling on the claim. Several of these products have shipped to
   * production and have no users and no revenue. Saying so here is deliberate -
   * an unstated zero reads as a hidden one.
   */
  limits?: string;
  embed?: {
    type: "iframe" | "image";
    src: string;
  };
};

export const projects: Project[] = [
  {
    slug: "mass-lead-connect",
    title: "MASS Lead Connect",
    emoji: "\u{1F399}\uFE0F",
    description:
      "Multi-tenant AI voice receptionist SaaS. Three Next.js apps, SST v3 on AWS, DynamoDB, Cognito, Telnyx voice, Stripe billing, WebRTC browser calling, and an autonomous agent runtime with human-in-the-loop approvals.",
    longDescription:
      "MASS Lead Connect is the flagship product of The MASS Lab - a multi-tenant AI voice receptionist platform that handles inbound calls, qualifies leads, and routes appointments for service businesses.\n\nThe platform consists of three Next.js applications: a marketing site, a customer dashboard for business owners to manage their AI receptionist, and a staff portal for internal operations. The backend runs on SST v3 with DynamoDB, Cognito authentication, Telnyx voice integration, Stripe billing, and WebRTC for browser-based calling. The interview layer runs on Bedrock, Polly and Amazon Transcribe streaming, with PCM captured in an AudioWorklet and framed over a WebSocket inside API Gateway's 32 KB frame ceiling.\n\nOn top of the platform sits the Operations Map, a fixed-scope engagement. Staff interviews go in; what comes back is a process map of how the business actually runs, a double-entry time total, an assumption-versus-reality table, a bus-factor read, and a ranked action list that puts the free fixes first and software last. An assembly engine does the structural half - transcript extraction, merging several people's accounts into one business, gap detection, and a Mermaid emitter - and a human writes the causal finding, because the engine cannot assert causality and says so on every render.\n\nThe most technically interesting piece is the autonomous agent runtime - an AI system that can take actions on behalf of the business (scheduling, follow-ups, qualification) with human-in-the-loop approval gates to prevent unwanted automation.",
    techStack: [
      "Next.js",
      "TypeScript",
      "SST v3",
      "AWS",
      "DynamoDB",
      "Cognito",
      "Telnyx",
      "Stripe",
      "WebRTC",
    ],
    status: "building",
    category: "saas",
    // massleadconnect.com 301s here; link the canonical host directly.
    url: "https://masslabconnect.com",
    metrics: "1,100+ commits",
    highlights: [
      "Multi-tenant SaaS with three separate Next.js applications",
      "Autonomous agent runtime with human-in-the-loop approvals",
      "WebRTC browser calling integration",
      "Stripe billing with subscription management",
      "SST v3 infrastructure on AWS with DynamoDB and Cognito",
      "Operations Map assembly engine: extract, merge, gap-detect, emit",
      "1,100+ commits and counting",
    ],
    evidence: [
      {
        date: "2026-08-14",
        fact: "Ran the Operations Map end to end for the first time. The full chain - transcript extraction, dossier merge, gap detection, assembly, Mermaid process map and a PHI leak check - executed start to finish and turned a delivery previously estimated at roughly three days of hand-assembly into a single afternoon of human work.",
      },
      {
        date: "2026-08-14",
        fact: "The assembly CLI reports, per field, how much of the client's own material actually crossed into the deliverable. A run that carries none of their numbers says so, out loud, instead of rendering a confident-looking empty report.",
      },
      {
        date: "2026-08-17",
        fact: "Adding a PDF to the deliverable silently blinded the privacy check - the grep probes passed over a format they could not read. Rebuilt to extract PDF text and to exit non-zero rather than print PASS over a file it cannot parse. 140 checks: 112 negative probes and 28 positive controls, so the instrument is proven able to both pass and fail.",
      },
    ],
    limits: "The Operations Map is listed on the MASS Lab Connect site. It has been sold zero times and delivered zero times. The dry run above was run against a fictional practice, not a real client, and the dollar figures it produced are not a customer outcome.",
  },
  {
    slug: "beat-the-odds",
    title: "Beat The Odds",
    emoji: "\u{1F3B0}",
    description:
      "Real-time fantasy sports platform with web + kiosk experiences, merchandise rewards, responsible gambling handlers, Stripe payments, and admin dashboards.",
    longDescription:
      "Beat The Odds is a real-money fantasy sports platform with a consumer app and B2B kiosk distribution into bars, restaurants and lounges. Venues earn a revenue share and carry no hardware or setup cost. The system includes a bettor-facing app, an admin dashboard, a merchandise rewards system, responsible-gaming controls, and a scout app that manages the venue pipeline from first contact through letter of intent.\n\nAs of March 2026 it is roughly 352,000 lines of TypeScript: 329 Lambda handlers, 87 DynamoDB tables, 11 client applications and 8 shared packages across 7 AWS accounts. React Native and Expo on mobile, Next.js on web, SST v3 on AWS underneath, with AppSync, Aurora, ElastiCache, EventBridge and Cognito, and 12 CloudWatch alarms plus 3 canaries watching it.\n\nI am Co-Founder & CTO and have owned architecture and delivery since 2022 - everything from infrastructure to deployment, and effectively all of the code.",
    techStack: [
      "Next.js",
      "TypeScript",
      "SST v3",
      "AWS",
      "Stripe",
      "PostgreSQL",
    ],
    status: "building",
    category: "saas",
    url: "https://btofantasy.us",
    metrics: "1,400+ commits",
    highlights: [
      "Real-time fantasy sports with web + kiosk interfaces",
      "Merchandise rewards system",
      "Responsible gambling handlers and compliance",
      "Stripe payments with deposit/withdraw flows",
      "Fail-closed auth with audit logging",
      "Co-Founder & CTO - architecture and delivery since 2022, 1,400+ commits",
    ],
    evidence: [
      {
        date: "2026-06-18",
        fact: "Technical launch to production: bettor app, signup credit, working referral flow, World Cup soccer markets, and a national venue catalog covering roughly 48,800 eligible venues across 16 cleared states. PRs #384-391. Marketed public launch followed on 2026-06-19 at app.btofantasy.us.",
      },
      {
        date: "2026-06-12",
        fact: "Unified the market-id format across the betting stack into one pure module that owns encode, parse and split. It closed a settlement blocker - placed bets were not settling at all before it. 52 tests, PR #364.",
      },
      {
        date: "2026-06-12",
        fact: "The odds vendor has no per-game player box-score endpoint, verified against its own 20-endpoint catalog. Rather than guess a grade, player props settle to void and the stake is returned. A refund is recoverable; a mispay is not.",
      },
      {
        date: "2026-08-09",
        fact: "The venue application form had returned HTTP 500 on every submission since launch. Two defects on the happy path - a raw phone value where Cognito requires E.164, emitted in that exact shape by the page's own formatter, and a Cognito group that existed in no stage. The tests were green because the mock ignored its arguments. Fixed, deployed and verified end to end in a real browser. PR #569.",
      },
    ],
    limits: "Production is live and anyone can sign up. Past that, the honest floor: no revenue, no cash deposits, no real-money bets placed, no signed venue agreements, under 100 users, and paper balances only. The odds feed is paused until January 2027.",
  },
  {
    slug: "yachttransport-ai",
    title: "yachttransport.ai",
    emoji: "\u26F5",
    description:
      "End-to-end quoting and booking platform for global yacht shipping. Role-based dashboards, booking workflows, and Postgres-backed pricing logic. Started with a voice AI MVP demo that landed the full contract.",
    longDescription:
      "I built yachttransport.ai as the lead architect and primary developer for Allied Yacht Transport - a global yacht shipping company that needed a modern quoting and booking platform.\n\nThe project started with a voice AI MVP demo using Vapi for conversational booking, which I used to demonstrate my capabilities and land the full contract. From there, I designed and built the complete platform: role-based dashboards for operations and admin teams, quote sharing workflows, booking management, and Postgres-backed pricing logic aligned to their real-world operations.\n\nShipped with CI checks, PR discipline, and documented flows for team continuity after my engagement.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Vapi", "AWS"],
    status: "completed",
    category: "client",
    url: "https://yachttransport.ai",
    highlights: [
      "Won the contract by building a voice AI booking demo first",
      "Role-based dashboards (operations and admin)",
      "Quote sharing and booking workflow management",
      "Postgres-backed pricing logic aligned to business operations",
      "Documented for team continuity post-engagement",
    ],
  },
  {
    slug: "milestorm",
    title: "Milestorm.io",
    emoji: "\u{1F3D4}\uFE0F",
    description:
      "Supply-chain niche project management app. Multi-tenant auth, milestone tracking, and reporting views. Launched into private beta.",
    longDescription:
      "Milestorm.io is a supply-chain niche project management application I designed and launched into private beta. Built for operational teams that manage milestones, vendor workstreams, timelines, and status updates.\n\nThe platform features multi-tenant authentication, project and milestone tracking, reporting views, and an extensible foundation designed for future analytics. Built as a reusable platform pattern that could be adapted for other verticals.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    status: "completed",
    category: "client",
    url: "https://milestorm.io",
    highlights: [
      "Multi-tenant authentication",
      "Project and milestone tracking",
      "Reporting views for operational teams",
      "Extensible foundation for future analytics",
    ],
  },
  {
    slug: "home-team-education",
    title: "Home Team Education",
    emoji: "\u{1F393}",
    description:
      "501(c)(3) nonprofit building an AI-powered animated money mentor that teaches teens financial literacy. Interactive quizzes, AI coach, and donation flows.",
    longDescription:
      "Home Team Education is a registered 501(c)(3) nonprofit I've been building toward for years, now in its most complete form. The platform features HomeTeam Coach - an AI-powered animated money mentor that teaches teens ages 14-22 how to budget, save, and build real financial confidence.\n\nThe site includes interactive financial literacy quizzes, an AI coach interface, educational programs, donation flows, and resources for parents and schools. Built with a responsible AI and data privacy focus given the young audience.",
    techStack: ["Next.js", "TypeScript", "AI/LLM integration"],
    status: "live",
    category: "saas",
    url: "https://hometeameducation.org",
    highlights: [
      "501(c)(3) nonprofit - mission-driven product",
      "AI-powered animated financial literacy coach",
      "Interactive quizzes and personalized learning paths",
      "Resources for teens, parents, and schools",
      "Multiple iterations over several years",
    ],
    embed: { type: "iframe", src: "https://hometeameducation.org" },
  },
  {
    slug: "mecca-gateway",
    title: "Mecca Gateway",
    emoji: "\u{1F6AA}",
    description:
      "Full-stack platform with SST v3, Cognito branded auth, 22 React Email templates, RBAC with tiered SUPER_ADMIN access, investor dashboard.",
    longDescription:
      "Mecca Gateway is a full-stack platform built on SST v3 with a comprehensive feature set: Cognito-branded authentication, SES email service with 22 React Email templates, RBAC with tiered SUPER_ADMIN access, CSRF/session hardening, privacy-preserving analytics, and an investor dashboard.\n\nThe platform demonstrates production-grade auth patterns, email infrastructure at scale, and granular permissions systems.",
    techStack: [
      "Next.js",
      "TypeScript",
      "SST v3",
      "AWS",
      "Cognito",
      "React Email",
      "SES",
    ],
    status: "building",
    category: "saas",
    url: "https://meccagateway.com",
    metrics: "75+ commits",
    highlights: [
      "Cognito-branded auth with RBAC and tiered SUPER_ADMIN",
      "22 React Email templates via SES",
      "CSRF/session hardening",
      "Privacy-preserving analytics",
      "Investor dashboard",
    ],
  },
  {
    slug: "blah3",
    title: "blah3",
    emoji: "\u{1F5E3}\uFE0F",
    description:
      "Native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. Built in Rust with zero prior experience - AI gave me the confidence to ship a systems-language product in days.",
    longDescription:
      "blah3 is a native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. I built this in Rust with zero prior Rust experience - AI gave me the confidence to jump into a systems language and ship a packaged desktop product in days.\n\nThe app features CoreML-accelerated Whisper models for transcription, kokoro-tiny TTS for speech synthesis, a floating dictation overlay with hotkey support, silence detection, an onboarding wizard, and DMG packaging for distribution. Everything runs locally - no cloud, no API calls, complete privacy.",
    techStack: ["Rust", "Tauri", "CoreML", "Whisper", "macOS"],
    status: "completed",
    category: "opensource",
    url: "https://blah3-website.vercel.app/",
    repoUrl: "https://github.com/Anomali007/blah3",
    highlights: [
      "Built in Rust with zero prior experience",
      "CoreML-accelerated Whisper models for STT",
      "kokoro-tiny TTS for speech synthesis",
      "Floating dictation overlay with hotkeys",
      "100% offline - complete data privacy",
      "DMG packaging for macOS distribution",
    ],
    embed: { type: "iframe", src: "https://blah3-website.vercel.app/" },
  },
  {
    slug: "mergereel",
    title: "MergeReel",
    emoji: "\u{1F500}",
    description:
      "GitHub app that generates video summaries of Pull Requests using Remotion. Stripe billing, org-level repo fetching, subscription management.",
    longDescription:
      "MergeReel is a GitHub app that automatically generates video summaries of Pull Requests using Remotion (React-based video framework). When a PR is created, MergeReel renders a video walkthrough and posts it as a PR comment.\n\nThe platform includes Stripe billing integration, org-level repository and run fetching, and subscription management.",
    techStack: ["TypeScript", "Remotion", "GitHub API", "Stripe"],
    status: "building",
    category: "tools",
    highlights: [
      "Automated PR video summaries via Remotion",
      "GitHub app integration",
      "Stripe billing and subscription management",
      "Org-level repository management",
    ],
  },
  {
    slug: "tml-cli",
    title: "tml-cli",
    emoji: "\u{1F527}",
    description:
      "Custom org CLI with security hardening, multi-user profile access control, and provisioning commands.",
    longDescription:
      "tml-cli is a custom CLI tool built for The MASS Lab org. It provides security-hardened provisioning commands, multi-user profile access control, and single-account setup workflows.\n\nBuilt to standardize how infrastructure and developer environments get provisioned across projects.",
    techStack: ["TypeScript", "Node.js"],
    status: "completed",
    category: "tools",
    highlights: [
      "Security-hardened CLI commands",
      "Multi-user profile access control",
      "Provisioning and environment setup",
      "Standardized across all MASS Lab projects",
    ],
  },
  {
    slug: "git-tracker",
    title: "git-tracker",
    emoji: "\u{1F4CA}",
    description:
      "GitHub Activity Dashboard - tracks commits, PRs, issues, and language stats across repos.",
    longDescription:
      "A GitHub Activity Dashboard that tracks commits, PRs, issues, and language stats across repositories. Built as an open-source tool with a live demo deployed.",
    techStack: ["TypeScript", "GitHub API"],
    status: "live",
    category: "opensource",
    repoUrl: "https://github.com/Anomali007/git-tracker",
    highlights: [
      "Tracks commits, PRs, issues across repos",
      "Language statistics and breakdowns",
      "Live demo deployed",
    ],
  },
  {
    slug: "token-holder",
    title: "Token Holder",
    emoji: "\u{1F510}",
    description:
      "Identity, permissioning, and audit fabric for AI agents - Rust core with desktop and hosted deployment targets, federated tenant onboarding, and a per-tenant cloud surface.",
    longDescription:
      "Token Holder is the trust layer for AI agents - a Rust-core platform with two deployment targets: a Tauri desktop app for sovereign use and a hosted cloud at cloud.tokenholder.io for managed tenants. It handles agent identity, scoped permissioning, audit logging, and federated tenant onboarding.\n\nThe hosted side is a multi-region SST + ECS Fargate + Aurora Serverless v2 deployment with ACM/CloudFront in front of per-tenant subdomains. The federation layer reconciles wallet identities and Telnyx verify profiles via a daily Lambda cron with alarms and a verified pre-flight runbook.",
    techStack: [
      "Rust",
      "Tauri",
      "TypeScript",
      "SST v3",
      "AWS",
      "Aurora",
      "ECS Fargate",
      "CloudFront",
    ],
    status: "building",
    category: "tools",
    url: "https://tokenholder.io",
    metrics: "159+ commits across the ecosystem",
    highlights: [
      "Rust core with Tauri desktop + hosted cloud deployment targets",
      "Per-tenant subdomains on cloud.tokenholder.io",
      "Federated tenant onboarding with cross-account Route53 + ACM",
      "Daily reconciliation Lambda with alarms and verified pre-flight",
      "Plugin architecture for extensibility (encryption, RBAC, grant engine)",
    ],
  },
  {
    slug: "clawnoly",
    title: "Clawnoly",
    emoji: "\u{1F9E0}",
    description:
      "Claude Code orchestrator and terminal harness. Tauri v2 desktop app - grouped Claude sessions, MCP-bridged agent coordination, sideline queue for human-in-the-loop approvals, and YAML-driven dashboards.",
    longDescription:
      "Clawnoly is a Tauri v2 desktop app that turns multiple Claude Code sessions into one coordinated workspace. Each project gets a tab with sidebar navigation, session persistence, and grid view for multi-terminal monitoring. Any session can be ejected into a floating window and docked back per tab.\n\nThe MCP bridge lets any Claude session spawn, message, or escalate to other Claude sessions. Human-in-the-loop decisions surface in a dedicated sideline queue with macOS notifications. Everything persists in SQLite - including Claude session IDs - so closing and reopening Clawnoly restores your exact conversation state.\n\nYAML-driven dashboards at `~/.clawnoly/dashboards/` pull live data from vault frontmatter. Token Holder integration adds grant-gated RBAC on every vault read, terminal spawn, and sideline post. Phase 5 (Terminal Grid + Dashboard Engine + Virtual Office Rooms) shipped.",
    techStack: [
      "Tauri v2",
      "Rust",
      "React",
      "TypeScript",
      "SQLite",
      "MCP",
    ],
    status: "building",
    category: "tools",
    metrics: "Phase 5 shipped",
    evidence: [
      {
        date: "2026-07-11",
        fact: "Built the observation layer the orchestrator existed for: editor hooks and a filesystem watcher feed a local service, which writes every file an agent touches into a hash-chained, Ed25519-signed ledger. Metadata only - session, path, working directory, never file contents. 44 tests including a forged-diff detection case.",
      },
      {
        date: "2026-07-19",
        fact: "Put shared-secret auth in front of the ingest endpoint and proved it enforcing rather than assuming it: 401 without the header, 200 with, token stored 0600.",
      },
      {
        date: "2026-08-13",
        fact: "Found the capture had been silently dead for twenty days. The ingest moved behind a token check, the wallet holding that token was locked, the service returned 502, and the hook discarded the error because it ended in `|| true`. The real finding underneath: locking the wallet deletes consumer tokens, so every lock silently killed capture. A hook that cannot fail out loud is not instrumentation.",
      },
    ],
    limits: "Personal tooling, not a product. It has one user. The file-activity capture described above went dark for twenty days in 2026 and its behaviour should be treated as architecture rather than as something running healthily today.",
    highlights: [
      "Grouped Claude Code sessions with eject-to-floating + dock-back",
      "MCP bridge lets one Claude session coordinate with others",
      "Sideline queue surfaces human-in-the-loop approvals across all sessions",
      "YAML-driven dashboards over vault frontmatter",
      "Token Holder grant-gated RBAC on every endpoint",
      "Session persistence - restore exact conversation state on relaunch",
    ],
  },
  {
    slug: "knowmessenger",
    title: "KnowMessenger",
    emoji: "\u{1F4DA}",
    description:
      "Opinionated personal-knowledge workspace - chat + files + paired HTML/Markdown dashboards in one app. Built on the Token Holder identity layer with BYO-key freemium.",
    longDescription:
      "KnowMessenger (KM) is an opinionated personal-knowledge bootstrap - chat, vault files, and paired HTML/Markdown dashboards in a single workspace. Designed to be easy for non-power-users and deep for power-users, with embedded coaching, scheduled reviews, and a curated bundled-skills shelf.\n\nKM v2 surfaces a three-pane workspace: vault tree on the left, AI conversation in the center, and a daily questionnaire + live dashboard widget on the right. The product reviews you on a cadence rather than waiting as a blank canvas. Authentication and per-tenant scoping ride the Token Holder federation, with BYO-key as the freemium gate.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind v4",
      "AI SDK",
      "Bedrock",
      "SST v3",
    ],
    status: "building",
    category: "saas",
    highlights: [
      "Three-pane workspace: vault tree + AI conversation + daily questionnaire",
      "Paired Markdown + HTML dashboard artifacts (curated skills, not plugins)",
      "Embedded coaching bubbles and scheduled vault reviews",
      "Federation-backed tenant onboarding via Token Holder",
      "BYO-key freemium for Claude API; hosted option for managed users",
    ],
  },
  {
    slug: "bto-arcade",
    title: "BTO Arcade",
    emoji: "\u{1F573}\uFE0F",
    description:
      "Four original arcade games built into the Beat The Odds venue app. Deterministic framework-free engines in a shared package, canvas renderers in the apps, and an intellectual-property boundary asserted by tests rather than by comments.",
    longDescription:
      "The venue app needed something to do between games. Rather than license, I built four: Clutch Trivia, World Cup Shootout, City Crawl and Ball Pit.\n\nCity Crawl is the largest. You steer a void around a procedurally generated isometric city, swallow anything that fits, grow, and take the landmark - three modes, six cities, and a 138-slot challenge album. The engine is pure and deterministic and lives in a shared package with no framework dependency; the renderer is canvas 2D, chosen over WebGL after measuring a real 90-second run rather than assuming. A frustum cull replaced a radial one and holds 10.3% of props against the old 93.5%, verified against a brute-force reference rasteriser rather than against itself.\n\nBall Pit drops regulation sports balls into a container and merges matching pairs up a size ladder. The twist is that each ball behaves like its real self - a ping pong ball pings, a shot put thuds and shoves the pile.\n\nThe part I care most about is the boundary. In a wagering app, team colours and league marks are false-endorsement exposure, while buildings visible from public places are broadly permitted under 17 U.S.C. section 120(a). So the games ship cities and geometry and never teams or marks, city footprints come from OpenStreetMap and never from a source whose terms bar derivative datasets, and a test file enforces all of it - including reading the brand token file directly so the canonical colours cannot drift. If that test fails it is a decision for counsel, not a decision for me.",
    techStack: [
      "TypeScript",
      "Canvas 2D",
      "React",
      "React Native",
      "Skia",
      "OpenStreetMap",
    ],
    status: "completed",
    category: "game",
    evidence: [
      {
        date: "2026-08-10",
        fact: "City Crawl merged to develop, PR #568 - fall physics, the frustum cull and the OpenStreetMap district extractor as three logical commits.",
      },
      {
        date: "2026-08-13",
        fact: "Ball Pit merged, PR #575. Arcade game number four.",
      },
      {
        date: "2026-08-08",
        fact: "The OpenStreetMap district extractor pulls real building footprints - 1,526 buildings for downtown Minneapolis at about 12 bytes per building gzipped, and Denver extracted cold on the first run. The licence attribution rides inside the data payload rather than in a source comment, so it survives being copied out.",
      },
      {
        date: "2026-08-10",
        fact: "Every game grants nothing. No session, no server submit, and none of the earning vocabulary anywhere in the tree - the games cannot pay out by construction, not by configuration.",
      },
    ],
    limits: "Shipped to the develop branch inside the Beat The Odds app, not published as standalone games. The real-city path is built and merged but not yet mounted in the app, so the cities you can play are the procedural ones. Mobile frame rate on physical hardware is unmeasured.",
    highlights: [
      "Deterministic, framework-free game engines in a shared package",
      "Canvas 2D over WebGL, decided by measuring a real 90-second run",
      "Frustum cull verified against a brute-force reference rasteriser",
      "IP boundary asserted by a test file, not by a code comment",
      "Real building footprints from OpenStreetMap, licence-safe by payload",
      "Grants nothing: no session, no submit, no earning path",
    ],
  },
  {
    slug: "bto-media-kit",
    title: "BTO Media Kit",
    emoji: "\u{1F3AC}",
    description:
      "Brand and content system for Beat The Odds, packaged so the team can produce on-brand material without going through me. 62 static templates and 18 Remotion compositions, with the claim rules enforced in the components.",
    longDescription:
      "The bottleneck was me. Every social post, every deck slide, every clip went through one person, so the kit exists to remove that dependency rather than to make design faster.\n\nEvery static template is a standalone HTML file - no build step, no framework - sized by its own filename, with an exporter that reads the size off the name and renders through headless Chrome. 62 of them across 23 categories. The explorer that indexes them fails the build if the number of templates it discovers ever diverges from the number of frames it renders, so the catalogue cannot quietly go stale.\n\nThe motion half is 18 Remotion compositions: 11 vertical designs plus 16:9 and 1:1 variants. There is no photography anywhere in the kit - no player likeness with an unanswered rights question, no venue shoot, no stock budget - so type, colour, geometry and timing have to carry the frame instead. Every composition is driven by typed props behind a schema, which is what lets someone else edit the copy without touching layout code.\n\nTwo rules are built into the components rather than written in a style guide. The company is pre-revenue, so the stat card's default figure is a placeholder and renders an on-canvas marker saying so - you have to consciously replace it with a real number. And no league marks, team names, team colours or competitor names, for the same reason the arcade games avoid them.",
    techStack: ["Remotion", "TypeScript", "Zod", "HTML", "Headless Chrome"],
    status: "completed",
    category: "tools",
    evidence: [
      {
        date: "2026-08-17",
        fact: "Shipped to the organisation: 62 templates across 23 categories and 18 Remotion compositions. Full export run rendered 57 of 57 with zero failures and zero skips, and 186 references were checked live with none broken.",
      },
      {
        date: "2026-08-17",
        fact: "The explorer indexes 62 templates and embeds 62 frames, and its generator exits non-zero if those two numbers ever differ. A catalogue that can silently under-report is not a catalogue.",
      },
      {
        date: "2026-08-19",
        fact: "Handed over as a versioned bundle - logos, icons, brand rules, static templates, motion templates, worked examples and a first-ten-business-days plan - with a checksum manifest and a print-ready brand guide carrying Pantone and CMYK specifications.",
      },
    ],
    limits: "Internal team tooling for one company. The whole kit is under a megabyte because it is templates and brand primitives only, not the 1.2 GB render library it came from.",
    highlights: [
      "62 standalone HTML templates, no build step, no framework",
      "18 Remotion compositions: 11 vertical designs plus 16:9 and 1:1",
      "Typed props behind a schema, so copy is editable without touching layout",
      "Pre-revenue claim rule enforced in the component, not in a style guide",
      "Catalogue generator exits non-zero if discovery and render counts diverge",
      "Versioned handoff bundle with a checksum manifest and a print brand guide",
    ],
  },
  {
    slug: "ai-voice-receptionist",
    title: "AI Voice Receptionist",
    emoji: "\u{1F9B7}",
    description:
      "Vapi + LLM orchestration for a service business. Handles inbound calls, qualifies leads, routes appointments.",
    longDescription:
      "Built an AI voice receptionist for a service business (a dental practice) using Vapi and LLM orchestration. The system handles inbound calls, qualifies leads against the business's own criteria, and routes qualified prospects into appointment scheduling.\n\nThe engagement is complete and handed over. Call-volume and booking outcomes were measured on the client's own systems, not on instrumentation I owned, so no performance figures are published here.",
    techStack: ["Vapi", "LLM orchestration", "webhooks"],
    status: "completed",
    category: "client",
    highlights: [
      "Vapi + LLM orchestration",
      "Automated lead qualification against the client's own criteria",
      "Appointment routing and scheduling",
      "Won and delivered as a solo engagement, start to handover",
    ],
  },
];
