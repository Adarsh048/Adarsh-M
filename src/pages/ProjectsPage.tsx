import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Sparkles, 
  WifiOff, 
  ShieldCheck, 
  Terminal, 
  Boxes,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { LetterReveal, WordReveal } from '../components/LetterReveal';

interface ProjectsPageProps {
  onBack: () => void;
  onNavigateToStack?: () => void;
  onNavigateToContact?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ 
  onBack, 
  onNavigateToStack,
  onNavigateToContact 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'distributed' | 'ai' | 'analytics'>('all');

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
    <article className="pt-24 sm:pt-28 pb-12 space-y-12">
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
      <header className="space-y-5">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-main bg-panel-bg text-xs font-mono text-text-secondary animate-hero-badge" style={{ animationDelay: '220ms' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Architecture & Systems Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="Featured Projects & Case Studies" baseDelay={320} staggerMs={22} />
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl font-normal">
            <WordReveal 
              text="In-depth architecture blueprints, distributed sync patterns, and grounded AI retrieval engines built with production reliability."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap gap-2 pt-2 animate-hero-fade-up" style={{ animationDelay: '950ms' }}>
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'distributed', label: 'Offline-First & Distributed' },
            { id: 'ai', label: 'AI & Information Retrieval' },
            { id: 'analytics', label: 'Financial & Metrics Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-text-primary text-bg-main font-bold shadow-xs'
                  : 'border border-border-main bg-panel-bg text-text-secondary hover:text-text-primary hover:border-text-primary/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Deep Dive 1: DecisionVault (Architecture Decision Records) */}
      {(selectedFilter === 'all' || selectedFilter === 'distributed') && (
        <section className="p-6 sm:p-8 rounded-2xl border border-border-main bg-panel-bg/90 space-y-6 shadow-xs animate-hero-card" style={{ animationDelay: '1150ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-main/60 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  FLAGSHIP BUILD • 2025
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Full-Stack Distributed Architecture
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary">
                DecisionVault
              </h2>
              <p className="text-xs sm:text-sm font-mono text-text-secondary mt-0.5">
                Offline-First Architecture Decision Record (ADR) Platform
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Adarsh048/DecisionVault"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-main bg-bg-main hover:border-text-primary text-xs font-mono text-text-primary transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
              <a
                href="https://decision-vault-for.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text-primary text-bg-main hover:opacity-90 text-xs font-mono font-semibold transition-opacity"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interface Preview Banner */}
          <div className="relative w-full h-56 sm:h-76 rounded-xl overflow-hidden border border-border-subtle bg-neutral-950 shadow-inner">
            <img
              src="/projects/decision-vault.jpg"
              alt="DecisionVault Architecture Platform Interface"
              className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
            Technical organizations lose institutional context when architectural decisions are scattered across chats, pull requests, and meetings. DecisionVault provides a centralized, offline-capable workspace for engineering teams to propose, debate, and version ADRs with zero interruption during network disconnects.
          </p>

          {/* Architecture Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <WifiOff className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Local-First Persistence (Dexie.js)</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                All records and drafts persist to browser IndexedDB storage using Dexie.js. Users can compose, edit, and organize records seamlessly on flights, subways, or high-packet-loss environments.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Outbox Sync Worker</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Offline mutations queue inside an indexed outbox table. A background service listener watches online events, performing atomic batch reconciliation to MongoDB with conflict resolution strategies.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Cpu className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Socket.IO Collaboration</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Live team presence indicators, multi-editor notifications, and instant room broadcasts keep distributed teams in sync without requiring manual page reloads or polling.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>3-Tier RBAC & Auth</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Strict granular permission boundaries (Owner, Member, Viewer) enforced at both database and middleware levels. Secured via signed HTTP-only JWTs with CSRF guards.
              </p>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/60">
            {["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.IO", "IndexedDB", "Dexie.js", "Tailwind CSS", "JWT Auth"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-md border border-border-subtle bg-badge-bg text-xs font-mono text-text-secondary">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Deep Dive 2: QueryMind (AI & Retrieval) */}
      {(selectedFilter === 'all' || selectedFilter === 'ai') && (
        <section className="p-6 sm:p-8 rounded-2xl border border-border-main bg-panel-bg/90 space-y-6 shadow-xs animate-hero-card" style={{ animationDelay: '1400ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-main/60 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
                  AI ENGINEERING • 2025
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Information Retrieval & RAG
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary">
                QueryMind
              </h2>
              <p className="text-xs sm:text-sm font-mono text-text-secondary mt-0.5">
                AI Search & Research Engine with Token Streaming
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Adarsh048/Find_it_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-main bg-bg-main hover:border-text-primary text-xs font-mono text-text-primary transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            </div>
          </div>

          {/* Interface Preview Banner */}
          <div className="relative w-full h-56 sm:h-76 rounded-xl overflow-hidden border border-border-subtle bg-neutral-950 shadow-inner">
            <img
              src="/projects/query-mind.jpg"
              alt="QueryMind AI Search & Research Engine Interface"
              className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
            Standard conversational chatbots suffer from stale training cutoffs and hallucinations. QueryMind solves this by executing real-time web discovery with Tavily Search API, passing filtered contextual evidence to Gemini AI, and streaming verifiable answers over WebSockets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Grounded RAG Pipeline</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Incoming queries prompt an automated multi-query expansion, extracting live search results via Tavily and injecting fresh factual contexts directly into Gemini prompt templates.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Activity className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Bidirectional WebSocket Streaming</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Eliminated slow HTTP polling. Tokens stream from Python FastAPI over WebSockets in real time, rendering Markdown text and source links with sub-100ms time-to-first-token.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Boxes className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Cross-Platform Flutter Client</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Engineered with Dart and Flutter, providing smooth 60fps animations, native keyboard navigation, and responsive typography across mobile and desktop viewports.
              </p>
            </div>

            <div className="p-4 sm:p-4.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-text-primary">
                <Terminal className="w-4 h-4 text-purple-500 shrink-0" />
                <span>FastAPI Microservice Layer</span>
              </div>
              <p className="text-xs sm:text-[13px] text-text-secondary leading-relaxed">
                Asynchronous Python backend utilizing Pydantic data modeling, automated schema generation, and concurrent external API handling with httpx.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/60">
            {["Python", "FastAPI", "Flutter", "Dart", "Gemini AI", "Tavily Search API", "WebSockets", "RAG", "Markdown"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-md border border-border-subtle bg-badge-bg text-xs font-mono text-text-secondary">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Deep Dive 3: FinSight (Finance Analytics) */}
      {(selectedFilter === 'all' || selectedFilter === 'analytics') && (
        <section className="p-6 sm:p-8 rounded-2xl border border-border-main bg-panel-bg/90 space-y-6 shadow-xs animate-hero-card" style={{ animationDelay: '1650ms' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-main/60 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20">
                  FINTECH DASHBOARD • 2024
                </span>
                <span className="text-xs font-mono text-text-muted">
                  Interactive Data Visualization
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary">
                FinSight
              </h2>
              <p className="text-xs sm:text-sm font-mono text-text-secondary mt-0.5">
                Financial Portfolio Analytics & Anomaly Detection Dashboard
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Adarsh048/Finance_dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-main bg-bg-main hover:border-text-primary text-xs font-mono text-text-primary transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
              <a
                href="https://finance-dashboard-teal-nine-23.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text-primary text-bg-main hover:opacity-90 text-xs font-mono font-semibold transition-opacity"
              >
                <span>Live App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interface Preview Banner */}
          <div className="relative w-full h-56 sm:h-76 rounded-xl overflow-hidden border border-border-subtle bg-neutral-950 shadow-inner">
            <img
              src="/projects/finsight.jpg"
              alt="FinSight Finance Analytics Dashboard Interface"
              className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>

          <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
            Built to demystify personal cash flows and transaction histories. Features responsive Recharts graphs, categorical expense drilldowns, custom time-range aggregations, and persistent user configuration state.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl border border-border-subtle bg-bg-main/60 space-y-1.5">
              <span className="text-xs font-mono text-text-muted block">Chart Performance</span>
              <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">60 FPS Transitions</span>
            </div>
            <div className="p-4 rounded-xl border border-border-subtle bg-bg-main/60 space-y-1.5">
              <span className="text-xs font-mono text-text-muted block">Aggregation Engine</span>
              <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">Client-Side Grouping</span>
            </div>
            <div className="p-4 rounded-xl border border-border-subtle bg-bg-main/60 space-y-1.5">
              <span className="text-xs font-mono text-text-muted block">Responsive Breakpoints</span>
              <span className="text-sm sm:text-base font-bold text-text-primary font-mono block">Mobile to Ultra-Wide</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border-main/60">
            {["React", "JavaScript", "Tailwind CSS", "Recharts", "REST APIs", "Vite"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-md border border-border-subtle bg-badge-bg text-xs font-mono text-text-secondary">
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <footer className="pt-6 border-t border-border-main flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '1900ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage Overview</span>
        </button>

        <div className="flex items-center gap-4">
          {onNavigateToStack && (
            <button
              onClick={onNavigateToStack}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <span>Inspect Tech Stack</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
          {onNavigateToContact && (
            <button
              onClick={onNavigateToContact}
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </footer>
    </article>
  );
};
