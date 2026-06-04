import { CONTENT } from "@/lib/content";

export const Footer = () => {
  return (
    <footer className="bg-bac-dark border-t border-bac-text-tertiary/20">
      <div className="max-w-content mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Column 1: Logo */}
          <div className="flex flex-col md:items-start">
            <img 
              src="/Andara Systems - light mode.svg" 
              alt="Andara Systems" 
              className="h-12 w-auto brightness-0 invert mb-4"
            />
          </div>
          
          {/* Column 2: Sitemap */}
          <div className="flex flex-col">
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
              {CONTENT.footer.sitemap.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-bac-text-tertiary hover:text-bac-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Column 3: Contact & Copyright */}
          <div className="flex flex-col">
            <div className="space-y-3">
              <a
                href={`mailto:${CONTENT.footer.email}`}
                className="block text-sm text-bac-text-tertiary hover:text-bac-light transition-colors"
              >
                {CONTENT.footer.email}
              </a>
              <p className="text-xs text-bac-text-tertiary mt-6">
                {CONTENT.footer.copyright}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
