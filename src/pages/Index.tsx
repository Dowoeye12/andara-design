import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { VideoParallaxSection } from "@/components/sections/VideoParallaxSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  useEffect(() => {
    const scrollToHashTarget = () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Ensure hash scrolling works when arriving from other pages.
    requestAnimationFrame(() => requestAnimationFrame(scrollToHashTarget));
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => window.removeEventListener("hashchange", scrollToHashTarget);
  }, []);

  return (
    <div className="relative">
      <Header />
      <main>
        {/* Hero Section - Sticky */}
        <div className="sticky top-0 z-0">
          <HeroSection />
        </div>
        
        {/* Content Sections - Slide over hero */}
        <div className="relative z-10 bg-background">
          <VisionSection />
          <VideoParallaxSection />
          <WhatWeDoSection />
          <PlatformSection />
          <ApproachSection />
          <TrustSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
