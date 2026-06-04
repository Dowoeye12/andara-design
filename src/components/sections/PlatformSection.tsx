import { Button } from "../ui/button";
import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";

export const PlatformSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionContainer id="platform" variant="near-black">
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-8">
          {CONTENT.platform.sectionTitle}
        </p>
        <p className="text-2xl md:text-3xl font-semibold mb-6 text-bac-light">
          {CONTENT.platform.oneLiner}
        </p>
        <p className="text-lg text-bac-text-tertiary leading-relaxed mb-12">
          {CONTENT.platform.body}
        </p>

        {/* Abstract Glass Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="aspect-video bg-gradient-to-br from-bac-text-secondary/10 to-bac-text-tertiary/5 backdrop-blur-sm border border-bac-text-tertiary/20 rounded-lg relative overflow-hidden">
            <img 
              src="https://res.cloudinary.com/djnkxndun/image/upload/v1760909674/20251019_2216_Prism_Rainbow_Refraction_simple_compose_01k7z573zvernvycgbzfzs9cq8_czpdep.png"
              alt="Prism Rainbow Refraction"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-bac-text-secondary/10 to-bac-text-tertiary/5 backdrop-blur-sm border border-bac-text-tertiary/20 rounded-lg relative overflow-hidden">
            <img 
              src="https://res.cloudinary.com/djnkxndun/image/upload/v1760909676/20251019_2228_Precision_Glass_Archery_simple_compose_01k7z5xctcfg3s6h83yfp5e4m6_nkgd5q.png"
              alt="Precision Glass Archery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-bac-text-secondary/10 to-bac-text-tertiary/5 backdrop-blur-sm border border-bac-text-tertiary/20 rounded-lg relative overflow-hidden">
            <img 
              src="https://res.cloudinary.com/djnkxndun/image/upload/v1760909672/20251019_1834_Glass_Pillar_Elegance_simple_compose_01k7yrg8ssfpqsn5rxqx535j67_nvp7a8.png"
              alt="Glass Pillar Elegance"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
          </div>
        </div>

        <Button variant="outline" size="lg" onClick={scrollToContact} className="bg-transparent border-white text-white hover:bg-white hover:text-black hover:border-white">
          {CONTENT.platform.cta}
        </Button>
      </div>
    </SectionContainer>
  );
};
