import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { CONTENT, NAV_ITEMS } from "@/lib/content";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Only show navbar background after scrolling past the hero section
      setIsScrolled(scrollY > heroHeight);
      // Check if we're in the hero section (first 100vh)
      setIsInHeroSection(scrollY < heroHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    handleScroll();
  }, []);

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/Andara Systems - light mode.svg" 
            alt="BAC Intelligence" 
            className={`h-12 w-auto transition-all duration-300 ${
              isInHeroSection 
                ? "brightness-0 invert" // Makes the logo white
                : "brightness-100" // Keeps the original color
            }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm transition-colors ${
                  isInHeroSection
                    ? "text-white/85 hover:text-white"
                    : "text-primary/80 hover:text-primary"
                } ${isActive ? (isInHeroSection ? "text-white" : "text-primary font-medium") : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection("#contact")}
            className={`bg-transparent transition-all duration-300 ${
              isInHeroSection 
                ? "border-white text-white hover:bg-white hover:text-black" // White when over hero
                : "border-primary text-primary hover:bg-primary hover:text-white" // Brand blue when past hero
            }`}
          >
            {CONTENT.hero.primaryCta}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="flex flex-col p-6 gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-primary/90 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className={`w-full bg-transparent transition-all duration-300 ${
                isInHeroSection 
                  ? "border-white text-white hover:bg-white hover:text-black" // White when over hero
                  : "border-primary text-primary hover:bg-primary hover:text-white" // Brand blue when past hero
              }`}
              onClick={() => scrollToSection("#contact")}
            >
              {CONTENT.hero.primaryCta}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
