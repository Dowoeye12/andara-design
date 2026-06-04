import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";

export const TrustSection = () => {
  return (
    <SectionContainer id="trust" variant="light-grey">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-4">
          {CONTENT.trust.headline}
        </p>
        <p className="text-lg md:text-xl text-bac-text-secondary max-w-4xl mx-auto">
          {CONTENT.trust.subheading}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {CONTENT.trust.cards.map((card, index) => (
          <div
            key={card.title}
            className="relative rounded-lg hover:shadow-lg transition-shadow overflow-hidden min-h-[460px]"
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Content */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <h3 className="text-2xl font-semibold mb-4 text-white">{card.title}</h3>
              <p className="text-base text-white/90 leading-relaxed">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-base text-bac-text-tertiary">
        {CONTENT.trust.disclaimer}
      </p>
    </SectionContainer>
  );
};
