import type { Metadata } from "next";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "The tools, stack, and AI-native development setup I use to ship production software.",
};

type UsesItem = {
  name: string;
  detail?: string;
};

type UsesSection = {
  title: string;
  items: UsesItem[];
};

const uses: UsesSection[] = [
  {
    title: "Editor & AI Tools",
    items: [
      {
        name: "Claude Code",
        detail:
          "Primary development tool — 6+ months of daily use, high weekly volume",
      },
      { name: "Cursor", detail: "AI-native code editor" },
      { name: "VS Code", detail: "Fallback and specific workflows" },
      {
        name: "GitHub Copilot",
        detail: "Used since early 2023, inline completions",
      },
    ],
  },
  {
    title: "AI Development Platform",
    items: [
      {
        name: "11 slash commands",
        detail:
          "/ship, /security-review, /performance-review, /next-issue, and more",
      },
      {
        name: "6 specialized agents",
        detail: "Task-specific agents for different parts of the workflow",
      },
      {
        name: "4 safety hooks",
        detail:
          "pre_bash_guard, post_write_secret_scan, auto-format, stop_summary",
      },
      {
        name: "Repo playbooks",
        detail: "Standardization across all projects",
      },
    ],
  },
  {
    title: "Stack",
    items: [
      {
        name: "Frontend",
        detail: "React, Next.js, TypeScript, Tailwind, shadcn/ui",
      },
      {
        name: "Backend",
        detail: "Node.js, tRPC, Python, FastAPI, Serverless",
      },
      {
        name: "Cloud",
        detail:
          "AWS (Lambda, API Gateway, RDS, S3, Cognito, SES), SST v3, Vercel",
      },
      {
        name: "Data",
        detail: "PostgreSQL, DynamoDB, Prisma, Drizzle ORM",
      },
      {
        name: "Auth",
        detail: "Cognito, OAuth2/OIDC, RBAC patterns",
      },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    items: [
      { name: "SST v3", detail: "Pulumi-based Infrastructure as Code" },
      { name: "GitHub Actions", detail: "CI/CD pipelines" },
      { name: "Multi-account AWS", detail: "dev/qa/prod environments" },
      { name: "OIDC keyless auth", detail: "No static credentials in CI" },
      { name: "Docker", detail: "Containerized services and local dev" },
    ],
  },
];

export default function UsesPage() {
  return (
    <Section>
      <div className="animate-fade-in-up max-w-3xl">
        <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
          Uses
        </h1>
        <p className="mb-12 text-text-secondary">
          The tools, stack, and AI-native development setup behind the work.
        </p>

        <div className="space-y-12">
          {uses.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 font-display text-xl font-semibold text-text">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-1 rounded-lg border border-border bg-surface px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="font-medium text-text shrink-0">
                      {item.name}
                    </span>
                    {item.detail && (
                      <span className="text-sm text-text-secondary">
                        {item.detail}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
