import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BookOpen,
  Building2,
  Calendar,
  Code2,
  FileText,
  Globe2,
  LayoutDashboard,
  Mic,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

import { getDashboardSnapshot } from "../lib/api/dashboard.functions";
import type { DashboardData, SparkPoint } from "../lib/dashboard-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Sherpa — Intelligence Dashboard" },
      {
        name: "description",
        content:
          "Daily AI signals, market intelligence, and underrepresented insights for AI investors and operators.",
      },
      { property: "og:title", content: "AI Sherpa — Intelligence Dashboard" },
      {
        property: "og:description",
        content: "Daily AI signals, market intelligence, and underrepresented insights.",
      },
    ],
  }),
  loader: async () => getDashboardSnapshot(),
  component: Index,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/", active: true },
  { label: "Daily Brief", icon: FileText, href: "/daily-brief" },
  { label: "Frontier AI Companies", icon: Building2 },
  { label: "Research Papers", icon: BookOpen },
  { label: "AI Insider", icon: Sparkles },
  { label: "VC Signals", icon: TrendingUp },
  { label: "Talent Flow Intelligence", icon: Users },
  { label: "Open Source Intelligence", icon: Code2 },
  { label: "Social Signal Monitoring", icon: Radio },
  { label: "Video Sources", icon: Video },
  { label: "Podcasts", icon: Mic },
  { label: "Conferences / Events", icon: Calendar },
  { label: "Geopolitics", icon: Globe2 },
];

const timeframes = ["1D", "1W", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y", "ALL"];

function formatUpdatedAt(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function Sparkline({ data, positive }: { data: SparkPoint[]; positive: boolean }) {
  const color = positive ? "#22c55e" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={32}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#sg-${color})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Index() {
  const dashboard = Route.useLoaderData() as DashboardData;
  const { currentDate, signal, topStories, watchlist, stock, timeline } = dashboard;
  const stockPositive = stock.pct >= 0;
  const stockAccent = stockPositive ? "text-emerald-400" : "text-red-400";
  const stockAccentMuted = stockPositive ? "text-emerald-400/70" : "text-red-400/70";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card/40">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700">
            <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 20L12 4l8 16M7 14h10" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">AI SHERPA</div>
            <div className="text-[10px] tracking-widest text-muted-foreground">INTELLIGENCE DASHBOARD</div>
          </div>
        </div>
        <nav className="mt-2 flex-1 space-y-0.5 px-3">
          {navItems.map(({ label, icon: Icon, href, active }) => {
            const className = `flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active
                ? "border border-violet-500/30 bg-violet-500/15 text-violet-200"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            }`;

            if (href) {
              return (
                <a key={label} href={href} className={className}>
                  <Icon className="size-4" />
                  <span>{label}</span>
                </a>
              );
            }

            return (
              <button key={label} className={className}>
                <Icon className="size-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 px-5 py-4 text-xs text-muted-foreground">
          <span>Last updated {formatUpdatedAt(dashboard.updatedAt)}</span>
        </div>
      </aside>

      <main className="min-w-0 flex-1 space-y-6 px-8 py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">{currentDate}</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search signals, tickers, themes..."
                className="w-80 rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground">
              <Settings className="size-4" />
            </button>
          </div>
        </div>

        <section>
          <div className="text-xs font-semibold tracking-widest text-violet-400">TODAY'S SIGNAL</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{signal.title}</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">{signal.body}</p>
          <div className="mt-4 h-px bg-border" />
        </section>

        <section>
          <div className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">TOP STORIES</div>
          <div className="grid grid-cols-5 gap-3">
            {topStories.map((story) => (
              <a
                key={story.url}
                href={story.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-violet-500/50 hover:bg-card/80"
              >
                <div className="flex items-start gap-2">
                  <div className="flex size-7 items-center justify-center rounded-md bg-violet-500/20 text-sm font-semibold text-violet-300">
                    {story.n}
                  </div>
                  <h3 className="text-sm font-semibold leading-snug">{story.title}</h3>
                </div>
                <div className="mt-3 text-xs text-violet-400">{story.source} · {story.ago}</div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{story.body}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-semibold tracking-widest text-muted-foreground">WATCHLIST</div>
              <button className="flex size-6 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground">
                <Plus className="size-3.5" />
              </button>
            </div>
            <ul className="divide-y divide-border/60">
              {watchlist.map((item) => {
                const positive = item.pct >= 0;
                return (
                  <li key={item.sym} className="grid grid-cols-[1fr_120px_80px] items-center gap-4 py-3">
                    <div>
                      <div className="text-sm font-semibold">{item.sym}</div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                    </div>
                    <div className="h-8">
                      <Sparkline data={item.data} positive={positive} />
                    </div>
                    <div className={`text-right text-sm font-medium ${positive ? "text-emerald-400" : "text-red-400"}`}>
                      {positive ? "+" : ""}{item.pct.toFixed(2)}%
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Yahoo Finance · updated {formatUpdatedAt(dashboard.updatedAt)}</span>
              <button className="flex size-6 items-center justify-center rounded-md border border-border hover:text-foreground">
                <RefreshCw className="size-3" />
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{stock.name}</span>
                  <span className="text-xs text-muted-foreground">{stock.symbol}</span>
                  <span className="rounded bg-violet-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet-300">
                    {stock.sector}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">{stock.price.toFixed(2)}</span>
                  <span className={`${stockAccent} text-sm font-medium`}>{stockPositive ? "+" : ""}{stock.pct.toFixed(2)}%</span>
                  <span className={`${stockAccentMuted} text-sm`}>({stockPositive ? "+" : ""}{stock.change.toFixed(2)})</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{stock.marketState} · {stock.currency} · Yahoo Finance</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_140px] gap-6">
              <div>
                <div className="mb-2 flex gap-1 text-xs">
                  {timeframes.map((frame) => (
                    <button key={frame} className={`rounded px-2 py-1 ${frame === "1D" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {frame}
                    </button>
                  ))}
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stock.chart} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="nvdaG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="t" tick={{ fontSize: 10, fill: "oklch(0.65 0.02 270)" }} axisLine={false} tickLine={false} interval={4} />
                      <YAxis orientation="right" tick={{ fontSize: 10, fill: "oklch(0.65 0.02 270)" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} width={40} />
                      <Tooltip contentStyle={{ background: "#1a1a23", border: "1px solid #2a2a35", borderRadius: 6, fontSize: 12 }} />
                      <Area type="monotone" dataKey="v" stroke="#22c55e" strokeWidth={1.5} fill="url(#nvdaG)" isAnimationActive={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-2 pt-7 text-xs">
                {stock.stats.map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-6 text-xs font-semibold tracking-widest text-muted-foreground">AI TIMELINE (LAST 7 DAYS)</div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-px bg-violet-500/40" />
            <div className="relative grid grid-cols-7 gap-2">
              {timeline.map((item) => (
                <div key={`${item.date}-${item.text}`} className="flex flex-col items-center text-center">
                  <div className="mb-1 text-[10px] text-violet-400">{item.date}</div>
                  <div className="z-10 size-3 rounded-full border-2 border-violet-400 bg-card" />
                  <div className="mt-3 px-2 text-xs leading-snug text-muted-foreground">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
