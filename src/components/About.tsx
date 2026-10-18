import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { LetterReveal } from './LetterReveal';

interface AboutProps {
  onOpenFullAbout?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenFullAbout }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} id="about" className="py-8 space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <h2 
          onClick={onOpenFullAbout}
          className={`text-xl sm:text-2xl font-bold font-display tracking-tight text-text-primary whitespace-nowrap ${
            onOpenFullAbout ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
          }`}
          title={onOpenFullAbout ? "Click to view full about page" : undefined}
        >
          <LetterReveal text="About" isActive={isInView} baseDelay={100} staggerMs={28} />
        </h2>
        <div
          id="about-ledge-platform"
          className={`h-[1px] flex-1 bg-border-main relative ${isInView ? 'animate-divider-expand' : ''}`}
          style={{ animationDelay: '220ms' }}
        />
      </div>

      {/* Recruiter-Friendly Crisp Narrative with Balanced Hierarchy */}
      <div className="space-y-3">
        <p
          className={`text-base sm:text-[16px] text-text-primary font-medium leading-relaxed ${
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '400ms' }}
        >
          I'm a <span className="font-semibold text-text-primary">Full-Stack Software Engineer</span> building scalable web platforms, cross-platform mobile apps, distributed backends, and AI products.
        </p>
        <p
          className={`text-sm sm:text-[15px] text-text-secondary leading-relaxed ${
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '650ms' }}
        >
          My core stack centers on <span className="text-text-primary font-medium">React, JavaScript, TypeScript, Flutter, Node.js, Express.js, Python (FastAPI)</span>, and <span className="text-text-primary font-medium">MongoDB/PostgreSQL</span>—with specialized production experience in <span className="text-text-primary font-medium">REST APIs</span>, real-time <span className="text-text-primary font-medium">WebSockets</span>, <span className="text-text-primary font-medium">offline-first sync</span> (Dexie.js), and grounded <span className="text-text-primary font-medium">RAG pipelines</span>.
        </p>
      </div>

      {/* Action to View Full Dedicated Page: Unboxed, Refined & Elegantly Aligned */}
      {onOpenFullAbout && (
        <div
          className={`pt-5 mt-2 border-t border-border-subtle/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
            isInView ? 'animate-hero-fade-up' : ''
          }`}
          style={{ animationDelay: '900ms' }}
        >
          {/* Live Availability Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for SWE & Full-Stack Roles</span>
          </div>

          {/* Premium Unboxed Editorial Deep-Dive Link */}
          <button
            onClick={onOpenFullAbout}
            className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono text-text-primary hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer self-start sm:self-auto py-1"
            aria-label="Read full background, education and achievements"
          >
            <span className="relative font-medium tracking-tight">
              Read full background, education & achievements
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-emerald-500 dark:bg-emerald-400 transition-all duration-300 ease-out group-hover:w-full" />
            </span>
            <ArrowRight className="w-4 h-4 text-text-secondary group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-all duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
};
