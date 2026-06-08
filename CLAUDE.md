# Andara / BAC Aviation — Project Guide for Claude

## Project Overview
This is a React + Vite web app (TypeScript, Tailwind, shadcn/ui) deployed on Vercel.
Static terminal-style pages live in `public/` and are served via rewrites in `vercel.json`.

---

## Updating the Africa Credit Intelligence Page

The `/credit-intelligence/africa` page is a self-contained HTML terminal app exported periodically from a design tool. New versions arrive as raw files in `andara_export/` and need standard patches applied before going live.

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
| `public/credit-intelligence/africa/index.html` | Africa terminal page (patched output) |
| `scripts/patch-africa-page.py` | Patch automation script |
| `andara_export/` | Raw HTML exports from design tool (not served) |
| `public/intelligence/air.css` | Shared AIR design system |
| `public/intelligence/air-001-apr26/index.html` | AIR Issue 001 |
| `Andara_Master_Build_PRD_v1_5.md` | Master Build PRD (Internal — Restricted) |
| `vercel.json` | Production URL rewrites |
| `vite.config.ts` | Dev server config + auto-discovered static page middleware |
| `public/Andara Systems logo - dark mode.png` | Logo file used by the terminal page |
