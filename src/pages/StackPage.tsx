import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  ExternalLink,
  Server,
  Globe
} from 'lucide-react';
import { LetterReveal, WordReveal } from '../components/LetterReveal';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface StackPageProps {
  onBack: () => void;
  onNavigateToProjects?: () => void;
}

const STACK_PILLARS = [
  {
    category: "Frontend & Client Architecture",
    icon: Globe,
    accent: "text-sky-500 dark:text-sky-400",
    bgAccent: "bg-sky-500/10",
    borderAccent: "border-sky-500/20",
    description: "Building responsive, accessible, and high-performance interfaces designed for instant interactivity, offline endurance, and fluid state synchronization.",
    technologies: [
      { name: "React", role: "Component composition, Concurrent features, Custom hooks" },
      { name: "JavaScript (ES6+)", role: "Modern asynchronous architecture, Event loop, Functional workflows" },
      { name: "TypeScript", role: "Strict static typing, Interface contracts, End-to-end type safety" },
      { name: "Flutter & Dart", role: "Cross-platform mobile apps for iOS and Android, Reactive state" },
      { name: "Next.js", role: "Server-side rendering, Static site generation, API routing" },
      { name: "Tailwind CSS", role: "Design systems, Responsive tokens, Layout optimization" }
    ],
    philosophy: "I prioritize client-side state predictability and low interaction latency. By leveraging optimistic UI updates and local-first persistence with IndexedDB, interfaces never block the user on flaky network connections."
  },
  {
    category: "Backend & Distributed Systems",
    icon: Server,
    accent: "text-emerald-500 dark:text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    description: "Designing horizontally scalable, fault-tolerant backends capable of orchestrating complex business logic, asynchronous background tasks, and real-time bi-directional streaming.",
    technologies: [
      { name: "Node.js & Express", role: "RESTful microservices, Middleware pipelines, Asynchronous I/O" },
      { name: "Python & FastAPI", role: "High-throughput APIs, Pydantic data validation, AI service layer" },
      { name: "Socket.IO & WebSockets", role: "Bi-directional real-time events, Channel broadcasting, Room management" },
      { name: "REST APIs", role: "Predictable resource URI modeling, Rate limiting, Structured error handling" },
      { name: "GraphQL", role: "Declarative data fetching, Strict schema resolution, Query optimization" }
    ],
    philosophy: "Backends must be robust against edge cases. I design APIs with idempotent operations, structured request validation, connection pooling, and graceful degradation during network partitions."
  },
  {
    category: "Databases & Local-First Persistence",
    icon: Database,
    accent: "text-amber-500 dark:text-amber-400",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/20",
    description: "Architecting polyglot storage patterns spanning relational ACID data, flexible document stores, in-memory caches, and browser client-side persistence.",
    technologies: [
      { name: "PostgreSQL", role: "Relational modeling, Strict ACID constraints, Complex joins & indexing" },
      { name: "MongoDB", role: "Flexible document hierarchies, Sharding, Aggregation pipelines" },
      { name: "IndexedDB (Dexie.js)", role: "Client-side offline storage, Outbox sync queues, Fast indexing" },
      { name: "Redis", role: "In-memory caching, Pub/Sub event delivery, Session store" },
      { name: "Firebase & Supabase", role: "BaaS real-time database sync, Row-Level Security (RLS)" }
    ],
    philosophy: "Data persistence begins on the user's device. Using the Outbox Pattern with Dexie.js, clients write locally in 0ms, and changes asynchronously reconcile with cloud databases upon network availability."
  },
  {
    category: "AI Engineering & Retrieval Workflows",
    icon: Sparkles,
    accent: "text-purple-500 dark:text-purple-400",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/20",
    description: "Harnessing Large Language Models and real-time information retrieval pipelines to build grounded, deterministic AI systems without hallucination.",
    technologies: [
      { name: "Gemini AI", role: "LLM synthesis, Multi-modal prompting, Context window engineering" },
      { name: "RAG Pipelines", role: "Retrieval-Augmented Generation, Chunking, Relevance ranking" },
      { name: "Tavily Search API", role: "Live web discovery, Clean content extraction, Real-time research" },
      { name: "Token Streaming", role: "Low-latency WebSocket token delivery, Incremental Markdown rendering" }
    ],
    philosophy: "Raw LLMs hallucinate; grounded systems synthesize truth. I build AI features that retrieve verifiable external sources before synthesizing answers with cited sources and streaming responses."
  },
  {
    category: "Security & Zero-Trust Engineering",
    icon: ShieldCheck,
    accent: "text-rose-500 dark:text-rose-400",
    bgAccent: "bg-rose-500/10",
    borderAccent: "border-rose-500/20",
    description: "Integrating defensive cybersecurity principles directly into web software architecture rather than treating security as an afterthought.",
    technologies: [
      { name: "Role-Based Access Control", role: "Hierarchical permissions (Owner, Editor, Viewer), Guard middleware" },
      { name: "JWT & Secure Sessions", role: "HTTP-only secure cookie transport, Token rotation, CSRF protection" },
      { name: "Input Sanitization", role: "Injection defense (SQLi, NoSQLi, XSS), Schema enforcement" },
      { name: "CTF Vulnerability Testing", role: "Hands-on penetration testing, Cryptanalysis, Threat modeling" }
    ],
    philosophy: "Having competed in and placed in the Top 5 of national CTF finals, I code with an attacker's mindset—verifying every boundary, enforcing least privilege, and protecting data in transit and at rest."
  },
  {
    category: "DevOps, Tooling & Infrastructure",
    icon: Terminal,
    accent: "text-emerald-500 dark:text-emerald-400",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    description: "Automating developer workflows, maintaining containerized consistency, and deploying reproducible production workloads.",
    technologies: [
      { name: "Docker", role: "Containerization, Multi-stage builds, Isolated local dev environments" },
      { name: "Git & GitHub", role: "Branching workflows, Conventional commits, Code review hygiene" },
      { name: "Vite", role: "Blazing fast HMR, Optimized bundle splitting, Rollup plugins" },
      { name: "Postman", role: "API contract testing, Automated regression collections, Mock servers" },
      { name: "Linux / CLI", role: "Bash scripting, Server management, Performance profiling" }
    ],
    philosophy: "Great tooling compounds developer velocity. I use strict type checking, containerization, and modular architecture so codebases stay maintainable as scale expands."
  }
];

export const StackPage: React.FC<StackPageProps> = ({ onBack, onNavigateToProjects }) => {
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
            <span>Architecture & Tooling Dossier</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-text-primary leading-[1.12]">
            <LetterReveal text="Technology Stack & Architecture" baseDelay={320} staggerMs={22} />
          </h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl font-normal">
            <WordReveal 
              text="A comprehensive breakdown of the languages, frameworks, distributed databases, AI retrieval pipelines, and security mechanisms I employ in production."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* High-Level Architecture Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 pt-2">
          <div className="p-3.5 sm:p-4 rounded-xl border border-border-main bg-panel-bg/90 space-y-1.5 shadow-2xs animate-hero-card" style={{ animationDelay: '950ms' }}>
            <span className="text-xs font-mono text-text-muted block">Primary Languages</span>
            <span className="text-sm sm:text-base font-bold text-text-primary block font-mono">TypeScript & Python</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-border-main bg-panel-bg/90 space-y-1.5 shadow-2xs animate-hero-card" style={{ animationDelay: '1080ms' }}>
            <span className="text-xs font-mono text-text-muted block">Data Strategy</span>
            <span className="text-sm sm:text-base font-bold text-text-primary block font-mono">Offline-First & SQL</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-border-main bg-panel-bg/90 space-y-1.5 shadow-2xs animate-hero-card" style={{ animationDelay: '1210ms' }}>
            <span className="text-xs font-mono text-text-muted block">Real-Time Core</span>
            <span className="text-sm sm:text-base font-bold text-text-primary block font-mono">WebSockets & Events</span>
          </div>
          <div className="p-3.5 sm:p-4 rounded-xl border border-border-main bg-panel-bg/90 space-y-1.5 shadow-2xs animate-hero-card" style={{ animationDelay: '1340ms' }}>
            <span className="text-xs font-mono text-text-muted block">Security Philosophy</span>
            <span className="text-sm sm:text-base font-bold text-text-primary block font-mono">Zero-Trust & RBAC</span>
          </div>
        </div>
      </header>

      {/* Deep Categorized Pillars */}
      <section className="space-y-8">
        {STACK_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div 
              key={pillar.category}
              className="p-6 sm:p-7 rounded-2xl border border-border-main bg-panel-bg/90 space-y-5 transition-all hover:border-text-primary/30 shadow-xs animate-hero-card"
              style={{ animationDelay: `${1500 + idx * 180}ms` }}
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-main/60 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className={`p-2.5 rounded-xl ${pillar.bgAccent} border ${pillar.borderAccent} shadow-2xs`}>
                    <Icon className={`w-5 h-5 ${pillar.accent}`} />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-text-muted block font-semibold">
                      Tier 0{idx + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold font-display text-text-primary">
                      {pillar.category}
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-[15px] sm:text-base text-text-secondary leading-relaxed">
                {pillar.description}
              </p>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillar.technologies.map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-3.5 rounded-xl border border-border-subtle bg-bg-main/60 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-mono font-bold text-text-primary">
                        {tech.name}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-text-secondary font-mono pl-6 leading-relaxed">
                      {tech.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Decision / Engineering Rationale */}
              <div className="p-4 rounded-xl border border-border-subtle bg-badge-bg/50 text-xs sm:text-sm font-mono text-text-secondary space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-text-muted font-bold block">
                  Engineering Rationale:
                </span>
                <p className="leading-relaxed text-xs sm:text-[13px]">
                  {pillar.philosophy}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global Quick Reference Tags */}
      <section className="space-y-5 pt-4 border-t border-border-main animate-hero-fade-up" style={{ animationDelay: '2700ms' }}>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-text-primary" />
          <span>All Technologies & Competencies Directory</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="p-5 rounded-xl border border-border-main bg-panel-bg/90 space-y-2.5 shadow-xs">
              <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-md border border-border-subtle bg-bg-main text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="pt-6 border-t border-border-main flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-hero-fade-up" style={{ animationDelay: '2900ms' }}>
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage Overview</span>
        </button>

        {onNavigateToProjects && (
          <button
            onClick={onNavigateToProjects}
            className="group inline-flex items-center gap-2 text-xs font-mono text-text-primary hover:text-emerald-500 transition-colors cursor-pointer"
          >
            <span>Explore Projects Architecture Case Studies</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </footer>
    </article>
  );
};
