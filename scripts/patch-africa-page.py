#!/usr/bin/env python3
"""
patch-africa-page.py
====================
Applies all standard patches to a raw Andara Credit Intelligence HTML export
and writes the result to public/credit-intelligence/africa/index.html.

Usage (from project root):
    python3 scripts/patch-africa-page.py "andara_export/<file>.html"

Each patch is idempotent — safe to re-run on an already-patched file.
"""

import os
import re
import sys
import tempfile

# ──────────────────────────────────────────────
# CONSTANTS — edit these when values change
# ──────────────────────────────────────────────

LOGO_PATH = '/Andara%20Systems%20logo%20-%20dark%20mode.png'

TITLE = 'Andara Credit Intelligence - Africa | Aviation Finance Terminal'

META_DESC = (
    "Africa's independent aviation credit intelligence platform. "
    "5-Score methodology, institutional-grade Deploy / Watch / Do Not Deploy verdicts. "
    "Nigeria · West Africa · East Africa."
)

DEST = 'public/credit-intelligence/africa/index.html'

# Full responsive CSS block (tablet + mobile)
RESPONSIVE_CSS = """
/* ── Hamburger hidden on desktop ── */
.ham{display:none;}

/* ══════════════════════════════════════════════════════
   RESPONSIVE — TABLET + MOBILE  (max-width: 1023px)
══════════════════════════════════════════════════════ */
@media (max-width:1023px){

  /* App shell — sidebar out of grid flow */
  #app{grid-template-columns:1fr;grid-template-areas:"tb""mn";}

  /* Sidebar → off-canvas drawer */
  .sb{position:fixed;top:0;left:0;bottom:0;width:var(--sb-w);z-index:var(--drawer-z);
      transform:translateX(-100%);transition:transform var(--drawer-dur) cubic-bezier(.4,0,.2,1);
      overflow-y:auto;}
  .sb.open{transform:translateX(0);}

  /* Backdrop */
  .sb-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);
               backdrop-filter:blur(3px);z-index:39;}
  .sb-backdrop.open{display:block;}

  /* Topbar must sit above open drawer */
  .tb{z-index:41;}

  /* Hamburger button */
  .ham{display:flex;flex-direction:column;justify-content:center;align-items:center;
       gap:4px;width:36px;height:36px;flex-shrink:0;padding:0;background:none;border:none;cursor:pointer;}
  .ham span{display:block;width:18px;height:1.5px;background:var(--t2);
            transition:transform var(--drawer-dur),opacity var(--drawer-dur);}
  .ham.active span:nth-child(1){transform:translateY(5.5px) rotate(45deg);}
  .ham.active span:nth-child(2){opacity:0;}
  .ham.active span:nth-child(3){transform:translateY(-5.5px) rotate(-45deg);}

  /* Topbar tweaks */
  .tb-logo{height:18px;}
  #gsearch{max-width:260px;}
  .pulse{display:none;}

  /* Compare slots: 2×2 on tablet */
  .cpks{grid-template-columns:repeat(2,1fr);}

  /* Login modal → single column */
  .ls{grid-template-columns:1fr;min-height:auto;max-width:480px;}
  .ll{border-right:none;border-bottom:1px solid var(--line2);padding:24px;}
  .lr{padding:24px;}
  .lh{font-size:26px;margin-top:14px;}
}

/* ══════════════════════════════════════════════════════
   RESPONSIVE — MOBILE ONLY  (max-width: 767px)
══════════════════════════════════════════════════════ */
@media (max-width:767px){

  /* Topbar */
  .tb{padding:0 10px;gap:8px;}
  #gsearch{max-width:160px;font-size:10.5px;padding:4px 8px;}
  span#clk{display:none;}
  .ubox{display:none;}
  .tb-label{display:none;}

  /* Sidebar width capped on mobile */
  .sb{width:280px;max-width:calc(100vw - 56px);}

  /* View padding */
  .view{padding:14px 14px 44px;}

  /* Typography scaling */
  .vtitle{font-size:22px;}
  .vsub{font-size:11px;margin-bottom:14px;}
  .hsc{font-size:52px;}
  .kpi-val{font-size:22px;}
  .pname{font-size:24px;}
  .psnum{font-size:44px;}
  .hhl{font-size:14px;}
  .crumb{font-size:7px;margin-bottom:4px;}

  /* 12-column grid → single column */
  .g.g12{grid-template-columns:1fr;}
  .g12 .c3,.g12 .c4,.g12 .c5,.g12 .c6,.g12 .c7,.g12 .c8,.g12 .c12{grid-column:span 12;}

  /* Hero card */
  .hero{grid-template-columns:1fr;}
  .hcard::after{display:none;}
  .pmain::after{display:none;}

  /* Per-view grid collapses */
  .sentinel-grid{grid-template-columns:1fr;}
  .mgrid{grid-template-columns:1fr;}
  .rptg{grid-template-columns:1fr;}
  .cpks{grid-template-columns:repeat(2,1fr);}
  .sgrid{grid-template-columns:repeat(2,1fr);}
  .dv-grid{grid-template-columns:repeat(2,1fr);}

  /* Heat map — override inline style */
  .heat{grid-template-columns:repeat(3,1fr)!important;}

  /* Airline profile hero */
  .phero{grid-template-columns:1fr;}

  /* Risk row — fix hardcoded 150px label column */
  .rrow{grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:4px 8px;}
  .rname{grid-column:1/-1;font-size:11px;}
  .rbo{grid-column:1;}
  .rval{grid-column:2;text-align:right;}

  /* Intelligence feed item */
  .iitem{grid-template-columns:1fr;gap:6px;}
  .itime{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}

  /* Touch targets ≥44px */
  .btn,.lbtn,.rtab,.sitem,.tab{min-height:44px;display:flex;align-items:center;}
  .sitem{padding:10px 12px;}
  .tab{padding:10px 14px;}

  /* Filter bar wrapping */
  .fb{flex-wrap:wrap;gap:4px;}
  .rtabs{flex-wrap:wrap;}
  .fp{min-height:36px;padding:4px 8px;}

  /* Workspace form */
  .wsr{grid-template-columns:1fr;}
  .wsform{max-width:100%;}

  /* Table min-widths (already inside scrollable wrappers) */
  .atbl{min-width:700px;}
  .ctbl{min-width:600px;}

  /* Toast → bottom-center */
  .toast{right:14px;left:14px;bottom:14px;max-width:100%;}

  /* Compare modal height */
  .mbox{max-height:90vh;}

  /* Login modal */
  .ls{max-width:100%;}
  .ll,.lr{padding:18px;}
  .lh{font-size:20px;}
  .lmeta,.lmr{display:none;}
}
"""

# Mobile JS drawer interactions
MOBILE_JS = """
/* ── Mobile drawer interactions ── */
(function initMobile(){
  var hamBtn   = document.getElementById('hamBtn');
  var sb       = document.querySelector('.sb');
  var backdrop = document.getElementById('sbBackdrop');

  function openDrawer(){
    sb.classList.add('open');
    backdrop.classList.add('open');
    hamBtn.classList.add('active');
    hamBtn.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
  }
  function closeDrawer(){
    sb.classList.remove('open');
    backdrop.classList.remove('open');
    hamBtn.classList.remove('active');
    hamBtn.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  }

  hamBtn.addEventListener('click',function(){
    sb.classList.contains('open')?closeDrawer():openDrawer();
  });

  backdrop.addEventListener('click',closeDrawer);

  sb.addEventListener('click',function(e){
    if(window.innerWidth>=1024)return;
    if(e.target.closest('.sitem[data-v],.arow[data-aid]')){
      setTimeout(closeDrawer,80);
    }
  });

  window.addEventListener('resize',function(){
    if(window.innerWidth>=1024)closeDrawer();
  });

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&sb.classList.contains('open'))closeDrawer();
  });
})();
"""


# ──────────────────────────────────────────────
# PATCH FUNCTIONS
# ──────────────────────────────────────────────

def patch_title(content):
    marker = TITLE
    if marker in content:
        print('[SKIP] title already updated')
        return content
    # Replace whatever title is currently there
    result = re.sub(r'<title>[^<]*</title>', f'<title>{TITLE}</title>', content, count=1)
    if result != content:
        print('[APPLIED] title')
    else:
        print('[WARN] title — could not find <title> tag')
    return result


def patch_meta_description(content):
    if 'name="description"' in content:
        print('[SKIP] meta description already present')
        return content
    meta_tag = f'<meta name="description" content="{META_DESC}"/>'
    result = re.sub(
        r'(<title>[^<]*</title>)',
        r'\1\n' + meta_tag,
        content,
        count=1
    )
    if result != content:
        print('[APPLIED] meta description')
    else:
        print('[WARN] meta description — could not find <title> tag anchor')
    return result


def patch_css_variables(content):
    if '--drawer-z' in content:
        print('[SKIP] CSS drawer variables already present')
        return content
    result = content.replace(
        '--sb-w:258px;--tb-h:44px;',
        '--sb-w:258px;--tb-h:44px;--drawer-z:40;--drawer-dur:0.24s;',
        1
    )
    if result != content:
        print('[APPLIED] CSS drawer variables')
    else:
        print('[WARN] CSS variables — could not find --sb-w/--tb-h anchor')
    return result


def patch_logo_images(content):
    if LOGO_PATH in content:
        print('[SKIP] logo images already updated')
        return content

    count = 0

    # Pattern: <img src="data:image/png;base64,..." alt="Andara Systems" class="tb-logo" style="..."/>
    # Attribute order may vary — match by presence of both class="tb-logo" and base64 src
    tb_pattern = re.compile(
        r'<img\s+src="data:image/[^"]+"\s+alt="Andara Systems"\s+class="tb-logo"\s+style="[^"]*"\s*/>',
        re.DOTALL
    )
    replacement = (
        f'<img src="{LOGO_PATH}" alt="Andara Systems" class="tb-logo" '
        'style="height:24px;width:auto;opacity:0.95;flex-shrink:0"/>'
    )
    new_content, n = tb_pattern.subn(replacement, content)
    count += n

    # Also handle reversed attribute order (src before alt)
    if n == 0:
        tb_pattern2 = re.compile(
            r'<img\s+src="data:image/[^"]+"\s+class="tb-logo"\s+style="[^"]*"\s*/>',
            re.DOTALL
        )
        new_content, n = tb_pattern2.subn(
            f'<img src="{LOGO_PATH}" class="tb-logo" alt="Andara Systems" '
            'style="height:24px;width:auto;opacity:0.95;flex-shrink:0"/>',
            new_content
        )
        count += n

    # Login logo: <img src="data:image/png;base64,..." alt="Andara Systems" style="..."/>
    # (no class attribute — just alt + inline style)
    login_pattern = re.compile(
        r'<img\s+src="data:image/[^"]+"\s+alt="Andara Systems"\s+style="[^"]*"\s*/>',
        re.DOTALL
    )
    login_replacement = (
        f'<img src="{LOGO_PATH}" alt="Andara Systems" '
        'style="height:32px;width:auto;opacity:0.95;flex-shrink:0"/>'
    )
    new_content, n2 = login_pattern.subn(login_replacement, new_content)
    count += n2

    if count > 0:
        print(f'[APPLIED] logo images ({count} replaced)')
        return new_content
    else:
        print('[WARN] logo images — no base64 img tags matched')
        return content


def patch_logo_css_filters(content):
    changed = False

    # .tb-logo filter
    old_tb = '.tb-logo{height:22px;width:auto;filter:brightness(0) invert(1);opacity:.92}'
    new_tb = '.tb-logo{height:22px;width:auto;opacity:.92}'
    if old_tb in content:
        content = content.replace(old_tb, new_tb, 1)
        changed = True

    # .bm-logo filter
    old_bm = '.bm-logo{height:28px;width:auto;filter:brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(180deg);opacity:.95}'
    new_bm = '.bm-logo{height:28px;width:auto;opacity:.95}'
    if old_bm in content:
        content = content.replace(old_bm, new_bm, 1)
        changed = True

    # Also catch variations with different spacing around filter
    if not changed:
        # Try regex for any filter on tb-logo
        pattern = re.compile(r'(\.tb-logo\{[^}]*?)filter:[^;]+;([^}]*\})')
        new_content = pattern.sub(r'\1\2', content)
        if new_content != content:
            content = new_content
            changed = True

        pattern2 = re.compile(r'(\.bm-logo\{[^}]*?)filter:[^;]+;([^}]*\})')
        new_content = pattern2.sub(r'\1\2', content)
        if new_content != content:
            content = new_content
            changed = True

    if changed:
        print('[APPLIED] logo CSS filters removed')
    else:
        print('[SKIP] logo CSS filters already clean')
    return content


def patch_demo_hint(content):
    # Match the lhint div regardless of exact key text
    pattern = re.compile(r'\s*<div class="lhint">.*?</div>', re.DOTALL)
    new_content = pattern.sub('', content)
    if new_content != content:
        print('[APPLIED] demo hint removed')
        return new_content
    print('[SKIP] demo hint not found')
    return content


def patch_topbar_label_class(content):
    if 'class="tb-label"' in content:
        print('[SKIP] tb-label class already present')
        return content
    # Find the Credit Intelligence span in the topbar (has specific mono/uppercase style)
    old = '<span style="color:var(--t3);font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase">Credit Intelligence</span>'
    new = '<span class="tb-label" style="color:var(--t3);font-family:var(--mono);font-size:9px;letter-spacing:.16em;text-transform:uppercase">Credit Intelligence</span>'
    result = content.replace(old, new, 1)
    if result != content:
        print('[APPLIED] tb-label class added to topbar span')
    else:
        print('[WARN] tb-label — could not find Credit Intelligence span (may have different style)')
    return result


def patch_hamburger_button(content):
    if 'id="hamBtn"' in content:
        print('[SKIP] hamburger button already present')
        return content
    HAM = (
        '\n    <button class="ham" id="hamBtn" aria-label="Toggle navigation" aria-expanded="false">'
        '<span></span><span></span><span></span></button>'
    )
    result = content.replace('<div class="tb">', '<div class="tb">' + HAM, 1)
    if result != content:
        print('[APPLIED] hamburger button')
    else:
        print('[WARN] hamburger button — could not find <div class="tb">')
    return result


def patch_sidebar_backdrop(content):
    if 'id="sbBackdrop"' in content:
        print('[SKIP] sidebar backdrop already present')
        return content
    BACKDROP = '  <div class="sb-backdrop" id="sbBackdrop"></div>\n'
    result = content.replace('  <aside class="sb">', BACKDROP + '  <aside class="sb">', 1)
    if result != content:
        print('[APPLIED] sidebar backdrop')
    else:
        print('[WARN] sidebar backdrop — could not find <aside class="sb">')
    return result


def patch_responsive_css(content):
    MARKER = 'RESPONSIVE — TABLET + MOBILE'
    if MARKER in content:
        print('[SKIP] responsive CSS already present')
        return content
    result = content.replace('</style>', RESPONSIVE_CSS + '</style>', 1)
    if result != content:
        print('[APPLIED] responsive CSS (tablet + mobile media queries)')
    else:
        print('[WARN] responsive CSS — could not find </style>')
    return result


def patch_mobile_js(content):
    MARKER = 'initMobile'
    if MARKER in content:
        print('[SKIP] mobile JS already present')
        return content
    result = content.replace('</script>', MOBILE_JS + '</script>', 1)
    if result != content:
        print('[APPLIED] mobile JS (drawer interactions)')
    else:
        print('[WARN] mobile JS — could not find </script>')
    return result


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print('Usage: python3 scripts/patch-africa-page.py "<source-html-file>"')
        sys.exit(1)

    source = sys.argv[1]
    if not os.path.isfile(source):
        print(f'Error: source file not found: {source}')
        sys.exit(1)

    print(f'\nSource : {source}')
    print(f'Dest   : {DEST}')
    print('-' * 50)

    with open(source, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply all patches in order
    content = patch_title(content)
    content = patch_meta_description(content)
    content = patch_css_variables(content)
    content = patch_logo_images(content)
    content = patch_logo_css_filters(content)
    content = patch_demo_hint(content)
    content = patch_topbar_label_class(content)
    content = patch_hamburger_button(content)
    content = patch_sidebar_backdrop(content)
    content = patch_responsive_css(content)
    content = patch_mobile_js(content)

    print('-' * 50)

    # Atomic write: temp file → rename
    dest_dir = os.path.dirname(DEST)
    if dest_dir:
        os.makedirs(dest_dir, exist_ok=True)

    tmp_path = DEST + '.tmp'
    with open(tmp_path, 'w', encoding='utf-8') as f:
        f.write(content)
    os.replace(tmp_path, DEST)

    size_kb = os.path.getsize(DEST) / 1024
    print(f'Written: {DEST} ({size_kb:.1f} KB)')
    print('\nVerification commands:')
    print('  grep -c "@media" ' + DEST + '  # should be 2')
    print('  grep -c "base64" ' + DEST + '  # should be 0')
    print('  grep -c "andara2026" ' + DEST + '  # should be 1 (JS auth check only, no hint)')


if __name__ == '__main__':
    main()
