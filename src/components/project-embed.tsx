"use client";

import { useState } from "react";

interface ProjectEmbedProps {
  title: string;
  src: string;
  url?: string;
}

export function ProjectEmbed({ title, src, url }: ProjectEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="hidden sm:block">
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="mb-4 text-text-secondary">
            Preview unavailable for this site.
          </p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Visit Live Site &rarr;
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:block">
      {/* Browser chrome frame */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border bg-bg px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-surface px-3 py-1 text-xs text-text-secondary truncate">
            {src}
          </div>
        </div>

        {/* Iframe container — 16:9 */}
        <div className="relative aspect-video bg-bg">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
            </div>
          )}
          <iframe
            src={src}
            title={`${title} preview`}
            className={`h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>

        {/* Bottom overlay bar */}
        {url && (
          <div className="flex items-center justify-between border-t border-border bg-bg px-4 py-2">
            <span className="text-xs text-text-secondary truncate">
              Viewing {title}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent transition-colors hover:text-accent-hover whitespace-nowrap ml-4"
            >
              Open in new tab &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
