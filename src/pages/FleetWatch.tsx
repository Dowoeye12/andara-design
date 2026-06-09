import { useEffect, useRef, useState } from "react";
import { TerminalChrome, ArrowRightIcon, CtaBand } from "@/components/terminal/TerminalChrome";

const MONITOR_ROWS = [
  { sym: "5N-SDD", meta: "ATR 72-600 · LAGOS", base: 14.2 },
  { sym: "ET-ALN", meta: "B737-800 · ADDIS", base: 28.6 },
  { sym: "9G-MKP", meta: "A320-200 · ACCRA", base: 22.8 },
  { sym: "TU-TSS", meta: "A330-300 · ABIDJAN", base: 56.1 },
  { sym: "5Y-KQS", meta: "B787-8 · NAIROBI", base: 138.4 },
  { sym: "ZS-SXE", meta: "A350-900 · J'BURG", base: 161.2 },
];

// Surveillance cadence is quarterly per PRD §3.4.5 (Quarterly report generator)
// and §3.6 (First FleetWatch quarterly report shipped to Fidelity Bank).
// AOG-class alerts are dispatched off-cycle between quarterly reports.
const STEPS = [
  {
    title: "Field visit & ramp inspection",
    tag: "FIELD VISIT",
    text: "A trained Field Intelligence Agent conducts an on-base physical visit — ramp inspection, record review, MRO observation — with structured-form capture, photos, and document scans. Everything is captured offline-first and synced to the FleetWatch intake on reconnection.",
  },
  {
    title: "Documentation review",
    tag: "TECHNICAL RECORDS",
    text: "Maintenance records, airworthiness directive compliance, Certificate of Release to Service, MEL items, and scheduled maintenance status against due dates. Documents flow through Andara's ingestion pipeline; gaps and anomalies are extracted for supervisor review.",
  },
  {
    title: "Supervisor review & anomaly classification",
    tag: "ANOMALY CLASSIFICATION",
    text: "A senior analyst reviews the captured visit, accepts or amends extracted fields, and promotes flagged observations to formal anomalies with severity. AOG-class triggers go through the alert engine for analyst confirmation before dispatch.",
  },
  {
    title: "Quarterly report composition",
    tag: "REPORTING",
    text: "The FleetWatch Operations team composes the quarterly report from accumulated visits and anomalies, with preview before issue. Reports are aircraft-level at MVP; portfolio-level dashboards arrive in Milestone 2.",
  },
  {
    title: "Watermarked delivery",
    tag: "DELIVERY",
    text: "The report is delivered through the client portal as a watermarked PDF — every download regenerated with the downloading user's token and logged in audit. AOG-class alerts continue off-cycle between quarterly reports.",
  },
];

const REPORT_SECTIONS = [
  "Aircraft identification & operator",
  "Visit summary & field observation",
  "Maintenance & AD compliance status",
  "Open anomalies & severity classification",
  "AOG alert history (period)",
  "Trend analysis (quarter-on-quarter)",
  "Andara intelligence commentary",
];

// Illustrative FleetWatch indicators — not the 5-Score (that's Credit Intelligence).
// Values shown are sample placeholders for visual demonstration only.
const INDICATORS = [
  { code: "COND", label: "Condition", value: 82 },
  { code: "DOCS", label: "Documentation currency", value: 71 },
  { code: "MAINT", label: "Maintenance posture", value: 75 },
  { code: "REG", label: "Regulatory standing", value: 68 },
  { code: "ANOM", label: "Anomalies (inverted)", value: 88 },
];

const FleetWatch = () => {
  const [activeStep, setActiveStep] = useState(0);
  const monitorRef = useRef<HTMLDivElement>(null);

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

  const step = STEPS[activeStep];

  return (
    <TerminalChrome>
      {/* hero */}
      <section className="fw-hero">
        <div className="fw-grid-bg" />
        <div className="fw-glow" />
        <div className="fw-wrap fw-hero-grid">
          <div>
            <div className="fw-cmd">
              <span className="br">ANDARA&gt;</span> FLEETWATCH &lt;GO&gt;
            </div>
            <h1>
              Independent aircraft <em>asset surveillance.</em>
            </h1>
            <p className="fw-lede">
              Quarterly field-led intelligence on aircraft condition, documentation,
              and anomaly state — with AOG-class alerts dispatched off-cycle the
              moment something changes. Independent eyes on collateral, every
              quarter, every aircraft.
            </p>
            <div className="fw-actions">
              <a href="#briefing" className="fw-btn-primary">
                Request Briefing <ArrowRightIcon />
              </a>
              <a href="#cycle" className="fw-btn-ghost">
                View intelligence cycle
              </a>
            </div>
          </div>

          <div className="fw-panel" ref={monitorRef}>
            <div className="fw-ph">
              <div className="t">Fleet under surveillance</div>
              <div className="r">CMV · USD M · LIVE</div>
            </div>
            <div>
              {MONITOR_ROWS.map((r) => (
                <div className="fw-monitor-row" key={r.sym}>
                  <div className="sym">
                    {r.sym}
                    <small>{r.meta}</small>
                  </div>
                  <div className="val" data-base={r.base}>
                    {r.base.toFixed(1)}
                  </div>
                  <div className="chg fw-up">▲ 0.4%</div>
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

      {/* operating constants — verified against PRD + AIR Issue 001 */}
      <section className="fw-metrics">
        <div className="fw-metrics-grid">
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Report cadence</div>
            <div className="num">Q<span>1–4</span></div>
            <div className="mcap">One quarterly intelligence report per aircraft, per year. AOG alerts off-cycle.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Cost-of-monitoring</div>
            <div className="num">1<span>%</span></div>
            <div className="mcap">Of aircraft value per annum — vs the 8–15% information discount applied at remarketing.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Delivery</div>
            <div className="num">PDF</div>
            <div className="mcap">Watermarked, tokenised per named user, audit-logged on every download.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Conflicts</div>
            <div className="num">0</div>
            <div className="mcap">Independent. No inventory, no transaction fees, no airline-paid scoring.</div>
          </div>
        </div>
      </section>

      {/* problem */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>The collateral problem</div>
            <h2>The annual inspection<br />is not surveillance.</h2>
          </div>
          <p className="desc">
            Between scheduled appraisals, the capital provider is flying blind —
            a value-affecting incident, a compliance failure, or a maintenance
            backlog can pass undetected until the next visit, if at all. The
            market discounts that opacity at remarketing.
          </p>
        </div>
        <div className="fw-arRise">
          <div className="fw-panel">
            <div className="fw-ph">
              <div className="t">Information discount at remarketing</div>
              <div className="r">SOURCE · ANDARA MODELS · INDUSTRY OBS.</div>
            </div>
            <div style={{ padding: "34px 34px 30px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
                <div style={{ fontFamily: "var(--fw-fd)", fontSize: 56, fontWeight: 600, letterSpacing: "-.03em", lineHeight: 1 }}>
                  <span style={{ color: "var(--fw-amber)" }}>8–15%</span>
                </div>
                <p style={{ color: "var(--fw-text-2)", fontSize: 15.5, lineHeight: 1.65, maxWidth: "46ch" }}>
                  The estimated value gap between a continuously-monitored asset with
                  current documentation and an un-monitored one with lapsed records,
                  at end-of-life remarketing. FleetWatch is priced at 1% of aircraft
                  value per annum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cycle */}
      <section
        id="cycle"
        className="fw-block"
        style={{ background: "var(--fw-bg-2)", borderTop: "1px solid var(--fw-border)", borderBottom: "1px solid var(--fw-border)" }}
      >
        <div className="fw-wrap">
          <div className="fw-sec-head fw-arRise">
            <div>
              <div className="fw-eyebrow" style={{ marginBottom: 20 }}>The quarterly cycle</div>
              <h2>Five steps. Every aircraft.<br />Every quarter.</h2>
            </div>
            <p className="desc">
              A structured surveillance protocol applied identically to every aircraft
              under monitoring. Select any step to see what Andara does on the
              ground, in the records room, and on the alert engine.
            </p>
          </div>

          <div
            className="fw-arRise"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: 0,
              border: "1px solid var(--fw-border)",
              background: "var(--fw-panel)",
            }}
          >
            <div style={{ borderRight: "1px solid var(--fw-border)" }}>
              {STEPS.map((s, i) => {
                const active = i === activeStep;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActiveStep(i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 18,
                      alignItems: "center",
                      width: "100%",
                      padding: "22px 22px",
                      background: active ? "var(--fw-panel-2)" : "transparent",
                      border: 0,
                      borderBottom: i < STEPS.length - 1 ? "1px solid var(--fw-border)" : "0",
                      cursor: "pointer",
                      textAlign: "left",
                      color: active ? "var(--fw-text)" : "var(--fw-text-2)",
                      fontFamily: "var(--fw-fb)",
                      transition: ".2s",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--fw-fm)",
                        fontSize: 12,
                        letterSpacing: ".1em",
                        color: active ? "var(--fw-amber)" : "var(--fw-text-3)",
                        width: 34,
                        height: 34,
                        border: "1px solid",
                        borderColor: active ? "var(--fw-amber)" : "var(--fw-border-bright)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--fw-fd)", fontSize: 16, fontWeight: 500 }}>
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
            <div style={{ padding: "42px 38px", display: "flex", flexDirection: "column", gap: 18, minHeight: 380 }}>
              <span style={{ fontFamily: "var(--fw-fm)", fontSize: 11, letterSpacing: ".18em", color: "var(--fw-amber)", textTransform: "uppercase" }}>
                STEP {String(activeStep + 1).padStart(2, "0")} OF 05 · {step.tag}
              </span>
              <h3 style={{ fontSize: "clamp(26px,2.6vw,38px)", maxWidth: "18ch" }}>{step.title}</h3>
              <p style={{ color: "var(--fw-text-2)", fontSize: 16, lineHeight: 1.7, maxWidth: "62ch" }}>{step.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* report */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Report structure</div>
            <h2>What a FleetWatch<br />report contains.</h2>
          </div>
          <p className="desc">
            Delivered through Andara's secure subscriber portal. Downloadable as PDF,
            archived from day one of the engagement, accessible by named users at
            the subscribing institution.
          </p>
        </div>

        <div className="fw-arRise" style={{ border: "1px solid var(--fw-border)", background: "var(--fw-panel)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              background: "var(--fw-panel-2)",
              borderBottom: "1px solid var(--fw-border)",
              padding: "16px 22px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: "var(--fw-fd)", fontSize: 18, fontWeight: 600, letterSpacing: "-.01em" }}>
              FleetWatch Quarterly Intelligence Report
            </span>
            <span
              style={{
                fontFamily: "var(--fw-fm)",
                fontSize: 10.5,
                letterSpacing: ".18em",
                color: "var(--fw-amber)",
                padding: "6px 11px",
                border: "1px solid rgba(255,154,31,.4)",
                background: "rgba(255,154,31,.08)",
              }}
            >
              SUBSCRIBER CONFIDENTIAL
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, padding: 34 }}>
            <div>
              <div style={{ fontFamily: "var(--fw-fm)", fontSize: 10.5, letterSpacing: ".18em", color: "var(--fw-text-3)", textTransform: "uppercase", marginBottom: 16 }}>
                // Report sections
              </div>
              {REPORT_SECTIONS.map((s) => (
                <div
                  key={s}
                  style={{
                    fontFamily: "var(--fw-fm)",
                    fontSize: 12.5,
                    letterSpacing: ".04em",
                    color: "var(--fw-text)",
                    padding: "13px 14px",
                    background: "var(--fw-panel-2)",
                    border: "1px solid var(--fw-border)",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ width: 6, height: 6, background: "var(--fw-amber)", display: "inline-block", flex: "none" }} />
                  {s}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "var(--fw-fm)", fontSize: 10.5, letterSpacing: ".18em", color: "var(--fw-text-3)", textTransform: "uppercase", marginBottom: 16 }}>
                // Sample aircraft-level indicators
              </div>
              {INDICATORS.map((s) => (
                <div
                  key={s.code}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr 44px",
                    gap: 14,
                    alignItems: "center",
                    marginBottom: 14,
                    fontFamily: "var(--fw-fm)",
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: "var(--fw-amber)", letterSpacing: ".08em" }}>{s.code}</span>
                  <span style={{ height: 6, background: "var(--fw-bg-2)", border: "1px solid var(--fw-border)", position: "relative", overflow: "hidden" }}>
                    <i
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${s.value}%`,
                        background: "linear-gradient(90deg,var(--fw-amber),#FFB85C)",
                        display: "block",
                      }}
                    />
                  </span>
                  <span style={{ textAlign: "right", color: "var(--fw-text)" }}>{s.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, border: "1px solid var(--fw-border)", background: "var(--fw-panel-2)", padding: "18px 20px" }}>
                <span
                  style={{
                    fontFamily: "var(--fw-fm)",
                    fontSize: 10.5,
                    letterSpacing: ".2em",
                    color: "var(--fw-amber)",
                    padding: "5px 10px",
                    background: "rgba(255,154,31,.1)",
                    border: "1px solid rgba(255,154,31,.35)",
                    display: "inline-block",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  ◆ 2 open anomalies
                </span>
                <p style={{ color: "var(--fw-text-2)", fontSize: 13.5, lineHeight: 1.65 }}>
                  Illustrative aircraft-level summary. Indicators are FleetWatch
                  signals, not the carrier 5-Score — that lives in Credit
                  Intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Put eyes on every aircraft on your book."
        body="Tell us which aircraft you'd like under surveillance. We'll show you what independent quarterly intelligence — with AOG-class alerts off-cycle — does to your remarketing risk."
      />
    </TerminalChrome>
  );
};

export default FleetWatch;
