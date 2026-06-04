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

## Routing

Static page routes are defined in two places — both must be updated when adding/renaming a page:

- `vercel.json` — production rewrites
- `vite.config.ts` — local dev server middleware (mirrors vercel.json)

---

## Key Files

| Path | Purpose |
|------|---------|
| `public/credit-intelligence/africa/index.html` | Africa terminal page (patched output) |
| `scripts/patch-africa-page.py` | Patch automation script |
| `andara_export/` | Raw HTML exports from design tool (not served) |
| `vercel.json` | Production URL rewrites |
| `vite.config.ts` | Dev server config + static page middleware |
| `public/Andara Systems logo - dark mode.png` | Logo file used by the terminal page |
