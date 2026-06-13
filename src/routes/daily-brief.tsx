import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Calendar,
  Code2,
  ExternalLink,
  FileText,
  Globe2,
  LayoutDashboard,
  Mic,
  Radio,
  Sparkles,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/daily-brief")({
  head: () => ({
    meta: [
      { title: "AI Sherpa — Daily Brief" },
      {
        name: "description",
        content: "A one-page intelligence brief generated from the latest AI Daily Brief newsletter.",
      },
    ],
  }),
  component: DailyBrief,
});

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Daily Brief", icon: FileText, href: "/daily-brief", active: true },
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

const sourceNewsletterUrl =
  "https://mail.google.com/mail/#all/19ebdbe368d4517f";

const brief = {
  date: "June 12, 2026",
  subject: "The AI Chart Everyone Is Getting Wrong",
  sender: "AI Daily Brief",
  generatedAt: "Latest Gmail issue sample",
  thesis:
    "The market is misreading falling token-price charts as an AI demand collapse. The stronger signal is a transition from subsidized, expensive frontier usage toward broader, cheaper, more efficient AI adoption, while infrastructure demand keeps expanding.",
  takeaways: [
    "SpaceX's expected public-market debut is becoming a benchmark for how investors may price future OpenAI and Anthropic listings.",
    "Bezos-backed Prometheus points to a new AI investment theme: acquiring or controlling physical industrial data, not just scraping digital data.",
    "China-linked AI corporate structures are under pressure as Meta unwinds Manus operations and startups reconsider offshore red-chip setups.",
    "AI infrastructure demand is still capacity constrained across chips, packaging, power, and data centers; the bottleneck is increasingly coordination, not just capital.",
    "Token price declines are not the same as token demand declines. Cheaper inference can expand usage faster than it compresses revenue.",
  ],
  stories: [
    {
      title: "The token chart panic is probably wrong",
      category: "AI Insider",
      summary:
        "The widely shared Silicon Data token chart measures average price paid per million tokens through third-party routers, not total token demand or total AI spend. That makes it more useful as a signal of routing behavior and model mix than as evidence that AI consumption is rolling over.",
      sources: ["Citadel Securities", "Silicon Data", "Ramp Economics Lab", "OpenRouter"],
    },
    {
      title: "AI infrastructure spending keeps moving higher",
      category: "Infrastructure",
      summary:
        "Goldman Sachs is arguing consensus AI capex forecasts are too low, with a base case near $1.1 trillion and a bull case near $1.4 trillion. Backlogs at hyperscalers and delays in data-center delivery support the view that peak AI infrastructure spending is not yet visible.",
      sources: ["Goldman Sachs", "Bloomberg", "Business Insider"],
    },
    {
      title: "KKR, NVIDIA, and Kuwait form a $10B data-center vehicle",
      category: "VC Signals",
      summary:
        "Helix Digital Infrastructure combines private capital, chip supply, sovereign backing, utility capacity, and operating leadership in one vehicle. The structure reflects a broader industry move toward full-stack infrastructure partnerships to overcome power and construction bottlenecks.",
      sources: ["The Information", "WSJ", "Adam Selipsky"],
    },
    {
      title: "Google explores Samsung for future TPU components",
      category: "Frontier AI Companies",
      summary:
        "Google is reportedly evaluating Samsung's 2nm process for parts of its next-generation TPU supply chain. The issue appears to be TSMC capacity rather than dissatisfaction, reinforcing the idea that AI chip demand is forcing multi-foundry strategies.",
      sources: ["The Information"],
    },
    {
      title: "Prometheus raises at a $41B valuation",
      category: "Frontier AI Companies",
      summary:
        "Jeff Bezos' AI startup Prometheus is positioned around an artificial general engineer for industrial design and manufacturing. The strategic implication is that physical-world data and production assets may become acquisition targets for AI companies.",
      sources: ["Bloomberg", "WSJ", "NYT", "CNBC"],
    },
    {
      title: "Meta completes operational split with Manus",
      category: "Geopolitics",
      summary:
        "Meta's Manus unwind shows how geopolitical pressure can directly reshape AI acquisitions, data access, and startup corporate structures. The broader signal is that China-linked AI companies may face rising friction when courting foreign capital or operating through offshore entities.",
      sources: ["The Information", "Bloomberg", "FT"],
    },
  ],
  sourceLinks: [
    { label: "Original Gmail issue", href: sourceNewsletterUrl },
    { label: "AI Daily Brief sender", href: "mailto:aidailybrief@mail.beehiiv.com" },
    { label: "TechCrunch AI", href: "https://techcrunch.com/category/artificial-intelligence/" },
    { label: "Ramp Economics Lab", href: "https://ramp.com/economics" },
    { label: "OpenRouter rankings", href: "https://openrouter.ai/rankings" },
  ],
};

function Sidebar() {
  return (
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
      <div className="px-5 py-4 text-xs text-muted-foreground">Gmail source: AI Daily Brief</div>
    </aside>
  );
}

function DailyBrief() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="min-w-0 flex-1 px-8 py-6">
        <div className="mb-6 flex items-start justify-between gap-6 border-b border-border pb-5">
          <div>
            <div className="text-sm text-muted-foreground">{brief.date} · {brief.sender}</div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">{brief.subject}</h1>
            <p className="mt-3 max-w-5xl text-base leading-relaxed text-muted-foreground">{brief.thesis}</p>
          </div>
          <div className="rounded-lg border border-border bg-card px-4 py-3 text-right text-xs text-muted-foreground">
            <div className="font-medium text-foreground">1-page brief</div>
            <div className="mt-1">Generated from newsletter text</div>
            <div>{brief.generatedAt}</div>
          </div>
        </div>

        <section className="grid grid-cols-[1.05fr_0.95fr] gap-5">
          <div className="space-y-5">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 text-xs font-semibold tracking-widest text-violet-400">WHAT MATTERS TODAY</div>
              <div className="space-y-3">
                {brief.takeaways.map((takeaway) => (
                  <div key={takeaway} className="flex gap-3 text-sm leading-relaxed">
                    <div className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                    <p className="text-muted-foreground">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground">SOURCE LINKS</div>
              <div className="grid grid-cols-2 gap-2">
                {brief.sourceLinks.map((source) => (
                  <a
                    key={source.label}
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-violet-500/50 hover:text-foreground"
                  >
                    <span>{source.label}</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground">TOP STORY CLUSTERS</div>
            <div className="space-y-4">
              {brief.stories.map((story) => (
                <article key={story.title} className="border-b border-border/70 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold leading-snug">{story.title}</h2>
                    <span className="shrink-0 rounded bg-violet-500/20 px-2 py-1 text-[10px] uppercase tracking-wider text-violet-300">
                      {story.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{story.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {story.sources.map((source) => (
                      <span key={source} className="rounded border border-border px-2 py-1 text-[11px] text-muted-foreground">
                        {source}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
