import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";

export const VisionSection = () => {
  return (
    <SectionContainer id="vision" variant="light-grey">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-8">
          {CONTENT.vision.sectionTitle}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-bac-text-primary mb-8">
          {CONTENT.vision.title}
        </h2>
        <div className="space-y-6 text-lg md:text-xl leading-relaxed">
          {CONTENT.vision.paragraphs.map((para, index) => (
            <p key={index} className="text-bac-text-primary">
              {para}
            </p>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};
