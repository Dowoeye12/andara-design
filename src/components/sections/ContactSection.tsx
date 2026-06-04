import { SectionContainer } from "../SectionContainer";
import { ContactForm } from "../ContactForm";
import { CONTENT } from "@/lib/content";

export const ContactSection = () => {
  return (
    <SectionContainer id="contact" variant="near-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-bac-text-tertiary mb-8">
            CONTACT US
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-bac-light mb-6">
            {CONTENT.contact.headline}
          </h2>
          <p className="text-lg text-bac-text-tertiary">
            {CONTENT.contact.body}
          </p>
        </div>

        <ContactForm />
      </div>
    </SectionContainer>
  );
};
