import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Shared terminal-aesthetic chrome: CSS, status bar, nav, ticker,    */
/* footer. Used by Index / CreditIntelligence / FleetWatch / WhoWeAre.*/
/* ------------------------------------------------------------------ */

export const TERMINAL_CSS = `
:root{
  --fw-bg:#08090B;
  --fw-bg-2:#0D0F12;
  --fw-panel:#101317;
  --fw-panel-2:#15191E;
  --fw-border:#23282F;
  --fw-border-bright:#2E353E;
  --fw-amber:#FF9A1F;
  --fw-amber-dim:#C9791A;
  --fw-text:#E9EAEC;
  --fw-text-2:#9AA1AB;
  --fw-text-3:#636A74;
  --fw-up:#3DD68C;
  --fw-down:#FF5C5C;
  --fw-cyan:#46B8E8;
  --fw-maxw:1320px;
  --fw-gutter:40px;
  --fw-fd:"Schibsted Grotesk",system-ui,sans-serif;
  --fw-fb:"Hanken Grotesk",system-ui,sans-serif;
  --fw-fm:"IBM Plex Mono",ui-monospace,monospace;
}
.fw-root{
  font-family:var(--fw-fb);background:var(--fw-bg);color:var(--fw-text);
  -webkit-font-smoothing:antialiased;line-height:1.5;
  min-height:100vh;overflow-x:hidden;
}
.fw-root *{box-sizing:border-box}
.fw-root a{color:inherit;text-decoration:none}
.fw-wrap{max-width:var(--fw-maxw);margin:0 auto;padding:0 var(--fw-gutter)}
.fw-root h1,.fw-root h2,.fw-root h3{font-family:var(--fw-fd);font-weight:600;line-height:1.05;letter-spacing:-.02em;margin:0;color:var(--fw-text)}
.fw-mono{font-family:var(--fw-fm);font-size:11px;letter-spacing:.14em;text-transform:uppercase}
.fw-eyebrow{font-family:var(--fw-fm);font-size:11.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--fw-amber);display:inline-flex;align-items:center;gap:10px}
.fw-eyebrow::before{content:"";width:18px;height:1px;background:var(--fw-amber);display:inline-block}
.fw-up{color:var(--fw-up)}.fw-down{color:var(--fw-down)}

/* status bar */
.fw-statusbar{background:#000;border-bottom:1px solid var(--fw-border);font-family:var(--fw-fm);font-size:11px;letter-spacing:.1em;color:var(--fw-text-3);position:fixed;top:0;left:0;right:0;z-index:120;height:30px}
.fw-statusbar .inner{max-width:var(--fw-maxw);margin:0 auto;padding:0 var(--fw-gutter);height:30px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.fw-statusbar .grp{display:flex;align-items:center;gap:22px;white-space:nowrap}
.fw-statusbar .live{display:flex;align-items:center;gap:8px;color:var(--fw-up)}
.fw-statusbar .live .dot{width:7px;height:7px;border-radius:50%;background:var(--fw-up);box-shadow:0 0 8px var(--fw-up);animation:fw-blink 2s infinite}
.fw-statusbar .amber-t{color:var(--fw-amber)}
.fw-statusbar .seg{color:var(--fw-text-2)}
@keyframes fw-blink{0%,100%{opacity:1}50%{opacity:.35}}

/* nav */
.fw-nav{position:fixed;top:30px;left:0;right:0;z-index:110;transition:background .35s,border-color .35s;border-bottom:1px solid transparent}
.fw-nav.scrolled{background:rgba(8,9,11,.9);backdrop-filter:blur(12px);border-bottom:1px solid var(--fw-border)}
.fw-nav-inner{max-width:var(--fw-maxw);margin:0 auto;padding:18px var(--fw-gutter);display:flex;align-items:center;justify-content:space-between;gap:24px}
.fw-brand{display:flex;align-items:center;gap:12px}
.fw-brand .glyph{width:26px;height:26px;flex:none}
.fw-brand .name{font-family:var(--fw-fd);font-weight:700;font-size:17px;letter-spacing:.06em;line-height:1;color:var(--fw-text)}
.fw-brand .name .sub{font-family:var(--fw-fm);font-weight:400;font-size:9.5px;letter-spacing:.2em;color:var(--fw-text-3);display:block;margin-top:3px}
.fw-nav-links{display:flex;align-items:center;gap:8px}
.fw-nav-links a{font-family:var(--fw-fm);font-size:12px;letter-spacing:.06em;color:var(--fw-text-2);padding:8px 13px;border:1px solid transparent;transition:.2s;text-transform:uppercase}
.fw-nav-links a:hover{color:var(--fw-amber);border-color:var(--fw-border-bright);background:var(--fw-panel)}
.fw-nav-links a.active{color:var(--fw-amber);border-color:var(--fw-border-bright);background:var(--fw-panel)}
.fw-cta,a.fw-cta{font-family:var(--fw-fm);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#000;background:var(--fw-amber);padding:11px 18px;display:inline-flex;align-items:center;gap:9px;transition:.2s;font-weight:600;border:0;cursor:pointer}
.fw-cta:hover,a.fw-cta:hover{background:#fff;color:#000}
.fw-burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:6px;background:none;border:0}
.fw-burger span{width:22px;height:2px;background:var(--fw-amber);display:block}

/* hero */
.fw-hero{position:relative;background:var(--fw-bg);padding-top:170px;padding-bottom:90px;overflow:hidden;border-bottom:1px solid var(--fw-border)}
.fw-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:48px 48px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 30% 20%,#000 20%,transparent 80%);mask-image:radial-gradient(ellipse 80% 70% at 30% 20%,#000 20%,transparent 80%)}
.fw-glow{position:absolute;top:-15%;left:-5%;width:50vw;height:50vw;background:radial-gradient(circle,rgba(255,154,31,.10),transparent 60%);pointer-events:none}
.fw-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:1.05fr .95fr;gap:60px;align-items:center}
.fw-hero-stack{position:relative;z-index:2}
.fw-cmd{font-family:var(--fw-fm);font-size:12.5px;color:var(--fw-amber);letter-spacing:.06em;margin-bottom:26px;display:flex;align-items:center;gap:10px}
.fw-cmd .br{color:var(--fw-text-3)}
.fw-hero h1{font-size:clamp(40px,5.4vw,72px);font-weight:600;letter-spacing:-.03em;line-height:1.04}
.fw-hero h1 em{font-style:normal;color:var(--fw-amber)}
.fw-lede{margin-top:26px;max-width:52ch;font-size:clamp(16px,1.3vw,19px);color:var(--fw-text-2);line-height:1.6}
.fw-actions{display:flex;align-items:center;gap:16px;margin-top:38px;flex-wrap:wrap}
.fw-btn-primary,a.fw-btn-primary,button.fw-btn-primary{font-family:var(--fw-fm);font-size:13px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;background:var(--fw-amber);color:#000;padding:15px 24px;display:inline-flex;align-items:center;gap:11px;transition:.2s;border:0;cursor:pointer}
.fw-btn-primary:hover,a.fw-btn-primary:hover,button.fw-btn-primary:hover{background:#fff;color:#000}
.fw-btn-primary svg,a.fw-btn-primary svg,button.fw-btn-primary svg{color:#000}
.fw-btn-ghost{font-family:var(--fw-fm);font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--fw-text);padding:15px 8px;border:0;border-bottom:1px solid var(--fw-border-bright);transition:.2s;background:none;cursor:pointer}
.fw-btn-ghost:hover{border-color:var(--fw-amber);color:var(--fw-amber)}

/* panel */
.fw-panel{background:var(--fw-panel);border:1px solid var(--fw-border);position:relative}
.fw-ph{display:flex;align-items:center;justify-content:space-between;background:var(--fw-panel-2);border-bottom:1px solid var(--fw-border);padding:11px 16px}
.fw-ph .t{font-family:var(--fw-fm);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--fw-amber);display:flex;align-items:center;gap:9px}
.fw-ph .t::before{content:"";width:6px;height:6px;background:var(--fw-amber);display:inline-block}
.fw-ph .r{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.1em;color:var(--fw-text-3)}

/* monitor */
.fw-monitor-row{display:grid;grid-template-columns:1.5fr 1fr .9fr;gap:12px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.04);font-family:var(--fw-fm);font-size:13px;align-items:center;transition:background .2s}
.fw-monitor-row:hover{background:var(--fw-panel-2)}
.fw-monitor-row .sym{color:var(--fw-text);font-weight:500;letter-spacing:.02em}
.fw-monitor-row .sym small{display:block;color:var(--fw-text-3);font-size:10px;letter-spacing:.1em;margin-top:2px}
.fw-monitor-row .val{text-align:right;color:var(--fw-text)}
.fw-monitor-row .chg{text-align:right;font-weight:500}
.fw-monitor-foot{padding:12px 16px;font-family:var(--fw-fm);font-size:12px;color:var(--fw-text-2);display:flex;align-items:center;gap:8px}
.fw-cursor{display:inline-block;width:8px;height:15px;background:var(--fw-amber);animation:fw-caret 1.1s steps(1) infinite;vertical-align:middle}
@keyframes fw-caret{0%,100%{opacity:1}50%{opacity:0}}

/* metrics */
.fw-metrics{border-bottom:1px solid var(--fw-border);background:var(--fw-bg-2)}
.fw-metrics-grid{display:grid;grid-template-columns:repeat(4,1fr)}
.fw-metric{padding:42px var(--fw-gutter);border-right:1px solid var(--fw-border);position:relative}
.fw-metrics-grid .fw-metric:last-child{border-right:none}
.fw-metric .lbl{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fw-text-3);margin-bottom:16px}
.fw-metric .num{font-family:var(--fw-fd);font-weight:600;font-size:clamp(34px,3.5vw,50px);letter-spacing:-.03em;line-height:1;color:var(--fw-text)}
.fw-metric .num span{color:var(--fw-amber)}
.fw-metric .mcap{margin-top:12px;color:var(--fw-text-2);font-size:13.5px;max-width:26ch}

/* section */
.fw-block{padding:110px 0}
.fw-block.tight{padding:80px 0}
.fw-sec-head{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:end;margin-bottom:56px}
.fw-sec-head h2{font-size:clamp(30px,3.4vw,46px)}
.fw-sec-head .desc{color:var(--fw-text-2);font-size:16px;max-width:46ch;justify-self:end;line-height:1.6}

/* capabilities (cards) */
.fw-cap-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.fw-cap{background:var(--fw-panel);border:1px solid var(--fw-border);transition:border-color .25s,transform .25s;display:flex;flex-direction:column}
.fw-cap:hover{border-color:var(--fw-border-bright);transform:translateY(-3px)}
.fw-cap .ph{display:flex;align-items:center;justify-content:space-between;background:var(--fw-panel-2);border-bottom:1px solid var(--fw-border);padding:11px 18px}
.fw-cap .ph .code{font-family:var(--fw-fm);font-size:11.5px;letter-spacing:.1em;color:var(--fw-amber)}
.fw-cap .ph .idx{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.12em;color:var(--fw-text-3)}
.fw-cap .body{padding:30px 22px 28px;display:flex;flex-direction:column;gap:16px;flex:1}
.fw-cap .ico{width:30px;height:30px;color:var(--fw-amber)}
.fw-cap h3{font-size:22px;font-weight:600}
.fw-cap p{color:var(--fw-text-2);font-size:14.5px;line-height:1.6}
.fw-cap .go{font-family:var(--fw-fm);font-size:11px;letter-spacing:.1em;color:var(--fw-text-3);text-transform:uppercase;margin-top:auto;display:flex;align-items:center;gap:8px;transition:color .25s}
.fw-cap:hover .go{color:var(--fw-amber)}

/* pillars */
.fw-pillars{display:flex;flex-direction:column;border:1px solid var(--fw-border);background:var(--fw-panel)}
.fw-pillar{padding:26px 24px;border-bottom:1px solid var(--fw-border);display:grid;grid-template-columns:auto 1fr;gap:24px;align-items:start;transition:background .2s}
.fw-pillar:last-child{border-bottom:none}
.fw-pillar:hover{background:var(--fw-panel-2)}
.fw-pillar .n{font-family:var(--fw-fm);font-size:12px;color:var(--fw-amber);letter-spacing:.1em;padding-top:4px}
.fw-pillar h3{font-size:19px;font-weight:600;margin-bottom:7px}
.fw-pillar p{color:var(--fw-text-2);font-size:14px;line-height:1.6}

/* sectors */
.fw-sectors-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:18px}
.fw-sector{border:1px solid var(--fw-border);background:var(--fw-panel);position:relative;overflow:hidden;min-height:300px;display:flex;flex-direction:column;justify-content:flex-end;transition:border-color .3s,transform .3s}
.fw-sector:hover{border-color:var(--fw-border-bright);transform:translateY(-3px)}
.fw-sector .img-wrap{position:absolute;inset:0;z-index:0}
.fw-sector .img-wrap img{width:100%;height:100%;object-fit:cover;opacity:.6}
.fw-sector .veil{position:absolute;inset:0;background:linear-gradient(to top,rgba(8,9,11,.96) 6%,rgba(8,9,11,.45) 48%,rgba(8,9,11,.1) 100%);z-index:1}
.fw-sector .s-body{position:relative;z-index:2;padding:28px}
.fw-sector .s-body h3{font-size:21px;font-weight:600}
.fw-sector .s-body p{color:var(--fw-text-2);font-size:14px;margin-top:8px;max-width:34ch;line-height:1.55}
.fw-sector .s-tag{position:absolute;top:18px;left:28px;z-index:2;color:var(--fw-amber);font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.14em}
.fw-col-7{grid-column:span 7}.fw-col-5{grid-column:span 5}.fw-col-6{grid-column:span 6}

/* intel cards */
.fw-intel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.fw-intel-card{background:var(--fw-panel);border:1px solid var(--fw-border);transition:border-color .25s}
.fw-intel-card:hover{border-color:var(--fw-border-bright)}
.fw-intel-card .ph{display:flex;justify-content:space-between;align-items:center;background:var(--fw-panel-2);border-bottom:1px solid var(--fw-border);padding:10px 16px;font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.12em;color:var(--fw-text-3)}
.fw-intel-card .ph .l{color:var(--fw-amber)}
.fw-intel-card .body{padding:22px 18px 20px}
.fw-intel-card .stat{font-family:var(--fw-fd);font-weight:600;font-size:42px;letter-spacing:-.02em;line-height:1;color:var(--fw-text)}
.fw-intel-card .stat .u{font-size:22px}
.fw-spark{height:48px;width:100%;margin:16px 0}
.fw-intel-card p{color:var(--fw-text-2);font-size:13.5px;line-height:1.55}

/* CTA band */
.fw-cta-band{border-top:1px solid var(--fw-border);background:var(--fw-bg-2);position:relative;overflow:hidden;text-align:center}
.fw-cta-band .fw-glow{top:auto;bottom:-30%;left:50%;transform:translateX(-50%);width:60vw;height:40vw}
.fw-cta-inner{position:relative;z-index:2;padding:120px 0;display:flex;flex-direction:column;align-items:center}
.fw-cta-inner h2{font-size:clamp(32px,4vw,54px);max-width:18ch}
.fw-cta-inner p{color:var(--fw-text-2);font-size:17px;margin-top:20px;max-width:54ch;line-height:1.6}

/* subscribe */
.fw-subscribe{display:grid;grid-template-columns:1.1fr .9fr;gap:0;border:1px solid var(--fw-border);background:var(--fw-panel);overflow:hidden}
.fw-subscribe .left{padding:48px 42px;border-right:1px solid var(--fw-border)}
.fw-subscribe .left h2{font-size:clamp(28px,2.6vw,38px);max-width:18ch;margin-bottom:18px}
.fw-subscribe .left p{color:var(--fw-text-2);font-size:15.5px;line-height:1.65;max-width:50ch}
.fw-subscribe .left ul{margin-top:24px;display:flex;flex-direction:column;gap:11px;list-style:none;padding:0}
.fw-subscribe .left li{display:flex;gap:12px;color:var(--fw-text-2);font-size:14px;line-height:1.55}
.fw-subscribe .left li::before{content:"";width:6px;height:6px;background:var(--fw-amber);flex:none;margin-top:8px}
.fw-subscribe .right{padding:48px 42px;background:var(--fw-panel-2);display:flex;flex-direction:column;justify-content:center}
.fw-subscribe .right .col-lbl{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.18em;color:var(--fw-text-3);text-transform:uppercase;margin-bottom:14px}
.fw-subscribe .right h3{font-size:22px;font-weight:600;margin-bottom:22px}
.fw-subscribe input[type=email]{width:100%;background:var(--fw-bg);border:1px solid var(--fw-border-bright);color:var(--fw-text);padding:14px 16px;font-family:var(--fw-fm);font-size:13px;letter-spacing:.04em;outline:none;transition:border-color .2s,background .2s}
.fw-subscribe input[type=email]:focus{border-color:var(--fw-amber);background:#0B0E12}
.fw-subscribe input[type=email]::placeholder{color:var(--fw-text-3)}
.fw-subscribe .submit{margin-top:14px;width:100%}
.fw-subscribe .legal{margin-top:14px;color:var(--fw-text-3);font-size:11.5px;line-height:1.55;font-family:var(--fw-fm);letter-spacing:.04em}

/* footer */
.fw-footer{background:#000;border-top:1px solid var(--fw-border);padding:64px 0 30px}
.fw-foot-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;padding-bottom:46px;border-bottom:1px solid var(--fw-border)}
.fw-foot-brand p{color:var(--fw-text-3);font-size:13.5px;max-width:34ch;line-height:1.6;margin-top:18px}
.fw-foot-col h4{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fw-text-3);margin:0 0 16px;font-weight:500}
.fw-foot-col a{display:block;color:var(--fw-text-2);font-size:14px;padding:6px 0;transition:color .2s}
.fw-foot-col a:hover{color:var(--fw-amber)}
.fw-foot-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:24px;color:var(--fw-text-3)}

/* arRise */
.fw-arRise{transform:translateY(20px);opacity:0;transition:transform .7s cubic-bezier(.2,.6,.2,1),opacity .7s ease}
.fw-arRise.in{transform:none;opacity:1}
@media(prefers-reduced-motion:reduce){.fw-arRise{transform:none;opacity:1}}

/* score tabs */
.fw-score-tabs{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--fw-border);background:var(--fw-panel)}
.fw-score-tabs button{padding:22px 16px;background:transparent;border:0;border-right:1px solid var(--fw-border);color:var(--fw-text-2);text-align:center;cursor:pointer;transition:.2s;font-family:var(--fw-fb)}
.fw-score-tabs button:last-child{border-right:none}
.fw-score-tabs button:hover{background:var(--fw-panel-2);color:var(--fw-text)}
.fw-score-tabs button.active{background:var(--fw-panel-2);color:var(--fw-text)}
.fw-score-tabs button.active .code{color:var(--fw-amber)}
.fw-score-tabs .code{font-family:var(--fw-fm);font-size:18px;font-weight:600;letter-spacing:.06em;color:var(--fw-text-3);display:block;margin-bottom:4px;transition:.2s}
.fw-score-tabs .lbl{font-size:12px;letter-spacing:.04em}

/* verdict trio */
.fw-verdicts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.fw-verdict-card{border:1px solid var(--fw-border);background:var(--fw-panel);padding:24px}
.fw-verdict-card .tag{font-family:var(--fw-fm);font-size:10.5px;letter-spacing:.2em;padding:6px 11px;display:inline-block;margin-bottom:14px;text-transform:uppercase;border:1px solid;background:rgba(255,255,255,.02)}
.fw-verdict-card.deploy .tag{color:var(--fw-up);border-color:rgba(61,214,140,.35);background:rgba(61,214,140,.08)}
.fw-verdict-card.watch .tag{color:var(--fw-amber);border-color:rgba(255,154,31,.4);background:rgba(255,154,31,.08)}
.fw-verdict-card.deny .tag{color:var(--fw-down);border-color:rgba(255,92,92,.35);background:rgba(255,92,92,.08)}
.fw-verdict-card p{color:var(--fw-text-2);font-size:14.5px;line-height:1.6}

/* responsive */
@media(max-width:1024px){
  .fw-root{--fw-gutter:24px}
  .fw-hero-grid{grid-template-columns:1fr;gap:44px}
  .fw-metrics-grid{grid-template-columns:repeat(2,1fr)}
  .fw-metric:nth-child(2){border-right:none}
  .fw-metric{border-bottom:1px solid var(--fw-border)}
  .fw-cap-grid{grid-template-columns:1fr}
  .fw-sectors-grid>*{grid-column:span 12!important}
  .fw-intel-grid{grid-template-columns:1fr}
  .fw-verdicts{grid-template-columns:1fr}
  .fw-subscribe{grid-template-columns:1fr}
  .fw-subscribe .left{border-right:none;border-bottom:1px solid var(--fw-border)}
  .fw-score-tabs{grid-template-columns:repeat(5,1fr)}
}
@media(max-width:760px){
  .fw-nav-links,.fw-cta{display:none}
  .fw-burger{display:flex}
  .fw-sec-head{grid-template-columns:1fr;gap:16px}
  .fw-sec-head .desc{justify-self:start}
  .fw-metrics-grid{grid-template-columns:1fr}
  .fw-metric{border-right:none!important}
  .fw-foot-top{grid-template-columns:1fr;gap:32px}
  .fw-statusbar .grp.hideable{display:none}
  .fw-score-tabs{grid-template-columns:repeat(2,1fr)}
  .fw-score-tabs button{border-right:0;border-bottom:1px solid var(--fw-border)}
}
`;

export const TICKER_ITEMS: Array<[string, string, string]> = [
  ["5N-SDD", "14.2", "+0.6"], ["ET-ALN", "28.6", "+1.2"], ["9G-MKP", "22.8", "-0.3"],
  ["TU-TSS", "56.1", "+0.4"], ["5Y-KQS", "138.4", "+0.8"], ["ZS-SXE", "161.2", "-0.2"],
  ["5N-BQI", "31.4", "+0.5"], ["ET-AYB", "48.9", "+1.6"], ["3X-GES", "9.4", "+0.1"],
  ["7P-SCB", "17.1", "-0.4"], ["TR-LFX", "62.3", "+0.7"], ["6V-AML", "11.8", "+0.9"],
];

export const StatusBar = () => {
  const [clock, setClock] = useState("--:--:-- UTC");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="fw-statusbar">
      <div className="inner">
        <div className="grp">
          <span className="live">
            <span className="dot" />
            MARKETS OPEN
          </span>
          <span className="seg">
            ANDARA MKT INDEX <span className="fw-up">2,418.6 ▲0.74%</span>
          </span>
        </div>
        <div className="grp hideable">
          <span className="amber-t">AVIATION INTELLIGENCE TERMINAL</span>
          <span>{clock}</span>
        </div>
      </div>
    </div>
  );
};

export const Nav = ({ ctaHref = "#briefing" }: { ctaHref?: string }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fw-nav${scrolled ? " scrolled" : ""}`}>
      <div className="fw-nav-inner">
        <Link to="/" className="fw-brand">
          <svg className="glyph" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M16 2 L29 28 L16 22 L3 28 Z" fill="#FF9A1F" />
            <path d="M16 2 L16 22 L3 28 Z" fill="#FFB85C" />
          </svg>
          <span className="name">
            ANDARA
            <span className="sub">AVIATION INTELLIGENCE</span>
          </span>
        </Link>
        <nav className="fw-nav-links">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={location.pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a href={ctaHref} className="fw-cta">
          Request Briefing
        </a>
        <button className="fw-burger" aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export const Ticker = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const row = useMemo(
    () =>
      TICKER_ITEMS.map(([s, v, c], i) => {
        const up = c.startsWith("+");
        return (
          <span
            key={`${s}-${i}`}
            style={{
              fontFamily: "var(--fw-fm)",
              fontSize: 12,
              letterSpacing: ".04em",
              padding: "0 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "var(--fw-text-2)",
              borderRight: "1px solid var(--fw-border)",
              whiteSpace: "nowrap",
            }}
          >
            {s} <b style={{ color: "var(--fw-text)", fontWeight: 500 }}>{v}</b>{" "}
            <span className={up ? "fw-up" : "fw-down"}>
              {up ? "▲" : "▼"}
              {c.replace("+", "").replace("-", "")}%
            </span>
          </span>
        );
      }),
    [],
  );
  return (
    <div
      style={{
        position: "fixed",
        top: 30,
        left: 0,
        right: 0,
        zIndex: 90,
        display: visible ? "block" : "none",
      }}
    >
      <div
        style={{
          background: "#000",
          borderBottom: "1px solid var(--fw-border)",
          overflow: "hidden",
          height: 34,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "fw-scrollx 60s linear infinite",
            willChange: "transform",
          }}
        >
          {row}
          {row}
        </div>
      </div>
      <style>{`@keyframes fw-scrollx{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
};

export const ArRiseObserver = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".fw-arRise").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
};

export const TerminalFooter = () => (
  <footer className="fw-footer">
    <div className="fw-wrap">
      <div className="fw-foot-top">
        <div className="fw-foot-brand">
          <Link to="/" className="fw-brand">
            <svg className="glyph" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M16 2 L29 28 L16 22 L3 28 Z" fill="#FF9A1F" />
              <path d="M16 2 L16 22 L3 28 Z" fill="#FFB85C" />
            </svg>
            <span className="name">
              ANDARA
              <span className="sub">AVIATION INTELLIGENCE</span>
            </span>
          </Link>
          <p>
            Independent aviation intelligence and advisory. Making aviation
            markets legible — globally, and with conviction.
          </p>
        </div>
        <div className="fw-foot-col">
          <h4>Products</h4>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="fw-foot-col">
          <h4>Company</h4>
          <Link to="/who-we-are">Who we are</Link>
          <a href="#briefing">Request briefing</a>
          <a href="#subscribe">Intelligence report</a>
        </div>
        <div className="fw-foot-col">
          <h4>Connect</h4>
          <a href="mailto:advisory@andarasystems.com">advisory@andarasystems.com</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
      <div className="fw-foot-bottom">
        <span className="fw-mono">© {new Date().getFullYear()} ANDARA SYSTEMS</span>
        <span className="fw-mono">MAKING AVIATION MARKETS LEGIBLE</span>
      </div>
    </div>
  </footer>
);

export const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CtaBand = ({
  eyebrow = "Open a line",
  title,
  body,
  emailLabel = "advisory@andarasystems.com",
  emailHref = "mailto:advisory@andarasystems.com",
  id = "briefing",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  emailLabel?: string;
  emailHref?: string;
  id?: string;
}) => (
  <section id={id} className="fw-cta-band">
    <div className="fw-glow" />
    <div className="fw-cta-inner fw-wrap">
      <div className="fw-eyebrow" style={{ justifyContent: "center", marginBottom: 24 }}>
        {eyebrow}
      </div>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="fw-actions" style={{ justifyContent: "center" }}>
        <a href={emailHref} className="fw-btn-primary">
          Request Briefing <ArrowRightIcon />
        </a>
        <a href={emailHref} className="fw-btn-ghost">
          {emailLabel}
        </a>
      </div>
    </div>
  </section>
);

export const TerminalChrome = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fw-root">
      <style>{TERMINAL_CSS}</style>
      <StatusBar />
      <Nav />
      <Ticker />
      <ArRiseObserver />
      {children}
      <TerminalFooter />
    </div>
  );
};
