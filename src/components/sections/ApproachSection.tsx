import { Search, Users, Rocket, Shield } from "lucide-react";
import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";

const iconMap = {
  Search,
  Users,
  Rocket,
  Shield,
};

export const ApproachSection = () => {
  return (
    <SectionContainer id="approach" variant="white">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-4">
          {CONTENT.approach.sectionTitle}
        </p>
        <p className="text-lg md:text-xl text-bac-text-secondary max-w-3xl mx-auto">
          {CONTENT.approach.intro}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {CONTENT.approach.pillars.map((pillar, index) => {
          const Icon = iconMap[pillar.icon as keyof typeof iconMap];
          return (
            <div key={pillar.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-base text-bac-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};
