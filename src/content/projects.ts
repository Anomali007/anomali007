export type Project = {
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

export const projects: Project[] = [
  {
    title: "MASS Lead Connect",
    emoji: "\u{1F399}\uFE0F",
    description:
      "Multi-tenant AI voice receptionist SaaS. Three Next.js apps, SST v3 on AWS, DynamoDB, Cognito, Telnyx voice, Stripe billing, WebRTC browser calling, and an autonomous agent runtime with human-in-the-loop approvals.",
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
  },
  {
    title: "Beat The Odds",
    emoji: "\u{1F3B0}",
    description:
      "Real-time fantasy sports platform with web + kiosk experiences, merchandise rewards, responsible gambling handlers, Stripe payments, and admin dashboards.",
    techStack: ["Next.js", "TypeScript", "SST v3", "AWS", "Stripe", "PostgreSQL"],
    status: "building",
    category: "saas",
    url: "https://btofantasy.us",
    metrics: "100+ commits",
  },
  {
    title: "yachttransport.ai",
    emoji: "\u26F5",
    description:
      "End-to-end quoting and booking platform for global yacht shipping. Role-based dashboards, booking workflows, and Postgres-backed pricing logic. Started with a voice AI MVP demo that landed the full contract.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "tRPC", "Vapi", "AWS"],
    status: "completed",
    category: "client",
    url: "https://yachttransport.ai",
  },
  {
    title: "Milestorm.io",
    emoji: "\u{1F3D4}\uFE0F",
    description:
      "Supply-chain niche project management app. Multi-tenant auth, milestone tracking, and reporting views. Launched into private beta.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM"],
    status: "completed",
    category: "client",
    url: "https://milestorm.io",
  },
  {
    title: "Home Team Education",
    emoji: "\u{1F393}",
    description:
      "501(c)(3) nonprofit building an AI-powered animated money mentor that teaches teens financial literacy. Interactive quizzes, AI coach, and donation flows.",
    techStack: ["Next.js", "TypeScript", "AI/LLM integration"],
    status: "live",
    category: "saas",
    url: "https://hometeameducation.org",
  },
  {
    title: "Mecca Gateway",
    emoji: "\u{1F54C}",
    description:
      "Full-stack platform with SST v3, Cognito branded auth, 22 React Email templates, RBAC with tiered SUPER_ADMIN access, investor dashboard.",
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
  },
  {
    title: "blah3",
    emoji: "\u{1F5E3}\uFE0F",
    description:
      "Native macOS desktop app for 100% offline Speech-to-Text and Text-to-Speech on Apple Silicon. Built in Rust with zero prior experience — AI gave me the confidence to ship a systems-language product in days.",
    techStack: ["Rust", "Tauri", "CoreML", "Whisper", "macOS"],
    status: "completed",
    category: "opensource",
    url: "https://blah3-website.vercel.app/",
    repoUrl: "https://github.com/Anomali007/blah3",
  },
  {
    title: "MergeReel",
    emoji: "\u{1F500}",
    description:
      "GitHub app that generates video summaries of Pull Requests using Remotion. Stripe billing, org-level repo fetching, subscription management.",
    techStack: ["TypeScript", "Remotion", "GitHub API", "Stripe"],
    status: "building",
    category: "tools",
  },
  {
    title: "tml-cli",
    emoji: "\u{1F527}",
    description:
      "Custom org CLI with security hardening, multi-user profile access control, and provisioning commands.",
    techStack: ["TypeScript", "Node.js"],
    status: "completed",
    category: "tools",
  },
  {
    title: "git-tracker",
    emoji: "\u{1F4CA}",
    description:
      "GitHub Activity Dashboard — tracks commits, PRs, issues, and language stats across repos.",
    techStack: ["TypeScript", "GitHub API"],
    status: "live",
    category: "opensource",
    repoUrl: "https://github.com/Anomali007/git-tracker",
  },
  {
    title: "THE Wallet",
    emoji: "\u{1F510}",
    description:
      "Modular data sovereignty platform with Tauri desktop app, plugin architecture, encryption, and RBAC.",
    techStack: ["Tauri", "Rust", "TypeScript"],
    status: "building",
    category: "tools",
  },
  {
    title: "AI Voice Receptionist",
    emoji: "\u{1F9B7}",
    description:
      "Vapi + LLM orchestration for a service business. Handles inbound calls, qualifies leads, routes appointments.",
    techStack: ["Vapi", "LLM orchestration", "webhooks"],
    status: "completed",
    category: "client",
    metrics: "Reduced live call handling ~50%, increased bookings ~30%",
  },
];
