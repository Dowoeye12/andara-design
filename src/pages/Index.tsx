import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TerminalChrome, ArrowRightIcon, CtaBand } from "@/components/terminal/TerminalChrome";

// Illustrative platform activity — generic, non-defamatory placeholders.
// Verdict letters on real carriers are confidential to commissioning clients
// per PRD §3.2.4. We do not publish real verdicts on the marketing site.
const MONITOR_ROWS = [
  { sym: "VERDICT 412", meta: "ARBITER · COMPOSITE ISSUED", base: 78.4, deploy: "up" },
  { sym: "VERDICT 411", meta: "ARBITER · WATCH NOTE FILED", base: 62.1, deploy: "neutral" },
  { sym: "VISIT 1284", meta: "FLEETWATCH · RAMP COMPLETE", base: 71.8, deploy: "up" },
  { sym: "VISIT 1283", meta: "FLEETWATCH · ANOMALY OPEN", base: 54.6, deploy: "neutral" },
  { sym: "ALERT 037", meta: "AOG-CLASS · DISPATCHED", base: 31.9, deploy: "down" },
  { sym: "AIR ISSUE 002", meta: "EDITORIAL · IN REVIEW", base: 100.0, deploy: "up" },
];

const Index = () => {
  const monitorRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!monitorRef.current) return;
    const cells = monitorRef.current.querySelectorAll<HTMLElement>("[data-base]");
    const id = setInterval(() => {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      if (!cell) return;
      const base = parseFloat(cell.dataset.base || "0");
      const nv = base * (1 + (Math.random() - 0.45) * 0.012);
      cell.textContent = nv.toFixed(1);
      const chg = cell.nextElementSibling as HTMLElement | null;
      if (chg) {
        const up = nv >= base;
        chg.className = "chg " + (up ? "fw-up" : "fw-down");
        chg.textContent = (up ? "▲ " : "▼ ") + Math.abs((nv / base - 1) * 100).toFixed(1) + "%";
      }
      cell.style.color = nv >= base ? "#3DD68C" : "#FF5C5C";
      setTimeout(() => {
        if (cell) cell.style.color = "";
      }, 420);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "submitting") return;
    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <TerminalChrome>
      {/* hero */}
      <section className="fw-hero">
        <div className="fw-grid-bg" />
        <div className="fw-glow" />
        <div className="fw-wrap fw-hero-grid">
          <div>
            <div className="fw-cmd">
              <span className="br">ANDARA&gt;</span> LEGIBILITY &lt;GO&gt;
            </div>
            <h1>
              Making African aviation markets <em>legible.</em>
            </h1>
            <p className="fw-lede">
              The continent's only source of independent, institutional-grade airline
              credit scoring and continuous aircraft asset surveillance. Real data,
              real conviction, no inventory to sell.
            </p>
            <div className="fw-actions">
              <a href="#briefing" className="fw-btn-primary">
                Request Briefing <ArrowRightIcon />
              </a>
              <a href="#capabilities" className="fw-btn-ghost">
                View capabilities
              </a>
            </div>
          </div>

          <div className="fw-panel" ref={monitorRef}>
            <div className="fw-ph">
              <div className="t">Andara Platform Activity</div>
              <div className="r">ILLUSTRATIVE · NOT LIVE DATA</div>
            </div>
            <div>
              {MONITOR_ROWS.map((r) => (
                <div className="fw-monitor-row" key={r.sym}>
                  <div className="sym">
                    {r.sym}
                    <small>{r.meta}</small>
                  </div>
                  <div className="val" data-base={r.base} style={{ fontVariantNumeric: "tabular-nums" }}>
                    {r.base.toFixed(1)}
                  </div>
                  <div className={`chg ${r.deploy === "down" ? "fw-down" : r.deploy === "neutral" ? "" : "fw-up"}`} style={{ color: r.deploy === "neutral" ? "var(--fw-text-2)" : undefined }}>
                    {r.deploy === "down" ? "▼" : r.deploy === "neutral" ? "◆" : "▲"}
                  </div>
                </div>
              ))}
            </div>
            <div className="fw-monitor-foot">
              <span style={{ color: "var(--fw-text-3)" }}>ANDARA&gt;</span>{" "}
              <span className="fw-cursor" />
            </div>
          </div>
        </div>
      </section>

      {/* platform constants — what's true today, no fabricated traction numbers */}
      <section className="fw-metrics">
        <div className="fw-metrics-grid">
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Products</div>
            <div className="num">3</div>
            <div className="mcap">Arbiter · FleetWatch · AIR. One platform spine.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// MVP coverage</div>
            <div className="num">NG</div>
            <div className="mcap">Nigerian commercial AOCs at launch. Pan-African coverage in Milestone 2.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Governance</div>
            <div className="num">SC</div>
            <div className="mcap">Every verdict approved by the Andara Scoring Committee. Hard-floor logic enforced.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Conflicts</div>
            <div className="num">0</div>
            <div className="mcap">Independent — airlines are never clients and Andara does not advise on transactions.</div>
          </div>
        </div>
      </section>

      {/* capabilities */}
      <section id="capabilities" className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>What we do</div>
            <h2>Two capabilities.<br />One intelligence layer.</h2>
          </div>
          <p className="desc">
            Independent primary intelligence on the two questions African aviation
            finance can't answer alone — is the operator credit-worthy, and is the
            aircraft worth what we think it is?
          </p>
        </div>

        <div className="fw-cap-grid">
          <Link to="/credit-intelligence" className="fw-cap fw-arRise" style={{ textDecoration: "none" }}>
            <div className="ph">
              <span className="code">CRED &lt;GO&gt;</span>
              <span className="idx">FN 01</span>
            </div>
            <div className="body">
              <svg className="ico" viewBox="0 0 32 32" fill="none">
                <path d="M4 28h24M8 28V14M16 28V8M24 28V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="16" cy="6" r="2" fill="currentColor" />
              </svg>
              <h3>Credit Intelligence</h3>
              <p>
                Independent five-score verdicts (SVS · PPS · APS · RCS · RAS) on
                African carriers — Deploy, Watch, or Do Not Deploy. Every verdict
                approved by Andara's Scoring Committee.
              </p>
              <span className="go">Open module →</span>
            </div>
          </Link>
          <Link to="/fleetwatch" className="fw-cap fw-arRise" style={{ textDecoration: "none" }}>
            <div className="ph">
              <span className="code">FLEET &lt;GO&gt;</span>
              <span className="idx">FN 02</span>
            </div>
            <div className="body">
              <svg className="ico" viewBox="0 0 32 32" fill="none">
                <path d="M6 11h16l-4-4M26 21H10l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Fleet Watch</h3>
              <p>
                Quarterly on-base aircraft surveillance — field visits, document
                review, anomaly tracking — for every aircraft on your book, with
                AOG-class alerts dispatched off-cycle.
              </p>
              <span className="go">Open module →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* approach */}
      <section
        id="approach"
        className="fw-block"
        style={{ background: "var(--fw-bg-2)", borderTop: "1px solid var(--fw-border)", borderBottom: "1px solid var(--fw-border)", position: "relative", overflow: "hidden" }}
      >
        <div className="fw-grid-bg" />
        <div className="fw-wrap" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="fw-approach-grid">
            <div className="fw-arRise">
              <div className="fw-eyebrow" style={{ marginBottom: 22 }}>Our approach</div>
              <h2 style={{ fontSize: "clamp(30px,3.6vw,50px)", maxWidth: "14ch" }}>
                Conviction, earned through independence.
              </h2>
              <p style={{ color: "var(--fw-text-2)", fontSize: 17, marginTop: 22, maxWidth: "46ch", lineHeight: 1.65 }}>
                Airlines are never clients. Andara does not advise on transactions.
                The product is the primary intelligence layer that makes capital
                deployable — produced by people who answer to no balance sheet but
                their subscribers'.
              </p>
            </div>
            <div className="fw-pillars fw-arRise">
              <div className="fw-pillar">
                <div className="n">01</div>
                <div>
                  <h3>Primary, not self-disclosed</h3>
                  <p>Every score is reconstructed from third parties who transact with the carrier — lessors, fuel suppliers, MROs, regulators.</p>
                </div>
              </div>
              <div className="fw-pillar">
                <div className="n">02</div>
                <div>
                  <h3>Eyes on the asset</h3>
                  <p>FleetWatch is field-led. On-base physical visits captured by trained Field Intelligence Agents, every quarter — not a desktop review.</p>
                </div>
              </div>
              <div className="fw-pillar">
                <div className="n">03</div>
                <div>
                  <h3>Built for African carriers</h3>
                  <p>Nigerian commercial AOC coverage at launch, expanding pan-African in Milestone 2. The comparables and relationships that desk research cannot reach.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sectors */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Who we serve</div>
            <h2>Trusted across<br />the capital stack.</h2>
          </div>
          <p className="desc">
            Subscribers are institutional capital providers and asset owners with
            exposure — or considering exposure — to African aviation.
          </p>
        </div>
        <div className="fw-sectors-grid">
          <div className="fw-sector fw-col-7 fw-arRise">
            <div className="fw-grid-bg" />
            <div className="veil" />
            <div className="s-tag">SEGMENT 01</div>
            <div className="s-body">
              <h3>Commercial Banks</h3>
              <p>Credit assessment before lending to airlines. Independent monitoring of aircraft held as loan collateral.</p>
            </div>
          </div>
          <div className="fw-sector fw-col-5 fw-arRise">
            <div className="fw-grid-bg" />
            <div className="veil" />
            <div className="s-tag">SEGMENT 02</div>
            <div className="s-body">
              <h3>Aircraft Lessors</h3>
              <p>Lessee creditworthiness before placement. Continuous condition and value monitoring across the lease term.</p>
            </div>
          </div>
          <div className="fw-sector fw-col-5 fw-arRise">
            <div className="fw-grid-bg" />
            <div className="veil" />
            <div className="s-tag">SEGMENT 03</div>
            <div className="s-body">
              <h3>Development Finance</h3>
              <p>Sector-level aviation credit intelligence and carrier eligibility for programme deployment.</p>
            </div>
          </div>
          <div className="fw-sector fw-col-7 fw-arRise">
            <div className="fw-grid-bg" />
            <div className="veil" />
            <div className="s-tag">SEGMENT 04</div>
            <div className="s-body">
              <h3>Institutional Investors</h3>
              <p>Market intelligence before equity or structured debt deployment. Transaction-specific credit memos for committees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* subscribe — Andara Intelligence Report */}
      <section
        id="subscribe"
        className="fw-block"
        style={{ background: "var(--fw-bg-2)", borderTop: "1px solid var(--fw-border)" }}
      >
        <div className="fw-wrap">
          <div className="fw-sec-head fw-arRise">
            <div>
              <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Andara Intelligence Report</div>
              <h2>Quarterly intelligence,<br />in your inbox.</h2>
            </div>
            <p className="desc">
              A discreet quarterly briefing on credit signal, fleet movement, and
              capital action across African aviation. Written for institutional
              readers. Complimentary to qualified recipients.
            </p>
          </div>

          <div className="fw-subscribe fw-arRise">
            <div className="left">
              <div className="fw-ph" style={{ background: "transparent", border: 0, padding: "0 0 20px", borderBottom: "1px solid var(--fw-border)" }}>
                <div className="t">AIR / Issue 002 · Jul 2026</div>
                <div className="r">COMPLIMENTARY · INSTITUTIONAL</div>
              </div>
              <h2 style={{ marginTop: 22 }}>The information gap is the trade.</h2>
              <p>
                The opacity premium in African aviation is not a permanent feature
                of the market — it is an information asymmetry that closes,
                carrier by carrier, every time an independent score is issued.
              </p>
              <ul>
                <li>Signal — primary intelligence on carriers and aircraft</li>
                <li>Financial Translation — what the signal means for capital</li>
                <li>Capital Action — what we'd do with the signal, with Andara Analytical View labelled</li>
                <li>Confidential. Read by institutional capital allocators only.</li>
              </ul>
            </div>
            <div className="right">
              <div className="col-lbl">// Subscribe</div>
              <h3>Get the next issue.</h3>
              <form onSubmit={handleSubscribe}>
                <label htmlFor="subscribe-email" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                  Work email
                </label>
                <input
                  id="subscribe-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.com"
                  disabled={status === "submitting" || status === "success"}
                />
                <button
                  type="submit"
                  className="fw-btn-primary submit"
                  disabled={status === "submitting" || status === "success"}
                  style={{ justifyContent: "center" }}
                >
                  {status === "submitting"
                    ? "Submitting..."
                    : status === "success"
                      ? "Subscribed ✓"
                      : "Subscribe"} <ArrowRightIcon />
                </button>
                {status === "success" && (
                  <p style={{ color: "var(--fw-up)", fontSize: 13, marginTop: 12, fontFamily: "var(--fw-fm)", letterSpacing: ".04em" }}>
                    You're on the list. The next issue arrives at the start of the quarter.
                  </p>
                )}
                {status === "error" && (
                  <p style={{ color: "var(--fw-down)", fontSize: 13, marginTop: 12, fontFamily: "var(--fw-fm)", letterSpacing: ".04em" }}>
                    Submission failed. Email advisory@andarasystems.com directly.
                  </p>
                )}
                <p className="legal">
                  Institutional readers only. We do not share or sell subscriber lists.
                  Unsubscribe in one click.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Bring clarity to your next African aviation decision."
        body="Tell us the question on the table. We'll show you how independent intelligence changes the answer."
      />
    </TerminalChrome>
  );
};

export default Index;
