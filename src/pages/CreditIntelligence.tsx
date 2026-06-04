import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/SectionContainer";
import { VideoHeroBackground } from "@/components/VideoHeroBackground";
import { useState } from "react";

const CreditIntelligence = () => {
  const scores = [
    {
      code: "SVS",
      shortLabel: "Safety & viability",
      title: "Safety & viability score",
      text: "Operational safety record, regulatory standing with NCAA and EASA, incident and accident history, airworthiness compliance, and the airline's demonstrated safety culture over time. Sourced from regulatory filings, field intelligence, and third-party operator assessments.",
    },
    {
      code: "PPS",
      shortLabel: "Payment performance",
      title: "Payment performance score",
      text: "Verified payment history with lessors, fuel suppliers, MRO providers, ground handlers, and airport authorities. Reconstructed from primary source interviews with counterparties - not from airline self-disclosure. Payment pattern over a minimum 24-month rolling window.",
    },
    {
      code: "APS",
      shortLabel: "Asset & performance",
      title: "Asset & performance score",
      text: "Fleet composition, aircraft age and condition, route network utilisation, load factors, punctuality, and the operational efficiency of the carrier's asset base. Cross-referenced with field observation, fleet database records, and regulatory performance data.",
    },
    {
      code: "RCS",
      shortLabel: "Revenue & commercial",
      title: "Revenue & commercial score",
      text: "Revenue quality, route mix stability, yield management, commercial partnerships, and the resilience of the airline's revenue base to market disruption. Includes analysis of codeshare and interline dependency and the commercial depth behind the carrier's network.",
    },
    {
      code: "RAS",
      shortLabel: "Risk & adaptability",
      title: "Risk & adaptability score",
      text: "Exposure to macro risk - fuel price volatility, currency risk, regulatory risk - and the airline's demonstrated ability to adapt. Includes management depth, governance quality, and track record under stress conditions. Weighted against sector-wide benchmarks.",
    },
  ];
  const [activeScoreIndex, setActiveScoreIndex] = useState(0);
  const activeScore = scores[activeScoreIndex];

  return (
    <div className="relative">
      <Header />
      <main>
        <div className="sticky top-0 z-0">
          <VideoHeroBackground videos={["/1472661_People_Business_3840x2160_1_v3.mp4"]}>
            <div className="max-w-content w-full mx-auto px-6 lg:px-12">
              <div className="max-w-4xl pt-20">
                <p className="text-sm uppercase tracking-widest text-white/80 mb-6">
                  Credit intelligence
                </p>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 text-white">
                  Airline creditworthiness, independently scored
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Andara scores operators whether or not they cooperate.
                  Non-cooperation is itself recorded as an intelligence signal.
                  Airlines do not pay for their own scoring and never access
                  their own report.
                </p>
              </div>
            </div>
          </VideoHeroBackground>
        </div>

        <div className="relative z-10 bg-background">
        <SectionContainer variant="white">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
              The 5-Score methodology
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              Five dimensions. One verdict.
            </h2>
            <p className="text-lg text-bac-text-secondary mb-10">
              Proprietary 5-Score methodology - SVS, PPS, APS, RCS, RAS -
              producing Deploy / Watch / Do Not Deploy verdicts on African
              carriers. Built from primary intelligence, not airline
              self-disclosure.
            </p>
            <div className="grid grid-cols-6 md:grid-cols-5 gap-0 rounded-xl border border-bac-border overflow-hidden">
              {scores.map((score, index) => {
                const isActive = index === activeScoreIndex;
                return (
                  <button
                    key={score.code}
                    type="button"
                    onClick={() => setActiveScoreIndex(index)}
                    className={`${
                      index < 3 ? "col-span-2" : "col-span-3"
                    } md:col-span-1 p-3 md:p-4 border-r border-bac-border last:border-r-0 transition-colors text-center flex flex-col items-center justify-center ${
                      isActive
                        ? "bg-[#f7f8fc]"
                        : "bg-background hover:bg-bac-light/60"
                    }`}
                  >
                    <p className="text-lg md:text-xl font-medium mb-1 text-primary">
                      {score.code}
                    </p>
                    <p className="text-xs md:text-sm text-bac-text-tertiary">
                      {score.shortLabel}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-xl border border-bac-border bg-[#f7f8fc] p-8 md:p-10">
              <p className="text-pink-600 uppercase tracking-[0.14em] text-sm mb-4">
                {activeScore.code}
              </p>
              <h3 className="text-xl md:text-2xl font-semibold text-primary mb-6">
                {activeScore.title}
              </h3>
              <p className="text-lg text-bac-text-tertiary leading-relaxed">
                {activeScore.text}
              </p>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer variant="light-grey">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
              The verdict
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              An actionable instruction, not just a rating
            </h2>
            <p className="text-lg text-bac-text-secondary mb-10">
              Every scored airline receives one of three deployment verdicts -
              designed to give a capital provider a clear, defensible position.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-green-300 bg-green-50 p-6">
                <p className="inline-block text-xs uppercase tracking-widest mb-3 text-green-800 bg-green-200 px-3 py-1 rounded-md font-medium">
                  Deploy
                </p>
                <p className="text-sm text-green-900">
                  The airline meets Andara's threshold for capital exposure.
                  Full intelligence brief issued with supporting evidence.
                </p>
              </div>
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-6">
                <p className="inline-block text-xs uppercase tracking-widest mb-3 text-amber-800 bg-amber-200 px-3 py-1 rounded-md font-medium">
                  Watch
                </p>
                <p className="text-sm text-amber-900">
                  Viable but risk factors identified. Conditional brief issued
                  with defined monitoring triggers.
                </p>
              </div>
              <div className="rounded-lg border border-red-300 bg-red-50 p-6">
                <p className="inline-block text-xs uppercase tracking-widest mb-3 text-red-800 bg-red-200 px-3 py-1 rounded-md font-medium">
                  Do not deploy
                </p>
                <p className="text-sm text-red-900">
                  Intelligence does not support capital exposure at this time.
                  Risk brief explains specific failure points.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer variant="white">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
              Intelligence sources
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              Primary data, not self-disclosure
            </h2>
            <p className="text-lg text-bac-text-secondary mb-10">
              Andara does not rely on what airlines choose to tell us. Scores
              are built from primary intelligence gathered directly from third
              parties who transact with each airline.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  title: "Lessor accounts receivable",
                  detail: "verified whether lease payments are current",
                },
                {
                  title: "Fuel suppliers",
                  detail: "payment patterns, credit terms, outstanding balances",
                },
                {
                  title: "Ground handlers & airports",
                  detail: "AOG history, handling disputes, ground debt",
                },
                {
                  title: "MRO providers",
                  detail: "maintenance payment history and backlog status",
                },
                {
                  title: "Regulatory bodies",
                  detail: "airworthiness, certificate standing, compliance posture",
                },
                {
                  title: "Market participants",
                  detail: "commercial intelligence and route performance data",
                },
              ].map((source) => (
                <div
                  key={source.title}
                  className="flex items-start gap-3 rounded-lg border border-bac-border bg-[#f7f8fc] p-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-base text-bac-text-secondary leading-relaxed">
                    <span className="font-semibold text-bac-text-primary">
                      {source.title}
                    </span>{" "}
                    - {source.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreditIntelligence;
