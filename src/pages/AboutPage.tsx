import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  GraduationCap, 
  ShieldCheck, 
  Trophy, 
  Terminal, 
  Code2, 
  Cpu, 
  Lock, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Mail, 
  FileText
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { LetterReveal, WordReveal } from '../components/LetterReveal';
import { PROFILE, PROJECTS } from '../data/portfolioData';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <article className="py-8 space-y-12">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between border-b border-border-main pb-4 animate-hero-fade-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer px-2.5 py-1 rounded-md hover:bg-bg-hover"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>
        <span className="hidden sm:inline-block text-[11px] font-mono text-text-muted">
          Press <kbd className="px-1.5 py-0.5 rounded border border-border-main bg-bg-main text-[10px]">Esc</kbd> to return
        </span>
      </div>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-border-main bg-panel-bg text-[11px] font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '220ms' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Profile & Engineering Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-text-primary">
            <LetterReveal text="About Adarsh M" baseDelay={320} staggerMs={26} />
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
            <WordReveal 
              text="Software Engineer specializing in production-ready distributed architectures, full-stack web platforms, cross-platform mobile apps with Flutter, and AI applications."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* Quick Highlights Metadata Bar */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 text-xs font-mono">
          <span 
            className="px-2.5 sm:px-3 py-1 rounded-md border border-border-main bg-panel-bg text-text-secondary flex items-center gap-1.5 text-[11px] sm:text-xs animate-hero-fade-up" 
            style={{ animationDelay: '950ms' }}
          >
            <GraduationCap className="w-3.5 h-3.5 text-text-primary" />
            SRMIST CSE (8.76 CGPA)
          </span>
          <span 
            className="px-2.5 sm:px-3 py-1 rounded-md border border-border-main bg-panel-bg text-text-secondary flex items-center gap-1.5 text-[11px] sm:text-xs animate-hero-fade-up" 
            style={{ animationDelay: '1070ms' }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-text-primary" />
            Full-Stack & Mobile Engineer
          </span>
          <span 
            className="px-2.5 sm:px-3 py-1 rounded-md border border-border-main bg-panel-bg text-text-secondary flex items-center gap-1.5 text-[11px] sm:text-xs animate-hero-fade-up" 
            style={{ animationDelay: '1190ms' }}
          >
            <Trophy className="w-3.5 h-3.5 text-text-primary" />
            Top 5 / 50 CyberCarnival CTF
          </span>
          <span 
            className="px-2.5 sm:px-3 py-1 rounded-md border border-border-main bg-panel-bg text-text-secondary flex items-center gap-1.5 text-[11px] sm:text-xs animate-hero-fade-up" 
            style={{ animationDelay: '1310ms' }}
          >
            <Terminal className="w-3.5 h-3.5 text-text-primary" />
            500+ Commits • 15+ Repos
          </span>
        </div>
      </header>

      {/* Section 1: Deep Biography & Narrative */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '1450ms' }}>
          <Code2 className="w-4 h-4 text-text-primary" />
          <span>Background & Narrative</span>
        </h2>
        <div className="text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
          <p className="animate-hero-fade-up" style={{ animationDelay: '1600ms' }}>
            My fascination with software began with a simple question: <span className="text-text-primary italic">how do distributed systems and client applications remain dependable when network conditions fluctuate and concurrency surges?</span> That curiosity led me to pursue Computer Science and Engineering with a deep focus on scalable full-stack and mobile architectures.
          </p>
          <p className="animate-hero-fade-up" style={{ animationDelay: '1800ms' }}>
            Over the course of my engineering work, I developed a strong inclination toward architecting resilient web platforms and cross-platform apps with React, Flutter, Node.js, and Express. Rather than merely assembling UI components, I focus on the full lifecycle of data: from client-side state caching and offline persistence in IndexedDB, through asynchronous outbox synchronization pipelines, to horizontally scalable REST and WebSocket servers in Node.js, Express.js, and Python (FastAPI).
          </p>
          <p className="animate-hero-fade-up" style={{ animationDelay: '2000ms' }}>
            Currently, I am expanding my work into intelligent information retrieval systems—building grounded Retrieval-Augmented Generation (RAG) engines using Gemini AI and Tavily Search API with bidirectional WebSocket token streaming for instant, conversational research.
          </p>
        </div>
      </section>

      {/* Section 2: Comprehensive Education & Academic Record */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '2150ms' }}>
          <GraduationCap className="w-4 h-4 text-text-primary" />
          <span>Education & Academic Credentials</span>
        </h2>
        
        <div className="p-5 rounded-2xl border border-border-main bg-panel-bg space-y-4 animate-hero-card" style={{ animationDelay: '2300ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-border-main/60 pb-3">
            <div>
              <h3 className="text-base font-bold text-text-primary">
                {PROFILE.education.institution}
              </h3>
              <p className="text-xs font-mono text-text-secondary">
                {PROFILE.education.degree}
              </p>
            </div>
            <div className="text-left sm:text-right mt-1 sm:mt-0">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
                CGPA: {PROFILE.education.cgpa}
              </span>
              <p className="text-[11px] font-mono text-text-muted mt-0.5">
                {PROFILE.education.period}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary font-mono">
              Specialization & Key Coursework
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-text-secondary">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Cyber Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Distributed Systems</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Cryptography & PKI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Data Structures & Algo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Database Internals</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Cloud & Network Security</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cybersecurity Focus & Architecture Philosophy */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '2450ms' }}>
          <ShieldCheck className="w-4 h-4 text-text-primary" />
          <span>Security & Systems Architecture Philosophy</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border-main bg-panel-bg space-y-2 animate-hero-card" style={{ animationDelay: '2550ms' }}>
            <div className="flex items-center gap-2 text-text-primary">
              <Lock className="w-4 h-4" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wide">
                Principle of Least Privilege
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Enforcing rigid multi-tier Role-Based Access Control (Owner, Member, Viewer) at both API route handlers and database query layers, ensuring zero unauthorized escalation vectors.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border-main bg-panel-bg space-y-2 animate-hero-card" style={{ animationDelay: '2700ms' }}>
            <div className="flex items-center gap-2 text-text-primary">
              <Cpu className="w-4 h-4" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wide">
                Cryptographic Token Auth
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Implementing HTTP-only, SameSite strict cookie storage for JWT authentication to insulate client state from XSS exfiltration and CSRF attack surfaces.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border-main bg-panel-bg space-y-2 animate-hero-card" style={{ animationDelay: '2850ms' }}>
            <div className="flex items-center gap-2 text-text-primary">
              <Layers className="w-4 h-4" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wide">
                Offline-First Data Sync
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Pioneering robust local client persistence via IndexedDB (Dexie.js) paired with background outbox synchronization that reconciles network disconnects deterministically.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border-main bg-panel-bg space-y-2 animate-hero-card" style={{ animationDelay: '3000ms' }}>
            <div className="flex items-center gap-2 text-text-primary">
              <Terminal className="w-4 h-4" />
              <h3 className="text-xs font-bold font-mono uppercase tracking-wide">
                Deterministic Validation
              </h3>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Strict runtime schema sanitization, bounded parameter checks, and predictable error handling to ensure production servers never crash on adversarial payloads.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Competitive Achievements & Milestones */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '3150ms' }}>
          <Trophy className="w-4 h-4 text-text-primary" />
          <span>Competitions & Milestones</span>
        </h2>
        
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-border-main bg-panel-bg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-hero-card" style={{ animationDelay: '3300ms' }}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  FINALIST • TOP 5
                </span>
                <h3 className="text-sm font-bold text-text-primary">
                  CyberCarnival CTF Finals
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Ranked in the top 5 out of 50 competitive collegiate teams, solving rapid-fire challenges in web exploitation, binary reverse engineering, forensics, and cryptanalysis.
              </p>
            </div>
            <span className="text-xs font-mono text-text-muted shrink-0">
              Top 10%
            </span>
          </div>

          <div className="p-4 rounded-xl border border-border-main bg-panel-bg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-hero-card" style={{ animationDelay: '3450ms' }}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                  OPEN SOURCE
                </span>
                <h3 className="text-sm font-bold text-text-primary">
                  500+ Commits & 15+ Engineered Repositories
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Maintained consistent daily engineering momentum building full-stack web platforms, distributed sync architectures, and AI streaming applications on GitHub.
              </p>
            </div>
            <span className="text-xs font-mono text-text-muted shrink-0">
              Active
            </span>
          </div>
        </div>
      </section>

      {/* Section 5: Signature Work Reference */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-text-primary flex items-center gap-2 animate-hero-fade-up" style={{ animationDelay: '3600ms' }}>
          <Layers className="w-4 h-4 text-text-primary" />
          <span>Signature Engineering Systems</span>
        </h2>
        <div className="space-y-3">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="p-4 rounded-xl border border-border-main bg-panel-bg hover:border-text-primary/40 transition-colors space-y-2 animate-hero-card"
              style={{ animationDelay: `${3750 + idx * 150}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                    {project.title}
                    <span className="text-[11px] font-normal text-text-muted font-mono">
                      — {project.subtitle}
                    </span>
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-text-secondary hover:text-text-primary flex items-center gap-1"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-text-secondary hover:text-text-primary flex items-center gap-1"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-border-subtle bg-bg-main text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation & Connect Footer */}
      <footer className="pt-6 border-t border-border-main flex flex-col sm:flex-row items-center justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '4200ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-text-secondary transition-colors cursor-pointer px-4 py-2 rounded-lg border border-border-main bg-panel-bg hover:bg-panel-hover"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Overview</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-border-main bg-panel-bg hover:bg-panel-hover text-text-primary transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-text-primary text-bg-main hover:opacity-90 transition-opacity font-semibold"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </a>
        </div>
      </footer>
    </article>
  );
};
