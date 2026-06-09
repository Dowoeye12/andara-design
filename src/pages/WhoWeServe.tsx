import { TerminalChrome, ArrowRightIcon, CtaBand } from "@/components/terminal/TerminalChrome";

const PRINCIPLES = [
  {
    n: "01",
    title: "Independent by design",
    body: "Airlines are never clients. Andara does not advise on transactions, hold inventory, or earn commission on capital deployed. The product is the recommendation itself.",
  },
  {
    n: "02",
    title: "Primary intelligence only",
    body: "Every score, every value, every risk flag traces back to evidence we gathered ourselves — counterparty interviews, field inspection, regulatory records. Not aggregated, not bought-in.",
  },
  {
    n: "03",
    title: "On the ground in Africa",
    body: "Forty-seven markets. Field-agent capability where airlines actually operate. The comparables and the relationships that desk research cannot reach.",
  },
  {
    n: "04",
    title: "Confidential by default",
    body: "Subscriber reports are produced for named recipients at named institutions. The carrier never sees their score. The institution's questions never leave the institution.",
  },
];

const SECTORS = [
  {
    tag: "SUBSCRIBER 01",
    title: "Commercial Banks",
    body: "Credit assessment before lending to airlines. Independent monitoring of aircraft held as loan collateral. Covenant compliance intelligence throughout the lending relationship.",
    span: "fw-col-6",
  },
  {
    tag: "SUBSCRIBER 02",
    title: "Aircraft Lessors",
    body: "Lessee creditworthiness assessment before placing aircraft. Continuous monitoring of asset condition and value throughout the lease term to protect residual value.",
    span: "fw-col-6",
  },
  {
    tag: "SUBSCRIBER 03",
    title: "Development Finance",
    body: "Sector-level aviation credit intelligence. Carrier eligibility for programme deployment. Portfolio-level monitoring for DFI aviation mandates and lending facilities.",
    span: "fw-col-6",
  },
  {
    tag: "SUBSCRIBER 04",
    title: "Institutional Investors",
    body: "Market intelligence before equity or structured debt deployment in African carriers. Transaction-specific credit memos for deal committees and investment approval processes.",
    span: "fw-col-6",
  },
];

const WhoWeServe = () => {
  return (
    <TerminalChrome>
      {/* hero */}
      <section className="fw-hero">
        <div className="fw-grid-bg" />
        <div className="fw-glow" />
        <div className="fw-wrap fw-hero-grid">
          <div>
            <div className="fw-cmd">
              <span className="br">ANDARA&gt;</span> WHO &lt;GO&gt;
            </div>
            <h1>
              The independent intelligence layer for{" "}
              <em>African aviation finance.</em>
            </h1>
            <p className="fw-lede">
              Andara was founded to close a gap that capital, not the market,
              created. Airlines in Africa do not publish credit-quality
              disclosure. Aircraft values are not tracked continuously. We
              produce the primary intelligence layer that makes transactions
              legible — and never sell anything else.
            </p>
            <div className="fw-actions">
              <a href="#briefing" className="fw-btn-primary">
                Request Briefing <ArrowRightIcon />
              </a>
              <a href="#principles" className="fw-btn-ghost">
                Our principles
              </a>
            </div>
          </div>

          {/* What Andara is not — independence panel */}
          <div className="fw-panel">
            <div className="fw-ph">
              <div className="t">What Andara is not</div>
              <div className="r">INDEPENDENCE · OPERATING CONSTRAINTS</div>
            </div>
            <div>
              {[
                {
                  label: "Not a broker",
                  body: "Andara holds no aircraft inventory and earns no commission on placements.",
                },
                {
                  label: "Not an advisor",
                  body: "Andara does not advise on transactions, structure deals, or negotiate terms.",
                },
                {
                  label: "Not paid by airlines",
                  body: "Operators are never clients. They cannot pay for or see their own scores.",
                },
                {
                  label: "Not a data reseller",
                  body: "All intelligence is primary. We do not aggregate or license third-party feeds.",
                },
                {
                  label: "Not a public rating",
                  body: "Reports are confidential to named subscribers. Carriers never receive a copy.",
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: 16,
                    alignItems: "center",
                    padding: "16px 18px",
                    borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,.05)" : "0",
                    fontFamily: "var(--fw-fm)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--fw-down)",
                      fontSize: 13,
                      fontWeight: 600,
                      width: 22,
                      textAlign: "center",
                    }}
                  >
                    ✕
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 12.5,
                        letterSpacing: ".06em",
                        color: "var(--fw-text)",
                        textTransform: "uppercase",
                        fontWeight: 500,
                        marginBottom: 3,
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--fw-fb)",
                        fontSize: 13,
                        color: "var(--fw-text-2)",
                        lineHeight: 1.5,
                        letterSpacing: 0,
                        textTransform: "none",
                      }}
                    >
                      {row.body}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: ".14em",
                      color: "var(--fw-text-3)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <div className="fw-monitor-foot">
              <span style={{ color: "var(--fw-text-3)" }}>ANDARA&gt;</span>{" "}
              <span style={{ color: "var(--fw-amber)", letterSpacing: ".06em" }}>
                INDEPENDENCE_VERIFIED
              </span>{" "}
              <span className="fw-cursor" />
            </div>
          </div>
        </div>
      </section>

      {/* thesis panel */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Our thesis</div>
            <h2>The intelligence gap<br />is the problem.</h2>
          </div>
          <p className="desc">
            Capital in African aviation does not fail because the market is
            unviable. It fails because the information required to deploy capital
            with confidence does not exist — or has never been independently
            produced.
          </p>
        </div>
        <div className="fw-arRise">
          <div className="fw-panel">
            <div className="fw-ph">
              <div className="t">Andara thesis · v1.5</div>
              <div className="r">INTERNAL FRAMEWORK</div>
            </div>
            <div
              style={{
                padding: "36px 36px 38px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 38,
              }}
            >
              <p style={{ color: "var(--fw-text-2)", fontSize: 16, lineHeight: 1.75 }}>
                Capital providers face a binary choice today: deploy on incomplete
                information, or walk away. The result is the opacity premium —
                a discount the market applies to every African aviation asset
                purely because it cannot be seen clearly.
              </p>
              <p style={{ color: "var(--fw-text-2)", fontSize: 16, lineHeight: 1.75 }}>
                Andara closes that gap. Not by advising on transactions, but by
                producing the primary intelligence layer that makes transactions
                legible. Fear of the unknown is not the same as actual risk.
                Fear of the unknown has a solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* principles */}
      <section
        id="principles"
        className="fw-block"
        style={{ background: "var(--fw-bg-2)", borderTop: "1px solid var(--fw-border)", borderBottom: "1px solid var(--fw-border)", position: "relative", overflow: "hidden" }}
      >
        <div className="fw-grid-bg" />
        <div className="fw-wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="fw-sec-head fw-arRise">
            <div>
              <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Our principles</div>
              <h2>Independence is<br />the product.</h2>
            </div>
            <p className="desc">
              These are not aspirations. They are operating constraints we accept
              in exchange for the right to claim independent intelligence.
            </p>
          </div>
          <div className="fw-pillars fw-arRise">
            {PRINCIPLES.map((p) => (
              <div className="fw-pillar" key={p.n}>
                <div className="n">{p.n}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* subscribers */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Who subscribes</div>
            <h2>Institutional capital,<br />by design.</h2>
          </div>
          <p className="desc">
            Subscribers are institutional capital providers and asset owners
            with exposure — or considering exposure — to African aviation.
            Airlines are never clients.
          </p>
        </div>
        <div className="fw-sectors-grid">
          {SECTORS.map((s) => (
            <div key={s.tag} className={`fw-sector ${s.span} fw-arRise`}>
              <div className="fw-grid-bg" />
              <div className="veil" />
              <div className="s-tag">{s.tag}</div>
              <div className="s-body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
        <p
          style={{
            color: "var(--fw-text-3)",
            fontSize: 13,
            fontFamily: "var(--fw-fm)",
            letterSpacing: ".08em",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          // INDEPENDENCE IS THE PRODUCT — AIRLINES ARE NEVER CLIENTS, ANDARA DOES NOT ADVISE ON TRANSACTIONS.
        </p>
      </section>

      {/* operating posture — verified against PRD */}
      <section className="fw-metrics">
        <div className="fw-metrics-grid">
          <div className="fw-metric fw-arRise">
            <div className="lbl">// MVP coverage</div>
            <div className="num">NG</div>
            <div className="mcap">Nigerian commercial AOCs at launch. Pan-African in Milestone 2.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Products</div>
            <div className="num">3</div>
            <div className="mcap">Arbiter (credit) · FleetWatch (asset surveillance) · AIR (intelligence report).</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Governance</div>
            <div className="num">SC</div>
            <div className="mcap">Scoring Committee approves every verdict. Methodology change is gated by sign-off.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Airline clients</div>
            <div className="num">0</div>
            <div className="mcap">By design. Independence is non-negotiable.</div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Independent intelligence on the question you're trying to answer."
        body="Tell us what the deal committee needs to see. We'll show you what independent African aviation intelligence does for the answer."
      />
    </TerminalChrome>
  );
};

export default WhoWeServe;
