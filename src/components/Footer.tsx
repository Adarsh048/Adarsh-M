import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useInView } from '../hooks/useInView';

export const Footer: React.FC = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      id="portfolio-footer"
      className={`pt-6 pb-24 md:pb-12 border-t border-border-main text-xs text-text-secondary font-mono relative ${
        isInView ? 'animate-hero-fade-up' : 'opacity-0 translate-y-6'
      }`}
      style={{ animationDelay: '100ms' }}
    >
      {/* Walking Torch Platform Anchor along the Footer Ground Line */}
      <div
        id="footer-ground-platform"
        className="absolute top-0 left-0 w-full h-[1px] pointer-events-none select-none"
      />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-text-primary" />
          <span>
            © {new Date().getFullYear()} <span className="text-text-primary font-bold">{PROFILE.name}</span>. All rights reserved.
          </span>
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 hover:text-text-primary transition-colors p-1 rounded hover:bg-bg-hover focus-visible:outline-none"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
