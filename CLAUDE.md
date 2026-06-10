# Andara / BAC Aviation — Project Guide for Claude

## Project Overview
This is a React + Vite web app (TypeScript, Tailwind, shadcn/ui) deployed on Vercel.
Static terminal-style pages live in `public/` and are served via rewrites in `vercel.json`.

The four React-rendered marketing pages (Home, Credit Intelligence, Fleet Watch, Who We Are) all use a single shared **Bloomberg-terminal aesthetic** — dark canvas, amber accents, monospace data, terminal panels. See "Marketing site — terminal aesthetic" below before editing any of them.

---

## Marketing site — terminal aesthetic

The four React pages — `/`, `/credit-intelligence`, `/fleetwatch`, `/who-we-are` (alias of `/who-we-serve`) — share one chrome and one design language. Source of truth lives in `src/components/terminal/TerminalChrome.tsx`. Do not introduce a second chrome — extend the shared one.

### Design system

| Token | Value | Use |
|---|---|---|
| `--fw-bg` | `#08090B` | Page canvas |
| `--fw-bg-2` | `#0D0F12` | Alternating section background |
| `--fw-panel` / `--fw-panel-2` | `#101317` / `#15191E` | Terminal panel + panel header |
| `--fw-border` / `--fw-border-bright` | `#23282F` / `#2E353E` | Panel borders, dividers |
| `--fw-amber` / `--fw-amber-dim` | `#FF9A1F` / `#C9791A` | Brand accent, CTAs, eyebrows |
| `--fw-text` / `--fw-text-2` / `--fw-text-3` | `#E9EAEC` / `#9AA1AB` / `#636A74` | Body / secondary / tertiary text |
| `--fw-up` / `--fw-down` | `#3DD68C` / `#FF5C5C` | Tickers, status indicators |

**Three type families** (loaded in `index.html`):
- **Schibsted Grotesk** (`--fw-fd`) — display, headlines, panel titles
- **Hanken Grotesk** (`--fw-fb`) — body, default page font
- **IBM Plex Mono** (`--fw-fm`) — labels, codes, tickers, eyebrows

### Shared components in `TerminalChrome.tsx`

| Export | Use |
|---|---|
| `<TerminalChrome>` | Wraps a page — injects CSS, status bar, nav, ticker, arRise observer, footer |
| `<StatusBar>` | Top black bar with live UTC clock + Andara Market Index |
| `<Nav>` | Sticky nav with brand glyph, nav links (active-aware), `Request Briefing` CTA |
| `<Ticker>` | Scroll-revealed ticker tape (only shows below 60% viewport) |
| `<TerminalFooter>` | Dark footer with sitemap and contact |
| `<CtaBand title body>` | Reusable bottom-of-page CTA section |
| `<ArrowRightIcon>` | Inline arrow used in primary CTA buttons |

### Building a new section inside a page

Each page is just `<TerminalChrome>{...sections}</TerminalChrome>`. Use the CSS primitives already defined:

- `.fw-hero` + `.fw-hero-grid` — 1.05fr/.95fr split (text left, panel right). Add `.fw-grid-bg` + `.fw-glow` inside for the standard grid-and-orange-glow backdrop.
- `.fw-panel` + `.fw-ph` — bordered terminal panel with header bar (amber bullet + uppercase mono title).
- `.fw-metrics` + `.fw-metrics-grid` + `.fw-metric` — 4-cell stat strip; use `.lbl` (mono label) / `.num` (big display) / `.mcap` (caption).
- `.fw-block` — 110px padding section. `.fw-block.tight` for 80px.
- `.fw-sec-head` — 2-col head with eyebrow+h2 on left, `.desc` on right.
- `.fw-cap-grid` + `.fw-cap` — 2-col capability cards with `.ph` header + `.body` + `.go` chevron.
- `.fw-pillars` + `.fw-pillar` — numbered principle/approach list.
- `.fw-sectors-grid` + `.fw-sector` (`.fw-col-7` / `.fw-col-5` / `.fw-col-6`) — image/segment cards with `.veil` gradient and `.s-tag`/`.s-body`.
- `.fw-verdicts` + `.fw-verdict-card` (`.deploy` / `.watch` / `.deny`) — Deploy / Watch / Do Not Deploy trio.
- `.fw-score-tabs` — 5-column code tabs (used for the 5-Score on Credit Intelligence).
- `.fw-arRise` — wrap any element to fade-and-rise on scroll into view.

### CTA buttons

- `.fw-btn-primary` — large amber-on-black; use for hero/CTA-band primary actions.
- `.fw-btn-ghost` — bottom-bordered ghost; use for secondary actions.
- `.fw-cta` — small amber pill used by the nav (rendered inside `<Nav>`).

All button text is `#000` and forced via `a.fw-btn-primary` / `button.fw-btn-primary` specificity to win over the global `a { color: inherit }` rule. Don't add `<GO>` suffix back to the nav `.fw-cta` — it was removed intentionally.

### Navigation + CTA

- Nav labels live in `src/lib/content.ts → NAV_ITEMS`. Current set: **Credit Intelligence · Fleet Watch · Who We Are**. Keep that exact casing.
- The nav CTA reads **Request Briefing** (no "a"). Defined in `CONTENT.hero.primaryCta`.
- Routes: `/credit-intelligence`, `/fleetwatch`, `/who-we-are` (with `/who-we-serve` retained as an alias in `App.tsx`).

### Page-specific notes

- **Homepage (`Index.tsx`)** — hero monitor uses generic platform-activity placeholders (`VERDICT 412`, `VISIT 1284`, `ALERT 037`). Never list real airline names with verdict labels here — that's a defamation risk and verdicts are confidential per PRD §3.2.4. The Andara Intelligence Report subscribe section lives at `#subscribe`; form submit is currently stubbed (600ms delay → success state) — wire to a real endpoint when ready.
- **Credit Intelligence (`CreditIntelligence.tsx`)** — 5-Score names + weights must match PRD §3.3.6 exactly (see "Copy accuracy" below).
- **Fleet Watch (`FleetWatch.tsx`)** — cadence is **quarterly**, not monthly (PRD §3.4.5, §3.6). AOG-class alerts are dispatched **off-cycle** between reports. The sample bars in the report panel use FleetWatch indicators (COND/DOCS/MAINT/REG/ANOM), not the 5-Score letters.
- **Who We Are (`WhoWeServe.tsx`)** — file is named `WhoWeServe.tsx` for legacy reasons; the page itself is Who We Are. Hero has a "What Andara is not" panel on the right.

---

## Copy accuracy — PRD-verified terms

All factual claims on the marketing site must trace back to `Andara_Master_Build_PRD_v1_5.md`. The audit below is the canonical reference — update it if the PRD changes.

### 5-Score dimensions (PRD §3.3.6)

| Code | Name | Weight |
|---|---|---|
| SVS | Strategic Value Score | 15 |
| PPS | Payment Priority Score | 25 |
| APS | Airline Performance Score | 20 |
| RCS | Risk Containment Score | 25 |
| RAS | Redeployment Suitability Score | 15 |

Never use the older names ("Safety & Viability", "Payment Performance", etc.) — they were wrong.

### Verdict classes (PRD + AIR Issue 001)

Exactly three: **Deploy · Watch · Do Not Deploy**. Off-cycle interim notices are called **Watch Notes**.

### FleetWatch cadence

- Reports are **quarterly** (PRD §3.4.5: "Quarterly report generator"; §3.6: "First FleetWatch quarterly report shipped to Fidelity Bank"). Never write "monthly" or "12× a year".
- **AOG-class alerts** dispatch off-cycle between reports (PRD §3.2.7, §3.4.5).
- Pricing reference: 1% of aircraft value per annum (from AIR Issue 001) vs. 8–15% information discount at remarketing.

### Geographic scope

- **Milestone 1 (now):** Nigerian commercial AOCs only (PRD §3.4.1).
- **Milestone 2:** Pan-African coverage.
- **Milestone 3:** Continental + open platform (Enterprise API, Watch Index, Bizjet).

Do not claim "47 markets" or "pan-African" as current state — they're aspirational.

### Numbers that do NOT have PRD backing (do not put back on the site)

- `120+ carriers scored`, `3,400+ counterparties polled`, `$24B aircraft monitored`, `90d refresh cycle`, `12× a year inspections`, `47 markets covered`. All were invented in earlier drafts and removed.

### Product names

- **Arbiter** is the internal name; **Credit Intelligence** is the external/portal name (PRD §3.2.4). Both can appear externally; prefer "Credit Intelligence" in user-facing copy.
- **FleetWatch** (one word, internal CamelCase) / **Fleet Watch** (two words, nav label). Pick one per surface; keep it consistent within that surface.
- **AIR** — Andara Intelligence Report. Sections are tagged **Signal / Financial Translation / Capital Action** (PRD §3.4.6). Andara analysis vs. reported fact is labelled **Andara Analytical View** (AAV).

### What governance looks like

Every verdict approved by the **Scoring Committee**; methodology changes gated by committee sign-off (PRD §3.3.6, §4.3.5). Reference "SC" or "Scoring Committee" in copy that talks about how verdicts get made.

---

## Terminal app — design system and conventions

The `/credit-intelligence/africa` page is now a substantial app in its own right. The standalone HTML export from the design tool was kept as a starting point, but the carrier profile, Market Overview, Monitoring tab, and Andara Signal panel have all been redesigned in place. Future work must preserve the conventions below.

### Canvas + palette

Pure-black canvas with layered near-black surfaces. Set in `:root`.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000` | Page canvas / app frame |
| `--bg4` | `#070809` | Sidebar |
| `--bg2` | `#0b0d10` | Panels |
| `--bg3` | `#13161c` | Raised rows / hover |
| `--line` / `--line2` / `--line3` | `#1e232b` / `#2a313c` / `#343c49` | Borders |
| `--amber` | `#e8a23a` | Brand accent (desaturated for night canvas) |
| `--deploy` | `#6bb38a` | Deploy verdict |
| `--watch` | `#d6a85a` | Watch verdict |
| `--dnd` | `#c97474` | Do Not Deploy verdict |
| `--info` | `#7c9fc7` | Informational accent |

Every verdict / status colour is intentionally desaturated. Do not push them back toward the original Bloomberg-bright hues.

### Ink tiers — WCAG AA on pure black

| Token | Value | Contrast vs #000 | Use |
|---|---|---|---|
| `--t1` | `#f2f5fa` | ~19:1 | Body text |
| `--t2` | `#c2cad8` | ~11:1 | Secondary text |
| `--t3` | `#a4adba` | ~8.4:1 (AAA) | Eyebrows, sub-labels |
| `--t4` | `#8a93a3` | ~5.6:1 (AA) | Faded meta |
| `--display` | `rgba(255,255,255,0.92)` | ~17:1 | Big display text (titles, large numbers) |

The old palette (`--t3: #7d889b`, `--t4: #5a6376`) was calibrated against `#0c0e12` and went under-contrast once the canvas switched to `#000`. Do not revert.

### Type system

- **Font floor: 10px system-wide. 12px floor in the Andara Signal section.** Any new text must clear these.
- **Card headers** (`.ph h3` / `.ph .meta`): 18px sans / 14px mono. Applies to every panel using the legacy `<div class="ph">` markup via the single CSS rule.
- **Big display text** (font-size ≥ 16px): use `color: var(--display)` instead of `var(--t1)`. The bulk swap was applied to every rule ≥ 16px — add `--display` to any new big-text rules.
- Type families: Hanken Grotesk (sans, body + display), IBM Plex Mono (mono, labels + numbers).

### Pill / chip / pill-button pattern

Every status pill, chip, and inline-pill-button uses a **fixed height + inline-flex centering** so it sits on the optical centre of any text next to it. No padding-derived heights.

```css
.thing-pill {
  display: inline-flex; align-items: center; justify-content: center;
  height: 28px;         /* fixed */
  padding: 0 14px;      /* horizontal only */
  line-height: 1;
  margin: 0;            /* prevent generic class margin leak (see .warn note) */
  border: 1px solid; border-radius: 4px;
  box-sizing: border-box;
}
```

Sizes in use: 28px (chips next to large titles, refresh-request button), 26px (Signal pills), 24px (verdict pills, proxy state pills), 22px (data-gap tags, vbadge), 20px (mt-badge), 18px (sidebar nav counts).

**Watch out for `.warn`:** there's a generic `.warn` class (warning-banner style, around line 800) that adds `margin-bottom: 14px`. Any pill that also takes class `warn` (the Watch verdict pill, NEW pill, PEP FLAG, CONFLICT) MUST set `margin: 0` in its base rule or the banner margin leaks and shifts the pill vertically. This was the root cause of the long "chips not aligned" debugging session.

### Component namespaces

| Prefix | Surface | Status |
|---|---|---|
| `.cp-*` | Redesigned carrier profile (hero, scorecards, meta strip) + Andara Signal panel | Current — new work goes here |
| `.mo-*` | Market Overview scorecard table (carrier rows, validity column, refresh button) | Current |
| `.mon-*` | Monitoring tab (refresh schedule, sentinel events) | Current |
| `.sc-*` | Score composition radar reading block | Current |
| `.sig-*` | Old Signal panel CSS | **Dead** — no rendered HTML references it. Safe to delete in cleanup. |
| `.phero`, `.pmain`, `.pscore`, `.pid`, `.pname`, `.psnum` | Pre-redesign carrier profile chrome | **Dead** — replaced by `.cp-*`. |

### Shared helpers (top of script, before data tables)

| Function / constant | Purpose | Used by |
|---|---|---|
| `addMonths(ymd, n)` | Date math — accepts `YYYY-MM` or `YYYY-MM-DD` | `validityUntil` |
| `daysUntil(ymd)` | Integer days from today | `validityUntil` (urgency tiers) |
| `validityUntil(a)` | → `{validDate, nextRefresh, lastRefresh, days, urgency, cadence}` | Market Overview validity column, Monitoring tab refresh schedule |
| `REFRESH_CADENCE` | Tier 1 / 2 / 3 → `{label, refreshMo, validityMo}` | `validityUntil` |
| `cpSignalIcon(size?)` | Canonical Andara Signal SVG (line chart with arrow tip) | Sidebar nav, every Signal panel header |
| `cpDefaultSignal(a)` | Synthesised "no data yet" Signal record so every carrier renders the full panel | `renderSignalModule` |
| `cpVerdictCls(v)` / `cpVerdictLbl(v)` | Verdict → CSS class / display label | Carrier profile hero |
| `cpOwnership(s)` / `cpExtract(s, regex)` | Parse `own` field into separate Ownership / MD/CEO / IOSA cells | Carrier profile metadata strip |

### PRD-aligned terminal surfaces

| Surface | PRD anchor | What renders |
|---|---|---|
| Market Overview / Verdict list | §3.2.4 | Carrier table with verdict class, last refresh, **validity-until** with urgency colour tiers, per-row **refresh request** routed to CS lead |
| Carrier profile — Refresh Schedule (Monitoring tab) | §3.2.4 | Tier badge, last assessment, next assessment, verdict validity |
| Carrier profile — Sentinel Events (Monitoring tab) | §3.2.4 / §3.2.5 (Watch Notes) | Off-cycle review triggers from `monitoringTriggers` |
| Carrier profile — Data Gap Flags (Monitoring tab) | §3.4.6 (AAV disclosure) | HIGH / MED / LOW analytical-disclosure tags |
| Carrier profile — Score composition | §3.3.6 | Radar with per-axis values, ring scale markers, reading block (strongest / weakest / average / shape interpretation) |
| Carrier profile — Andara Signal | §3.4.5 references | Composite gauge (red→green gradient with marker), 8-card proxy evidence grid covering LIVE/AWAITING/ABSENT/N-A states, Predictive Horizon, AAV callout, footer actions |

**What's NOT in the PRD — do not re-add unprompted:**
- Assigned analyst / Tier rationale text (no PRD basis for client view, no data field)
- Sentinel History table with composite delta column (no historical data series — would invent)
- Per-trigger sub-classification pills (DEPLOY TRIGGER, RCS UPGRADE, WATCH EVENT, etc.) — the design mock invented seven categories; the data has each trigger as one `event → impact` string and that's what we render
- Portfolio dashboard / Geographic map / Aggregate metrics across all client carriers (M2+)

### Session

- Successful login writes `localStorage.andara.auth = {email, ts}`.
- `tryRestoreSession()` is invoked once at the bottom of the script (after data tables are declared) and skips the login modal if a session exists.
- To force the login screen back: `localStorage.removeItem('andara.auth')`.
- Demo access key remains `andara2026`.
- The access-key input has an eye toggle (`#pwToggle`) and shows / hides via swapping the `<input type>` between `password` and `text`.

### Sidebar — collapsible carrier groups

`buildSidebar()` wraps each region in a `.reg-group` with a header (rhdot + title + count + chevron) and a `.reg-body`. Clicking the header toggles `.collapsed` on the group. State is persisted in `localStorage.andara.sidebarCollapsed = {ng, wa, ea, sa, ca}`. Region dividers (`.sdiv`) stay between groups.

### Top nav

The status-bar tickers read **Status / Universe / Methodology / UTC** plus a user chip. The search bar is `#gsearch` with a paired GO button (`#goBtn`) — both fire the same carrier search. The user chip display name is parsed from the email's local part (`dikko@…` → `Dikko`, `first.last@…` → `First Last`).

### Functioning breadcrumbs

Every `<div class="crumb">` uses `<button class="nav" data-cnav="dashboard">Terminal</button>` for navigable segments — `bindNav()` wires the click to fire `.sitem[data-v="dashboard"].click()`. The carrier profile renders a full path: `Terminal / Market Overview / [Carrier]`.

---

## Updating the Africa Credit Intelligence Page

The `/credit-intelligence/africa` page is a self-contained HTML terminal app **originally** exported from a design tool. The patch workflow below applies the responsive mobile drawer + logo + meta patches to a raw export.

> **Important — read first.** The page has been substantially redesigned in-place since the last raw import (palette, type system, carrier profile, Market Overview validity column + refresh button, Andara Signal panel, Monitoring tab, etc. — see *Terminal app — design system and conventions* above). **Running the patch script on a new raw export will clobber every one of those customisations.** Use it only on a one-off basis when reimporting the whole app from scratch, then expect to re-port the design-system work on top.
>
> For everyday changes, edit `public/credit-intelligence/africa/index.html` directly.

### One-command update

```bash
python3 scripts/patch-africa-page.py "andara_export/<new-file.html>"
```

This writes the patched file to `public/credit-intelligence/africa/index.html`.

### Full workflow

1. Save the new export to `andara_export/`
2. Run the patch script (see above)
3. Test locally:
   ```bash
   npm install   # only needed if node_modules is missing
   npm run dev   # serves at http://localhost:8081
   ```
   Open `http://localhost:8081/credit-intelligence/africa` and check at 375px width
4. Commit and push:
   ```bash
   git add public/credit-intelligence/africa/index.html
   git commit -m "Update Africa credit intelligence page to vN"
   git push origin main
   ```

### What the script patches (all idempotent — safe to re-run)

| Patch | What it does |
|-------|-------------|
| Title | Sets to `Andara Credit Intelligence - Africa \| Aviation Finance Terminal` |
| Meta description | Adds SEO description for Africa platform |
| CSS variables | Adds `--drawer-z` and `--drawer-dur` for mobile drawer animation |
| Logo images | Replaces base64-embedded logos with `/Andara%20Systems%20logo%20-%20dark%20mode.png` |
| Logo CSS filters | Removes `brightness(0) invert(1)` filter (logo is already dark-mode ready) |
| Demo hint | Removes `<div class="lhint">Demo key: andara2026 …</div>` from login |
| Topbar label | Adds `class="tb-label"` to "Credit Intelligence" span for responsive hide |
| Hamburger button | Injects `<button id="hamBtn">` into topbar for mobile nav |
| Sidebar backdrop | Injects `<div id="sbBackdrop">` for drawer overlay |
| Responsive CSS | Two `@media` blocks — tablet (≤1023px) and mobile (≤767px) |
| Mobile JS | `initMobile()` IIFE — drawer open/close, backdrop tap, Escape key, resize |

### To change a patch value (e.g. new logo path, new meta description)

Edit the constants at the top of `scripts/patch-africa-page.py`.

---

## AIR — Andara Intelligence Report

The `/intelligence/<issue-id>` pages (e.g. `/intelligence/air-001-apr26`) are quarterly editorial issues published per PRD §3.2.5 / §3.4.6. They share a single design system file so future issues stay consistent.

### File layout

| Path | Purpose |
|------|---------|
| `public/intelligence/index.html` | Issue archive landing page |
| `public/intelligence/air.css` | **Shared design system** — type, color, layout, all primitives |
| `public/intelligence/<issue-id>/index.html` | Per-issue HTML, links to `/intelligence/air.css` |

### Design system rules (must follow when authoring a new issue)

- **Three type families**: Source Serif 4 (editorial body + headlines), Inter Tight (UI chrome / labels), JetBrains Mono (data values). No additional font families without updating `air.css`.
- **Two grounds**: dark chrome (`--chrome`, navy `#0A1224`) for cover, editor's note, data panels, about, footer. Light editorial paper (`--paper`, cream `#F7F4EE`) for prose sections. Use the `.alt` class on `.air-section` for alternating tint.
- **Type floor**: body 17px, UI labels 13px, mono 14px. Never go below 11px (mono-only, for IDs).
- **AAV labels are mandatory** anywhere Andara is offering analysis vs. reporting fact (PRD §3.4.6). Use `.aav-block` for full blocks or `.aav` inline.
- **Section spine markers** (`.spine.signal` / `.spine.fin` / `.spine.action`) tag every editorial block by PRD content type — Signal / Financial Translation / Capital Action.
- **Regional tags** on every section (Nigeria / West Africa / Africa / etc.) — PRD §4.2.4.

### To author a new issue

1. Create `public/intelligence/air-<NNN>-<mon><yy>/index.html` (e.g. `air-002-jul26`)
2. Copy the structure of `air-001-apr26/index.html` as a template
3. Link to the shared CSS: `<link rel="stylesheet" href="/intelligence/air.css">`
4. Update the cover (issue number, headline, deck, TOC), each section's content, and the footer prev/next links
5. Restart `npm run dev` so the Vite middleware picks up the new folder
6. Update `vercel.json` only if you add a brand-new top-level static folder (issues under `/intelligence/` don't need new rewrites)

### Phased roadmap (post Phase 0+1)

Phases 2–6 (issue archive redesign, auth + tokenised watermark, seat management, editorial workspace, delivery system) are planned but not started. See conversation history or PRD §3.2.5 / §3.4.6 for scope.

---

## Reference Documents

- `Andara_Master_Build_PRD_v1_5.md` — Master Build PRD covering Client Portal, Super Admin Console, and Andara Internal Workspace across three milestones. **INTERNAL — RESTRICTED.** All product work should reference the relevant PRD section.

---

## Routing

Static page routes are defined in two places — both must be kept in sync when adding a brand-new top-level static folder:

- `vercel.json` — production rewrites
- `vite.config.ts` — local dev server middleware

The dev middleware **auto-discovers** any folder under `public/` that contains an `index.html` and rewrites `/folder` to `/folder/index.html` (matching Vercel's behaviour). So most additions — including nested issues like `/intelligence/air-002` — only need a dev-server restart; no config edit. Edit `vercel.json` only when adding a top-level folder that Vercel won't auto-resolve.

---

## Key Files

| Path | Purpose |
|------|---------|
| `src/components/terminal/TerminalChrome.tsx` | **Shared terminal chrome** — CSS, status bar, nav, ticker, footer, CTA band. Edit here, not in pages. |
| `src/pages/Index.tsx` | Homepage (terminal aesthetic) |
| `src/pages/CreditIntelligence.tsx` | Credit Intelligence product page |
| `src/pages/FleetWatch.tsx` | Fleet Watch product page |
| `src/pages/WhoWeServe.tsx` | Who We Are page (file kept under old name; rendered at `/who-we-are` and `/who-we-serve`) |
| `src/lib/content.ts` | `NAV_ITEMS` + global content constants (CTA text, etc.) |
| `src/App.tsx` | React Router routes |
| `public/credit-intelligence/africa/index.html` | Africa terminal page (patched output) |
| `scripts/patch-africa-page.py` | Patch automation script |
| `andara_export/` | Raw HTML exports from design tool (not served) |
| `public/intelligence/air.css` | Shared AIR design system |
| `public/intelligence/air-001-apr26/index.html` | AIR Issue 001 |
| `public/redesign/index.html` | Static reference copy of the original terminal-design prototype (served at `/redesign`) |
| `Andara_Master_Build_PRD_v1_5.md` | Master Build PRD (Internal — Restricted) |
| `vercel.json` | Production URL rewrites |
| `vite.config.ts` | Dev server config + auto-discovered static page middleware |
| `index.html` | Vite entry — also where Google Fonts (Schibsted Grotesk, Hanken Grotesk, IBM Plex Mono, Geist) are loaded |
| `public/Andara Systems logo - dark mode.png` | Logo file used by the terminal page |
