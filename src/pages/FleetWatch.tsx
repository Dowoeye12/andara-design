import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/SectionContainer";
import { VideoHeroBackground } from "@/components/VideoHeroBackground";
import { useState } from "react";

const FleetWatch = () => {
  const steps = [
    {
      title: "Physical aircraft assessment",
      text: "Andara field agents conduct a structured physical inspection of the aircraft at its operating base - exterior condition, interior state, landing gear, engine nacelles, and visible maintenance indicators. This is not a desktop review. This is eyes on the asset, every month.",
    },
    {
      title: "Documentation review",
      text: "A structured review of the aircraft's available technical documentation: maintenance records, airworthiness directive compliance status, Certificate of Release to Service (CRS), MEL items, and scheduled maintenance status against due dates. Gaps and anomalies are flagged immediately.",
    },
    {
      title: "Market value assessment",
      text: "Andara applies a multi-framework valuation methodology to produce a current independent estimate of the aircraft's market value - adjusted for physical condition, maintenance status, fleet market dynamics, and the specific economics of the African operating context.",
    },
    {
      title: "Risk flag assessment",
      text: "Any condition identified during field inspection or documentation review that represents a risk to asset value, airworthiness, or collateral integrity is documented and escalated as a risk flag with a recommended response - delivered directly to named contacts at the subscribing institution.",
    },
    {
      title: "Monthly report delivered",
      text: "A full intelligence report is delivered through Andara's secure subscriber portal. Downloadable as PDF, archived from the start of the monitoring engagement, and accessible by named users at the subscribing institution. Trend data builds month-on-month.",
    },
  ];
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = steps[activeStepIndex];

  return (
    <div className="relative">
      <Header />
      <main>
        <div className="sticky top-0 z-0">
          <VideoHeroBackground
            videos={[
              "https://res.cloudinary.com/djnkxndun/video/upload/v1771274864/cockpit_urhcsd-2_rgmak9.mp4",
            ]}
          >
            <div className="max-w-content w-full mx-auto px-6 lg:px-12">
              <div className="max-w-4xl pt-20">
                <p className="text-sm uppercase tracking-widest text-white/80 mb-6">
                  FleetWatch
                </p>
                <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6 text-white">
                  Continuous aircraft asset surveillance
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  Monthly independent intelligence on condition and value.
                  Replacing 363 days of unmonitored collateral exposure with a
                  complete, continuous picture delivered to your team every
                  month.
                </p>
              </div>
            </div>
          </VideoHeroBackground>
        </div>

        <div className="relative z-10 bg-background">
        <SectionContainer variant="white">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
                The collateral monitoring problem
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-8">
                Monthly intelligence replaces blind spots
              </h2>
              <p className="text-lg text-bac-text-secondary leading-relaxed">
                When a bank carries an aircraft as loan collateral, the standard
                model is two physical inspections per year. Between inspections,
                the capital provider has no verified visibility. An aircraft can
                suffer a significant maintenance backlog, a value-affecting
                incident, or a compliance failure - and the lending institution
                will not know until the next scheduled inspection, if at all.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-bac-border shadow-sm">
              <img
                src="https://res.cloudinary.com/djnkxndun/image/upload/v1760912264/Operators_xonpn1.png"
                alt="Aircraft monitoring visual"
                className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer variant="light-grey">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
              How FleetWatch works
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              The monthly intelligence cycle
            </h2>
            <p className="text-lg text-bac-text-secondary mb-10">
              Select each step to see what Andara does each month for every
              aircraft under monitoring.
            </p>
            <div className="grid md:grid-cols-2 rounded-xl border border-bac-border overflow-hidden">
              <div className="border-r border-bac-border bg-background">
                {steps.map((step, index) => {
                  const isActive = index === activeStepIndex;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setActiveStepIndex(index)}
                      className={`w-full flex items-center gap-4 px-6 py-5 text-left border-b border-bac-border last:border-b-0 transition-colors ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-background hover:bg-bac-light/60 text-bac-text-primary"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
                          isActive
                            ? "bg-pink-500 text-white"
                            : "border border-bac-border text-bac-text-tertiary"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`text-base md:text-lg font-normal ${
                          isActive ? "text-white" : "text-bac-text-secondary"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="bg-[#f7f8fc] p-8 md:p-10 min-h-[360px]">
                <p className="text-pink-600 uppercase tracking-[0.14em] text-sm mb-4">
                  STEP {String(activeStepIndex + 1).padStart(2, "0")} OF 05
                </p>
                <h3 className="text-3xl md:text-4xl font-medium text-primary mb-6">
                  {activeStep.title}
                </h3>
                <p className="text-lg font-light text-bac-text-tertiary leading-relaxed">
                  {activeStep.text}
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer variant="white">
          <div className="max-w-5xl mx-auto">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
              Report structure
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">
              What a FleetWatch report contains
            </h2>
            <div className="rounded-xl border border-bac-border overflow-hidden">
              <div className="bg-primary px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-white text-base md:text-lg font-medium">
                  FleetWatch Monthly Intelligence Report
                </span>
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded bg-pink-500/30 text-pink-200 border border-pink-300/30">
                  Subscriber confidential
                </span>
              </div>

              <div className="bg-background p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-bac-text-tertiary mb-3">
                      Report sections
                    </p>
                    <div className="space-y-2">
                      {[
                        "Aircraft identification & operator",
                        "Physical condition assessment",
                        "Maintenance & AD compliance status",
                        "Independent value assessment",
                        "Risk flags & recommended actions",
                        "Trend analysis (month-on-month)",
                        "Andara intelligence commentary",
                      ].map((item) => (
                        <div
                          key={item}
                          className="text-sm text-bac-text-secondary px-3 py-2 bg-[#f7f8fc] rounded-md border border-bac-border"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-bac-text-tertiary mb-3">
                      Sample 5-score assessment
                    </p>
                    <div className="space-y-4">
                      {[
                        { code: "SVS", value: 82, color: "#003C6E" },
                        { code: "PPS", value: 71, color: "#28328C" },
                        { code: "APS", value: 75, color: "#003C6E" },
                        { code: "RCS", value: 68, color: "#28328C" },
                        { code: "RAS", value: 63, color: "#E63C78" },
                      ].map((score) => (
                        <div key={score.code} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-primary w-8">
                            {score.code}
                          </span>
                          <div className="flex-1 h-1.5 bg-bac-border rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${score.value}%`,
                                backgroundColor: score.color,
                              }}
                            />
                          </div>
                          <span className="text-xs text-primary w-7 text-right">
                            {score.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-lg border border-green-300 bg-green-50 p-6">
                      <p className="inline-block text-xs uppercase tracking-widest mb-3 text-green-800 bg-green-200 px-3 py-1 rounded-md font-medium">
                        Deploy
                      </p>
                      <p className="text-sm text-green-900">
                        The airline meets Andara&apos;s threshold for capital
                        exposure. Full intelligence brief issued with supporting
                        evidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FleetWatch;
