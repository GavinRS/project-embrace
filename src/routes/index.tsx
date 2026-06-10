import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, FileText, Building2, BookOpen, Sparkles, TrendingUp,
  Users, Code2, Radio, Video, Mic, Calendar, Globe2, Search, Settings,
  Plus, RefreshCw, Zap, Wifi, UserSquare2,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Sherpa — Intelligence Dashboard" },
      { name: "description", content: "Daily AI signals, market intelligence, and underrepresented insights for AI investors and operators." },
      { property: "og:title", content: "AI Sherpa — Intelligence Dashboard" },
      { property: "og:description", content: "Daily AI signals, market intelligence, and underrepresented insights." },
    ],
  }),
  component: Index,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Daily Brief", icon: FileText },
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

const topStories = [
  { n: 1, title: "NVIDIA unveils sovereign AI infrastructure blueprint", ago: "1h ago", body: "New reference architecture aims to standardize national-scale AI deployments." },
  { n: 2, title: "Anthropic ships Claude with native tool-use orchestration", ago: "2h ago", body: "Major step toward autonomous agents handling complex real-world workflows." },
  { n: 3, title: "TSMC raises N2 wafer pricing 8% for 2026 commitments", ago: "3h ago", body: "Strong demand and tight capacity support continued pricing power into next year." },
  { n: 4, title: "Meta releases Llama 4 tools for enterprise deployment", ago: "4h ago", body: "New tooling reduces friction for enterprise adoption of open-source models." },
  { n: 5, title: "New mech-interpetability paper: features in Claude generalize to deception", ago: "6h ago", body: "Study shows models can generalize deceptive behavior in new environments." },
];

function spark(seed: number, trend: number): { v: number }[] {
  const out: { v: number }[] = [];
  let v = 50;
  for (let i = 0; i < 24; i++) {
    v += Math.sin((i + seed) * 0.9) * 3 + trend + (Math.cos((i + seed) * 1.7) * 2);
    out.push({ v });
  }
  return out;
}

const watchlist = [
  { sym: "NVDA", name: "NVIDIA Corp.", pct: 3.24, data: spark(1, 0.6) },
  { sym: "TSM", name: "Taiwan Semi.", pct: 2.11, data: spark(2, 0.4) },
  { sym: "MSFT", name: "Microsoft Corp.", pct: 0.88, data: spark(3, 0.2) },
  { sym: "AMZN", name: "Amazon.com Inc.", pct: 0.67, data: spark(4, 0.15) },
  { sym: "AVGO", name: "Broadcom Inc.", pct: 1.95, data: spark(5, 0.5) },
  { sym: "PLTR", name: "Palantir Tech.", pct: -1.02, data: spark(6, -0.3) },
  { sym: "CRWD", name: "CrowdStrike", pct: -0.53, data: spark(7, -0.15) },
  { sym: "AI", name: "Global X AI ETF", pct: 4.12, data: spark(8, 0.75) },
];

const nvdaIntraday = Array.from({ length: 30 }, (_, i) => ({
  t: `${10 + Math.floor(i / 5)}${i % 5 === 0 ? "AM" : ""}`,
  v: 137.5 + Math.sin(i * 0.5) * 1.8 + i * 0.08 + Math.cos(i * 1.3) * 0.6,
}));

const nvdaStats: [string, string][] = [
  ["Open", "138.26"], ["High", "141.38"], ["Low", "137.85"],
  ["Volume", "265.4M"], ["Mkt Cap", "3.45T"], ["P/E", "55.21"],
  ["52W High", "153.13"], ["52W Low", "86.62"], ["Avg Vol", "298.7M"], ["EPS (TTM)", "2.55"],
];

const timeframes = ["1D", "1W", "1M", "3M", "6M", "YTD", "1Y", "2Y", "5Y", "ALL"];

const timeline = [
  { date: "Jun 3", text: "NVIDIA expands sovereign AI partnerships" },
  { date: "Jun 4", text: "OpenAI announces enterprise security upgrades" },
  { date: "Jun 5", text: "AMD unveils next-gen AI accelerator roadmap" },
  { date: "Jun 6", text: "Meta open-sources Llama 4 inference stack" },
  { date: "Jun 7", text: "New reasoning model benchmark released" },
  { date: "Jun 8", text: "TSMC confirms advanced packaging capacity boost" },
  { date: "Jun 9", text: "Anthropic ships native agent tool orchestration" },
];

const missing = [
  { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", title: "POWER BOTTLENECK", body: "Utilities and grid infrastructure are the real constraints on AI growth, but receive <5% of investor attention.", why: "Secures long-term capacity for AI expansion." },
  { icon: Wifi, color: "text-sky-400", bg: "bg-sky-500/10", title: "EDGE INFERENCE SHIFT", body: "Edge inference is accelerating faster than cloud in specific industries, but is largely overlooked by markets.", why: "Opens a new wave of hardware/software winners." },
  { icon: UserSquare2, color: "text-violet-400", bg: "bg-violet-500/10", title: "AI TALENT GEOGRAPHY", body: "AI talent is rapidly decentralizing beyond SF/NY/Seattle, but relocation trends are under-tracked.", why: "Impacts future innovation hubs and cost structures." },
];

function Sparkline({ data, positive }: { data: { v: number }[]; positive: boolean }) {
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
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#sg-${color})`} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card/40 flex flex-col">
        <div className="px-5 py-5 flex items-center gap-3">
          <div className="size-9 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 20L12 4l8 16M7 14h10" /></svg>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">AI SHERPA</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">INTELLIGENCE DASHBOARD</div>
          </div>
        </div>
        <nav className="px-3 mt-2 flex-1 space-y-0.5">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-violet-500/15 text-violet-200 border border-violet-500/30"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="px-5 py-4 text-xs text-muted-foreground flex items-center gap-2">
          <span>Last updated 2 min ago</span>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">Tuesday, June 9, 2026</div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search signals, tickers, themes..."
                className="w-80 bg-card border border-border rounded-md pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button className="size-9 rounded-md border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Settings className="size-4" />
            </button>
          </div>
        </div>

        {/* Today's Signal */}
        <section>
          <div className="text-xs font-semibold tracking-widest text-violet-400">TODAY'S SIGNAL</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Power infrastructure is becoming the primary bottleneck to AI expansion.
          </h1>
          <p className="mt-2 text-muted-foreground max-w-4xl">
            Surging data center buildouts are hitting power procurement and grid capacity limits, not compute constraints.
          </p>
          <div className="mt-4 h-px bg-border" />
        </section>

        {/* Top Stories */}
        <section>
          <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-3">TOP STORIES</div>
          <div className="grid grid-cols-5 gap-3">
            {topStories.map((s) => (
              <article key={s.n} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-2">
                  <div className="size-7 rounded-md bg-violet-500/20 text-violet-300 flex items-center justify-center text-sm font-semibold">{s.n}</div>
                  <h3 className="text-sm font-semibold leading-snug">{s.title}</h3>
                </div>
                <div className="mt-3 text-xs text-violet-400">{s.ago}</div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Watchlist + NVDA */}
        <section className="grid grid-cols-2 gap-4">
          {/* Watchlist */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold tracking-widest text-muted-foreground">WATCHLIST</div>
              <button className="size-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
                <Plus className="size-3.5" />
              </button>
            </div>
            <ul className="divide-y divide-border/60">
              {watchlist.map((w) => {
                const pos = w.pct >= 0;
                return (
                  <li key={w.sym} className="grid grid-cols-[1fr_120px_80px] items-center gap-4 py-3">
                    <div>
                      <div className="text-sm font-semibold">{w.sym}</div>
                      <div className="text-xs text-muted-foreground">{w.name}</div>
                    </div>
                    <div className="h-8"><Sparkline data={w.data} positive={pos} /></div>
                    <div className={`text-right text-sm font-medium ${pos ? "text-emerald-400" : "text-red-400"}`}>
                      {pos ? "+" : ""}{w.pct.toFixed(2)}%
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Last updated 2 min ago</span>
              <button className="size-6 rounded-md border border-border flex items-center justify-center hover:text-foreground">
                <RefreshCw className="size-3" />
              </button>
            </div>
          </div>

          {/* NVIDIA */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">NVIDIA Corp.</span>
                  <span className="text-xs text-muted-foreground">NVDA</span>
                  <span className="text-[10px] uppercase tracking-wider bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded">Semiconductors</span>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">140.72</span>
                  <span className="text-emerald-400 text-sm font-medium">+3.24%</span>
                  <span className="text-emerald-400/70 text-sm">(4.41)</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">At close · USD</div>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_140px] gap-6 mt-4">
              <div>
                <div className="flex gap-1 text-xs mb-2">
                  {timeframes.map((t) => (
                    <button key={t} className={`px-2 py-1 rounded ${t === "1D" ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
                  ))}
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={nvdaIntraday} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
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
              <div className="space-y-2 text-xs pt-7">
                {nvdaStats.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="text-xs font-semibold tracking-widest text-muted-foreground mb-6">AI TIMELINE (LAST 7 DAYS)</div>
          <div className="relative">
            <div className="absolute left-0 right-0 top-3 h-px bg-violet-500/40" />
            <div className="grid grid-cols-7 gap-2 relative">
              {timeline.map((t) => (
                <div key={t.date} className="flex flex-col items-center text-center">
                  <div className="text-[10px] text-violet-400 mb-1">{t.date}</div>
                  <div className="size-3 rounded-full bg-card border-2 border-violet-400 z-10" />
                  <div className="mt-3 text-xs text-muted-foreground px-2 leading-snug">{t.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you're missing */}
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4">
            <span className="text-xs font-semibold tracking-widest text-muted-foreground">WHAT YOU'RE MISSING</span>
            <span className="text-xs text-muted-foreground ml-2">(Underrepresented Insights)</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {missing.map(({ icon: Icon, color, bg, title, body, why }) => (
              <div key={title} className="rounded-lg border border-border bg-background/40 p-4">
                <div className="flex items-start gap-3">
                  <div className={`size-10 rounded-full ${bg} flex items-center justify-center ${color}`}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold tracking-wide ${color}`}>{title}</div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{body}</p>
                    <p className="mt-2 text-xs"><span className="text-violet-400 font-medium">Why it matters:</span> <span className="text-muted-foreground">{why}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
