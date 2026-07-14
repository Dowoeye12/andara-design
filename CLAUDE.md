# Andara / BAC Aviation — Project Guide for Claude

## Project Overview
This is a React + Vite web app (TypeScript, Tailwind, shadcn/ui) deployed on Vercel.
Static terminal-style pages live in `public/` and are served via rewrites in `vercel.json`.

The four React-rendered marketing pages (Home, Credit Intelligence, Fleet Watch, Who We Are) all use a single shared **Bloomberg-terminal aesthetic** — dark canvas, amber accents, monospace data, terminal panels. See "Marketing site — terminal aesthetic" below before editing any of them.

---

## Recent state changes (2026-07, read this first — supersedes older notes below)

These override conflicting details later in this file:

- **Canvas is navy blue, not pure black.** Both the FleetWatch client portal (`public/fleetwatch/portal/index.html`) and the Credit Intelligence terminal (`public/credit-intelligence/africa/index.html`) now use canvas tokens `--bg:#0b1524 · --bg4:#0e1a2c · --bg2:#12213a · --bg3:#1a2b47 · --bg-hover:#223458`. Every `--bg:#000` reference in the design-system tables below is stale — the surfaces are navy now.
- **FleetWatch client portal now conforms to the dedicated FleetWatch PRD v1.0** (`Andara_FleetWatch_PRD_v1.0.docx`, Mar 2026, in repo root). This PRD **supersedes the FleetWatch parts of the Master Build PRD** and changed two fundamentals: cadence is **weekly** (not quarterly) and client language is **Healthy / Monitor / Act Now** (composite thresholds 70/50; Deploy/Watch/DND banned on this portal per FR-CP-003). Shipped: thresholds+labels, value trend Stable/Watching/Eroding, 5 portfolio KPIs, **activity feed** (FR-CP-004), origin-aware **back-arrow** on the drill-down, **plain-English weekly report** (verdict headline → what-this-means banker/risk/asset → 5-area traffic lights → money-first findings with technical toggle → numbered recommended actions → **52-week score-history SVG**), richer predictive items (due + action), **5 weighted dimensions** (SVS 20 / PPS 25 / APS 20 / RCS 20 / RAS 15 via `DIM_DISPLAY`), **hard floor** (`hardFloorTrip`/`effectiveScore`, composite capped 65 when RCS or RAS < 40; 5N-UNA trips it), **live special-alert triggers** (`derivedSpecialAlerts`), watermark wording (`fwWatermark`: client + date + "Andara Intelligence · Confidential"), **severity+zone document search** (`enrichDocs`/`docZoneOf`/`docSevOf`). **Default risk / Default flagging was REMOVED** (out of scope per PRD §11). Report viewer offers **Weekly PDF + Quarterly PDF** downloads (`downloadQuarterlyReport`). **AOG badge is red** (`.ichip.aog` #f0736f), not amber. A private fix-tracker artifact recorded all 18 PRD items (100% done).
- **Credit Intelligence terminal — four surfaces removed from the sidebar:** Analyst Workspace, Scoring Committee, Methodology, Audit Trail were removed from the nav (they move to a future **Super Admin console**). Their view markup + builders are intentionally **left in place, unreachable**, for that migration. Sidebar is now: Markets (Market Overview · Comparison) · Signals (Andara Signal · Sentinel · Intelligence Feed) · **Deliverables** (Reports & Downloads only) · Carriers. Also: **DHL Aviation South Africa** verdict corrected `watch → deploy` (composite 78, no hard floor — Deploy count is now **7**). Intelligence Feed rows open the carrier profile on click via a `.has-link` class (only carrier-linked items get pointer/hover); `intelResolveCarrier()` tolerates short-form audit names (e.g. "United Nigeria" → "United Nigeria Airlines").
- **Deployment: Netlify auto-deploys on every `git push origin main`, landing in ~30s** (after a credit-exhaustion outage that was upgraded/resolved). Live site `https://andara-systems.netlify.app`. Verify a deploy by curling the live URL (`-L --compressed`) for a marker string. Vercel is no longer the deploy target despite the note above.

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

### Canvas width — `.view` padding + max-width

The main content area is `.view` inside `.mn` (grid-area `mn`):

```css
.view{padding:20px 16px 60px; max-width:1480px; margin:0 auto}
```

- **Horizontal padding 16px** — gutter between content and the sidebar/right edge. Was 26px historically; tightened so panels/tables get more usable width.
- **`max-width: 1480px`** — hard cap on the content column. Was 1320px historically. Don't push past 1480 without testing — the 5-Score scorecards, country-modifier table, and Compare slot cards all balance against this width.
- **`margin: 0 auto`** — content centres inside the viewport once it exceeds 1480px.

If a single panel needs to breathe wider (e.g. a future portfolio heat-map), give that panel a negative horizontal margin against `.view` rather than raising the global cap.

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

- **Font floors (codified across the terminal):**
  - **10px** system-wide minimum. Below this is a bug.
  - **12px** floor for the Andara Signal section + secondary labels / mono captions everywhere else.
  - **14px** floor for **tabular data** (every `<th>` / `<td>` that carries numeric or text values in scorecard / Compare / Signal / Refresh-schedule tables). The 10/11.5px legacy table sizes were bumped in this pass.
  - **10px** chip floor — chips (pills) are the explicit carve-out from the 12/14 floors and may sit at 10px when used in dense tabular contexts.
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
| `.mo-*` | Market Overview — scorecard table, **heat-map (`.mo-heat-*`)**, **Watch Notes (`.mo-watch-*`)**, **Recent Movers (`.mo-mover-*`)**, **Refresh Schedule (`.mo-refresh-*`)**, **Composite Market Score (`.mo-cms-*`)**, **rank tables (`.mo-rank-*`)**, **Verdict-distribution chart (`.mo-vchart-*`)**, mini rail panels (`.mo-mini`), row flags (`.mo-row-flag.hf / .hf-bdry / .eu`), per-row PDF action (`.mo-pdf`) | Current |
| `.mon-*` | Monitoring tab (refresh schedule, sentinel events) | Current |
| `.sn-*` | **Andara Sentinel** (`/sentinel`) — cadence-enforcement surface. `.sn-roll` 4-cell rollup strip (Overdue · Due 30d · Open Watch Notes · Due this quarter), `.sn-card` per-carrier card with `.sn-card-hd` (name + composite + verdict dot), `.sn-cadence` (`Last … · Next …` dates + `.sn-days` urgency chip reusing the expired/urgent/soon/ok ramp), `.sn-event` fired Watch-Note-eligible event line (FEED-sourced, AAV-tagged) or `.sn-event-empty`, `.sn-refresh` action button (PRD §3.2.4 refresh request → CS lead). Overdue cards get `.overdue` tint and sort to the top of their tier. | Current |
| `.sc-*` | Score composition radar reading block | Current |
| `.sig-*` | **Andara Signal portfolio surface** (`/signal`) — `.sig-summary` stat strip, `.sig-sources` (clickable, opens drawer), `.sig-toolbar`, `.sig-tbl` portfolio table, `.sig-trbl` triage table, severity / band / confidence / verdict / **state** (`.sig-state-new/in_triage/triaged/dismissed`) pills, `.sig-mode` view toggle, `.sig-drawer` + `.sig-drawer-back` source-health detail drawer (`.sig-status-pill`, `.sig-spark`, `.sig-fail-row`), `.sig-kebab` row actions, `.sig-pop` popover (re-used by triage with HTML swap), `.sig-mback` / `.sig-mbox` / `.sig-mfield` modal system (Promote · Override · Mark triaged · Dismiss · Save set · Submit to SC), `.sig-mbtn` action buttons | **Revived — actively used by all M2 §4.4.5 surfaces.** The old "dead" note is obsolete. |
| `.cmp-*` | Carrier Comparison view — `.cmp-chip` slot chips (HF, STALE, AES, ET-JV, EU-BAN), `.cmp-radar*` overlay + legend + band-key, `.cmp-aav-*` comparative narrative, `.cmp-expandable / .cmp-expand-body` row toggle, `.cmp-sets-select` saved sets, `.cmp-toolbar` action strip | Current |
| `.m-*` / `.vt-*` / `.sc-min*` / `.cc-ledger-*` | **Methodology surface** (`/method`) — `.mgrid` + `.mcard` 5-Score cards (top accent stripe, sans 18px name, 13px sub-input list with dividers), `.vt-list` Verdict thresholds list-rows (mono threshold value + colour-keyed eyebrow label + sans description, tinted by `.vt-deploy / .vt-watch / .vt-dnd`), `.m-ver` active-versions strip (informational `--info` chips), `.sc-min` Scoring Committee minutes index (list-row canon over AUDIT entries matching `Approved · CCC` / `Notified · awaiting SC`). **M2 §4.4.2 addition**: `.cc-ledger / .cc-ledger-row` **Verdict-affecting code-change ledger** replaces the prior `.m-cr` disabled placeholder. Seeded `CODE_CHANGES[]` (6 records spanning `pending / approved / returned`) with `{id, title, body, tags[], status, decision}`. Rows render an id chip + title/body/tags + status pill + Approve/Return actions on pending rows. Decision flow uses `#ccCodeModal` (shared `.sig-mback` modal pattern, ≥40-char rationale) → `ccConfirmCodeDecision` mutates the record + unshifts a `src:'Methodology'` AUDIT row `Code change · APPROVED/RETURNED`. M2 backend wires this into actual deployment gating; the UI contract is here. | Current |
| `.aw-*` | **Analyst Workspace — Arbiter v1 + v2 (§4.4.1)** (`/workspace`) — `.aw-tabs / .aw-tab` **4-tab shell (Queue · Refresh · Evidence · Watch Note)**, `.aw-pane` tab body, `.aw-queue` shared table style (14px floor, hover row, `.no-row-click` modifier), `.aw-sf-st` lifecycle status pill, `.aw-out` outcome chip, `.aw-back` back-to-queue button, `.aw-sf-hd` SF header strip, `.aw-scores / .aw-score` 5 accent-striped dimension cards, `.aw-subs / .aw-sub` per-sub-score row, `.aw-prv` composite preview, `.aw-prv-hf` HF banner, `.aw-urg` validity urgency chip, `.aw-view-btn` row action, `.aw-ev-list` evidence list, `.aw-hint` empty-state. **M2 v2 additions**: `.aw-rfq*` refresh queue (`.aw-rfq-roll` 4-cell rollup: Expired / ≤30d / 31–60d / In-validity; `.aw-rfq-row-act .rfq-go` Start/Continue CTA; spawns SF with `isRefresh:true, refreshOf:<priorId>`; `.aw-refresh-hint` chip in editor header). `.aw-jur-chip` jurisdiction+currency tag on evidence rows; `.aw-fx-strip` USD↔local FX reference inside SF editor (driven by `JURISDICTIONS` map). `.aw-vault-chip` counterparty-vault badge; `.aw-vault-banner` clearance banner; vault contents masked (`vaultMaskHeadline` / `vaultMaskSource`) until session phrase entered (demo `VAULT-2026`, `sessionStorage.andara.vaultCleared`). `.aw-ai-chip` AI-drafted disclosure; `.aw-ai-block` accepted commentary block; "Draft commentary" SF-header button → modal seeded by `awGenerateDraftCommentary(sf)` (verdict-band + HF + strongest/weakest dim + jurisdiction-aware canned paragraph; M2 swaps for Credit Report Drafting Agent). `.aw-rag` retrieved-context panel with per-dimension chips; `RAG_SNIPPETS` static seed → `awAttachRagAsEvidence` adds as evidence note tagged `[RAG-retrieved · <TAG>]`. | Current |
| `.cc-*` | **Scoring Committee v1 + v2 (§4.4.2)** (`/committee`) — `.aw-queue` tables for both Inbox and Decisions log (submission viewer is the SF detail drawer). **M2 v2 additions**: `.cc-thru` 4-cell throughput strip at top (In flight / Median latency 30d / Approvals 30d / Returns+rejects 30d, all derived from `SCORING_FILES` + `SF_DECISIONS` + `AUDIT`). `.cc-toolbar` row above inbox with **Group by None / Region / Submission window** chips (writes `ccGroupState.by`, rebuilds rows with `.cc-group-row` headers via `ccRegionOf(sf)` / `ccWindowOf(sf)`) + a checkbox column (HF-tripped SFs disabled — they require individual rationale per §3.3.6) + **"Batch approve selected"** button → `ccOpenBatchModal` (`#ccBatchModal` with `.cc-batch-list` row preview + ≥60-char shared chair rationale → `ccConfirmBatch` writes one decision per SF with `BATCH(N)` note tag). `ccGroupState.selected` is a Set pruned on every rebuild. Live state hook: `ccState.activeSfId` + decision modal flow. | Current |
| `.sf-*` (drawer) | Shared **SF detail drawer** extends `.sig-drawer` at 760px wide with `.sf-dim-row` 5-Score breakdown rows (label / avg / weight) and `.sf-decision-card` outcome chip + chair + rationale block. Used by all three SF entry points: Analyst Workspace history row (read-only), Committee inbox row (with Approve / Return / Reject footer), Decisions log row (read-only, decision shown). | Current |
| `.dd-*` | **Modern dropdown system** wraps every native `<select>` in the app via `ddInitAll()`. `.dd > select{display:none}` keeps the native element in the DOM (so `el(id).value` and `change` events still work). Size variants auto-assigned by `ddEnhance` based on original select's class: default 42px (workspace forms), `.dd--md` 40px (modal `.sig-mfield`), `.dd--sm` 32px (toolbar `.sig-region` / `.cmp-sets-select`), `.dd--xs` 28px (`.mo-heat-sort`). `.dd-trigger` is a `<button>` with `.dd-value` + animated `.dd-caret` (rotates 180° on open); `.dd-menu` is z-index 1000 with `.dd-option` 36px rows, hover bg-3, active amber + checkmark. Closes on outside click + Escape. Inside `.sig-toolbar / .sig-tools / .page-actions / .cmp-toolbar` the wrapper is `display:inline-block` to keep the flex toolbar inline. | Current |
| `.atbl / .c-*` | **Audit Trail table** (`/audit`) — system table canon (14px tabular floor, 12×14 padding, hover `var(--bg3)`). Cell classes are **`c-` prefixed** (`c-ts`, `c-user`, `c-email`, `c-carrier`, `c-src`, `c-status`, `c-note`) because the global stylesheet already owns `.user / .carrier / .status / .note` for unrelated chrome (top-nav user chip, carrier sidebar row, warning banner) and those rules cascade into `td` unless namespaced. Auth events (`src:'Auth'`) flow through `_logAuthEvent` (persisted to `andara.audit.auth.v1` localStorage by the standalone login script, replayed by `authAuditReplay()` on boot). User column split into User (parsed local part) + Email (full address; `—` for service accounts) via `auditSplitUser()`. Row click opens `#auditDrawer` (a `.sig-drawer` with sectioned bodies: Event · Transition · Actor · Deliverable · Authentication · Note). Filter shell: `.sig-toolbar` outer with `.rtabs` date-range chips + `.sig-tools` inline (search · source · user · clear · export). Source select normalised — seed lowercase `methodology` → `Methodology`, evidence sources (`private/public/regulatory/financial/macro/Pass 3`) → `Data ingestion`, `Scoring Workspace` → `Workspace`. Export CSV is itself watermarked via `moLogDeliverable({carrier:'Audit log', deliverable:'Audit export'})`. | Current |
| `.rpt-*` | **Reports & Downloads** (`/reports`) — `.rptg` 9-card 3-col grid (Individual carrier brief · Nigeria/WA/EA/SA/CA market summaries · Comparative analysis · IC summary · Africa-wide portfolio memo); cards carry `data-deliverable` + `data-scope-kind` (`carrier / region / compare / all`) + `data-scope` + `data-format`. Click → `rptOnCardClick()` → either opens `#rptCarrierModal` (for `carrier` scope) or hits `rptGenerate()` directly. `rptGenerate()` flows through `moLogDeliverable` (writes AUDIT row), then emits a stub Blob via `rptDownloadBlob()` with the watermark stamp baked into the file body. **Recent exports** panel (`#rptRecentList` + `.evitem` / `.evicon` / `.evinfo` — typography at canon: 14 sans h5 / 13 mono p / hover `var(--bg3)`) reads live from `AUDIT.filter(l => l.src==='Reports')` via `buildReportsRecent()` — auto-rebuilds after every generation. Filter strip uses the **`.rpt-toolbar` 3-row stack pattern** (alternative to `.sig-toolbar` wrap when controls overflow): row 1 = date rtabs left + Clear/Access-log right; row 2 = search left + region/carrier/format selects right; row 3 = `.sig-live` scope chip. `rptFormatOf` / `rptDeliverableOf` / `rptScopeOf` parse the structured AUDIT row back into card-equivalent fields for re-download. Access log CSV button exports the filtered `src:'Reports'` subset and is itself audited (closes PRD §3.2.6 "Audit export" loop). | Current |
| `.notice` | Informational banner — same shape as `.warn` but uses `--info / --info-soft / --info-line` per the chip-colour rule (informational, no action, no state). Used for the workspace scoring-governance banner. | Current |
| `.up-*` | **User profile & preferences modal** — opened from `#userChip` (top-nav user chip is now a `<button>` with `.caret` indicator that rotates on open). `.up-sect` 5-section stack (Identity / Role / Counterparty vault / Notifications / Security) all using `.up-sect-hd` mono caption + `.up-row` k/v rows. **Identity**: editable display-name input (writes to per-email user record `andara.users.v1[email].name`), email (read-only from `andara.auth`), signed-in timestamp. **Role**: `.up-role-grid` 2×2 chip selector (Analyst / Lead analyst / SC chair / Customer Success); persists to `andara.profile.v1`. **Vault clearance**: `.up-vault-chip-state` cleared/masked badge + Grant (jumps to `#awVaultModal`) / Revoke (clears `sessionStorage.andara.vaultCleared` and audits). **Notifications**: 6 `.up-toggle` switches (AOG / Verdict / Watch Notes / AIR / Code-change / Account) — each is a custom CSS switch over a hidden checkbox; persists to `andara.profile.v1.notif` and is read by the notification-center aggregator to silence classes per user preference. **Security**: current / new / confirm password fields with `.up-act.primary` Change-password button; validates against master demo key `andara2026` OR existing per-email password, enforces 8-char min + differ from current + confirm match, writes to `andara.users.v1[email].password` and unshifts a `Profile · password changed` AUDIT row. Login `_login()` now accepts either the master key or the user-set password. Helpers: `profileDisplayName(em)` (user-set name → falls back to parsed local part), `profileInitials(em)` (avatar text). | Current |
| `.nc-*` / `.bell-*` | **Notification center · §3.2.7** — `.bell-btn` topbar button (left of user chip) with `.bell-badge` red unread count (`.aog` red when AOG-pending, `.warn` amber otherwise; hides at zero). Click → `.nc-drawer` right-edge drawer with `.nc-hd` header + `.nc-tools` filter chip row (All / AOG / Verdict / Watch Notes / AIR / Code / Account, each carrying per-class counts) + Mark-all-read button + `.nc-body` day-grouped scroll list. Items are `.nc-item` (with `.unread` dot indicator + `.nc-cls-chip.<cls>` class chip + `.nc-item-acts` Acknowledge/Mark-read buttons). **Aggregator** `ncAlerts()` pulls last 30 days from three streams: `SIGNAL_EVENTS` with `computedSeverity:'critical'` → AOG (requires acknowledgement), `FEED` → Watch Notes (`cls` tagged with regulatory/legal/ops/financial/private) + AIR (title matches `/AIR Issue|Andara Intelligence Report/i`), `AUDIT` → Verdict moves (`/Composite|Verdict letter|Committee decision/i`) + Code changes (`/^Code change/`) + Account events (`src:'Auth'` or `/Profile|Session|password|Vault clearance/i`). Stream is filtered by the user's notification preferences (`profileLoad().notif[cls]===false` silences that class). Per-alert state persisted to `andara.alerts.v1` as `{read:[ids], acked:[ids]}`. AOG acknowledgement unshifts an `AOG alert · acknowledged` AUDIT row per PRD §3.2.7. Escape + backdrop both close the drawer. | Current |
| `.phero`, `.pmain`, `.pscore`, `.pid`, `.pname`, `.psnum` | Pre-redesign carrier profile chrome | **Dead** — replaced by `.cp-*`. |

### Shared helpers (top of script, before data tables)

| Function / constant | Purpose | Used by |
|---|---|---|
| `addMonths(ymd, n)` | Date math — accepts `YYYY-MM` or `YYYY-MM-DD` | `validityUntil` |
| `daysUntil(ymd)` | Integer days from today | `validityUntil` (urgency tiers) |
| `validityUntil(a)` | → `{validDate, nextRefresh, lastRefresh, days, urgency, cadence}` | Market Overview validity column, Monitoring tab refresh schedule, **Compare validity row**, **Refresh Schedule panel** |
| `REFRESH_CADENCE` | Tier 1 / 2 / 3 → `{label, refreshMo, validityMo}` | `validityUntil` |
| `cpSignalIcon(size?)` | Canonical Andara Signal SVG (line chart with arrow tip) | Sidebar nav, every Signal panel header |
| `cpDefaultSignal(a)` | Synthesised "no data yet" Signal record so every carrier renders the full panel | `renderSignalModule` |
| `cpVerdictCls(v)` / `cpVerdictLbl(v)` | Verdict → CSS class / display label | Carrier profile hero |
| `cpOwnership(s)` / `cpExtract(s, regex)` | Parse `own` field into separate Ownership / MD/CEO / IOSA cells | Carrier profile metadata strip |
| `cmpRegionLabel(a)` / `cmpRegionColor(a)` / `cmpMethodTag(a)` | Canonical region label, region colour, methodology tag (v1.5-NG / v1.0-WA / etc.) | Compare, Signal, Market Overview heat-map, refresh schedule — **one truth for region rendering across the app** |
| `cmpHardFloorState(a)` / `cmpCompositeColor(c)` / `cmpDataGapCounts(a)` | Hard-floor classification, composite band colour, data-gap count breakdown | Compare slot cards + rows, Market Overview row flags |
| `sigSeverity(sd)` / `sigEffectiveSeverity(id,sd)` / `sigHorizon(sd,sev)` | Signal severity (computed) + override-aware severity + predictive horizon | Signal portfolio table |
| `sigOpenPromote(id)` / `sigOpenOverride(id)` | Open the Promote-to-SC + severity-override modals — model pattern for committee-gated actions | Signal kebab; copied as `cmpOpenSubmitModal` |
| `sigOpenModal(id)` / `sigCloseModal(id)` / `sigCurrentUser()` / `sigNowTs()` | Generic modal open/close + session-derived user/timestamp | Every action modal in the app (Signal + Compare) |
| `moWatermarkToken(deliverable, scope)` | Generates `{user, ip, ts, deliverableId, token}` per PRD §3.2.6 watermark contract. `ip` is stubbed `'—'` at M1; M2 backend populates server-side. | `moLogDeliverable` |
| `moLogDeliverable({carrier, deliverable, format, scope})` | One-call download logger: stamps watermark, unshifts AUDIT entry with **top-level `ip` / `deliverableId` / `token` fields** (per PRD §3.3.7), retains `note` legacy format for back-compat parsers, calls `buildAudit()`. | Cohort export, Open report, per-row Verdict letter PDF, Compare Export PDF, **every Reports card**, **Audit Export CSV**, **Reports Access log CSV** |
| `_logAuthEvent(action, email, status, note)` / `authAuditReplay()` | Auth event capture + replay. `_logAuthEvent` lives in the standalone login script and writes to `andara.audit.auth.v1` localStorage (login / failed-key / session-restore). `authAuditReplay` runs early in `enterTerminal` boot to unshift the persisted queue onto `AUDIT`. PRD §3.3.7 authentication-events closure. | `_login`, `tryRestoreSession`, boot sequence |
| `auditMatchesFilter(l)` / `auditRangeCutoffMs(range)` / `auditRowTsMs(l)` / `auditSplitUser(raw)` / `auditCsvCell(v)` | Audit-table filter math + user-column split (returns `{user, email}` from raw `'dikko@andara.com'`) + CSV cell-escape. Shared by `buildAudit`, `auditExportCsv`, **and Reports `rptMatchesRecentFilter` + `rptExportAccessLog`** so the two surfaces stay in sync. | `/audit`, `/reports` |
| `attachSearchClears()` | **System-wide search-clear button.** Wraps every `input.sig-search, input#gsearch` in a `.search-wrap` and appends a `×` button that appears on `has-value`. Idempotent via `dataset.searchClear='1'`. Booted from `enterTerminal` after `ddInitAll`. | Every search input (top-nav, Signal, Triage, Intel, Audit, Reports) |
| `rptGenerate({carrier, deliverable, format, scope})` / `rptOnCardClick(card)` / `rptOpenCarrierPicker` / `rptCarrierConfirmGen` | Report Centre generator pipeline. `rptOnCardClick` reads `data-scope-kind` and routes to direct generation or the carrier-picker modal; `rptGenerate` calls `moLogDeliverable` + emits a stub Blob via `rptDownloadBlob`. | Every `.rptc` card click, carrier picker confirm |
| `buildReportsRecent()` / `rptMatchesRecentFilter(l)` / `rptFormatOf(l)` / `rptDeliverableOf(l)` / `rptScopeOf(l)` / `bindReportsFilter()` / `rptExportAccessLog()` | Live Recent exports + filter + access-log export. `buildReportsRecent` reads `AUDIT.filter(l => l.src==='Reports')`, applies the filter, renders `.evitem` rows with Re-download. Re-download calls `rptGenerate` again (fresh token per PRD). `rptExportAccessLog` ships the filtered subset as CSV, itself watermarked. | Reports surface |
| `expandRow(label, summaryFn, detailFn)` / `expandRowText(label, summaryFn, textFn, {aav})` | Compare expandable-row factories (bulleted list + paragraph variants). `{aav:true}` prepends the AAV chip per §3.4.6 | All Compare expandable rows |
| `lastOriginNav` + `VIEW_TO_NAV` | Origin-aware breadcrumb state — see *Breadcrumbs* section below | `showAirline()` |
| `SF_DIMENSIONS` | Single source of truth for the 5 score dimensions (code, name, weight, sub-input labels) — mirrors Methodology §3.3.6 | Scoring file editor cards, SF detail drawer, evidence attach modal summary |
| `sfDraftActive(cid)` / `sfLatestForCarrier(cid)` / `sfQueueDisplayFor(cid)` | Queue/editor SF resolution. `sfDraftActive` returns editable (draft/returned); `sfLatestForCarrier` returns newest of any state; `sfQueueDisplayFor` returns the most meaningful chip target (skips untouched freshly-spawned drafts so a prior `rejected` keeps showing). | Queue render, `awShowQueueDetail`, status chip |
| `sfDimAvg(sf,k)` / `sfComposite(sf)` / `sfHfTrip(sf)` / `sfEffectiveComposite(sf)` / `sfVerdictPreview(sf)` | Composite math: dim avg (0–10), weighted sum / 10 (0–100), hard-floor trip when PPS or RCS < 4, effective composite (raw or capped at 65), verdict preview (`{cls,lbl}` keyed by composite ≥ 75 / 50 / else). Used by both the editor preview and the committee drawer summary. | Scoring file editor, SF detail drawer, Committee inbox row |
| `sfStatusChipHtml(status)` / `sfPersist()` / `sfRestore()` | Status pill HTML factory + localStorage persistence pair. Persist is called on every mutation; restore runs first in `enterTerminal()` so seeded AUDIT entries appear after the workspace replay. | Every SF / EV / decision mutation site |
| `awShipVerdict(sf)` / `awConfirmSubmit()` / `ccConfirmDecision()` | Three lifecycle transition handlers — Submit (analyst → committee), Decide (committee → outcome), Ship (analyst → distributed). All three unshift onto `AUDIT` + `WS_AUDIT_DELTA` (persisted), call `sfPersist`, and rebuild their respective surfaces. | Workspace + Committee surfaces |
| `ddEnhance(sel)` / `ddInitAll(scope?)` | Modern dropdown enhancer — wraps every `<select>` (skipped if `multiple` or `size>1`), auto-applies size variant from original class, keeps native select in DOM (hidden) so existing `.value` reads + `change` listeners are untouched. Idempotent via `dataset.ddInit`. Called once at the end of `enterTerminal()`. | System-wide |

### PRD-aligned terminal surfaces

| Surface | PRD anchor | What renders |
|---|---|---|
| Market Overview / Verdict list | §3.2.4 | Carrier scorecard with verdict class, last refresh, **validity-until** with urgency colour tiers, per-row **refresh request** routed to CS lead, **per-row Verdict-letter PDF download** (watermarked + audited), **HF / HF·BDRY / EU BAN row flags** |
| Market Overview / Composite Market Score | §4.2.3 portfolio view | Weighted cohort average (`/100`), STRONG / MIXED / WEAK band pill, 24px deploy / watch / dnd count chips, derived narrative (top-2 Deploy carriers or top-of-field + no-Deploy regions), regional sub-totals |
| Market Overview / Right rail mini-panels | §4.2.3 | **Cape Town Convention adoption %** (cohort jurisdictions ratified, Nigeria treated as ratified) + **Deploy verdicts mini** (count across N regions + benchmark callout) |
| Market Overview / Strongest + Weakest tables | §3.4.1 carrier list | Top-5 / bottom-5 ranked by composite, deploy-green / dnd-red score colour, click → carrier profile |
| Market Overview / Verdict Distribution chart | §4.2.3 | Three vertical bars (Deploy / Watch / DND) with linear-gradient fill in band colours; height proportional to max count; lives in the Strongest/Weakest row |
| Market Overview / Carrier credit heat-map | §4.2.3 aggregate verdict distribution | 6-col grid (responsive 4/3/2), banded backgrounds keyed to composite (deploy/watch/dnd ramps), HF inset ring + `HF` chip, **AAA-contrast dark backplate** on jurisdiction tag, sort by composite / name / region |
| Market Overview / Watch Notes feed | §3.2.4 Watch Note feed | `FEED` items filtered by carrier in cohort + Watch-Note-eligible class (regulatory / legal / ops / financial / private) |
| Market Overview / Recent verdict movers | §4.2.3 historical verdict trail | `AUDIT`-sourced moves filtered to current cohort, banded delta chips (NEW / →DEPLOY / →WATCH / →DND / `+/-N`) |
| Market Overview / Refresh schedule panel | §4.2.3 refresh schedule view | Three columns (Expired / 30d / 31–90d) sourced from `validityUntil()`, days-remaining chips, click → carrier profile |
| Carrier profile — Refresh Schedule (Monitoring tab) | §3.2.4 | Tier badge, last assessment, next assessment, verdict validity |
| Carrier profile — Sentinel Events (Monitoring tab) | §3.2.4 / §3.2.5 (Watch Notes) | Off-cycle review triggers from `monitoringTriggers` |
| **Andara Sentinel** (`/sentinel`) | §3.2.4 (refresh schedule + Watch Note feed + refresh request) + §3.2.7 (alerts inbox: verdict changes alongside Watch Notes) + §3.4.1 (Watch Note creator hand-off) | 4-cell cadence rollup at top (universe-wide Overdue / Due 30d / **Open Watch Notes filtered to last 60d** / Due this quarter). Three tier panels (T1 monthly / T2 quarterly / T3 semi-annual) — within each, carriers sorted **overdue first** then by days-to-expiry ascending. Each card shows verdict + composite, `validityUntil()` cadence line (`Last … · Next …` + urgency chip), and a **fired event line** that is the more recent of (a) latest Watch-Note-eligible `FEED` entry for the carrier — tagged AAV and prepended with `WN-YYYYMM-NNN` badge when the FEED entry carries a `wnId` from a prior workspace dispatch — or (b) latest `AUDIT` `Verdict`/`Composite` move for the carrier, rendered with a `.sn-vlabel` "Verdict" tag + `.sn-vchip` directional chip (NEW / → DEPLOY / → WATCH / → DND / numeric delta) using the same delta-classification logic as Market Overview Recent Movers (helper `snVerdictDelta`). Tie-break on equal dates favours the verdict move (decision-relevant outcome). `No active alerts` placeholder when neither exists. Two per-card buttons: **Request refresh** (CS lead, same `toast()` pattern as Market Overview rows) and **Draft Watch Note** (jumps to `/workspace`, pre-selects the carrier in `#wnCarrier` triggering parent-SF auto-fill, pre-checks the classification chips in `#wnClassRow` inherited from the fired event's `cls` when the chosen event is a Watch Note, scrolls `#wnForm` into view — analyst writes headline/body/source from scratch, dispatch path is unchanged). Click card → carrier profile. Tier-header meta count surfaces per-tier overdue count when non-zero. Dormant triggers (`monitoringTriggers[]`) live on the carrier-profile Monitoring tab only — not duplicated on Sentinel. |
| Carrier profile — Data Gap Flags (Monitoring tab) | §3.4.6 (AAV disclosure) | HIGH / MED / LOW analytical-disclosure tags |
| Carrier profile — Score composition | §3.3.6 | Radar with per-axis values, ring scale markers, reading block (strongest / weakest / average / shape interpretation) |
| Carrier profile — Andara Signal | Derived from §4.4.5 mechanics (no direct PRD anchor — carrier-level surface extrapolated from the operational-proxy model). The PRD's §3.4.5 is FleetWatch Operations and is unrelated to Signal — do not cite it here. | Composite gauge (red→green gradient with marker), **Signal History strip · 90-day band trail** (banded chart background, ±0.3 threshold guides, dot line, band-crossing chips, AAV disclosure that the trail is synthetic until warehouse SIGNAL_SNAPSHOT is live), 8-card proxy evidence grid covering LIVE/AWAITING/ABSENT/N-A states, Predictive Horizon (dynamic — derived from `sigHorizon` so the carrier profile matches the portfolio row, never the old hardcoded "4–8 Quarters Forward"), AAV callout, footer actions |
| **Andara Signal portfolio** (`/signal`) | §4.4.5 Signal triage queue + §4.2.2 remote signal feed | **Mode toggle: Portfolio ↔ Triage queue** (persisted in `localStorage.andara.sigMode`). **Portfolio mode:** 5-cell stat strip (Deteriorating / Stable / Improving / Ingesting / Universe), per-source ingestion health chip strip (8 sources × live/total, **dot derived from fetch success ratio**), cohort filter chips + search + region select + live badge, 10-col table (Carrier · Region · CI Verdict · Signal Band + Horizon + crossing chip · Composite · Proxies dot row · Severity · Confidence · Last Updated · Actions kebab). **Triage mode:** 5-cell stat strip (New / In triage / Triaged today / Dismissed today / Median TTT), state chips (New/In triage/Triaged/Dismissed/All) + source select + region + search, 8-col event-level table (`SIGNAL_EVENTS` from Market Monitoring Agent — State · Carrier · Source · Signal headline + agent tag · Severity · Confidence · Ingested · Actions). Triage kebab actions: Claim · Mark triaged (linked proxy + ≥40-char note) · Dismiss as noise (≥40-char rationale) · Promote to SC — all transitions unshift onto `AUDIT` with `src:'Signal Triage'` |
| Signal source-health drawer | §4.4.5 per-source ingestion health detail | Click `.sig-source` chip → right-edge drawer with adapter name + version, status pill (LIVE/DEGRADED/ABSENT derived from 24h fetch success ratio), last fetch + fetch interval, 24h + 7d success ratios, 7d volume sparkline + today value, coverage breakdown (carriers live / awaiting / absent / N-A), recent failures list, "View source events →" CTA pre-filters Triage mode by source |
| Signal confidence methodology | No direct PRD anchor — PRD §3.4.1 treats confidence as an analyst tag; we made it computed and explainable | `sigComputeConfidence(sd)` is the single source of truth — hand-tagged `confidence:` fields in `SIGNAL_DATA` are overwritten on init (`Object.values(SIGNAL_DATA).forEach(sd => sd.confidence = sigComputeConfidence(sd))`). Formula: weighted score of **coverage** (live proxies ÷ applicable proxies × 0.50) + **freshness** (`1 − meanFresh/30` × 0.30, parsed from `fresh` field) + **sign agreement** (share of live proxies whose sub-score sign matches composite × 0.20). Thresholds: ≥ 0.80 high · ≥ 0.55 medium · ≥ 0.30 low · otherwise insufficient (also insufficient if < 2 live proxies). Every confidence pill carries a `title` tooltip with the three inputs (`sigConfidenceTooltip(sd)`). Methodology footer at `#vw-signal` documents the formula in user-facing copy. |
| Signal row kebab | §4.4.5 escalation + override | Promote to Scoring Committee modal (verdict-impact + ≥60-char rationale) + Severity override modal (CRITICAL/HIGH/MEDIUM/LOW/NONE + ≥40-char rationale). Both unshift onto `AUDIT` and persist as in-memory state with visible `OVERRIDE` / `SC NOTIFIED` flags on the row |
| **Analyst Workspace — Arbiter v1** (`/workspace`) | §3.4.1 full row coverage + §3.2.3 line 232 (scoring-file lifecycle) | 3-tab shell: **Queue · Evidence · Watch Note**. **Queue tab** has two modes — list (My carriers table with `.fb` state-filter chips spanning the full lifecycle: All / No file / Draft / Submitted / Returned / Approved / Shipped / Rejected) and detail (scoring-file editor; switched on row click, `awState.cid` + `awState.sfId` track selection). Detail mode shows: SF header (carrier · `SF-YYYYMM-<CID>-NN` · status pill · Submit-to-SC / Ship-verdict actions), 5 `.aw-score` dimension cards with §3.3.6 sub-input grids + per-sub-score `.ev-btn` chip (counter when evidence attached), `.aw-prv` composite preview (live Σ(dim×weight)/10 with HF cap @65 when PPS or RCS < 40 and Deploy/Watch/DND verdict-preview chip), HF banner (which dimension tripped), **Prior verdicts** strip (AUDIT-sourced rows matching `^(Verdict|Composite|Committee decision|Verdict letter|Scoring file submission)`), **Scoring-file history** table (per-carrier prior SFs with View-details button → opens detail drawer), **Evidence corpus** table (per-carrier `EVIDENCE[]` records with mapped sub-score + confidence chip). **Evidence tab** = standalone evidence-submission form (writes to `EVIDENCE[]`, AUDIT entry). **Watch Note tab** = off-cycle Watch Note form (auto-links parent `SF-YYYYMM-<CARRIER>`, classification chips required per §3.2.4 routing, headline ≥10 / body ≥80 / source ≥5, AAV toggle — dispatch unshifts onto `FEED` + watermark + AUDIT). |
| **Scoring Committee** (`/committee`) | §3.4.2 (Inbox · Submission viewer · Decision capture · Decisions log) | Full-width Committee Inbox table + full-width Decisions log table — no inline viewer panel (review opens in the **SF detail drawer** instead, with Approve / Return / Reject footer triggering the decision capture modal). Sidebar count chip (`#ccSidebarCnt`) reflects pending submissions. Decisions write to `SF_DECISIONS[]`, unshift onto `AUDIT` with `src:'Scoring Committee'` and chair signature, refresh inbox + log + analyst queue. Drawer auto-closes after a decision so the chair isn't left looking at the stale row. |
| **Scoring-file lifecycle + persistence** | §3.2.3 line 232 (state filter) + §3.2.6 (watermarked shipped deliverable) | States: `draft → submitted → approved → shipped` happy path; `returned` (back to analyst, editable) and `rejected` (terminal) per §3.4.2. Editable: `draft / returned`. Continuable on queue-click: `draft / returned / submitted` (latest reopens; decided files spawn fresh SF for next cycle). `sfQueueDisplayFor(cid)` surfaces the most recent meaningful state — a freshly-spawned untouched `draft` doesn't mask a prior `rejected` / `approved` in the queue chip. **Persistence**: `andara.sf.state.v1` localStorage key holds `{files, decisions, evidence, audit}` — wrapped by `sfPersist()` on every mutation, replayed by `sfRestore()` on boot before any builder runs. Legacy `open` records migrate to `draft`. **Ship Verdict** action (visible when `sf.status === 'approved'`) calls `moLogDeliverable({deliverable:'Verdict letter (<sfId>)', format:'PDF', scope:'single'})` → token + deliverableId, flips status to `shipped`, replaces buttons with filled `SHIPPED · <token>` pill. |
| Per-sub-score evidence attach modal | §3.4.1 "Per sub-score evidence files, source links, analyst notes" | Modal opened from `.ev-btn` chip. Fields: source link / reference (≥5 chars, optional if file present), evidence file (≤2 MB, optional if source present — `FileReader.readAsDataURL` persists binary via localStorage at M1; M2 swaps to warehouse signed-URL upload), analyst note (≥20 chars, required). Renders attached list inline with FILE chip + filename + human-formatted size, Remove button per item. Schema: `sf.evidence['<dim>.<i>'] = [{ts, user, source, note, file:{name,size,type,dataUrl}}]` (single-object legacy auto-migrates on first render). |
| Watch Note creator (inside `/workspace` tab) | §3.4.1 "Off-cycle Watch Note tied to a parent scoring file" | Was a standalone surface, now lives as the third tab inside the Analyst Workspace shell. Fields and dispatch path unchanged: affected carrier (auto-links `SF-YYYYMM-<CARRIER>` parent-scoring-file id into a read-only field), severity (Info / Watch Note / Alert), classification chips (regulatory · legal · ops · financial · private — multi-select; ≥1 required per §3.2.4 routing), headline (≥10 chars), body (≥80 chars), source citation (≥5 chars), AAV toggle. Dispatch unshifts onto `FEED` with carrier's full `ALL_CARRIERS.id`, calls `moLogDeliverable`, refreshes dashboard + intel feed. Watch Note ids use `WN-YYYYMM-NNN` format; sequence derives from AUDIT count for the current YYYYMM. |
| **Comparison** (`/compare`) | §4.2.3 + §5.4.1 cross-carrier | Up-to-4 slot cards (`.cpk`) with chips (HF / STALE / AES / ET-JV / EU-BAN), Comparative AAV panel (auto-derived takeaways: leader Δ, strongest/weakest shared dimension, largest spread axis, hard-floor warnings, stale-verdict warnings), 5-Score radar overlay with per-carrier breakdown + band-key legend, 25-row scorecard incl. Verdict / Composite / 5-Score weighted (×5) / Strengths / Weaknesses / Region / Jurisdiction / Methodology / Monitoring tier / Hard floor / Country RCS band / CTC / EU blacklist / Last+Next+Validity dates / Active triggers / Data-gap profile / Conditions for upgrade / Verdict narrative (AAV) / Verdict trail (AUDIT-sourced) |
| Comparison toolbar | §3.2.6 + §4.2.5 + §3.4.1 | Saved sets dropdown · Save set · Submit to SC · Export PDF — all watermarked + audited |
| **Methodology** (`/method`) | §3.3.6 read-only at M1 (Methodology display · Scoring Committee minutes index · Change request placeholder) | Active-versions strip (`.m-ver` blue informational chips: v1.5-NG / v1.0-WA / v1.0-EA + READ-ONLY AT M1 meta), 5-Score cards (`.mgrid` + `.mcard` with top accent stripe, sans 18 name, 13px sub-input list with dividers per dimension), Verdict thresholds (`.vt-list` list-rows with mono colour-keyed threshold values + sans descriptions + tinted backplates) + hard-floor `.warn` banner (composite ≤ 65 if PPS < 40 or RCS < 40), **Scoring Committee · recent decisions** panel (`.sc-min` list-rows over AUDIT entries with status matching `Approved · CCC` or `Notified · awaiting SC` and src ∈ {Methodology, Signal, Comparison}; top 10 newest, click → carrier profile), Country-level RCS modifier table (`.ctbl` with column-width balance, uniform sans 14 cell typography, verdict-coloured CTC/EU/RCS cells for state semantics), Client-tier verdict differentiation paragraph (Pass 3–4 doctrine), **Change requests** placeholder panel (`.m-cr` 4-cell future-state grid: Route to / Required artefact / Decision cadence / Audit + disabled CTA flagging M2 §4.3.5 workflow). No breadcrumb — methodology is a top-level view. |
| Intelligence Feed (`/intel`) | §3.2.7 analyst-internal mirror + §3.4.1 evidence corpus | Three-piece toolbar: `.rtabs` stream segmentation (All / Events / Verdict moves), `.sig-tools` inline controls (`.sig-search` headline+carrier+source search, `.sig-region` carrier select with `Sector-level only`, `.sig-region` window select 30 / 90 / 365 / All — drives the panel-header label). `.fb` class chips inside the panel body (`.intel-feed-body` flex column gap 16) for source/impact filtering. Stream merges `FEED` (sector + carrier events incl. AIR publish, Watch Notes with `wnId` + severity + AAV badges) and `AUDIT` moves via `intelAuditItems()` (`/Composite|Verdict|Signal|Comparison submission|Refresh request/i` regex). Move rows render with `.sn-vchip` directional chip (`intelVerdictDelta` mirrors Sentinel + Recent Movers logic) + `.iitem.is-move` info-blue bullet. Watch Note dispatches surface from FEED to avoid double-render; SC promotions, severity overrides, comparison submissions, refresh requests all flow via AUDIT. `logRefreshRequest(cid, cname, origin)` helper (next to `moLogDeliverable`) writes the AUDIT row from both Sentinel and Market Overview refresh buttons. |
| **Audit Trail** (`/audit`) | §3.3.7 (Platform-wide audit log · Deliverable download log · Authentication events · Access change events) + §3.2.6 (Audit export) | Single `.atbl` table with 10 columns (Timestamp · User · Email · Carrier · Criterion · From · To · Source · Status · Note) populated by `buildAudit()` filtering `AUDIT` through `auditMatchesFilter()`. Filter shell: `.sig-toolbar` outer with `.rtabs` date-range chips (All / 24h / 7d / 30d) + `.sig-tools` (search · source · user · clear · export). Source select carries the normalised taxonomy: `Auth / Signal / Signal Triage / Methodology / Reports / Comparison / Sentinel / Workspace / Scoring Committee / Data ingestion`. Auth events (`src:'Auth'`, login/failed/restore) persisted to `andara.audit.auth.v1` localStorage by `_logAuthEvent` in the standalone login script, replayed onto `AUDIT` on boot by `authAuditReplay()`. User column split into User (parsed) + Email (full) via `auditSplitUser()`. Row click → `#auditDrawer` (a `.sig-drawer` at right edge) with sectioned bodies (Event · Transition · Actor · Deliverable for `src='Reports'` · Authentication for `src='Auth'` · Note). Export CSV button ships filtered rows + is itself watermarked via `moLogDeliverable({deliverable:'Audit export'})`. `moLogDeliverable` writes `ip` (stubbed `—` at M1, M2 backend populates) + `deliverableId` + `token` as top-level AUDIT fields. Drawer auto-closes on view change (see system-wide patterns). |
| **Reports & Downloads** (`/reports`) | §3.2.6 (Unified deliverables list · Filter & search · Watermarked download · Audit export) | 9 `.rptc` cards in `.rptg` 3-col grid spanning all 5 regions + Individual carrier brief + IC summary + Comparative analysis + Africa-wide portfolio memo. Card click → `rptOnCardClick(card)` reads `data-scope-kind` and either calls `rptGenerate({deliverable, carrier, format, scope})` directly (regional / all / compare) or opens `#rptCarrierModal` first (carrier scope). `rptGenerate()` calls `moLogDeliverable` (audit row), then `rptDownloadBlob()` emits a text-stub envelope with the watermark stamp baked in (M2 swaps to server-side PDF/PPTX/XLSX rendering). Toast surfaces deliverable ID + token. **Recent exports** panel below the cards reads live from `AUDIT.filter(l => l.src==='Reports')` via `buildReportsRecent()` — Re-download row button re-watermarks (per PRD: "every PDF download is regenerated with the downloading user's token"). Filter strip uses the `.rpt-toolbar` 3-row stack (row 1: date rtabs + Clear/Access-log; row 2: search + region/carrier/format; row 3: scope chip). `Access log (CSV)` exports the filtered `src:'Reports'` subset and is itself audited — closes PRD §3.2.6 "Audit export" on the Reports surface. **M2 deferrals**: real PDF rendering · full-text archive search · saved searches · bulk download with watermark trail (PRD §4.2.5). |

**What's NOT in the PRD — do not re-add unprompted:**
- Assigned analyst / Tier rationale text (no PRD basis for client view, no data field)
- Sentinel History table with composite delta column (no historical data series — would invent)
- Per-trigger sub-classification pills (DEPLOY TRIGGER, RCS UPGRADE, WATCH EVENT, etc.) — the design mock invented seven categories; the data has each trigger as one `event → impact` string and that's what we render
- Differentiated verdicts per client tier on the Comparison view (Western / Chinese / Regional / Mining-O&G) — Pass 3–4 doctrine, but cross-tier matrix on Comparison is over-spec
- Per-carrier historical *verdict* trail with full sparkline/time-series on Compare or anywhere else — no time-series data for verdicts exists. The AUDIT-sourced trail row in Compare is the legitimate substitute. (Note: per-carrier *Signal* history trail is implemented as a derived M2 surface — `SIGNAL_HISTORY` synthesised 13-week composite series rendered on the carrier-profile Signal panel. Production wiring to the warehouse `SIGNAL_SNAPSHOT` table is M2 backend work. No direct PRD anchor — extrapolated from §4.4.5's "continuously updated" language.)
- Geographic map / FleetWatch portfolio view on Market Overview — different product (M2+)

### Analyst Workspace + Scoring Committee conventions

- **Carrier scope is pan-African.** PRD §3.4.1 says M1 = Nigerian commercial AOCs only, but the rest of the terminal (Market Overview, Compare, Signal, Sentinel, Methodology) already exposes all five regions via Pass 4 ingestion — so analysts can already *see* every carrier and need to score them. Pre-unlock is deliberate; the comment on `awAssignedCarriers()` documents the M2 hop.
- **Lifecycle state is the PRD vocabulary** — `draft / submitted / approved / shipped` (§3.2.3 line 232) plus `returned / rejected` from §3.4.2. Do not use the old `open` label anywhere — `sfRestore()` migrates it to `draft` on boot.
- **Boot sequence is wrapped in `safe()` try-catch** so one broken builder can't lock the user out. If you add a new builder to `enterTerminal()`, wrap it the same way: `safe('myBuilder', () => myBuilder())` — failures log to console as `[boot] <name> failed:` but the rest still runs.
- **Login is isolated.** `_login()` is defined in its own `<script>` tag right after the login modal HTML (not in the main `<script>` block) so it works even if the main script has a syntax error. The eye-toggle on `#pwToggle` is also bound via event delegation on `document` for the same robustness reason. Don't move these into the main script.
- **`#pwToggle` MUST NOT have an inline `onclick`.** The button is wired *only* through the delegated `document.addEventListener('click', …)` handler (search for `#pwToggle` in the script). If you add an inline `onclick` "for safety", it will run *and then* the bubble fires the document handler, toggling the password type twice — net effect is the eye icon does nothing and the user can't reveal the access key. This has regressed twice already. If the delegated handler appears broken, fix it in place — do not add a second handler. Same rule applies to any other element wired by document-level delegation in this file.
- **Every form-field container gets 20px gap.** `.wsform { gap: 20px }` and `.sig-mbody { gap: 20px }` are the system canon. Action button row (`.wsa`) sits **32px** below the last field. Per-pair horizontal gap is also 20px (`.wsr`).
- **Scoring-file editor convention.** Sub-input changes auto-persist on every keystroke via `sfPersist()` (debounce not needed at M1 scale). There is no Save-draft button — the PRD doesn't define one and auto-save already satisfies the spec. If you find yourself adding one, you're probably duplicating work.
- **Per-sub-score evidence schema** is an array of `{ts, user, source, note, file}` records. Single-object legacy values auto-migrate on first render via `awRenderEvSubList`. The file object is `{name, size, type, dataUrl}` — a data URL is fine at M1 (caps at 2 MB, localStorage-backed); the M2 hop is to a warehouse object store with signed URLs (helper text in the attach modal documents this).
- **Drawer is shared.** `#sfDetailDrawer` (a `.sig-drawer` with `.sf-drawer` extension at 760px) renders the same body for three entry points — analyst workspace history (read-only), committee inbox (read-only + Approve/Return/Reject footer), decisions log (read-only with decision card). Don't fork it per surface.
- **Decision capture and Submit-to-SC both reuse the `sig-mback / sig-mbox / sig-mfield / sig-mbtn` modal pattern.** Don't roll new modal markup. The two modals (`#awSubmitModal`, `#ccDecisionModal`) bind their confirm buttons inside `bindAwTabs()`.

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

### Breadcrumbs — sub-page-only, origin-aware

Breadcrumbs **only appear on sub-pages**. The carrier profile (`vw-airline`) is currently the only sub-page in the terminal — every other view is a top-level entry in the sidebar and renders **no crumb**. Do not re-add a crumb to a top-level view.

The carrier-profile crumb links **back to the page the user came from**, not to a hard-coded parent. `showAirline(id)` reads the currently-active view *before* switching to `vw-airline` and updates `lastOriginNav` (one of `Market Overview / Andara Signal / Andara Sentinel / Intelligence Feed / Comparison / Methodology / Analyst Workspace / Audit Trail / Report Centre`). Carrier-to-carrier nav preserves the original origin.

The mapping lives in `VIEW_TO_NAV` and renders as a **two-segment** crumb (no `Terminal /` prefix): `Origin / Carrier name`.

If you add a new top-level view, add its `data-v` → `{v, lbl}` entry to `VIEW_TO_NAV` so the carrier profile can route back to it.

### System rhythm — 16 / 8 / 24

| Token | Use |
|---|---|
| **16px** | Padding *around* any card surface (`.cpk`, `.summary .cell`, `.sentinel-card`, `.mcard`, `.rptc`, `.mo-cms .pb`, `.mo-mini .pb`, panel `.pb`). Also the right-rail mini-panel internal padding. |
| **8px** | Vertical gap *between elements inside* a card. Card containers are `display: flex; flex-direction: column; gap: 8px` and child margins are zeroed so the gap owns the rhythm. |
| **24px** | Margin *between sections* on a page. Applies to `.panel`, `.summary`, `.cpks`, `.sig-*` rows, `.mo-*-row`, `.rtabs → first section`, etc. Inline `margin-bottom: 14/16/18px` overrides on individual panels were stripped. |

Do not introduce a fourth spacing token without a reason. If a child needs different inner padding, give it 12px — never go below 8 (that's the internal gap, not padding).

### List-item header → sub → chips rhythm (8 / 16)

Any list-item that contains a **headline**, a **sub-header/description**, and a **chip row** below uses this pattern:

```css
.x-body { display: flex; flex-direction: column; gap: 8px; }
.x-body h4 { margin: 0; }   /* heading */
.x-body p  { margin: 0; }   /* sub */
.x-tags    { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
```

- Headline → sub: **8px** (flex gap)
- Sub → chips: **16px** (8px flex gap + 8px `margin-top` on the chip strip)

Applied to `.mo-watch-body` (Watch Notes), `.mo-mover-item` (Recent Movers — name → note 8px), `.ibody` (alert feed items). Any future list-item with this shape must use it.

### Filter-heavy view shell (Signal · Intel Feed pattern)

When a view has both primary segmentation and inline secondary controls, reuse the three-piece shell already established on `/signal` and `/intel`:

1. **Outer toolbar** — `<div class="sig-toolbar">` (flex, gap 16, wrap, `margin-bottom: 24px`).
2. **Primary segmentation** — `<div class="rtabs">` with `.rtab` chips (sans 13/600, amber-soft active state). Used for stream / state / band / cohort toggles. `margin-bottom: 0` inside the toolbar so the toolbar owns the 24px section gap.
3. **Inline controls** — `<div class="sig-tools">` (flex, gap 8, `margin-left: auto` so it right-aligns within the toolbar). Holds `.sig-search` (220px, mono 12px, bg2) and `.sig-region` selects (32px with system chevron). Per-view ids get a `max-width` override (`#vw-intel .sig-tools #intelCarrier{max-width:200px}`).

Do not roll a bespoke `.x-tools` grid for this shape — extend the shared classes with id-scoped overrides instead.

### Filter row inside a panel — 16px sub-section rhythm

When a filter row is tightly bound to one result list (so they read as one unit), nest it **inside** the panel body rather than as a sibling above the panel. Pattern:

```html
<div class="panel">
  <div class="ph"><h3>…</h3><span class="meta">…</span></div>
  <div class="pb intel-feed-body">
    <div class="fb intel-class-row">…chips…</div>
    <div class="ilist" id="…"></div>
  </div>
</div>
```

```css
.intel-feed-body{padding:0;display:flex;flex-direction:column;gap:16px}
.intel-class-row{padding:16px 16px 0;margin:0}
.intel-feed-body .ilist{margin:0}
```

- The panel's `.pb` owns the 16px sub-section rhythm via `flex-direction: column; gap: 16px` — same idea as the 8px card rhythm, scaled up one step for tightly-bound sub-sections.
- The list still flows edge-to-edge (`padding:0` on the body), so item border-bottoms hit the panel border cleanly.
- Use this pattern any time a filter belongs to a single result list. Use the outer-toolbar pattern (above) when the filter scopes more than one panel on the view.

### List-row typography canon

Every list-item row across the terminal uses the same three-tier type stack — `.mo-watch-body`, `.mo-mover-*`, `.sn-event`, `.iitem` all agree. Match it when you build a new list:

| Slot | Style |
|---|---|
| Headline (`h4` / `.nm` / body `strong`) | sans 14 / 600 / `var(--t1)` / line-height 1.35 |
| Sub-line (description / note) | sans 13 / `var(--t2)` / line-height 1.5 |
| Meta column (date + time + carrier) | mono 12 / `var(--t3)` (date in `strong` bumps to 600 / `var(--t2)`) |
| Row padding | 14px top/bottom · 16px sides |
| Hover | `background: var(--bg3)` |

For multi-row chips on the headline (WN-id, severity, AAV, verdict label + vchip), use `.iitem-head` (flex, wrap, gap 8) so badges align on the optical centre of the headline.

### Chip colour rule — informational vs. actionable

Chips fall into two buckets and use different palette tokens. Get this right when you add a new chip.

| Bucket | What it means | Token | Examples |
|---|---|---|---|
| **Informational** | Static metadata the user reads but doesn't act on. No click, no state change. | `--info` foreground + `--info-soft` background + `--info-line` border | Methodology version chips (`v1.5-NG`), version markers, build / schema tags, read-only reference identifiers |
| **Actionable / brand-accent** | Filter active states, brand-significant labels analysts engage with (AAV chip, WN-id reference), CTAs, escalation flags | `--amber` foreground + `rgba(232,162,58,*)` background + amber border | Active filter chips (`.fp.active`, `.rtab.active`), AAV chip, WN-id badge, NEW pill, AOG severity |
| **Status / verdict** | Stateful semantic colour | `--deploy / --watch / --dnd` ramps | Verdict pills, severity (alert/watch/info), Recent Movers chips |

Amber is reserved. Don't use it for a chip whose only job is to label something the user already understood. If the chip carries no action and no state, it goes blue (`--info`).

If you're recolouring an existing chip from amber to blue (or back), update the chip's class CSS, not inline styles. Search for the class first to confirm reuse.

### Grid row height — `.panel { margin-bottom: 24px }` shrinks the item

Every `.panel` carries `margin-bottom: 24px` for stacked-panel rhythm. When a panel sits as a grid item next to a non-`.panel` wrapper (e.g. `.panel.c8.mo-cms` paired with `.c4.mo-rail` in the Composite Market Score row), the row stretches both items to row-height but **subtracts each item's margin from its effective height**. The panel ends up 24px shorter than its sibling wrapper, leaving an unbalanced bottom edge. The fix is to zero the bottom margin on the in-row panel (`.mo-cms { margin-bottom: 0 }`); the row already owns the section gap via its own `margin-bottom`. Any new "panel + sidebar rail" row needs the same override on the panel.

### Subpage navigation — preserve the origin sidebar highlight

`showAirline()` is the only sub-page entry point and runs `document.querySelectorAll('.sitem').forEach(s => s.classList.toggle('active', s.dataset.v === lastOriginNav.v))` so the originating top-level nav item stays highlighted on the carrier profile. Do NOT change this back to `classList.remove('active')` — the user explicitly needs a persistent "you are here" anchor on subpages, and the highlighted item must match the breadcrumb's first segment. If you add a new top-level view, add it to `VIEW_TO_NAV` so this hook resolves the right `data-v`.

### Pill / chip margin — `.warn` collision guard

The legacy `.warn` class (warning banner) adds `padding`, `background`, `border`, and `margin-bottom: 14px`. **Any pill that takes class `warn` (verdict pill, NEW pill, the Watch active-triggers pill, etc.) MUST set `margin: 0` in its base rule** or the banner's bottom margin leaks and shifts the pill vertically. This was the root cause of the Market Overview Watch-cell rendering as a tall amber box — the `.val.warn` was inheriting `.warn`'s padding + border + margin. We renamed the class to `.val.watch` to dodge the collision, and every new chip declares `margin: 0` defensively.

### Table-cell class collision guard — `.c-*` namespacing

The global stylesheet owns several short class names for unrelated chrome: `.user{display:flex; border-left; height:34px; padding-left:18px}` (top-nav user chip), `.carrier{display:flex; gap:11px}` (sidebar carrier row), `.status` / `.note` / `.src` / `.ts` (various). When a `<td>` takes any of those classes the global rules cascade in — `display:flex` breaks the table layout, `border-left` adds a stray vertical seam between cells, `height:34px` forces uneven row heights. **All table-cell classes must be namespaced.** The Audit table uses `c-ts / c-user / c-email / c-carrier / c-src / c-status / c-note`. If you add a new table, follow the same convention (`<surface>-<cell>` or a short `c-*` prefix). The user's "rows are not straight" bug report traced to exactly this cascade.

### Wide-table column balance — `<colgroup>` over browser auto-layout

Browsers auto-size table columns by content width. For tables whose narrative cell carries most of the text (country-modifier table on Methodology, evidence corpus on Workspace, etc.), auto-layout gives Jurisdiction / Bloc / CTC roughly equal width to Sovereign context — even though Sovereign context holds 5× the characters. Result: a wide, mostly empty left half and a cramped narrative column.

**Fix:** prepend an explicit `<colgroup>` with `%`-based widths. Example, country-modifier table in `buildCountryModTable()`:

```html
<colgroup>
  <col style="width:12%">  <!-- Jurisdiction -->
  <col style="width:13%">  <!-- Bloc -->
  <col style="width:13%">  <!-- CTC Status -->
  <col style="width:10%">  <!-- EU Blacklist -->
  <col style="width:40%">  <!-- Sovereign context — narrative -->
  <col style="width:12%">  <!-- RCS.6 anchor band -->
</colgroup>
```

Rule of thumb: give the narrative column ≥35% and trim short categorical columns to 10–13%. Any table where one cell is a multi-line description and the rest are 1–3 word tags should ship with a colgroup — don't trust auto-layout to allocate sensibly.

### System-wide search-input clear button — `attachSearchClears()`

Every `input.sig-search` + `input#gsearch` gets wrapped in a `.search-wrap` (position:relative) with a `×` clear button (position:absolute, right:6px) that appears only when the input has content (`.has-value` toggle). Click clears the value, dispatches `new Event('input',{bubbles:true})` so consumer handlers refilter, and refocuses. Wired once at boot via `safe('attachSearchClears', () => attachSearchClears())`. The wrap is `display:inline-flex` so it behaves both as a fixed-width child (Signal/Audit/Reports toolbars) and as a flex:1 child inside the top-nav `.cmd` shell (`.cmd .search-wrap{flex:1}`). Helper: `attachSearchClears()` is idempotent via `dataset.searchClear='1'`. **Do not add bespoke clear affordances to individual search inputs** — extend the selector if a new search input appears.

### Position-fixed drawer auto-close on view change

Any drawer rendered with `.sig-drawer-back` + `.sig-drawer` is `position:fixed` and survives view changes — the backdrop (`rgba(0,0,0,.55)`) will black out the new view if not closed. Every navigation entrypoint must close any open drawers: **`bindNav` sitem clicks** and **`showAirline(id)`** both call `if(typeof auditCloseDrawer==='function')auditCloseDrawer();` and `if(typeof sigCloseSrcDrawer==='function')sigCloseSrcDrawer();` before switching views. If you add a new drawer (new `.sig-drawer` instance), add its close call to both transition points. The Signal source drawer had this latent bug too — both are now defended.

### Two-row toolbar — `.rpt-toolbar` alternative to `.sig-toolbar`

When a filter strip has more controls than fit on one row at desktop width, the legacy `.sig-toolbar` (flex with wrap + `.sig-tools{margin-left:auto}`) creates an unbalanced second row with empty left space. Use **`.rpt-toolbar`** instead — a `display:flex; flex-direction:column; gap:12px` stack where each `.rpt-row` is `display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap`. Both rows have left + right anchors with empty middle. Reports & Downloads uses this pattern with row 1 = date rtabs + global actions, row 2 = search + filter selects, row 3 = `.rpt-row-meta` (scope chip, `justify-content:flex-start`). Keep `.sig-toolbar` for ≤4-control toolbars; reach for `.rpt-toolbar` when you cross that.

### Watermarked deliverable contract — top-level AUDIT fields

`moLogDeliverable({carrier, deliverable, format, scope})` now writes `ip` (stub `'—'` at M1, M2 backend populates server-side), `deliverableId`, and `token` as **top-level fields** on the AUDIT row (not just inside the `note` string). The legacy `note` format (`<deliverableId> · <token> · scope=<scope>`) is retained for back-compat with surfaces that parse it (Reports `rptDeliverableOf` / `rptFormatOf` / `rptScopeOf` helpers split on `·`). Audit row drawer surfaces the structured fields explicitly in its Deliverable section. CSV exports include `ip / deliverableId / token` columns. PRD §3.3.7 ("user, IP, watermark token, deliverable ID") is fully captured in the data model even if IP is a stub at M1.

### System-wide `<select>` chevron + symmetric padding

Native browser chevrons render with uneven spacing across engines. The fix is global:

```css
select {
  -webkit-appearance: none; -moz-appearance: none; appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg…chevron…/>");
  background-repeat: no-repeat;
  cursor: pointer;
}
```

Per-class, set:

- `padding-right = 2L + 12px` (L = left padding, 12 = chevron width)
- `background-position: right Lpx center`

So the chevron has the **same breathing room from the right border as the text has from the left border**.

Standard heights:
- 28px select with L=10 → padding-right 32 / chevron right 10
- 32px select with L=12 → padding-right 36 / chevron right 12

Always set `background-color:` (not the shorthand `background:`) so colour overrides don't clobber the chevron `background-image`.

### Watermark + audit logging (PRD §3.2.6)

Every deliverable that leaves the platform must be watermarked and logged. The pattern is centralised:

```js
const wm = moLogDeliverable({
  carrier: 'ASKY Airlines',   // or full scope string for cohorts
  deliverable: 'Verdict letter',
  format: 'PDF',
  scope: 'single'             // or 'cohort' / 'compare-N' / 'Nigeria' / etc.
});
// wm = { user, ts, deliverableId: 'AND-VERDICTLETTER-XYZ',
//        token: 'tok-abcd1234' }
```

`moLogDeliverable()`:
1. Generates the watermark token via `moWatermarkToken()` — derived from session email (`localStorage.andara.auth`), UTC timestamp, deliverable type, scope, and a random seed (FNV-1a hash).
2. Unshifts an entry onto the global `AUDIT` array: `{ts, user, carrier, crit: '<Deliverable> download', fr: '—', to: '<format> · watermarked', src: 'Reports', status: 'Delivered', note: '<deliverableId> · <token> · scope=<scope>'}`.
3. Calls `buildAudit()` so the `/audit` table reflects the entry immediately.

Wired surfaces: **Export cohort**, **Open report**, **per-row Verdict letter PDF** on Market Overview; **Export PDF** on Comparison. Toast displays the watermark token + deliverable id so the user has a copyable handle.

Any new download / export must go through `moLogDeliverable()` — never `toast()` alone.

### Audit-log integration as the action substrate

The global `AUDIT` array is now the **system-wide action log** — not just methodology changes. The following actions all `unshift` onto it and call `buildAudit()` so the `/audit` view reflects them in real time:

- Signal: Promote to SC · Severity override · Override clear
- Compare: Submit to SC
- All watermarked downloads (above)

This also powers the **Verdict trail** row on Compare (filtered by carrier name) and the **Recent Movers** panel on Market Overview (filtered to crit ∈ {Composite, Verdict, Signal}). Any new action that affects a carrier should write to `AUDIT` so it surfaces in both reads automatically.

### Modal pattern (Signal + Compare)

Modals across the app share one CSS namespace and one open/close API:

```html
<div class="sig-mback" id="someModal">
  <div class="sig-mbox">
    <div class="sig-mhd"><h3>Title</h3>
      <button class="close" data-sig-close="someModal">✕</button></div>
    <div class="sig-mbody">
      <div class="sig-msummary">…carrier/cohort summary chip…</div>
      <div class="sig-mfield">
        <label>Field label</label>
        <select|input|textarea>
        <div class="helper">Helper text.</div>
      </div>
    </div>
    <div class="sig-mfooter">
      <button class="sig-mbtn" data-sig-close="someModal">Cancel</button>
      <button class="sig-mbtn primary" id="someConfirm">Confirm</button>
    </div>
  </div>
</div>
```

- Open: `sigOpenModal(id)`
- Close: `sigCloseModal(id)` (also auto-bound to `[data-sig-close]` and to the Esc key)
- Field widths: `.sig-mfield input/select/textarea` already enforce 100% width and 12px helper text
- Min rationale lengths: enforced inline in the confirm handler; bounce a `toast()` if too short

When you add a new committee-gated action (promote / override / submit), copy a Signal modal verbatim — same id pattern (`sig-mback` / `sig-mbox`), same `sigOpenModal/sigCloseModal` calls. Don't fork the modal system.

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

## FleetWatch surfaces — build log (PRD-aligned, feature-by-feature)

We are building the **FleetWatch product line** out of the PRD, one feature at a time, each
reusing the Credit Intelligence terminal design system verbatim (pure-black canvas, desaturated
amber, ink tiers + `--display`, Hanken Grotesk + IBM Plex Mono, 10/12/14 font floors, fixed-height
inline-flex pills with `margin:0`, 16/8/24 rhythm, list-row typography canon, info/actionable/status
chip-colour rule, namespaced table cells + `<colgroup>`, breadcrumb-on-subpage, isolated `_login()`
+ delegated `#pwToggle` with no inline onclick, session restore, watermark+audit on every download).

Each surface is a **self-contained static HTML app** under `public/fleetwatch/`, served via the
dev middleware + `vercel.json` rewrites (both already wired). They are **separate surfaces for
separate audiences** — do not cross-link them in nav.

### `/fleetwatch/portal` — Client Portal · FleetWatch Dashboard (PRD §3.2.3) — COMPLETE

What institutional clients (banks/lessors/DFIs) see. File: `public/fleetwatch/portal/index.html`.
Demo: `ops@fidelitybank.com` / `andara2026`. Session key `andara.fw.portal.auth`.

All six §3.2.3 features built: **Fleet list** (MSN/type/operator/surveillance-state/last+next visit +
summary stat strip), **Aircraft detail page** (breadcrumb subpage `Fleet / <reg>`), **Latest quarterly
report viewer** (inline cream-PDF preview bearing a diagonal seat-watermark + watermarked Download),
**Open anomalies list** (severity/capture-date/source-visit/status — **filtered to non-resolved**, the
panel is the *open* list per the PRD title), **Alert history** (all AOG alerts, dispatch + ack time,
client Acknowledge button writes audit), **Document index** (all deliverables, type chip + watermarked
download). Watermark/audit via `fwLogDeliverable()` → `AUDIT` + `andara.fw.portal.audit.v1` (M2 moves
token generation server-side per §3.2.6). Data is a static `FLEET[]` seed (Nigerian AOCs, M1 scope).

**Side-nav restructure (post-launch).** The portal was originally a two-screen flex flow (fleet list →
aircraft detail, with report/anomalies/alerts/docs nested inside the detail only). To match (and improve
on) the production `portal.andarasystems.com` sidebar, the shell is now a **CSS grid** (`grid-template-areas:"tb tb" "sb mn"`, topbar + left `.sb` + scrollable `.mn`; `#app` display flips to **`grid`** on login/restore, not `flex`). Left nav `.sb` is grouped: **Monitoring** (Fleet Overview · Anomalies · Alerts) ·
**Deliverables** (Reports · Documents) · **Account** (Account & contract). Each PRD §3.2.3 feature is now a
first-class **fleet-wide view** (`renderAnomalies/renderAlerts/renderReports/renderDocuments/renderAccount`,
each a `.phead` + `.summary` stat strip + `.lrow` list aggregating across all `FLEET[]` aircraft), on top
of the existing per-aircraft detail. `showView(v)` swaps views + sets `.snav.active`; `.snav` counts
(`navAnom`/`navAlerts` via `updateNavCounts()`) show open-anomaly + pending-ack totals. Drill-down is
**origin-aware**: `showAircraft()` records `_originView`, sets the sidebar highlight + breadcrumb label to
the originating view, and Back (`backToFleet`) returns there. `ackAlert()` re-renders the current view +
refreshes counts. Sidebar hides < 860px (`.sb{display:none}`, grid collapses to single column). Reuses the
existing `.pill/.lrow/.summary/.cell/.kv` styles; only new CSS is the grid shell + `.sb`/`.snav`/`.reg-tag`.

**Region selector + Default flagging (PRD v1.6 §3.2.3 additions).** The updated PRD (`Andara_Master_Build_PRD_v1_6.md`) expands scope to all 85 carriers / all regions from M1 and adds these two portal features:
- **Region selector** — a **top-nav dropdown** (`#regionSelect` in the `.tb-region` header block, NOT the sidebar — placed there per user preference), populated by `renderRegionSelector()` with `All regions` + each of `PURCHASED_REGIONS` (`['Nigeria','West Africa']`) and live counts. Its `change` handler calls `setRegion(r)`, which persists to `andara.fw.portal.region`; **`fleetInScope()`** (region-filtered FLEET) is what every view render reads instead of `FLEET` directly, so the fleet list, all fleet-wide views, and the sidebar counts scope to the selected region. FLEET seed gained a `region` field + 2 West Africa carriers (ASKY, Air Côte d'Ivoire). (`setActiveNav` targets `.snav[data-v]` to stay robust.)
- **Default flagging** — each carrier carries `defaultRisk:{planM,actualM,month}` (monthly sales vs documented business plan). `defaultFlag(a)` → `{level,lbl,variance}` (variance ≤ -20% = `risk`, ≤ -8% = `watch`, else `ok`). Surfaced three ways: `.df-tag` chips on fleet-list rows, a **"Default flagging"** panel on the aircraft-detail page (`#dfPanel`: plan-vs-actual `.df-track` bars + variance + a §7.4 flight-tracking-pending note), and a dedicated **Default risk** sidebar view (`vw-defaultrisk` / `renderDefaultRisk()`) that lists carriers worst-first with a `.summary` strip and per-carrier bars, plus a `#navDefault` badge. Flight-behaviour (ADS-B) signals are held per PRD §7.4.

**Fleet Health build-out (production parity, beyond the written PRD milestone).** The user wants the client portal to match/beat the production `portal.andarasystems.com/fidelity`, whose sidebar has Portfolio Overview · Predictive Intelligence · Aircraft Detail · Intelligence Reports. In the PRD these map to M2 (portfolio dashboard) / M3 (predictive), but the user directed building them now for parity. Data is a seeded per-aircraft `HEALTH` map (`{score,trend,valueEstM,hoursTSN,cycles,openDefects,adCompliance,lastCCheck,components{Structural,Powerplant,Systems,Compliance,Maintenance},obs[]}`) + a `PREDICT[]` events array (`{ac,hz:'act'|'plan'|'aware',cat,title,impact,varM}`); M2 wires the real scoring/ML engine. Helpers: `health(a)`, `hsColor(score)` (sv-ok ≥75 / sv-due ≥60 / sv-over), `watchItems(a)`, `needsAttention(a)`, `impRank`/`impPill`. New sidebar group **"Fleet Health"** at the top holds these. Built so far (2 of 4):
- **Portfolio Overview** (`vw-portfolio` / `renderPortfolio`) — 4 KPI cells (Fleet health score avg /100, Value intact X of N, Value at risk = trend down count, Immediate attention = `needsAttention` count) + an Aircraft health & value table (Registration · Type/Operator · colour-coded health-score pill · value-trend pill · watch-items + Attention tag), sorted worst-first, region-scoped.
- **Predictive Intelligence** (`vw-predictive` / `renderPredictive`) — 4 KPI cells (Act now / Plan ahead / Value at risk $ / aircraft flagged) + three horizon panels (`pi-act` 0–30d, `pi-plan` 1–6mo, `pi-aware` 6–12mo) listing events with impact pills, + an **Asset value at risk** panel aggregating `varM` per aircraft (worst-first, `.pi-var` $ figure). `#navPredict` badge = act-now count. Region-scoped.
- **Still TODO (M-parity):** enrich **Aircraft Detail** (health score + component breakdown + engineering KPIs + `obs[]` field observations, data already seeded) and upgrade **Intelligence Reports** (report/archive list).

### `/fleetwatch/capture` — Field Agent App · FleetWatch Capture (PRD §3.4.3) — COMPLETE (all 8 features)

What Andara field agents use on-site. File: `public/fleetwatch/capture/index.html`. Demo:
`field.agent@andara.com` / `andara2026`. Session key `andara.fw.agent.auth`.

- **#1 Agent login (offline-first, cached credentials)** — DONE. Online enrolment validates the key
  then caches `{email, keyHash (FNV-1a, never cleartext), agent, enrolledTs, lastOnlineAuthTs}` to
  `andara.fw.agent.cred.v1`; offline sign-in validates the entered key against the cache. Live
  online/offline pill (`navigator.onLine` + events). Auth events → `andara.fw.audit.auth.v1`.
- **#2 Visit list** — DONE. Static `VISITS[]` keyed by agent id (M2 syncs from FleetWatch Operations
  §3.4.5 "Assign visit"). Rows show aircraft (reg+type+MSN+operator), location, due date + a
  due-urgency chip (`due-over/now/soon/ok` reusing the validity ramp), sorted overdue-first. Panel is
  **collapsible** (header toggle, persisted to `andara.fw.capture.visitsCollapsed`) — a builder
  convenience so the rest of the page is reviewable; same pattern as the CI sidebar groups.
- **#3 Visit capture flow** — DONE. Schema-driven per-visit-type forms (`VISIT_FORMS` keyed by visit
  type: Records review / Ramp inspection / MRO observation), each a checklist + structured fields.
  Tapping a visit opens the form; drafts auto-save to `andara.fw.capture.drafts.v1` (offline-first,
  the base for #6); status selects are severity-tinted; a progress counter and "Complete capture"
  flip the visit row state Not started / In progress / Captured.
- **#4 Photo capture** — DONE. A **Photos** panel inside the visit-capture flow (`renderCapture`):
  `Take photo` (`<input type=file accept=image/* capture=environment>`, opens the device camera on
  mobile) + `Add from library` (multi-select). `processPhoto()` runs each file through
  `createImageBitmap(file,{imageOrientation:'from-image'})` then a canvas re-encode (max 1280px long
  edge, JPEG q0.82) so EXIF orientation is baked in, EXIF stripped, and the data URL fits the offline
  localStorage budget; falls back to an `<img>`/objectURL path on engines without `createImageBitmap`.
  Photos persist into the same draft record (`rec.photos[] = {id,dataUrl,w,h,ts,caption}`) under
  `andara.fw.capture.drafts.v1`, so they're already queued for #6/#7. Per-photo caption (auto-saves)
  + remove. `capSaveAll()` now returns a boolean; the add path rolls back the push and surfaces a
  "Storage full" message if the quota throws. 2-up grid on phones (`minmax(132px,1fr)`). Capture-
  complete audit note now includes the photo count.
- **#5 Document scan** — DONE. A **Documents** panel (parallel to Photos, reuses the photo-grid CSS
  with a `.cap-docs` portrait/`object-fit:contain`/dark-mount override). `Scan document`
  (`capture=environment`) + `Add from library`. `scanProcess()` → orientation-normalise
  (`createImageBitmap` from-image) → `estimateSkew()` → `deskewAndEnhance()`, JPEG q0.82 at max 1400px.
  **Auto-deskew** (`estimateSkew`) is a projection-profile-variance estimator: binarise a 360px
  grayscale copy (ink = darker than 0.82× page mean), then for candidate angles -12°..12° (coarse 1°,
  then ±1° refine at 0.25°) bin ink pixels by their projected row `y - x·tan θ` and pick the angle
  whose row-histogram has the highest variance (text rows aligned → peaks/troughs → max variance).
  The page is then rotated upright on a white mount (`deskewPage`) and stored as-is. **Auto-deskew
  only, per the exact PRD wording** ("Document capture with auto-deskew"): the document's colour and
  content are PRESERVED, no grayscale/contrast/gamma re-processing (an earlier `deskewAndEnhance`
  step that grayscaled + level-stretched the page was removed as out-of-spec and a fidelity risk for
  certificates/stamps; the grayscale binarisation in `estimateSkew` is analysis-only and never
  touches the stored image). Verified: induced skew of +7°/-4°/+6°/0° detected exactly, residual
  ≈0°, and colour preserved (red stamp + blue ink survive). Stored as `rec.documents[] =
  {id,dataUrl,w,h,angle,ts,caption}` in the same `andara.fw.capture.drafts.v1` draft. Card meta shows
  `Aligned` or `Deskewed X.X°`. Same caption/remove/quota-rollback pattern as photos. Capture-complete
  audit note includes the document count.
- **#6 Offline persistence** — DONE. Every capture already auto-persists to
  `andara.fw.capture.drafts.v1` as it's edited; this feature seals a completed visit into a **bundle**
  and surfaces the held-on-device queue. `completeCapture` now sets `sync:'queued'`, `queuedTs`,
  `queuedOffline` (was `navigator.onLine===false` at capture time) and a `bundleId` (`BND-<base36>`),
  on top of the existing `status:'captured'`. New **"Held on this device"** panel on the home view:
  `.offgrid` 2-cell summary (Queued for sync count · Stored offline size via `capStoreBytes()` +
  `fmtBytes()`), a connectivity-aware `#syncHint` (online: "upload on next sync"; offline: "held …
  will upload when you reconnect"; refreshed from `_paintAppNet`), and `#syncList` of queued bundles
  (`queuedVisits()` = records with `status==='captured' && sync!=='synced'`, newest first) showing
  `capCounts()` contents (`N of M fields · X photos · Y scans`), queued time, bundle id, QUEUED chip,
  click → reopen. Visit-row chip now uses `capDisplayState()` → Not started / In progress / **Queued**
  / **Synced** (new `.ichip.queued` info + `.ichip.synced` deploy chips). Verified: completed visit
  survives a full reload (offline persistence), chip flips to Queued, offline hint updates live.
- **#7 Sync on reconnection** — DONE. `fwSyncQueue(trigger)` drains the held queue to the FleetWatch
  capture-intake endpoint. Triggers: the window `online` event, app open if already online
  (`enterApp` schedules `fwSyncQueue('app-open')` so a visit captured offline in a prior session
  uploads on reopen), and a manual **"Sync now"** button on the "Held on this device" panel. Each
  bundle steps `queued → uploading → synced`: `fwSubmitBundle(rec)` is a front-end **STUB** (resolves
  a receipt `INTK-<base36>` after a simulated delay; M2 POSTs the bundle and uses the server receipt +
  IP), then the record gets `sync:'synced'`, `syncedTs`, `receiptId`, and an `_logAuthEvent('Visit
  synced', …)` audit row with the reg/vtype/bundleId/**photo+doc counts** (explicitly reflecting PRD
  line 110 "syncs documents and photos")/receipt. `_syncing` guard prevents concurrent
  passes; offline short-circuits (button disabled "Offline", bundles stay queued). Synced records stay
  in `andara.fw.capture.drafts.v1` (they feed #8 Visit history) but drop out of the queue. Sync meta
  (`lastSyncTs`) persists to `andara.fw.capture.sync.v1`; panel shows "Last sync … · N submitted to
  intake". New chips `.ichip.uploading` (amber, pulse) + `.ichip.failed` (dnd); `capDisplayState`
  extended to Uploading / Sync failed. Verified: manual + reconnect-event sync both drive
  queued→synced with receipts, queue empties, visit chip flips to Synced, offline guard holds bundles,
  audit rows written, no console errors.
- **#8 Visit history** — DONE (last §3.4.3 feature; **all 8 now shipped**). `capturedVisits(prof)`
  reads `andara.fw.capture.drafts.v1` for `status==='captured'` records belonging to the signed-in
  agent (`r.agent===prof.id` or membership in `VISITS[prof.id]`), newest first. `renderHistory` paints
  the **"Visit history"** home panel: per-row aircraft/operator, visit type, location, "Captured
  <ts>" + contents (`capCounts`), `capDisplayState` chip (Queued/Uploading/Synced/Failed), and the
  receipt id (synced) or bundle id, click → reopen. Scoped strictly to "this agent" per PRD wording.
  Synced records are retained in the drafts store specifically so history persists (they leave the
  sync queue but stay in history). `renderHistory` is called from `enterApp`, `backToHome`, and every
  `fwSyncQueue` step so state stays live (a visit flips Queued→Synced in history as it uploads).
  Verified: this-agent scoping (foreign-agent records excluded), newest-first order, live state flip
  on sync, receipt shown, empty state, no console errors.

Note: the FleetWatch apps contain **no em dashes** (commas instead), per a standing user preference;
keep new copy/comments in these files em-dash-free.

### `/fleetwatch/review` — Supervisor Review (PRD §3.4.4) — IN PROGRESS

What a senior analyst uses to review the visits field agents captured and synced (§3.4.3), before a
visit is accepted and a quarterly report can be built. File: `public/fleetwatch/review/index.html`.
Demo: `supervisor@andara.com` / `andara2026`. Session key `andara.fw.review.auth`. Route wired in
`vercel.json` (+ dev middleware auto-discovers). Seed data is `REVIEW_VISITS[]` (3 submitted visits,
one per visit type, each carrying the structured form, photos, scans, ingestion-extracted fields and
draft/auto-flagged anomalies). In production these arrive from the FleetWatch capture-intake endpoint
(the bundles §3.4.3 syncs out); the M1 seed is the stand-in.

- **#1 Pending visits queue** — DONE. `pendingVisits()` (status `pending`, sorted oldest-first =
  longest-waiting first). Home view: 4-cell stat strip (Pending review · Draft anomalies · Visit types
  · Oldest waiting) + queue rows (reg + vtype chip + draft-anomaly count chip, aircraft/MSN/operator,
  location + agent, submitted timestamp + `waitLabel()` urgency chip reusing the wait-long/mid/ok
  ramp). Click row → review surface.
- **#2 Visit review surface** — DONE. `openReview(id)` → `renderReview(v)`: breadcrumb `Queue / <reg>`,
  header (reg + chips), provenance strip (submitted-by / submitted / location / intake receipt), then
  five read panels: **Structured form** (per-section rows, status values severity-tinted via
  `sevClass()` covering all three visit-type vocabularies, records `Sighted/Not available/Discrepancy`,
  ramp/MRO `Satisfactory/Advisory/Defect`, and the select scales; free-text findings render as italic
  notes), **Photos** (placeholder tiles + captions; real thumbnails come from the bundle in M2),
  **Document scans** (placeholder tiles + `Aligned`/`Deskewed X°` label), **Extracted fields** (k/v +
  `from <source>` provenance line), **Draft anomalies** (severity chip + source chip + `Draft` chip).
  Decision footer shows disabled Accept/Amend/Return buttons flagged as §3.4.4 #3.
- **#3 Accept / amend / return** — DONE. Decision footer is live when `v.status==='pending'`, otherwise a
  read-only decision card. **Accept & close** (optional note) → `status:'accepted'`; **Return to agent**
  (note required, ≥15 chars, enforced) → `status:'returned'`; **Amend fields** opens a modal of the
  extracted fields as editable inputs, saving records `{from,to,ts}` per changed key, applies to
  `v.extracted[i].v`, and stamps `e.amended={from}` so the field shows an `Amended` chip + `was: <orig>`
  (original preserved across repeat amends). Decisions + amendments persist to `andara.fw.review.state.v1`
  and replay via `rvRestore()` on boot. Queue gains `.fb` filter chips (Pending / Accepted / Returned /
  All, with live counts via `countBy()`); `visitsFor(filter)` sorts pending oldest-first and decided
  newest-first; decided rows show an Accepted/Returned chip + `View →`. Shared reusable modal (`#rvModal`,
  `rvmOpen(cfg)`/`rvmClose`) + `toast()`. Verified: amend (orig preserved + persisted), accept, return
  (short-note guard blocks), filter counts, reload persistence, decision card, no console errors.
- **#4 Anomaly classification** — NEXT. Promote a draft anomaly to a formal anomaly with severity.

Photos/scans are represented as placeholder tiles (tone/label), not embedded base64, to keep the file
light; production renders the real synced media. This surface is read-only at #1+#2; the mutating
actions (#3, #4) are the next build.

### Backend boundary (when wiring real data)

Everything currently runs front-end-only (static seeds + localStorage). In production the Client
Portal features are server-backed reads; the Field Agent App is offline-first (device is the working
surface, backend only **assigns in** via a FleetWatch Operations "assign visit" API and **syncs out**
via a capture-intake endpoint). Offline persistence (#6) is intentionally local-only.

---

## Reference Documents

- `Andara_Master_Build_PRD_v1_5.md` — Master Build PRD covering Client Portal, Super Admin Console, and Andara Internal Workspace across three milestones. **INTERNAL — RESTRICTED.** All product work should reference the relevant PRD section.
- `andara_prd_export.md` — Fresh Markdown export of the same Master Build PRD (imported from Google Docs); identical content to `Andara_Master_Build_PRD_v1_5.md`, kept alongside it.

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
| `public/fleetwatch/portal/index.html` | FleetWatch **Client Portal Dashboard** (PRD §3.2.3 — complete) |
| `public/fleetwatch/capture/index.html` | FleetWatch **Field Agent App** (PRD §3.4.3 — all 8 features shipped: Agent login + Visit list + Visit capture + Photo capture + Document scan + Offline persistence + Sync on reconnection + Visit history) |
| `public/fleetwatch/review/index.html` | FleetWatch **Supervisor Review** (PRD §3.4.4 — in progress: #1 Pending visits queue + #2 Visit review surface + #3 Accept/amend/return shipped; #4 Anomaly classification next) |
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
