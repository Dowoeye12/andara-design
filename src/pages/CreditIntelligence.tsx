import { useState } from "react";
import { TerminalChrome, ArrowRightIcon, CtaBand } from "@/components/terminal/TerminalChrome";

// 5-Score dimensions, names and weights per Andara Master Build PRD §3.3.6.
// Weights: SVS 15, PPS 25, APS 20, RCS 25, RAS 15.
const SCORES = [
  {
    code: "SVS",
    short: "Strategic Value",
    weight: 15,
    title: "Strategic Value Score",
    text: "How strategically valuable the carrier is to its market — route network significance, national or regional importance, and the carrier's structural position. Sub-inputs are reviewed by the analyst and weighted with evidence references inside the scoring file.",
  },
  {
    code: "PPS",
    short: "Payment Priority",
    weight: 25,
    title: "Payment Priority Score",
    text: "How the carrier prioritises payment obligations across its counterparty stack — lessors, fuel suppliers, MRO providers, ground handlers, airport authorities. Built from counterparty intelligence, not airline self-disclosure.",
  },
  {
    code: "APS",
    short: "Airline Performance",
    weight: 20,
    title: "Airline Performance Score",
    text: "Operational performance of the airline as a going concern — fleet composition, utilisation, on-time performance, and operating discipline. Cross-referenced with field observation and regulatory performance data.",
  },
  {
    code: "RCS",
    short: "Risk Containment",
    weight: 25,
    title: "Risk Containment Score",
    text: "The carrier's posture toward containing operational and counterparty risk — governance, controls, financial discipline, and demonstrated ability to manage stress events without collateral damage to creditors.",
  },
  {
    code: "RAS",
    short: "Redeployment Suitability",
    weight: 15,
    title: "Redeployment Suitability Score",
    text: "How redeployable the carrier's underlying assets are — fleet liquidity, market mobility of aircraft types, and the structural ease with which assets could be recovered and repositioned in the event of failure.",
  },
];

const SOURCES = [
  { title: "Lessor accounts receivable", detail: "verified whether lease payments are current" },
  { title: "Fuel suppliers", detail: "payment patterns, credit terms, outstanding balances" },
  { title: "Ground handlers & airports", detail: "AOG history, handling disputes, ground debt" },
  { title: "MRO providers", detail: "maintenance payment history and backlog status" },
  { title: "Regulatory bodies", detail: "airworthiness, certificate standing, compliance posture" },
  { title: "Market participants", detail: "commercial intelligence and route performance data" },
];

const CreditIntelligence = () => {
  const [activeScore, setActiveScore] = useState(0);
  const score = SCORES[activeScore];

  return (
    <TerminalChrome>
      {/* hero */}
      <section className="fw-hero">
        <div className="fw-grid-bg" />
        <div className="fw-glow" />
        <div className="fw-wrap fw-hero-grid">
          <div>
            <div className="fw-cmd">
              <span className="br">ANDARA&gt;</span> CRED &lt;GO&gt;
            </div>
            <h1>
              Airline creditworthiness, <em>independently scored.</em>
            </h1>
            <p className="fw-lede">
              Andara scores operators whether or not they cooperate. Non-cooperation
              is itself recorded as an intelligence signal. Airlines do not pay for
              their own scoring and never access their own report.
            </p>
            <div className="fw-actions">
              <a href="#briefing" className="fw-btn-primary">
                Request Briefing <ArrowRightIcon />
              </a>
              <a href="#methodology" className="fw-btn-ghost">
                View 5-Score methodology
              </a>
            </div>
          </div>

          {/* sample scorecard */}
          <div className="fw-panel">
            <div className="fw-ph">
              <div className="t">Sample 5-Score Verdict</div>
              <div className="r">ILLUSTRATIVE · NOT A REAL CARRIER</div>
            </div>
            <div style={{ padding: 22 }}>
              {SCORES.map((s, i) => {
                const values = [82, 71, 75, 68, 63];
                return (
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
                    <span style={{ color: "var(--fw-amber)", letterSpacing: ".1em" }}>{s.code}</span>
                    <span
                      style={{
                        height: 6,
                        background: "var(--fw-bg-2)",
                        border: "1px solid var(--fw-border)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <i
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${values[i]}%`,
                          background: "linear-gradient(90deg,var(--fw-amber),#FFB85C)",
                          display: "block",
                        }}
                      />
                    </span>
                    <span style={{ textAlign: "right", color: "var(--fw-text)" }}>{values[i]}</span>
                  </div>
                );
              })}
              <div
                style={{
                  marginTop: 18,
                  border: "1px solid rgba(61,214,140,.35)",
                  background: "rgba(61,214,140,.06)",
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--fw-fm)",
                    fontSize: 10.5,
                    letterSpacing: ".2em",
                    color: "var(--fw-up)",
                    padding: "5px 10px",
                    background: "rgba(61,214,140,.12)",
                    border: "1px solid rgba(61,214,140,.35)",
                    textTransform: "uppercase",
                  }}
                >
                  ▲ Deploy
                </span>
                <span style={{ color: "var(--fw-text-2)", fontFamily: "var(--fw-fm)", fontSize: 12, letterSpacing: ".04em" }}>
                  COMPOSITE 71.8 / 100
                </span>
              </div>
            </div>
            <div className="fw-monitor-foot">
              <span style={{ color: "var(--fw-text-3)" }}>ANDARA&gt;</span>{" "}
              <span className="fw-cursor" />
            </div>
          </div>
        </div>
      </section>

      {/* methodology constants — verified against PRD §3.3.6 */}
      <section className="fw-metrics">
        <div className="fw-metrics-grid">
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Dimensions</div>
            <div className="num">5</div>
            <div className="mcap">SVS · PPS · APS · RCS · RAS. One composite verdict.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Verdict classes</div>
            <div className="num">3</div>
            <div className="mcap">Deploy · Watch · Do Not Deploy.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Governance</div>
            <div className="num">SC</div>
            <div className="mcap">Every verdict approved by Andara's Scoring Committee. Hard-floor logic enforced.</div>
          </div>
          <div className="fw-metric fw-arRise">
            <div className="lbl">// Airlines paying</div>
            <div className="num">0</div>
            <div className="mcap">Operators are never clients. They cannot pay for or see their own scores.</div>
          </div>
        </div>
      </section>

      {/* methodology */}
      <section id="methodology" className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>The 5-Score methodology</div>
            <h2>Five dimensions.<br />One verdict.</h2>
          </div>
          <p className="desc">
            Proprietary five-score methodology — SVS · PPS · APS · RCS · RAS,
            weighted 15 / 25 / 20 / 25 / 15 — producing Deploy, Watch, or Do Not
            Deploy verdicts. Hard-floor logic prevents borderline composites
            from masking a single critical failure.
          </p>
        </div>

        <div className="fw-arRise">
          <div className="fw-score-tabs">
            {SCORES.map((s, i) => (
              <button key={s.code} onClick={() => setActiveScore(i)} className={i === activeScore ? "active" : ""}>
                <span className="code">{s.code}</span>
                <span className="lbl">{s.short}</span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--fw-fm)",
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                    color: "var(--fw-text-3)",
                    marginTop: 6,
                  }}
                >
                  WT {s.weight}
                </span>
              </button>
            ))}
          </div>
          <div
            style={{
              marginTop: 18,
              border: "1px solid var(--fw-border)",
              background: "var(--fw-panel)",
            }}
          >
            <div className="fw-ph">
              <div className="t">
                {score.code} · {score.short}
              </div>
              <div className="r">DIMENSION {String(activeScore + 1).padStart(2, "0")} OF 05</div>
            </div>
            <div style={{ padding: "32px 32px 36px", display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontSize: "clamp(24px,2.4vw,34px)", maxWidth: "22ch" }}>{score.title}</h3>
              <p style={{ color: "var(--fw-text-2)", fontSize: 16, lineHeight: 1.7, maxWidth: "70ch" }}>
                {score.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* verdicts */}
      <section
        className="fw-block"
        style={{ background: "var(--fw-bg-2)", borderTop: "1px solid var(--fw-border)", borderBottom: "1px solid var(--fw-border)" }}
      >
        <div className="fw-wrap">
          <div className="fw-sec-head fw-arRise">
            <div>
              <div className="fw-eyebrow" style={{ marginBottom: 20 }}>The verdict</div>
              <h2>An actionable instruction,<br />not just a rating.</h2>
            </div>
            <p className="desc">
              Every scored airline receives one of three deployment verdicts.
              Off-cycle <b style={{ color: "var(--fw-text)" }}>Watch Notes</b>{" "}
              are issued whenever new intelligence materially changes the picture
              before the next scheduled refresh.
            </p>
          </div>

          <div className="fw-verdicts fw-arRise">
            <div className="fw-verdict-card deploy">
              <span className="tag">▲ Deploy</span>
              <p>
                The carrier meets Andara's threshold for capital exposure.
                Verdict letter and full scoring pack delivered to the
                commissioning client.
              </p>
            </div>
            <div className="fw-verdict-card watch">
              <span className="tag">◆ Watch</span>
              <p>
                Viable but risk factors identified. Conditional verdict letter
                issued with defined monitoring triggers and Watch Note cadence.
              </p>
            </div>
            <div className="fw-verdict-card deny">
              <span className="tag">▼ Do Not Deploy</span>
              <p>
                Intelligence does not support capital exposure at this time.
                Risk brief explains the specific failure points behind the call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* sources */}
      <section className="fw-block fw-wrap">
        <div className="fw-sec-head fw-arRise">
          <div>
            <div className="fw-eyebrow" style={{ marginBottom: 20 }}>Intelligence sources</div>
            <h2>Primary data, not<br />self-disclosure.</h2>
          </div>
          <p className="desc">
            Andara does not rely on what airlines choose to tell us. Scores are
            built from primary intelligence gathered directly from third parties
            who transact with each airline.
          </p>
        </div>

        <div
          className="fw-arRise"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}
        >
          {SOURCES.map((s, i) => (
            <div
              key={s.title}
              style={{
                border: "1px solid var(--fw-border)",
                background: "var(--fw-panel)",
                padding: "20px 22px",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 20,
                alignItems: "start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--fw-fm)",
                  fontSize: 11,
                  letterSpacing: ".14em",
                  color: "var(--fw-amber)",
                  padding: "6px 10px",
                  border: "1px solid var(--fw-border-bright)",
                  background: "var(--fw-panel-2)",
                }}
              >
                SRC {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4, color: "var(--fw-text)" }}>{s.title}</h3>
                <p style={{ color: "var(--fw-text-2)", fontSize: 14.5, lineHeight: 1.6 }}>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Score the carrier on your desk."
        body="Tell us the operator under review. We'll show you the live 5-Score, the verdict, and the field intelligence behind it."
      />
    </TerminalChrome>
  );
};

export default CreditIntelligence;
