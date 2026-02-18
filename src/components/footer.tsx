import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-accent/3 blur-[120px]" />
      </div>
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
            href="https://themasslab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            The MASS Lab
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-text-secondary transition-colors hover:text-accent"
          >
            Email
          </Link>
        </div>

        <p className="text-xs text-text-secondary">
          &copy; 2026 Mali Franzese &middot; Built with Next.js, Tailwind, and
          too much coffee
        </p>
      </div>
    </footer>
  );
}
