import Link from "next/link";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: "rgba(229,168,51,0.04)" }}
        />
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Top: brass plate with alien glyph */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] uppercase transition-colors"
            style={{ color: "var(--brass)" }}
          >
            <span className="alien-dots" aria-hidden>
              <span />
              <span />
              <span />
            </span>
            ANOMALI · 007
          </Link>

          <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-text-secondary sm:block">
            STATION · CENTRAL TEXAS
          </div>
        </div>

        {/* Links row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-secondary transition-colors hover:text-text"
            >
              GitHub
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-secondary transition-colors hover:text-text"
            >
              LinkedIn
            </Link>
            <Link
              href="https://themasslab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-secondary transition-colors hover:text-text"
            >
              The MASS Lab
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-secondary transition-colors hover:text-text"
            >
              Email
            </Link>
          </nav>

          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-secondary">
            &copy; 2026 {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
