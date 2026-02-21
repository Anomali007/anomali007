export type Project = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  status: "live" | "beta" | "completed" | "building";
  category: "saas" | "tools" | "client" | "opensource";
  url?: string;
  repoUrl?: string;
  metrics?: string;
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
      "MASS Lead Connect is the flagship product of The MASS Lab — a multi-tenant AI voice receptionist platform that handles inbound calls, qualifies leads, and routes appointments for service businesses.\n\nThe platform consists of three Next.js applications: a marketing site, a customer dashboard for business owners to manage their AI receptionist, and a staff portal for internal operations. The backend runs on SST v3 with DynamoDB, Cognito authentication, Telnyx voice integration, Stripe billing, and WebRTC for browser-based calling.\n\nThe most technically interesting piece is the autonomous agent runtime — an AI system that can take actions on behalf of the business (scheduling, follow-ups, qualification) with human-in-the-loop approval gates to prevent unwanted automation.",
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
    url: "https://massleadconnect.com",
    metrics: "523 commits",
    highlights: [
      "Multi-tenant SaaS with three separate Next.js applications",
      "Autonomous agent runtime with human-in-the-loop approvals",
      "WebRTC browser calling integration",
      "Stripe billing with subscription management",
      "SST v3 infrastructure on AWS with DynamoDB and Cognito",
      "523 commits and counting",
    ],
  },
  {
    slug: "beat-the-odds",
    title: "Beat The Odds",
    emoji: "\u{1F3B0}",
    description:
      "Real-time fantasy sports platform with web + kiosk experiences, merchandise rewards, responsible gambling handlers, Stripe payments, and admin dashboards.",
    longDescription:
      "Beat The Odds is a real-time fantasy sports platform featuring web and kiosk experiences. The platform includes a bettor-facing interface, admin dashboard, merchandise rewards system, and responsible gambling handlers.\n\nBuilt as a Next.js monorepo with SST v3 on AWS, the platform handles Stripe payments with deposit/withdraw flows, fail-closed authentication, stage-aware CORS, and comprehensive audit logging. I've been lead engineer on this project since 2022, owning everything from architecture to deployment.",
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
    metrics: "100+ commits",
    highlights: [
      "Real-time fantasy sports with web + kiosk interfaces",
      "Merchandise rewards system",
      "Responsible gambling handlers and compliance",
      "Stripe payments with deposit/withdraw flows",
      "Fail-closed auth with audit logging",
      "100+ commits",
    ],
  },
  {
    slug: "yachttransport-ai",
    title: "yachttransport.ai",
    emoji: "\u26F5",
    description:
      "End-to-end quoting and booking platform for global yacht shipping. Role-based dashboards, booking workflows, and Postgres-backed pricing logic. Started with a voice AI MVP demo that landed the full contract.",
    longDescription:
      "I built yachttransport.ai as the lead architect and primary developer for Allied Yacht Transport — a global yacht shipping company that needed a modern quoting and booking platform.\n\nThe project started with a voice AI MVP demo using Vapi for conversational booking, which I used to demonstrate my capabilities and land the full contract. From there, I designed and built the complete platform: role-based dashboards for operations and admin teams, quote sharing workflows, booking management, and Postgres-backed pricing logic aligned to their real-world operations.\n\nShipped with CI checks, PR discipline, and documented flows for team continuity after my engagement.",
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
      "Home Team Education is a registered 501(c)(3) nonprofit I've been building toward for years, now in its most complete form. The platform features HomeTeam Coach — an AI-powered animated money mentor that teaches teens ages 14-22 how to budget, save, and build real financial confidence.\n\nThe site includes interactive financial literacy quizzes, an AI coach interface, educational programs, donation flows, and resources for parents and schools. Built with a responsible AI and data privacy focus given the young audience.",
    techStack: ["Next.js", "TypeScript", "AI/LLM integration"],
    status: "live",
    category: "saas",
    url: "https://hometeameducation.org",
    highlights: [
      "501(c)(3) nonprofit — mission-driven product",
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
    metrics: "74 commits",
    highlights: [
      "Cognito-branded auth with RBAC and tiered SUPER_ADMIN",
      "22 React Email templates via SES",
      "CSRF/session hardening",
      "Privacy-preserving analytics",
      "Investor dashboard",
      "74 commits",
    ],
  },
  {
    slug: "blah3",
    title: "blah3",
    emoji: "\u{1F5E3}\uFE0F",
    description:
      "Native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. Built in Rust with zero prior experience — AI gave me the confidence to ship a systems-language product in days.",
    longDescription:
      "blah3 is a native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. I built this in Rust with zero prior Rust experience — AI gave me the confidence to jump into a systems language and ship a packaged desktop product in days.\n\nThe app features CoreML-accelerated Whisper models for transcription, kokoro-tiny TTS for speech synthesis, a floating dictation overlay with hotkey support, silence detection, an onboarding wizard, and DMG packaging for distribution. Everything runs locally — no cloud, no API calls, complete privacy.",
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
      "100% offline — complete data privacy",
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
      "GitHub Activity Dashboard — tracks commits, PRs, issues, and language stats across repos.",
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
    slug: "the-wallet",
    title: "THE Wallet",
    emoji: "\u{1F510}",
    description:
      "Modular data sovereignty platform with Tauri desktop app, plugin architecture, encryption, and RBAC.",
    longDescription:
      "THE Wallet is a modular data sovereignty platform in early-stage development. The vision is a Tauri-based desktop application with a plugin architecture, encryption, RBAC, and a grant engine — giving users true ownership and control over their personal data.\n\nExploring adding a Python/FastAPI microservice backend to incorporate RAG functionality.",
    techStack: ["Tauri", "Rust", "TypeScript"],
    status: "building",
    category: "tools",
    highlights: [
      "Tauri desktop application",
      "Plugin architecture for extensibility",
      "Encryption and RBAC",
      "Data sovereignty and user ownership focus",
    ],
  },
  {
    slug: "ai-voice-receptionist",
    title: "AI Voice Receptionist",
    emoji: "\u{1F9B7}",
    description:
      "Vapi + LLM orchestration for a service business. Handles inbound calls, qualifies leads, routes appointments.",
    longDescription:
      "Built an AI voice receptionist for a service business (DentMasters affiliate) using Vapi and LLM orchestration. The system handles inbound calls, qualifies leads based on business criteria, and routes qualified prospects to appointment scheduling.\n\nThe project demonstrated significant operational impact: live call handling time dropped by approximately 50%, and booked appointments increased by approximately 30%.",
    techStack: ["Vapi", "LLM orchestration", "webhooks"],
    status: "completed",
    category: "client",
    metrics: "Reduced live call handling ~50%, increased bookings ~30%",
    highlights: [
      "Vapi + LLM orchestration",
      "Automated lead qualification",
      "Appointment routing and scheduling",
      "~50% reduction in live call handling time",
      "~30% increase in booked appointments",
    ],
  },
];
