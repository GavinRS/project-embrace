export type TopStory = {
  n: number;
  title: string;
  ago: string;
  body: string;
  url: string;
  source: string;
  publishedAt: string;
};

export type SparkPoint = {
  v: number;
};

export type WatchlistItem = {
  sym: string;
  name: string;
  pct: number;
  price: number | null;
  data: SparkPoint[];
};

export type StockPoint = {
  t: string;
  v: number;
};

export type StockDetail = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  pct: number;
  change: number;
  currency: string;
  marketState: string;
  chart: StockPoint[];
  stats: [string, string][];
};

export type TimelineItem = {
  date: string;
  text: string;
};

export type DashboardData = {
  currentDate: string;
  updatedAt: string;
  signal: {
    title: string;
    body: string;
  };
  topStories: TopStory[];
  watchlist: WatchlistItem[];
  stock: StockDetail;
  timeline: TimelineItem[];
};
