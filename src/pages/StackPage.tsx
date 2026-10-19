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
            <span>Architecture & Tooling Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-text-primary">
            <LetterReveal text="Technology Stack & Architecture" baseDelay={320} staggerMs={22} />
          </h1>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
            <WordReveal 
              text="A comprehensive breakdown of the languages, frameworks, distributed databases, AI retrieval pipelines, and security mechanisms I employ in production."
              baseDelay={650}
              staggerMs={28}
            />
          </p>
        </div>

        {/* High-Level Architecture Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-2">
          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '950ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Primary Languages</span>
            <span className="text-xs sm:text-sm font-bold text-text-primary block font-mono">TypeScript & Python</span>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1080ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Data Strategy</span>
            <span className="text-xs sm:text-sm font-bold text-text-primary block font-mono">Offline-First & SQL</span>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1210ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Real-Time Core</span>
            <span className="text-xs sm:text-sm font-bold text-text-primary block font-mono">WebSockets & Events</span>
          </div>
          <div className="p-2.5 sm:p-3.5 rounded-xl border border-border-main bg-panel-bg space-y-1 animate-hero-card" style={{ animationDelay: '1340ms' }}>
            <span className="text-[10px] sm:text-[11px] font-mono text-text-muted block">Security Philosophy</span>
            <span className="text-xs sm:text-sm font-bold text-text-primary block font-mono">Zero-Trust & RBAC</span>
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
              className="p-5 sm:p-6 rounded-2xl border border-border-main bg-panel-bg space-y-5 transition-all hover:border-text-primary/30 animate-hero-card"
              style={{ animationDelay: `${1500 + idx * 180}ms` }}
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border-main/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${pillar.bgAccent} border ${pillar.borderAccent}`}>
                    <Icon className={`w-5 h-5 ${pillar.accent}`} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block">
                      Tier 0{idx + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold font-display text-text-primary">
                      {pillar.category}
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {pillar.description}
              </p>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pillar.technologies.map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-3 rounded-xl border border-border-subtle bg-bg-main/50 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-xs font-mono font-semibold text-text-primary">
                        {tech.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-secondary font-mono pl-5">
                      {tech.role}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Decision / Engineering Rationale */}
              <div className="p-3.5 rounded-xl border border-border-subtle bg-badge-bg/40 text-xs font-mono text-text-secondary space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold block">
                  Engineering Rationale:
                </span>
                <p className="leading-relaxed">
                  {pillar.philosophy}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global Quick Reference Tags */}
      <section className="space-y-4 pt-4 border-t border-border-main animate-hero-fade-up" style={{ animationDelay: '2700ms' }}>
        <h2 className="text-base font-bold font-display text-text-primary flex items-center gap-2">
          <Layers className="w-4 h-4 text-text-primary" />
          <span>All Technologies & Competencies Directory</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="p-4 rounded-xl border border-border-main bg-panel-bg space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 rounded-md border border-border-subtle bg-bg-main text-[11px] font-mono text-text-secondary"
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
