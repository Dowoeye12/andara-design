import { Database, Compass } from "lucide-react";
import { SectionContainer } from "../SectionContainer";
import { CONTENT } from "@/lib/content";

const iconMap = {
  Database,
  Compass,
};

export const WhatWeDoSection = () => {
  const backgroundImages = [
    "https://res.cloudinary.com/djnkxndun/image/upload/v1760828003/Intelligence_szibki.png",
    "https://res.cloudinary.com/djnkxndun/image/upload/v1760828004/Advisory_otngjw.png",
    "https://res.cloudinary.com/djnkxndun/image/upload/v1760828004/Solutions_lnlgn7.png"
  ];

  return (
    <SectionContainer id="what-we-do" variant="white">
      <div className="text-center mb-16">
        <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-8">
          OUR SERVICES
        </p>
        <p className="text-lg md:text-xl text-bac-text-secondary">
          {CONTENT.whatWeDo.intro}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {CONTENT.whatWeDo.cards.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          return (
            <div
              key={card.title}
              className="relative rounded-lg hover:shadow-lg transition-shadow overflow-hidden min-h-[460px]"
              style={{
                backgroundImage: `url(${backgroundImages[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <h3 className="text-2xl font-semibold mb-4 text-white">{card.title}</h3>
                <p className="text-base text-white/90 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};
