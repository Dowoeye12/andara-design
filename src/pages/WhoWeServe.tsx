import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionContainer } from "@/components/SectionContainer";
import { CONTENT } from "@/lib/content";

const WhoWeServe = () => {
  return (
    <div className="relative">
      <Header />
      <main>
        <div className="sticky top-0 z-0">
          <SectionContainer variant="near-black" className="min-h-screen">
            <div className="max-w-4xl pt-20">
              <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-6">
                Who Andara serves
              </p>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
                Built for capital providers
              </h1>
              <p className="text-lg md:text-xl text-bac-text-tertiary leading-relaxed">
                The right intelligence, for the right institution.
              </p>
            </div>
          </SectionContainer>
        </div>

        <div className="relative z-10 bg-background">
        <SectionContainer variant="light-grey">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-4">
              Subscriber types
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              The right intelligence, for the right institution
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {CONTENT.trust.cards.map((card) => (
              <div
                key={card.title}
                className="relative rounded-lg hover:shadow-lg transition-shadow overflow-hidden min-h-[460px]"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="relative z-10 p-8 h-full flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    {card.title}
                  </h3>
                  <p className="text-base text-white/90 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhoWeServe;
