import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary">
            {siteConfig.name}
          </span>
          <span className="text-base" title="anomali">
            👽
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Email
          </Link>
        </div>

        <p className="text-xs text-text-secondary">
          Built with Next.js, Tailwind, and too much coffee
        </p>
      </div>
    </footer>
  );
}
