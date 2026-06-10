
# AI Sherpa — Intelligence Dashboard

Recreate the screenshot as a single-page dark dashboard at `/`, with the watchlist moved into the main content area where the AI Infrastructure Index was, and the AI Infrastructure Index removed entirely.

## Layout

```
┌──────────┬──────────────────────────────────────────────┐
│ Sidebar  │ Date + TODAY'S SIGNAL headline + subhead     │
│ (logo,   │ TOP STORIES — 5 numbered cards (horiz)       │
│  nav)    │ ┌────────────────────┬────────────────────┐│
│          │ │ WATCHLIST          │ NVIDIA quote +     ││
│          │ │ ticker list +      │ chart + stats      ││
│          │ │ sparklines         │                    ││
│          │ └────────────────────┴────────────────────┘│
│          │ AI TIMELINE (last 7 days) — horizontal       │
│          │ WHAT YOU'RE MISSING — 3 insight cards        │
└──────────┴──────────────────────────────────────────────┘
```

## Sections

- **Sidebar (left, ~260px)**: "AI SHERPA / INTELLIGENCE DASHBOARD" logo block, nav (Dashboard active w/ purple highlight, Daily Brief, Frontier AI Companies, Research Papers, AI Insider, VC Signals, Talent Flow Intelligence, Open Source Intelligence, Social Signal Monitoring, Video Sources, Podcasts, Conferences / Events, Geopolitics). NO watchlist here.
- **Header row**: date string left, search input + settings icon right.
- **Today's Signal**: purple eyebrow, large headline, muted subhead.
- **Top Stories**: 5 cards in a row, each with purple numbered badge, title, "Xh ago" purple meta, description.
- **Watchlist card (left half of main charts row)**: "WATCHLIST" title with + button. Tickers (NVDA, TSM, MSFT, AMZN, AVGO, PLTR, CRWD, AI) each with name, full company name, mini sparkline (~100×30), and % change colored green/red. Footer: "Last updated 2 min ago" + refresh icon.
- **NVIDIA Corp card (right half of main charts row)**: ticker, "Semiconductors" purple chip, large price 140.72 with +3.24% green, timeframe pills, intraday green area chart, right-side stats column (Open/High/Low/Volume/Mkt Cap/P/E/52W H/L/Avg Vol/EPS).
- **AI Timeline**: horizontal line with 7 dated nodes and short captions.
- **What You're Missing**: 3 cards (Power Bottleneck/orange, Edge Inference Shift/blue, AI Talent Geography/purple) each with icon, title, body, "Why it matters" line.

## Technical

- Single route `src/routes/index.tsx`; extract section components under `src/components/dashboard/`.
- Dark theme: update `src/styles.css` `:root` to dark palette (near-black bg `oklch(0.16 0.01 270)`, card slightly lighter, purple primary `oklch(0.62 0.22 295)`, green accent for charts). Apply `dark` class on `<html>` in `__root.tsx`.
- Charts: use `recharts` `AreaChart` with green gradient fill for intraday; static mock data arrays.
- Sparklines in watchlist: small `recharts` Line/Area, ~100×30, colored by sign.
- Icons: `lucide-react`.
- All data is hard-coded mock matching the screenshot text. No backend.
- Update `<title>` and meta to "AI Sherpa — Intelligence Dashboard".
- Desktop-first; not focusing on mobile responsiveness since screenshot is a wide dashboard.
