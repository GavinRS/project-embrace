import type {
  DashboardData,
  SparkPoint,
  StockDetail,
  StockPoint,
  TimelineItem,
  TopStory,
  WatchlistItem,
} from "./dashboard-types";

const TECHCRUNCH_AI_FEED = "https://techcrunch.com/category/artificial-intelligence/feed/";
const YAHOO_CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";
const WATCHLIST_SYMBOLS = ["NVDA", "TSM", "MSFT", "AMZN", "AVGO", "PLTR", "CRWD", "AI"];

const SOURCE_TIMEOUT_MS = 6500;

const fallbackStories: TopStory[] = [
  {
    n: 1,
    title: "TechCrunch AI feed is temporarily unavailable",
    ago: "Cached",
    body: "The dashboard will retry TechCrunch on the next refresh and keep market data visible.",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    source: "TechCrunch",
    publishedAt: new Date().toISOString(),
  },
  {
    n: 2,
    title: "AI funding, products, and infrastructure remain the dashboard focus",
    ago: "Cached",
    body: "Top stories will come from TechCrunch's artificial intelligence category feed.",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    source: "TechCrunch",
    publishedAt: new Date().toISOString(),
  },
  {
    n: 3,
    title: "Live source layer is active",
    ago: "Cached",
    body: "Server-side fetching keeps browser code free of third-party endpoints and API secrets.",
    url: "https://techcrunch.com/category/artificial-intelligence/",
    source: "TechCrunch",
    publishedAt: new Date().toISOString(),
  },
];

function spark(seed: number, trend: number): SparkPoint[] {
  const out: SparkPoint[] = [];
  let v = 50;
  for (let i = 0; i < 24; i++) {
    v += Math.sin((i + seed) * 0.9) * 3 + trend + Math.cos((i + seed) * 1.7) * 2;
    out.push({ v });
  }
  return out;
}

const fallbackWatchlist: WatchlistItem[] = [
  { sym: "NVDA", name: "NVIDIA Corp.", pct: 3.24, price: 140.72, data: spark(1, 0.6) },
  { sym: "TSM", name: "Taiwan Semiconductor", pct: 2.11, price: 186.12, data: spark(2, 0.4) },
  { sym: "MSFT", name: "Microsoft Corp.", pct: 0.88, price: 472.13, data: spark(3, 0.2) },
  { sym: "AMZN", name: "Amazon.com Inc.", pct: 0.67, price: 214.77, data: spark(4, 0.15) },
  { sym: "AVGO", name: "Broadcom Inc.", pct: 1.95, price: 241.09, data: spark(5, 0.5) },
  { sym: "PLTR", name: "Palantir Tech.", pct: -1.02, price: 74.25, data: spark(6, -0.3) },
  { sym: "CRWD", name: "CrowdStrike", pct: -0.53, price: 367.2, data: spark(7, -0.15) },
  { sym: "AI", name: "C3.ai Inc.", pct: 4.12, price: 28.14, data: spark(8, 0.75) },
];

const fallbackStock: StockDetail = {
  symbol: "NVDA",
  name: "NVIDIA Corp.",
  sector: "Semiconductors",
  price: 140.72,
  pct: 3.24,
  change: 4.41,
  currency: "USD",
  marketState: "At close",
  chart: Array.from({ length: 30 }, (_, i) => ({
    t: `${10 + Math.floor(i / 5)}${i % 5 === 0 ? "AM" : ""}`,
    v: 137.5 + Math.sin(i * 0.5) * 1.8 + i * 0.08 + Math.cos(i * 1.3) * 0.6,
  })),
  stats: [
    ["Open", "138.26"],
    ["High", "141.38"],
    ["Low", "137.85"],
    ["Volume", "265.4M"],
    ["Mkt Cap", "3.45T"],
    ["P/E", "55.21"],
    ["52W High", "153.13"],
    ["52W Low", "86.62"],
    ["Avg Vol", "298.7M"],
    ["EPS (TTM)", "2.55"],
  ],
};

function stripHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getTag(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? stripHtml(match[1]) : "";
}

function getLink(item: string): string {
  const guid = getTag(item, "guid");
  const link = getTag(item, "link");
  return link || guid || "https://techcrunch.com/category/artificial-intelligence/";
}

function formatAgo(publishedAt: string): string {
  const then = new Date(publishedAt).getTime();
  if (Number.isNaN(then)) return "Recent";

  const diffMinutes = Math.max(1, Math.round((Date.now() - then) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function formatDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatUpdatedAtSeconds(value: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value * 1000));
}

function compactNumber(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "N/A";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function money(value: unknown): string {
  if (typeof value !== "number" || !Number.isFinite(value)) return "N/A";
  return value.toFixed(value >= 100 ? 2 : 3);
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SOURCE_TIMEOUT_MS);

  try {
    return await fetch(url, {
      headers: {
        "accept": "application/json,text/xml,application/rss+xml,*/*",
        "user-agent": "AI Sherpa Dashboard/1.0",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function getTechCrunchStories(): Promise<TopStory[]> {
  try {
    const response = await fetchWithTimeout(TECHCRUNCH_AI_FEED);
    if (!response.ok) throw new Error(`TechCrunch returned ${response.status}`);

    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 5);
    const stories = items.map((match, index) => {
      const item = match[1];
      const publishedAt = getTag(item, "pubDate") || new Date().toISOString();
      const body = getTag(item, "description") || getTag(item, "content:encoded");

      return {
        n: index + 1,
        title: getTag(item, "title") || "Untitled TechCrunch story",
        ago: formatAgo(publishedAt),
        body: body.slice(0, 150),
        url: getLink(item),
        source: "TechCrunch",
        publishedAt: new Date(publishedAt).toISOString(),
      };
    });

    return stories.length > 0 ? stories : fallbackStories;
  } catch (error) {
    console.error("Failed to fetch TechCrunch AI feed", error);
    return fallbackStories;
  }
}

type YahooChartQuote = {
  symbol: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  previousClose?: number;
  chartPreviousClose?: number;
  regularMarketDayHigh?: number;
  regularMarketDayLow?: number;
  regularMarketVolume?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  currency?: string;
  regularMarketTime?: number;
};

type YahooChartData = {
  meta: YahooChartQuote;
  chart: StockPoint[];
  closes: number[];
};

async function getYahooChartData(symbol: string): Promise<YahooChartData> {
  const url = `${YAHOO_CHART_URL}/${encodeURIComponent(symbol)}?range=1d&interval=5m`;
  const response = await fetchWithTimeout(url);
  if (!response.ok) throw new Error(`Yahoo chart returned ${response.status}`);

  const data = await response.json();
  const result = data?.chart?.result?.[0];
  const timestamps: number[] = result?.timestamp ?? [];
  const closes: Array<number | null> = result?.indicators?.quote?.[0]?.close ?? [];

  const points = timestamps
    .map((timestamp, index) => ({ timestamp, value: closes[index] }))
    .filter((point): point is { timestamp: number; value: number } => typeof point.value === "number")
    .slice(-40)
    .map((point) => ({
      t: new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(point.timestamp * 1000)),
      v: point.value,
    }));

  return {
    meta: result?.meta ?? { symbol },
    chart: points,
    closes: closes.filter((value): value is number => typeof value === "number"),
  };
}

function getQuoteChange(meta: YahooChartQuote): { change: number; pct: number } {
  const price = meta.regularMarketPrice;
  const previousClose = meta.previousClose ?? meta.chartPreviousClose;

  if (typeof price !== "number" || typeof previousClose !== "number" || previousClose === 0) {
    return { change: 0, pct: 0 };
  }

  const change = price - previousClose;
  return {
    change,
    pct: (change / previousClose) * 100,
  };
}

async function getYahooMarketData(): Promise<{ watchlist: WatchlistItem[]; stock: StockDetail }> {
  try {
    const charts = await Promise.all(WATCHLIST_SYMBOLS.map((symbol) => getYahooChartData(symbol)));
    const bySymbol = new Map(charts.map((chart) => [chart.meta.symbol, chart]));

    const watchlist = WATCHLIST_SYMBOLS.map((symbol, index) => {
      const chartData = bySymbol.get(symbol);
      const quote = chartData?.meta;
      const { pct } = quote ? getQuoteChange(quote) : { pct: fallbackWatchlist[index].pct };

      return {
        sym: symbol,
        name: quote?.shortName || quote?.longName || fallbackWatchlist[index].name,
        pct,
        price: quote?.regularMarketPrice ?? fallbackWatchlist[index].price,
        data: spark(index + 1, pct / 8),
      };
    });

    const nvdaData = bySymbol.get("NVDA");
    const nvda = nvdaData?.meta;
    const { change, pct } = nvda ? getQuoteChange(nvda) : { change: fallbackStock.change, pct: fallbackStock.pct };
    const open = nvdaData?.closes[0] ?? fallbackStock.stats[0][1];

    const stock: StockDetail = {
      symbol: "NVDA",
      name: nvda?.shortName || nvda?.longName || fallbackStock.name,
      sector: "Semiconductors",
      price: nvda?.regularMarketPrice ?? fallbackStock.price,
      pct,
      change,
      currency: nvda?.currency || fallbackStock.currency,
      marketState: "Delayed",
      chart: nvdaData && nvdaData.chart.length > 0 ? nvdaData.chart : fallbackStock.chart,
      stats: [
        ["Open", typeof open === "number" ? money(open) : open],
        ["High", money(nvda?.regularMarketDayHigh)],
        ["Low", money(nvda?.regularMarketDayLow)],
        ["Volume", compactNumber(nvda?.regularMarketVolume)],
        ["Prev Close", money(nvda?.previousClose ?? nvda?.chartPreviousClose)],
        ["Updated", nvda?.regularMarketTime ? formatUpdatedAtSeconds(nvda.regularMarketTime) : "N/A"],
        ["52W High", money(nvda?.fiftyTwoWeekHigh)],
        ["52W Low", money(nvda?.fiftyTwoWeekLow)],
      ],
    };

    return { watchlist, stock };
  } catch (error) {
    console.error("Failed to fetch Yahoo Finance data", error);
    return { watchlist: fallbackWatchlist, stock: fallbackStock };
  }
}

function getTimeline(stories: TopStory[]): TimelineItem[] {
  return stories.slice(0, 7).map((story) => ({
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(story.publishedAt)),
    text: story.title,
  }));
}

function getSignal(stories: TopStory[]): DashboardData["signal"] {
  const leadStory = stories[0] ?? fallbackStories[0];
  return {
    title: leadStory.title,
    body: `Lead AI signal from TechCrunch: ${leadStory.body}`,
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const [stories, market] = await Promise.all([getTechCrunchStories(), getYahooMarketData()]);

  return {
    currentDate: formatDateLabel(new Date()),
    updatedAt: new Date().toISOString(),
    signal: getSignal(stories),
    topStories: stories,
    watchlist: market.watchlist,
    stock: market.stock,
    timeline: getTimeline(stories),
  };
}
