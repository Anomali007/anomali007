"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

/**
 * Command-Bridge Hero - Severance-style three-monitor desk view.
 *
 * Mirrors the public portfolio:
 *   LEFT   - In production (4 portfolio projects, links to /projects/<slug>)
 *   CENTER - Representative code (3 tabs - clickable - public-safe snippets)
 *   RIGHT  - Ship log (clickable, links into the portfolio + GitHub)
 *   FOOTER - Auto-rotating ship log, dated
 *
 * EVERYTHING WITH A NUMBER ON IT IS REAL AND SOURCED. This panel used to render
 * invented version strings, invented test counts, invented completion
 * percentages, invented PR numbers, invented commit hashes and "10m ago"
 * timestamps under a live clock, on a site whose entire job is to make private
 * work checkable. If you add a row here it needs a date and it needs to have
 * happened. Illustrative telemetry is worse than no telemetry.
 */

type Shipping = {
  slug: string;
  name: string;
  state: string;
  detail: string;
};

const SHIPPING: Shipping[] = [
  {
    slug: "beat-the-odds",
    name: "Beat The Odds",
    state: "IN PRODUCTION",
    detail: "Live since Jun 2026 · no revenue yet",
  },
  {
    slug: "mass-lead-connect",
    name: "MASS Lead Connect",
    state: "LISTED",
    detail: "Operations Map offered · zero delivered",
  },
  {
    slug: "bto-arcade",
    name: "BTO Arcade",
    state: "MERGED",
    detail: "4 games · IP boundary held by test",
  },
  {
    slug: "token-holder",
    name: "Token Holder",
    state: "BUILDING",
    detail: "Rust core · desktop + hosted",
  },
];

type Tab = {
  id: string;
  file: string;
  lineStart: number;
  lines: React.ReactNode[];
};

const CODE_TABS: Tab[] = [
  {
    id: "identities",
    file: "identities.rs",
    lineStart: 2557,
    lines: [
      <>
        <span className="text-amber-500">pub fn</span>{" "}
        <span className="text-sky-400">create_identity</span>(
      </>,
      <>
        {`  bearer: &Bearer,`}
        {"  "}
        <span className="text-amber-600/85">{"// tenant-scoped caller"}</span>
      </>,
      <>{`  request: &CreateIdentityRequest,`}</>,
      <>
        ) -&gt; Result&lt;<span className="text-amber-300">Identity</span>&gt; {"{"}
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let</span> tenant_id ={" "}
        bearer.tenant_id.to_string();{"  "}
        <span className="text-amber-600/85">{"// pinned from bearer, not body"}</span>
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let</span> identity = Identity {"{"}
      </>,
      <>{`    id: Uuid::new_v4(),`}</>,
      <>
        {"    "}tenant_id,{" "}
        <span className="text-amber-600/85">{"// honors supplied tenant"}</span>
      </>,
      <>{`    kind: request.kind.clone(),`}</>,
      <>{`    created_at: Utc::now(),`}</>,
      <>{`  };`}</>,
      <>{`  state.insert(identity.clone())?;`}</>,
      <>
        {"  "}audit::record(bearer, &amp;identity)?;
      </>,
      <>{`  Ok(identity)`}</>,
      <>{`}`}</>,
    ],
  },
  {
    id: "federation",
    file: "federation.rs",
    lineStart: 412,
    lines: [
      <>
        <span className="text-amber-500">pub async fn</span>{" "}
        <span className="text-sky-400">reconcile_profiles</span>(
      </>,
      <>{`  ctx: &Ctx,`}</>,
      <>
        ) -&gt; Result&lt;<span className="text-amber-300">Report</span>&gt; {"{"}
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let</span> wallet =
        ctx.wallet_identities().await?;{"  "}
        <span className="text-amber-600/85">{"// source of truth"}</span>
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let</span> telnyx =
        ctx.telnyx_verify_profiles().await?;{"  "}
        <span className="text-amber-600/85">{"// downstream mirror"}</span>
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let mut</span> drift =
        Vec::new();
      </>,
      <>
        {"  "}
        <span className="text-amber-500">for</span> id{" "}
        <span className="text-amber-500">in</span> wallet {"{"}
      </>,
      <>
        {"    "}
        <span className="text-amber-500">if let</span> Some(p) ={" "}
        telnyx.find(id) {"{"}
      </>,
      <>
        {"      "}
        <span className="text-amber-500">if</span> p.status != id.status{" "}
        {"{"} drift.push((id, p)); {"}"}{"  "}
        <span className="text-amber-600/85">{"// flag mismatch"}</span>
      </>,
      <>{`    }`}</>,
      <>{`  }`}</>,
      <>
        {`  alert_if_drift(&drift)?;`}
        {"  "}
        <span className="text-amber-600/85">{"// page on-call if non-empty"}</span>
      </>,
      <>{`  Ok(Report::from(drift))`}</>,
      <>{`}`}</>,
    ],
  },
  {
    id: "audit",
    file: "audit.rs",
    lineStart: 88,
    lines: [
      <>
        <span className="text-amber-500">pub fn</span>{" "}
        <span className="text-sky-400">record</span>(bearer: &amp;Bearer,
        event: &amp;impl Auditable) {"{"}
      </>,
      <>
        {"  "}
        <span className="text-amber-500">let</span> row = AuditRow {"{"}
      </>,
      <>{`    at: Utc::now(),`}</>,
      <>{`    actor: bearer.identity_id,`}</>,
      <>{`    tenant: bearer.tenant_id,`}</>,
      <>{`    kind: event.kind(),`}</>,
      <>
        {`    payload: event.serialize_redacted(),`}
        {"  "}
        <span className="text-amber-600/85">{"// PII stripped pre-write"}</span>
      </>,
      <>{`  };`}</>,
      <>
        {`  AUDIT_LOG.append(row);`}
        {"  "}
        <span className="text-amber-600/85">{"// append-only, never mutated"}</span>
      </>,
      <>
        {"  "}
        <span className="text-amber-600/85">
          {"// every action gets a receipt"}
        </span>
      </>,
      <>{`}`}</>,
    ],
  },
];

const MERGES = [
  {
    title: "First Operations Map offer sent to a prospect",
    pr: "MASS Lead Connect",
    repo: "73 days ready-but-unsent",
    date: "2026-08-24",
    href: "/projects/mass-lead-connect",
  },
  {
    title: "Media kit shipped to the org: 62 templates, 18 compositions",
    pr: "62 + 18",
    repo: "bto-media-kit",
    date: "2026-08-17",
    href: "/projects/bto-media-kit",
  },
  {
    title: "Ball Pit merged. Arcade game number four",
    repo: "beat-the-odds",
    date: "2026-08-13",
    href: "/projects/bto-arcade",
  },
  {
    title: "City Crawl merged: fall physics, frustum cull, OSM districts",
    repo: "beat-the-odds",
    date: "2026-08-10",
    href: "/projects/bto-arcade",
  },
  {
    title: "Venue apply form fixed. It had 500'd on every submit since launch",
    repo: "beat-the-odds",
    date: "2026-08-09",
    href: "/projects/beat-the-odds",
  },
  {
    title: "Operations Map ran end to end: ~3 days of assembly to one afternoon",
    pr: "dry run",
    repo: "mass-lead-connect",
    date: "2026-08-14",
    href: "/projects/mass-lead-connect",
  },
  {
    title: "Beat The Odds launched to production",
    pr: "#384-391",
    repo: "beat-the-odds",
    date: "2026-06-18",
    href: "/projects/beat-the-odds",
  },
];

const EVENT_LOG: Array<{
  date: string;
  type: string;
  status: "MERGED" | "SHIPPED" | "LAUNCHED" | "SENT" | "FIXED";
  target: string;
  detail: string;
  statusColor: string;
}> = [
  {
    date: "2026-08-24",
    type: "OFFER",
    status: "SENT",
    target: "operations-map",
    detail: "first prospect · zero delivered to date",
    statusColor: "text-cyan-400",
  },
  {
    date: "2026-08-17",
    type: "MEDIA KIT",
    status: "SHIPPED",
    target: "bto-media-kit",
    detail: "62 templates · 57/57 rendered, 0 failed",
    statusColor: "text-emerald-400",
  },
  {
    date: "2026-08-13",
    type: "SHIPPED",
    status: "MERGED",
    target: "ball-pit",
    detail: "arcade game #4 · grants nothing",
    statusColor: "text-cyan-400",
  },
  {
    date: "2026-08-10",
    type: "SHIPPED",
    status: "MERGED",
    target: "city-crawl",
    detail: "IP posture asserted by test, not comment",
    statusColor: "text-cyan-400",
  },
  {
    date: "2026-08-09",
    type: "SHIPPED",
    status: "FIXED",
    target: "venue-apply",
    detail: "500 on every submit since launch",
    statusColor: "text-emerald-400",
  },
  {
    date: "2026-06-18",
    type: "PROD",
    status: "LAUNCHED",
    target: "app.btofantasy.us",
    detail: "PRs #384-391 · ~48,800 venues catalogued",
    statusColor: "text-emerald-400",
  },
];

function HexagonGrid() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.04]"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <pattern
          id="bridge-hexagons"
          width="60"
          height="103.923"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.5)"
        >
          <path
            d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <path
            d="M30 103.923 L60 86.6 L60 51.96 L30 69.28 L0 51.96 L0 86.6 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bridge-hexagons)" />
    </svg>
  );
}

function AnomaliMark() {
  return (
    <div className="flex items-center gap-6 font-mono text-xs tracking-[0.3em] text-amber-500/80">
      <span>ANOMALI</span>
      <div className="relative flex h-8 w-12 items-center justify-center">
        <svg
          viewBox="0 0 100 60"
          className="h-full w-full drop-shadow-[0_0_6px_rgba(245,158,11,0.55)]"
          aria-hidden
        >
          <path
            d="M 10 30 Q 50 -10 90 30 Q 50 70 10 30 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="30" cy="30" r="4" fill="currentColor" />
          <circle cx="50" cy="30" r="5" fill="currentColor" />
          <circle cx="70" cy="30" r="4" fill="currentColor" />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="45"
            y1="60"
            x2="55"
            y2="60"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <span>0 0 7</span>
    </div>
  );
}

function Panel({
  children,
  title,
  subtitle,
  className = "",
  style,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden border border-amber-500/30 bg-[#050505]/90 backdrop-blur-md ${className}`}
      style={{
        boxShadow:
          "0 0 30px rgba(245,158,11,0.05), inset 0 0 24px rgba(0,0,0,0.85)",
        ...style,
      }}
    >
      <div className="flex items-center justify-between border-b border-amber-500/20 bg-amber-500/5 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-amber-500">
            {title}
          </span>
          {subtitle && (
            <>
              <span className="text-xs text-amber-700/50">•</span>
              <span className="font-mono text-xs tracking-wider text-amber-600">
                {subtitle}
              </span>
            </>
          )}
        </div>
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-500/20" />
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500/60" />
        </div>
      </div>
      <div className="flex-grow overflow-hidden p-4">{children}</div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
    </div>
  );
}

export function CommandBridgeHero() {
  const [time, setTime] = useState("02:00:00");
  const [logIndex, setLogIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLogIndex((i) => (i + 1) % EVENT_LOG.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const visibleEvents = [
    EVENT_LOG[logIndex],
    EVENT_LOG[(logIndex + 1) % EVENT_LOG.length],
    EVENT_LOG[(logIndex + 2) % EVENT_LOG.length],
  ];

  const tab = CODE_TABS[activeTab];

  return (
    <section className="relative flex min-h-[92vh] flex-col overflow-hidden bg-[#020202] font-mono text-amber-500 selection:bg-amber-500/30">
      <HexagonGrid />
      <div
        className="pointer-events-none absolute inset-0 z-40 opacity-90"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, #000 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-40 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <header className="relative z-20 flex w-full flex-col items-center justify-center gap-5 pt-12 pb-6">
        <AnomaliMark />
        <h1
          className="mt-2 px-4 text-center font-display text-5xl font-black uppercase tracking-[0.1em] text-[#fff5eb] sm:text-7xl lg:text-[6.5rem]"
          style={{
            textShadow:
              "0 0 30px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.15)",
          }}
        >
          Mali Franzese
        </h1>
        <p className="px-6 text-center font-display text-xl font-bold uppercase tracking-[0.22em] text-amber-300/85 sm:text-2xl">
          I Build Things.
        </p>
        <p className="max-w-2xl px-6 text-center text-sm text-amber-200/60 sm:text-base">
          Founder-Engineer at The MASS Lab · Co-Founder &amp; CTO at Beat The
          Odds · 3,000+ commits across 20+ active repos
        </p>
        <div className="mt-1 h-px w-1/3 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      </header>

      <main className="relative z-20 flex flex-grow items-center justify-center px-4 pb-32 sm:px-6">
        <div
          className="grid w-full max-w-[1600px] grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8"
          style={{ perspective: "1500px" }}
        >
          {/* LEFT - Currently shipping (clickable) */}
          <Panel
            title="IN PRODUCTION"
            className="h-[460px] transform-gpu transition-transform duration-700 hover:[transform:rotateY(0deg)_translateZ(0)] lg:h-[580px]"
            style={{ transform: "rotateY(12deg) translateZ(-50px)" }}
          >
            <div className="mt-2 flex h-full flex-col gap-4">
              {SHIPPING.map((item, i) => (
                <Link
                  key={i}
                  href={`/projects/${item.slug}`}
                  className="group flex flex-col gap-2 rounded-sm border border-amber-500/10 bg-amber-500/[0.02] p-3 transition-colors hover:border-amber-500/30 hover:bg-amber-500/[0.05]"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate text-amber-100/90 transition-colors group-hover:text-amber-200">
                      {item.name}
                    </span>
                    <span className="ml-2 shrink-0 font-mono text-[9px] tracking-[0.2em] text-amber-400/90">
                      {item.state}
                    </span>
                  </div>
                  <div className="text-[11px] leading-snug text-amber-600">
                    {item.detail}
                  </div>
                </Link>
              ))}
            </div>
          </Panel>

          {/* CENTER - Active code (tabs are clickable) */}
          <Panel
            title="RUST DESKTOP APP"
            subtitle="TOKEN HOLDER"
            className="z-10 h-[480px] transform-gpu shadow-[0_0_50px_rgba(245,158,11,0.10)] lg:-mt-4 lg:h-[600px]"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex h-full flex-col">
              {/* Clickable tabs */}
              <div
                className="mb-4 flex gap-5 border-b border-amber-500/20 pb-2 text-xs text-amber-600"
                role="tablist"
              >
                {CODE_TABS.map((t, i) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={i === activeTab}
                    onClick={() => setActiveTab(i)}
                    className={`-mb-2 cursor-pointer pb-2 transition-colors ${
                      i === activeTab
                        ? "border-b border-amber-400 text-amber-400"
                        : "hover:text-amber-300"
                    }`}
                  >
                    {t.file}
                  </button>
                ))}
              </div>

              <div className="relative flex-grow overflow-hidden font-mono text-[12px] leading-relaxed sm:text-[13px]">
                <div className="absolute top-0 bottom-0 left-0 flex w-8 select-none flex-col items-end border-r border-amber-500/20 pr-2 text-amber-800/60">
                  {tab.lines.map((_, i) => (
                    <span key={i} className="leading-relaxed">
                      {tab.lineStart + i}
                    </span>
                  ))}
                </div>
                <div className="pl-12 text-amber-200/75">
                  {tab.lines.map((ln, i) => (
                    <p key={`${tab.id}-${i}`} className="whitespace-pre">
                      {ln}
                      {i === tab.lines.length - 2 && (
                        <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-amber-400" />
                      )}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-amber-500/20 pt-2 text-[10px] text-amber-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400" />{" "}
                  representative, not live
                </span>
                <span>public-safe excerpt</span>
                <span>UTF-8</span>
              </div>
            </div>
          </Panel>

          {/* RIGHT - Recent merges (clickable) */}
          <Panel
            title="SHIP LOG"
            className="h-[460px] transform-gpu transition-transform duration-700 hover:[transform:rotateY(0deg)_translateZ(0)] lg:h-[580px]"
            style={{ transform: "rotateY(-12deg) translateZ(-50px)" }}
          >
            <div className="mt-2 flex flex-col gap-3 overflow-y-auto pr-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {MERGES.map((log, idx) => {
                const external = log.href.startsWith("http");
                const className =
                  "group relative flex flex-col gap-1.5 rounded-sm border border-transparent px-3 pb-3 transition-colors hover:border-amber-500/20 hover:bg-amber-500/[0.04]";
                const inner = (
                  <>
                    <span className="absolute left-1 top-2 h-1 w-1 rounded-full bg-amber-500/60 transition-colors group-hover:bg-amber-400" />
                    <div className="text-[13px] leading-snug text-amber-100/90 transition-colors group-hover:text-amber-200">
                      {log.title}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-amber-600">
                      <span className="text-amber-500/70">
                        {log.pr} · {log.repo}
                      </span>
                      <time
                        dateTime={log.date}
                        className="font-mono text-amber-600"
                      >
                        {log.date}
                      </time>
                    </div>
                  </>
                );
                return external ? (
                  <a
                    key={idx}
                    href={log.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link key={idx} href={log.href} className={className}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </Panel>
        </div>
      </main>

      <footer className="relative z-30 w-full border-t border-amber-500/20 bg-[#030303] p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 font-mono text-xs md:flex-row md:items-center">
          <div className="flex items-start gap-6 sm:gap-8">
            <div className="hidden font-bold tracking-widest text-amber-600 md:block">
              SHIP LOG
            </div>
            <div className="flex flex-col gap-1 text-amber-500/65">
              {visibleEvents.map((e, i) => (
                <div
                  key={`${logIndex}-${i}`}
                  className="event-row flex gap-4 sm:gap-8"
                  style={{ opacity: 1 - i * 0.25 }}
                >
                  <time dateTime={e.date} className="w-24 shrink-0">
                    {e.date}
                  </time>
                  <span className="w-24 shrink-0 text-amber-600">{e.type}</span>
                  <span className={`w-20 shrink-0 font-bold ${e.statusColor}`}>
                    {e.status}
                  </span>
                  <span className="w-32 shrink-0 truncate text-amber-100">
                    {e.target}
                  </span>
                  <span className="hidden truncate sm:inline">{e.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-6 text-amber-600">
            <div className="hidden flex-col text-right sm:flex">
              <span>DAEDALUS WORKSHOP</span>
              <span className="text-amber-500/40">{time}</span>
            </div>
            <div className="hidden h-8 w-px bg-amber-500/20 sm:block" />
            <Link
              href="/projects"
              className="text-amber-400 transition-colors hover:text-amber-300"
            >
              [ ALL PROJECTS ]
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        .event-row {
          animation: event-fade 0.6s ease-out;
        }
        @keyframes event-fade {
          0% { opacity: 0; transform: translateX(-8px); }
          100% { opacity: var(--final-opacity, 1); transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
